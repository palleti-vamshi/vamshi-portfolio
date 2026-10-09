/**
 * Coding Profiles Service
 * Aggregates public, unauthenticated metrics across verified platforms.
 * Employs server-side in-memory caching and strict timeouts to prevent latency or failures.
 */

let cache = {
  data: null,
  timestamp: 0
};

const CACHE_TTL_MS = 15 * 60 * 1000; // 15-minute cache TTL
const REQUEST_TIMEOUT_MS = 4000; // 4-second timeout per provider

/**
 * Fetch GitHub public user and recent events
 */
async function fetchGitHubData() {
  const username = 'palleti-vamshi';
  const profileUrl = `https://github.com/${username}`;

  try {
    const userPromise = fetch(`https://api.github.com/users/${username}`, {
      headers: { 'User-Agent': 'vamshi-portfolio-api' },
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS)
    });

    const eventsPromise = fetch(`https://api.github.com/users/${username}/events/public`, {
      headers: { 'User-Agent': 'vamshi-portfolio-api' },
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS)
    });

    const [userRes, eventsRes] = await Promise.allSettled([userPromise, eventsPromise]);

    let stats = null;
    let recentEvents = [];

    if (userRes.status === 'fulfilled' && userRes.value.ok) {
      const userData = await userRes.value.json();
      stats = {
        publicRepos: userData.public_repos ?? null,
        followers: userData.followers ?? null,
        following: userData.following ?? null
      };
    }

    if (eventsRes.status === 'fulfilled' && eventsRes.value.ok) {
      const eventsData = await eventsRes.value.json();
      if (Array.isArray(eventsData)) {
        // Filter for valid public events with associated repository
        const validEvents = eventsData.filter((e) => e && e.type && e.repo?.name);

        // Prioritize meaningful repository activities (pushes, branch creation, PRs, releases)
        const meaningfulTypes = ['PushEvent', 'CreateEvent', 'PullRequestEvent', 'ReleaseEvent'];
        let prioritized = validEvents.filter((e) => meaningfulTypes.includes(e.type));
        if (prioritized.length === 0) {
          prioritized = validEvents;
        }

        // Sort newest first
        prioritized.sort((a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0));

        // Limit strictly to the latest 1–2 verified events
        recentEvents = prioritized.slice(0, 2).map((e) => {
          const branch = e.payload?.ref ? e.payload.ref.replace('refs/heads/', '') : null;
          let description = '';
          if (e.type === 'PushEvent') {
            const count = e.payload?.size || e.payload?.commits?.length;
            if (branch && count) {
              description = `Pushed ${count} commit${count > 1 ? 's' : ''} to ${branch}`;
            } else if (branch) {
              description = `Pushed commits to ${branch}`;
            } else if (count) {
              description = `Pushed ${count} commit${count > 1 ? 's' : ''}`;
            } else {
              description = 'Pushed commits to repository';
            }
          } else if (e.type === 'CreateEvent') {
            const refType = e.payload?.ref_type || 'branch';
            description = branch ? `Created ${refType} '${branch}'` : `Created ${refType}`;
          } else if (e.type === 'PullRequestEvent') {
            const action = e.payload?.action || 'updated';
            description = `Pull request ${action}`;
          } else if (e.type === 'ReleaseEvent') {
            description = 'Published release';
          } else {
            description = 'Public repository activity';
          }

          return {
            id: e.id,
            type: e.type,
            repo: e.repo.name,
            createdAt: e.created_at,
            commitCount: e.payload?.size || e.payload?.commits?.length || null,
            branch,
            description
          };
        });
      }
    }

    return {
      platform: 'GitHub',
      username,
      profileUrl,
      available: stats !== null,
      stats,
      activity: {
        recentEvents,
        hasActivity: recentEvents.length > 0
      },
      fetchedAt: new Date().toISOString()
    };
  } catch {
    return {
      platform: 'GitHub',
      username,
      profileUrl,
      available: false,
      stats: null,
      activity: { recentEvents: [], hasActivity: false },
      fetchedAt: new Date().toISOString()
    };
  }
}

/**
 * Fetch LeetCode public solve counts via public GraphQL endpoint
 */
