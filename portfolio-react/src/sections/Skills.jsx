import { useState } from 'react';
import './Skills.css';

const groups = [
  {
    title: 'Languages',
    icon: '{}',
    items: ['TypeScript', 'Go', 'PHP', 'SQL'],
    query: `SELECT name, proficiency
FROM developer_skills
WHERE category = 'languages'
ORDER BY proficiency DESC;

-- Result:
-- TypeScript  | ████████░░ expert
-- Go          | ███████░░░ advanced
-- PHP         | ████████░░ expert
-- SQL         | ███████░░░ advanced`,
  },
  {
    title: 'Frameworks & Tools',
    icon: '>_',
    items: ['React', 'Node.js', 'Docker', 'Git', 'REST APIs'],
    query: `SELECT tool_name, years_exp, daily_use
FROM tech_stack
WHERE type IN ('framework', 'tool')
  AND status = 'active';

-- Result:
-- React     | 6y  | ✓
-- Node.js   | 8y  | ✓
-- Docker    | 5y  | ✓
-- Git       | 14y | ✓
-- REST APIs | 12y | ✓`,
  },
  {
    title: 'Domain',
    icon: '⚡',
    items: [
      'Automotive Data',
      'VIN/Plate Identification',
      'TecAlliance',
      'OEM & IAM Catalogs',
    ],
    query: `SELECT expertise, specialization
FROM domain_knowledge
WHERE industry = 'automotive'
  AND depth = 'expert';

-- Result:
-- Automotive Data      | 14 years
-- VIN/Plate ID         | decoding & resolution
-- TecAlliance          | TecDoc, TecCom
-- OEM & IAM Catalogs   | cross-referencing`,
  },
  {
    title: 'Other',
    icon: '◈',
    items: [
      'AI Agents',
      'Data Management',
      'Reverse Engineering',
      'Project Management',
    ],
    query: `SELECT skill, context
FROM additional_competencies
WHERE active = true
ORDER BY relevance DESC;

-- Result:
-- AI Agents          | Kiro, Cursor, LLM tools
-- Data Management    | ETL, pipelines, QA
-- Reverse Eng.      | protocols, formats
-- Project Mgmt      | consulting, delivery`,
  },
];

export default function Skills() {
  const [activeCard, setActiveCard] = useState(null);

  return (
    <section id="skills" className="skills">
      {/* Scrolling SQL background */}
      <div className="skills__code-bg" aria-hidden="true">
        <div className="skills__code-scroll">
          <pre className="skills__sql">
{`SELECT v.vin, v.make, v.model, v.year
FROM vehicles v
JOIN parts_catalog pc ON v.model_id = pc.model_id
WHERE v.registration_country = 'FR'
ORDER BY v.created_at DESC;

INSERT INTO tecdoc_articles (article_id, brand_id, description)
VALUES (42890, 'BOSCH', 'Brake Pad Set, disc brake');

CREATE INDEX idx_vin_lookup ON vehicles (vin)
WHERE active = true;

SELECT pc.part_number, pc.oem_reference,
       ta.tecdoc_id, ta.generic_article
FROM parts_catalog pc
INNER JOIN tecalliance_mapping ta
  ON pc.article_id = ta.article_id
WHERE pc.category = 'braking'
  AND ta.status = 'validated';

UPDATE vehicle_identification SET
  decoded = true,
  wmi = SUBSTRING(vin, 1, 3),
  vds = SUBSTRING(vin, 4, 6),
  vis = SUBSTRING(vin, 10, 8)
WHERE batch_id = 'import_2026_07';

SELECT COUNT(*) as total_parts,
       AVG(match_confidence) as avg_confidence
FROM cross_reference_results
GROUP BY source_catalog
HAVING avg_confidence > 0.85;`}
          </pre>
        </div>
      </div>

      {/* IDE-style top bar */}
      <div className="skills__ide-bar">
        <div className="skills__ide-dots">
          <span></span><span></span><span></span>
        </div>
        <div className="skills__ide-tabs">
          <span className="skills__ide-tab active">skills.ts</span>
          <span className="skills__ide-tab">config.go</span>
          <span className="skills__ide-tab">schema.sql</span>
        </div>
      </div>

      <div className="skills__content">
        <h2 className="skills__title">
          <span className="skills__title-comment">// </span>Skills
        </h2>

        <div className="skills__grid">
          {groups.map((group) => (
            <div
              key={group.title}
              className={`skills__card ${activeCard === group.title ? 'skills__card--queried' : ''}`}
              onClick={() => setActiveCard(activeCard === group.title ? null : group.title)}
            >
              {/* Default view: list */}
              <div className="skills__card-front">
                <div className="skills__card-header">
                  <span className="skills__card-icon">{group.icon}</span>
                  <h3 className="skills__card-title">{group.title}</h3>
                  <span className="skills__card-run" title="Run query">▶</span>
                </div>
                <ul className="skills__list">
                  {group.items.map((item, i) => (
                    <li key={item} className="skills__list-item">
                      <span className="skills__line-num">{i + 1}</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* SQL view: shown on click */}
              <div className="skills__card-query">
                <div className="skills__card-header skills__card-header--query">
                  <span className="skills__card-icon">⟳</span>
                  <h3 className="skills__card-title">Query Result</h3>
                  <span className="skills__card-run" title="Close">✕</span>
                </div>
                <pre className="skills__query-code">{group.query}</pre>
              </div>
            </div>
          ))}
        </div>

        <p className="skills__hint">Click a card to run the query</p>
      </div>
    </section>
  );
}
