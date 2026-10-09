import Badge from '../Badge/Badge';
import Button from '../Button/Button';
import './GitHubActivity.css';

export default function GitHubActivity({ githubData }) {
  const rawEvents = githubData?.activity?.recentEvents || [];
  const profileUrl = githubData?.profileUrl || 'https://github.com/palleti-vamshi';

  // Filter for meaningful public repository events (Push, Create, PR, Release)
  const meaningfulTypes = ['PushEvent', 'CreateEvent', 'PullRequestEvent', 'ReleaseEvent'];
  const filteredEvents = rawEvents.filter((e) => e?.repo && meaningfulTypes.includes(e.type));
  const candidateEvents = filteredEvents.length > 0 ? filteredEvents : rawEvents.filter((e) => e?.repo);

  // Sort newest first
  candidateEvents.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));

  // Strictly display only the latest 1–2 verified activities
  const displayEvents = candidateEvents.slice(0, 2);
  const hasActivity = displayEvents.length > 0;

  const formatEventDate = (dateString) => {
    if (!dateString) return '';
    try {
      const d = new Date(dateString);
      if (isNaN(d.getTime())) return dateString;
      return d.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  const getActivityDescription = (event) => {
    if (event.description) return event.description;

    const branch = event.branch || (event.ref ? event.ref.replace('refs/heads/', '') : null);
    if (event.type === 'PushEvent') {
      if (branch && event.commitCount) {
        return `Pushed ${event.commitCount} commit${event.commitCount > 1 ? 's' : ''} to ${branch}`;
      }
      if (branch) {
        return `Pushed commits to ${branch}`;
      }
      if (event.commitCount) {
        return `Pushed ${event.commitCount} commit${event.commitCount > 1 ? 's' : ''}`;
      }
      return 'Pushed commits to repository';
    }
    if (event.type === 'CreateEvent') {
      const refType = event.refType || 'branch';
      return branch ? `Created ${refType} '${branch}'` : `Created ${refType}`;
    }
    if (event.type === 'PullRequestEvent') {
      return 'Pull request activity';
    }
    if (event.type === 'ReleaseEvent') {
      return 'Published repository release';
    }
    return 'Public repository activity';
  };

  const getEventBadge = (type) => {
    if (type === 'PushEvent') return 'PUSH';
    if (type === 'CreateEvent') return 'BRANCH';
    if (type === 'PullRequestEvent') return 'PR';
    if (type === 'ReleaseEvent') return 'RELEASE';
    return 'ACTIVITY';
  };

  const cleanRepoName = (repoName) => {
    if (!repoName) return '';
    return repoName.replace('palleti-vamshi/', '');
  };

  return (
    <div className="gh-activity-box" aria-label="GitHub Recent Public Activity">
      <div className="gh-activity-header">
        <div className="gh-activity-meta">
          <span className="gh-activity-label">RECENT GITHUB ACTIVITY</span>
          <Badge variant="accent" size="sm">LIVE API</Badge>
        </div>
        <Button
          variant="outline"
          size="sm"
          href={profileUrl}
          target="_blank"
          className="gh-activity-btn"
        >
          View GitHub Profile ↗
        </Button>
      </div>

      {hasActivity ? (
        <div className="gh-activity-container">
          <div className="gh-compact-cards">
            {displayEvents.map((event) => {
              const repoClean = cleanRepoName(event.repo);
              const eventDate = formatEventDate(event.createdAt);
              const desc = getActivityDescription(event);
              const badgeLabel = getEventBadge(event.type);
              const branchName = event.branch || (event.ref ? event.ref.replace('refs/heads/', '') : null);

              return (
                <article key={event.id} className="gh-compact-card">
                  <div className="gh-compact-card__header">
                    <a
                      href={`https://github.com/${event.repo}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="gh-compact-card__repo-link"
                      title={`Open ${event.repo} on GitHub`}
                    >
                      <span className="gh-compact-card__repo-icon" aria-hidden="true">
                        <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
                          <path d="M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 110-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 01-1.072 1.05A2.495 2.495 0 012 11.5v-9zm10.5-1h-8a1 1 0 00-1 1v6.708A2.486 2.486 0 014.5 9h7.5V1.5z"/>
                        </svg>
                      </span>
                      <span className="gh-compact-card__repo-name">{repoClean}</span>
                      <span className="gh-compact-card__arrow" aria-hidden="true">↗</span>
                    </a>
                    <span className="gh-compact-card__date">{eventDate}</span>
                  </div>

                  <div className="gh-compact-card__body">
                    <p className="gh-compact-card__desc">{desc}</p>
                  </div>

                  <div className="gh-compact-card__meta">
                    <span className="gh-compact-card__pill">{badgeLabel}</span>
                    {branchName && (
                      <span className="gh-compact-card__tag">
                        <span className="gh-compact-card__branch-icon">⎇</span> {branchName}
                      </span>
                    )}
                    {event.commitCount && (
                      <span className="gh-compact-card__commits">
                        {event.commitCount} commit{event.commitCount > 1 ? 's' : ''}
                      </span>
                    )}
                  </div>
                </article>
              );
            })}
          </div>

          <div className="gh-activity-footer">
            <span className="gh-activity-note">
              Verified public events streamed directly from GitHub API for @palleti-vamshi
            </span>
            <Button
              variant="outline"
              size="sm"
              href={profileUrl}
              target="_blank"
              className="gh-activity-footer-btn"
            >
              Explore Repositories ↗
            </Button>
          </div>
        </div>
      ) : (
        <div className="gh-activity-fallback">
          <p className="gh-fallback-text">
            No recent public repository activity recorded. Explore public codebases directly on GitHub.
          </p>
          <Button
            variant="secondary"
            size="sm"
            href={profileUrl}
            target="_blank"
          >
            View GitHub Profile ↗
          </Button>
        </div>
      )}
    </div>
  );
}
