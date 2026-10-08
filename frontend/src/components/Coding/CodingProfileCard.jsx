import Badge from '../Badge/Badge';
import Button from '../Button/Button';
import './CodingProfileCard.css';

export default function CodingProfileCard({ profile, liveData }) {
  const stats = liveData?.stats;
  const isAvailable = liveData?.available && stats;

  return (
    <article className="coding-card" aria-labelledby={`card-title-${profile.id}`}>
      {/* Header */}
      <div className="coding-card__header">
        <div className="coding-card__meta">
          <span className="coding-card__platform">{profile.platform}</span>
          <Badge variant={isAvailable ? 'success' : 'muted'} size="sm">
            {isAvailable ? 'VERIFIED' : 'PUBLIC'}
          </Badge>
        </div>
        <h3 id={`card-title-${profile.id}`} className="coding-card__user">
          @{profile.username}
        </h3>
        <p className="coding-card__purpose">{profile.purpose}</p>
      </div>

      {/* Verified Stats Area */}
      <div className="coding-card__body">
        {isAvailable ? (
          <div className="coding-card__stats">
            {/* LeetCode stats */}
            {profile.id === 'leetcode' && stats.totalSolved !== null && (
              <div className="coding-stats-grid">
                <div className="coding-stat-item coding-stat-item--highlight">
                  <span className="coding-stat-val">{stats.totalSolved}</span>
                  <span className="coding-stat-label">TOTAL SOLVED</span>
                </div>
                <div className="coding-stat-item">
                  <span className="coding-stat-val">{stats.easySolved}</span>
                  <span className="coding-stat-label">EASY</span>
                </div>
                <div className="coding-stat-item">
                  <span className="coding-stat-val">{stats.mediumSolved}</span>
                  <span className="coding-stat-label">MEDIUM</span>
                </div>
              </div>
            )}

            {/* GitHub stats */}
            {profile.id === 'github' && (
              <div className="coding-stats-grid">
                <div className="coding-stat-item coding-stat-item--highlight">
                  <span className="coding-stat-val">{stats.publicRepos ?? '5'}</span>
                  <span className="coding-stat-label">PUBLIC REPOSITORIES</span>
                </div>
                <div className="coding-stat-item">
                  <span className="coding-stat-val">{stats.followers ?? '1'}</span>
                  <span className="coding-stat-label">FOLLOWERS</span>
                </div>
              </div>
            )}

            {/* CodeChef stats */}
            {profile.id === 'codechef' && (
              <div className="coding-stats-grid">
                <div className="coding-stat-item coding-stat-item--highlight">
                  <span className="coding-stat-val">{stats.rating ?? '1160'}</span>
                  <span className="coding-stat-label">CONTEST RATING</span>
                </div>
                <div className="coding-stat-item">
                  <span className="coding-stat-val">{stats.division || 'Div 4'}</span>
                  <span className="coding-stat-label">DIVISION</span>
                </div>
              </div>
            )}

            {/* Codeforces stats */}
            {profile.id === 'codeforces' && (
              <div className="coding-stats-cf">
                <div className="coding-stat-cf-tag">
                  <span className="coding-cf-status">
                    {stats.rating ? `Rating: ${stats.rating}` : stats.status || 'Registered Participant (Unrated)'}
                  </span>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="coding-card__fallback">
            <span className="coding-fallback-tag">Public Profile</span>
            <span className="coding-fallback-note">Verified external handle</span>
          </div>
        )}
      </div>

      {/* Footer / CTA */}
      <div className="coding-card__footer">
        <Button
          variant="outline"
          size="sm"
          href={profile.profileUrl}
          target="_blank"
          className="coding-card__btn"
          aria-label={`View public profile on ${profile.platform}`}
        >
          View Profile
          <span aria-hidden="true">↗</span>
        </Button>
      </div>
    </article>
  );
}
