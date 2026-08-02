import { useState, useEffect } from 'react';
import './Skills.css';

const DUOLINGO_USERNAME = 'ArnaudBoos';

const staticTables = [
  {
    name: 'spoken_languages',
    query: `SELECT language, level, details
FROM spoken_languages
ORDER BY level DESC;`,
    columns: ['language', 'level', 'details'],
    rows: [
      ['French', 'native', '—'],
      ['English', 'fluent', '—'],
      ['Japanese', 'learning', 'loading...'],
    ],
  },
  {
    name: 'languages',
    query: `SELECT name, level, years_exp
FROM languages
ORDER BY years_exp DESC;`,
    columns: ['name', 'level', 'years_exp'],
    rows: [
      ['PHP', 'expert', '14'],
      ['SQL', 'advanced', '14'],
      ['TypeScript', 'expert', '8'],
      ['Go', 'advanced', '4'],
    ],
  },
  {
    name: 'frameworks_tools',
    query: `SELECT name, category, daily_use
FROM frameworks_tools
ORDER BY category;`,
    columns: ['name', 'category', 'daily_use'],
    rows: [
      ['React', 'framework', 'true'],
      ['Node.js', 'runtime', 'true'],
      ['Docker', 'devops', 'true'],
      ['Git', 'vcs', 'true'],
      ['REST APIs', 'architecture', 'true'],
    ],
  },
  {
    name: 'domain_expertise',
    query: `SELECT domain, specialization, depth
FROM domain_expertise;`,
    columns: ['domain', 'specialization', 'depth'],
    rows: [
      ['Automotive Data', 'vehicle ecosystems', 'expert'],
      ['VIN/Plate ID', 'decoding & resolution', 'expert'],
      ['TecAlliance', 'TecDoc, TecCom', 'expert'],
      ['OEM & IAM Catalogs', 'cross-referencing', 'expert'],
    ],
  },
  {
    name: 'other_skills',
    query: `SELECT skill, tools, experience
FROM other_skills
ORDER BY experience DESC;`,
    columns: ['skill', 'tools', 'experience'],
    rows: [
      ['AI Agents', 'Kiro, Cursor, Claude', 'active'],
      ['Data Management', 'ETL, pipelines', '14 years'],
      ['Reverse Engineering', 'protocols, formats', '10 years'],
      ['Project Management', 'consulting', '8 years'],
    ],
  },
];

export default function Skills() {
  const [currentQuery, setCurrentQuery] = useState('');
  const [result, setResult] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [tables, setTables] = useState(staticTables);

  // Fetch Duolingo stats
  useEffect(() => {
    fetch(`https://www.duolingo.com/2017-06-30/users?username=${DUOLINGO_USERNAME}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.users && data.users[0]) {
          const user = data.users[0];
          const streak = user.streak || 0;
          const jaCourse = user.courses?.find((c) => c.learningLanguage === 'ja');
          const xp = jaCourse ? jaCourse.xp : user.totalXp;
          const details = `🔥 ${streak} day streak · ${xp.toLocaleString()} XP (via Duolingo)`;

          setTables((prev) =>
            prev.map((t) => {
              if (t.name === 'spoken_languages') {
                return {
                  ...t,
                  rows: t.rows.map((row) =>
                    row[0] === 'Japanese' ? ['Japanese', 'learning', details] : row
                  ),
                };
              }
              return t;
            })
          );
        }
      })
      .catch(() => {
        // Fallback if API fails
        setTables((prev) =>
          prev.map((t) => {
            if (t.name === 'spoken_languages') {
              return {
                ...t,
                rows: t.rows.map((row) =>
                  row[0] === 'Japanese' ? ['Japanese', 'learning', 'Duolingo'] : row
                ),
              };
            }
            return t;
          })
        );
      });
  }, []);

  const runQuery = (query) => {
    setCurrentQuery(query);
    setIsRunning(true);
    setResult(null);

    // Simulate execution delay
    setTimeout(() => {
      const table = tables.find((t) => query.includes(t.name));
      if (table) {
        setResult(table);
      } else {
        setResult({ error: `Table not found. Available tables: ${tables.map(t => t.name).join(', ')}` });
      }
      setIsRunning(false);
    }, 600);
  };

  const handleTableClick = (table) => {
    runQuery(table.query);
  };

  const handleRun = () => {
    if (currentQuery.trim()) {
      runQuery(currentQuery);
    }
  };

  const handleKeyDown = (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      handleRun();
    }
  };

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

      {/* IDE top bar */}
      <div className="skills__ide-bar">
        <div className="skills__ide-dots">
          <span></span><span></span><span></span>
        </div>
        <div className="skills__ide-tabs">
          <span className="skills__ide-tab">skills_db</span>
          <span className="skills__ide-tab active">query.sql</span>
        </div>
      </div>

      <div className="skills__content">
        <h2 className="skills__title">
          <span className="skills__title-comment">// </span>Skills
        </h2>

        <div className="skills__workspace">
          {/* Left: table explorer */}
          <div className="skills__explorer">
            <div className="skills__explorer-header">
              <span className="skills__explorer-icon">⊞</span>
              Tables
            </div>
            <ul className="skills__tables">
              {tables.map((table) => (
                <li
                  key={table.name}
                  className={`skills__table-item ${currentQuery.includes(table.name) ? 'active' : ''}`}
                  onClick={() => handleTableClick(table)}
                >
                  <span className="skills__table-icon">⊟</span>
                  {table.name}
                  <span className="skills__table-rows">{table.rows.length}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: console */}
          <div className="skills__console">
            {/* Query editor */}
            <div className="skills__editor">
              <div className="skills__editor-header">
                <span>Query Editor</span>
                <button className="skills__run-btn" onClick={handleRun} disabled={isRunning}>
                  {isRunning ? '⟳ Running...' : '▶ Run'}
                </button>
              </div>
              <textarea
                className="skills__textarea"
                value={currentQuery}
                onChange={(e) => setCurrentQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="-- Click a table or write your SQL here&#10;-- Press Ctrl+Enter to execute"
                spellCheck={false}
              />
            </div>

            {/* Results */}
            <div className="skills__results">
              <div className="skills__results-header">
                {result && !result.error && (
                  <span className="skills__results-count">
                    {result.rows.length} row{result.rows.length > 1 ? 's' : ''} returned
                  </span>
                )}
                {isRunning && <span className="skills__results-loading">Executing...</span>}
              </div>

              {result && result.error && (
                <div className="skills__results-error">{result.error}</div>
              )}

              {result && !result.error && (
                <div className="skills__results-table-wrapper">
                  <table className="skills__results-table">
                    <thead>
                      <tr>
                        {result.columns.map((col) => (
                          <th key={col}>{col}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {result.rows.map((row, i) => (
                        <tr key={i}>
                          {row.map((cell, j) => (
                            <td key={j}>{cell}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {!result && !isRunning && (
                <div className="skills__results-empty">
                  Click a table to explore skills
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
