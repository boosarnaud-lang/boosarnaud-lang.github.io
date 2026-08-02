import { useState, useEffect } from 'react';
import { useLang } from '../context/LanguageContext';
import './Skills.css';
import { getSkills } from '../data/portfolio.js';

const DUOLINGO_USERNAME = 'ArnaudBoos';

function buildStaticTables(lang) {
  const skills = getSkills(lang);

  function getTableName(query) {
    const match = query.match(/FROM\s+(\w+)/i);
    return match ? match[1] : 'unknown';
  }

  const spokenLang = {
    name: lang === 'fr' ? 'langues_parlees' : 'spoken_languages',
    query: lang === 'fr'
      ? `SELECT langue, niveau, details\nFROM langues_parlees\nORDER BY niveau DESC;`
      : `SELECT language, level, details\nFROM spoken_languages\nORDER BY level DESC;`,
    columns: lang === 'fr' ? ['langue', 'niveau', 'details'] : ['language', 'level', 'details'],
    rows: lang === 'fr'
      ? [['Français', 'natif', '—'], ['Anglais', 'courant', '—'], ['Japonais', 'en apprentissage', 'chargement...']]
      : [['French', 'native', '—'], ['English', 'fluent', '—'], ['Japanese', 'learning', 'loading...']],
  };

  const entries = ['languages', 'frameworks_tools', 'domain_expertise', 'other_skills'];
  const dataTables = entries.map((key) => ({
    name: getTableName(skills[key].query),
    query: skills[key].query,
    columns: skills[key].columns,
    rows: skills[key].rows,
  }));

  return [spokenLang, ...dataTables];
}

export default function Skills() {
  const { lang, t } = useLang();
  const [currentQuery, setCurrentQuery] = useState('');
  const [result, setResult] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [tables, setTables] = useState(() => buildStaticTables(lang));

  // Rebuild tables when language changes
  useEffect(() => {
    setTables(buildStaticTables(lang));
    setResult(null);
    setCurrentQuery('');
  }, [lang]);

  // Fetch Duolingo stats
  useEffect(() => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);
    const url = `https://corsproxy.io/?url=${encodeURIComponent(`https://www.duolingo.com/2017-06-30/users?username=${DUOLINGO_USERNAME}`)}`;

    fetch(url, { signal: controller.signal })
      .then((res) => res.json())
      .then((data) => {
        if (data.users && data.users[0]) {
          const user = data.users[0];
          const streak = user.streak || 0;
          const jaCourse = user.courses?.find((c) => c.learningLanguage === 'ja');
          const xp = jaCourse ? jaCourse.xp : user.totalXp;
          const details = `🔥 ${streak} day streak · ${xp.toLocaleString()} XP (via Duolingo)`;

          setTables((prev) =>
            prev.map((tbl) => {
              if (tbl.name === 'spoken_languages' || tbl.name === 'langues_parlees') {
                return {
                  ...tbl,
                  rows: tbl.rows.map((row) =>
                    (row[0] === 'Japanese' || row[0] === 'Japonais') ? [row[0], row[1], details] : row
                  ),
                };
              }
              return tbl;
            })
          );
        }
      })
      .catch(() => {
        setTables((prev) =>
          prev.map((tbl) => {
            if (tbl.name === 'spoken_languages' || tbl.name === 'langues_parlees') {
              return {
                ...tbl,
                rows: tbl.rows.map((row) =>
                  (row[0] === 'Japanese' || row[0] === 'Japonais') ? [row[0], row[1], 'Duolingo'] : row
                ),
              };
            }
            return tbl;
          })
        );
      })
      .finally(() => clearTimeout(timeoutId));
  }, [lang]);

  const runQuery = (query) => {
    setCurrentQuery(query);
    setIsRunning(true);
    setResult(null);

    // Simulate execution delay — use latest tables via setTables callback to read current state
    setTimeout(() => {
      setTables((currentTables) => {
        const table = currentTables.find((tbl) => query.includes(`FROM ${tbl.name}`));
        if (table) {
          setResult(table);
        } else {
          setResult({ error: `Table not found. Available: ${currentTables.map(tbl => tbl.name).join(', ')}` });
        }
        setIsRunning(false);
        return currentTables; // don't mutate
      });
    }, 600);
  };

  // Auto-run first query when tables change (mount + language switch)
  useEffect(() => {
    if (tables.length > 1) {
      runQuery(tables[1].query);
    }
  }, [lang]);

  // Sync result when tables update (e.g., Duolingo data arrives)
  useEffect(() => {
    if (result && !result.error && currentQuery) {
      const table = tables.find((t) => currentQuery.includes(`FROM ${t.name}`));
      if (table) setResult(table);
    }
  }, [tables]);

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
          <span className="skills__title-comment">// </span>{t.skills.title}
        </h2>

        <div className="skills__workspace">
          {/* Left: table explorer */}
          <div className="skills__explorer">
            <div className="skills__explorer-header">
              <span className="skills__explorer-icon">⊞</span>
              {t.skills.tables}
            </div>
            <ul className="skills__tables">
              {tables.map((table) => (
                <li
                  key={table.name}
                  className={`skills__table-item ${currentQuery.includes(`FROM ${table.name}`) ? 'active' : ''}`}
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
                <span>{t.skills.queryEditor}</span>
                <button className="skills__run-btn" onClick={handleRun} disabled={isRunning}>
                  {isRunning ? t.skills.running : t.skills.runBtn}
                </button>
              </div>
              <textarea
                className="skills__textarea"
                value={currentQuery}
                onChange={(e) => setCurrentQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={t.skills.placeholder}
                spellCheck={false}
              />
            </div>

            {/* Results */}
            <div className="skills__results">
              <div className="skills__results-header">
                {result && !result.error && (
                  <span className="skills__results-count">
                    {result.rows.length} {t.skills.rowsReturned}
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
                  {t.skills.clickToExplore}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
