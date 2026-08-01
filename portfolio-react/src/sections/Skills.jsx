import './Skills.css';

export default function Skills() {
  const groups = [
    {
      title: 'Languages',
      icon: '{}',
      items: ['TypeScript', 'Go', 'PHP', 'SQL'],
    },
    {
      title: 'Frameworks & Tools',
      icon: '>_',
      items: ['React', 'Node.js', 'Docker', 'Git', 'REST APIs'],
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
    },
  ];

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
            <div key={group.title} className="skills__card">
              <div className="skills__card-header">
                <span className="skills__card-icon">{group.icon}</span>
                <h3 className="skills__card-title">{group.title}</h3>
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
          ))}
        </div>
      </div>
    </section>
  );
}