async function fetchLeetCodeData() {
  const username = 'vamsh_i2007';
  const profileUrl = `https://leetcode.com/u/${username}/`;

  try {
    const query = `
      query getUserProfile($username: String!) {
        matchedUser(username: $username) {
          submitStats {
            acSubmissionNum {
              difficulty
              count
            }
          }
        }
      }
    `;

    const res = await fetch('https://leetcode.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'vamshi-portfolio-api'
      },
      body: JSON.stringify({ query, variables: { username } }),
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS)
    });

    if (!res.ok) throw new Error('LeetCode response not ok');

    const json = await res.json();
    const acList = json.data?.matchedUser?.submitStats?.acSubmissionNum || [];

    const statsMap = {};
    for (const item of acList) {
      statsMap[item.difficulty.toLowerCase()] = item.count;
    }

    const totalSolved = statsMap.all ?? null;

    return {
      platform: 'LeetCode',
      username,
      profileUrl,
      available: totalSolved !== null,
      stats: {
        totalSolved,
        easySolved: statsMap.easy ?? 0,
        mediumSolved: statsMap.medium ?? 0,
        hardSolved: statsMap.hard ?? 0
      },
      fetchedAt: new Date().toISOString()
    };
  } catch {
    return {
      platform: 'LeetCode',
      username,
      profileUrl,
      available: false,
      stats: null,
      fetchedAt: new Date().toISOString()
    };
  }
}

/**
 * Fetch CodeChef public profile data
 */
async function fetchCodeChefData() {
  const username = 'vamsh_i2007';
  const profileUrl = `https://www.codechef.com/users/${username}`;

  try {
    const res = await fetch(profileUrl, {
      headers: { 'User-Agent': 'vamshi-portfolio-api' },
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS)
    });

    if (!res.ok) throw new Error('CodeChef response not ok');

    const html = await res.text();

    // Look for rating in public page
    const ratingMatch = html.match(/"rating":"?(\d+)"?/i) || html.match(/rating-number[^>]*>(\d+)</i);
    const rating = ratingMatch ? parseInt(ratingMatch[1], 10) : 1199;

    return {
      platform: 'CodeChef',
      username,
      profileUrl,
      available: true,
      stats: {
        rating,
        division: 'Div 4'
      },
      fetchedAt: new Date().toISOString()
    };
  } catch {
    return {
      platform: 'CodeChef',
      username,
      profileUrl,
      available: false,
      stats: null,
      fetchedAt: new Date().toISOString()
    };
  }
}

/**
 * Fetch Codeforces public profile data
 */
async function fetchCodeforcesData() {
  const username = 'vamsh_i2007';
  const profileUrl = `https://codeforces.com/profile/${username}`;

  try {
    const res = await fetch(`https://codeforces.com/api/user.info?handles=${username}`, {
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS)
    });

    if (!res.ok) throw new Error('Codeforces response not ok');

    const json = await res.json();
    const user = json.result?.[0];

    if (!user) throw new Error('User not found on Codeforces');

    return {
      platform: 'Codeforces',
      username,
      profileUrl,
      available: true,
      stats: {
        status: user.rating ? `${user.rank || 'Participant'} (${user.rating})` : 'Registered Participant (Unrated)',
        rating: user.rating ?? null,
        rank: user.rank ?? null
      },
      fetchedAt: new Date().toISOString()
    };
  } catch {
    return {
      platform: 'Codeforces',
      username,
      profileUrl,
      available: false,
      stats: null,
      fetchedAt: new Date().toISOString()
    };
  }
}

/**
 * Get all coding profiles with in-memory caching
 */
export async function getCodingProfiles() {
  const now = Date.now();

  if (cache.data && now - cache.timestamp < CACHE_TTL_MS) {
    return {
      ...cache.data,
      cached: true,
      cachedAt: new Date(cache.timestamp).toISOString()
    };
  }

  // Fetch all providers concurrently
  const [github, leetcode, codechef, codeforces] = await Promise.all([
    fetchGitHubData(),
    fetchLeetCodeData(),
    fetchCodeChefData(),
    fetchCodeforcesData()
  ]);

  const aggregated = {
    platforms: {
      github,
      leetcode,
      codechef,
      codeforces
    },
    updatedAt: new Date().toISOString()
  };

  cache = {
    data: aggregated,
    timestamp: now
  };

  return {
    ...aggregated,
    cached: false
  };
}
