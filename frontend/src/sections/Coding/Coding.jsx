import { useState, useEffect } from 'react';
import SectionHeader from '../../components/SectionHeader/SectionHeader';
import GitHubActivity from '../../components/Coding/GitHubActivity';
import CodingProfileCard from '../../components/Coding/CodingProfileCard';
import { codingProfiles, problemSolvingFocus } from '../../data/codingProfiles';
import { fetchCodingProfiles } from '../../services/codingProfiles';
import './Coding.css';

export default function Coding() {
  const [liveProfiles, setLiveProfiles] = useState(null);

  useEffect(() => {
    let isMounted = true;
    async function loadData() {
      const data = await fetchCodingProfiles();
      if (isMounted && data) {
        setLiveProfiles(data);
      }
    }
    loadData();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section id="coding" className="section-wrapper coding-section">
      <div className="container">
        <SectionHeader
          number="07"
          kicker="CODING"
          title="CODING / PROBLEM SOLVING"
          description="Learning through problems, experiments, and consistent building."
        />

        {/* 1. REAL ACTIVITY */}
        <div className="coding-part">
          <div className="coding-part__header">
            <span className="coding-part__num">01</span>
            <h3 className="coding-part__title">ACTIVITY</h3>
          </div>
          <GitHubActivity githubData={liveProfiles?.platforms?.github} />
        </div>

        {/* 2. CODING PROFILES */}
        <div className="coding-part">
          <div className="coding-part__header">
            <span className="coding-part__num">02</span>
            <h3 className="coding-part__title">CODING PROFILES</h3>
          </div>
          <div className="coding-profiles-grid">
            {codingProfiles.map((item) => (
              <CodingProfileCard
                key={item.id}
                profile={item}
                liveData={liveProfiles?.platforms?.[item.id]}
              />
            ))}
          </div>
        </div>

        {/* 3. PROBLEM SOLVING FOCUS */}
        <div className="coding-part coding-part--last">
          <div className="coding-part__header">
            <span className="coding-part__num">03</span>
            <h3 className="coding-part__title">PROBLEM SOLVING FOCUS</h3>
          </div>
          <div className="coding-focus-grid">
            {problemSolvingFocus.map((focusItem) => (
              <div key={focusItem.num} className="coding-focus-card">
                <span className="coding-focus-num">{focusItem.num}</span>
                <div className="coding-focus-body">
                  <h4 className="coding-focus-area">{focusItem.area}</h4>
                  <p className="coding-focus-text">{focusItem.focus}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
