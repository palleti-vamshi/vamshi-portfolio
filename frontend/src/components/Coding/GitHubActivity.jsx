import Badge from '../Badge/Badge';
import Button from '../Button/Button';
import './GitHubActivity.css';

export default function GitHubActivity({ githubData }) {
  const events = githubData?.activity?.recentEvents || [];
  const hasActivity = events.length > 0;
  const profileUrl = githubData?.profileUrl || 'https://github.com/palleti-vamshi';

  const formatEventDate = (dateString) => {
    if (!dateString) return '';
    try {
      const d = new Date(dateString);
      return d.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  const formatEventType = (type) => {
    if (type === 'PushEvent') return 'Public push';
    if (type === 'CreateEvent') return 'Branch / Tag created';
    if (type === 'WatchEvent') return 'Starred repository';
    if (type === 'ForkEvent') return 'Forked repository';
    return type ? type.replace('Event', '') : 'Public event';
  };

  const cleanRepoName = (repoName) => {
    if (!repoName) return '';
    return repoName.replace('palleti-vamshi/', '');
  };

  return (
    <div className="gh-activity-box" aria-label="GitHub Recent Public Activity">
      <div className="gh-activity-header">
        <div className="gh-activity-meta">
          <span className="gh-activity-label">RECENT PUBLIC ACTIVITY</span>
          <Badge variant="accent" size="sm">LIVE DATA</Badge>
        </div>
        <Button
          variant="outline"
          size="sm"
          href={profileUrl}
          target="_blank"
          className="gh-activity-btn"
        >
          View GitHub Activity ↗
        </Button>
      </div>

      {hasActivity ? (
        <div className="gh-events-stream">
          <div className="gh-events-timeline">
            {events.map((event, idx) => {
              const repoClean = cleanRepoName(event.repo);
              const eventDate = formatEventDate(event.createdAt);
              const eventType = formatEventType(event.type);
              const isLast = idx === events.length - 1;

              return (
                <div key={event.id} className="gh-timeline-item">
                  <div className="gh-timeline-marker">
                    <span className="gh-timeline-dot"></span>
                    {!isLast && <span className="gh-timeline-line"></span>}
                  </div>
                  <div className="gh-timeline-content">
                    <div className="gh-timeline-main">
                      <a
                        href={`https://github.com/${event.repo}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="gh-timeline-repo"
                      >
                        {repoClean}
                        <span className="gh-timeline-arrow" aria-hidden="true">↗</span>
                      </a>
                      <span className="gh-timeline-date">{eventDate}</span>
                    </div>
                    <div className="gh-timeline-details">
                      <span className="gh-timeline-type">{eventType}</span>
                      <span className="gh-timeline-dot-sep">·</span>
                      <span className="gh-timeline-time">{eventDate}</span>
                      {event.commitCount && (
                        <>
                          <span className="gh-timeline-dot-sep">·</span>
                          <span className="gh-timeline-commits">
                            {event.commitCount} commit{event.commitCount > 1 ? 's' : ''}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
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
              View GitHub Activity ↗
            </Button>
          </div>
        </div>
      ) : (
        <div className="gh-activity-fallback">
          <p className="gh-fallback-text">
            GitHub activity is available on my profile.
          </p>
          <Button
            variant="secondary"
            size="sm"
            href={profileUrl}
            target="_blank"
          >
            View GitHub Activity ↗
          </Button>
        </div>
      )}
    </div>
  );
}
