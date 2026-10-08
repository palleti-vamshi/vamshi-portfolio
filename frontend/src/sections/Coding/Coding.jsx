import SectionHeader from '../../components/SectionHeader/SectionHeader';
import Badge from '../../components/Badge/Badge';
import './Coding.css';

export default function Coding() {
  const principles = [
    {
      num: '01',
      title: 'Time & Space Invariants',
      desc: 'Analyzing asymptotic upper bounds and cache performance prior to implementation. Preferring linear and logarithmic approaches for critical path operations.'
    },
    {
      num: '02',
      title: 'Edge-Case Rigor',
      desc: 'Systematically constructing test boundaries for corner cases: off-by-one indices, arithmetic overflow, sparse graphs, and null constraints.'
    },
    {
      num: '03',
      title: 'Idiomatic C++ Mechanics',
      desc: 'Leveraging standard template library (STL) primitives, deterministic memory structures, and fast I/O idioms for high-speed algorithmic execution.'
    }
  ];

  return (
    <section id="coding" className="section-wrapper coding-section">
      <div className="container">
        <SectionHeader
          number="06"
          kicker="ALGORITHMIC PRACTICE"
          title="CODING & PROBLEM SOLVING"
          description="Consistent practice in competitive programming and data structures to hone rapid mathematical modeling and systematic code optimization."
        />

        <div className="coding-layout">
          <div className="coding-card coding-card--primary">
            <div className="coding-card__header">
              <span className="coding-card__label">CORE DISCIPLINE</span>
              <Badge variant="accent" size="sm">C++ & DSA</Badge>
            </div>
            <h3 className="coding-card__title">Algorithmic Problem Solving</h3>
            <p className="coding-card__text">
              Competitive programming provides an unsparing feedback loop for testing code correctness under memory limits and strict execution time windows. Every problem demands reducing complex specifications to canonical mathematical structures—graphs, trees, prefix states, or dynamic recurrence relations.
            </p>
            <div className="coding-domains">
              <span className="coding-domain-tag">Graph Theory (BFS / DFS / Shortest Path)</span>
              <span className="coding-domain-tag">Dynamic Programming</span>
              <span className="coding-domain-tag">Binary Search on Answer</span>
              <span className="coding-domain-tag">Two Pointers & Sliding Window</span>
            </div>
          </div>

          <div className="coding-principles">
            {principles.map((item) => (
              <div key={item.num} className="coding-principle-item">
                <span className="coding-principle-num">{item.num}</span>
                <div className="coding-principle-body">
                  <h4 className="coding-principle-title">{item.title}</h4>
                  <p className="coding-principle-desc">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
