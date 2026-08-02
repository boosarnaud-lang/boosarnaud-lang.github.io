import { useLang } from '../context/LanguageContext';
import './Experience.css';
import { getExperience } from '../data/portfolio.js';

function getDuration(startDate, endDate, current) {
  const end = current ? new Date() : endDate;
  const years = Math.floor((end - startDate) / (365.25 * 24 * 60 * 60 * 1000));
  return years > 0 ? `${years}+` : '< 1';
}

export default function Experience() {
  const { lang, t } = useLang();
  const experience = getExperience(lang);
  
  return (
    <section id="experience" className="experience">
      <div className="experience__blob experience__blob--1" />
      <div className="experience__blob experience__blob--2" />
      <div className="experience__blob experience__blob--3" />

      <div className="experience__content">
        <h2 className="experience__title">{t.experience.title}</h2>

        <div className="experience__timeline">
          {experience.map((item, index) => (
            <div key={index} className={`experience__item ${item.highlight ? 'experience__item--highlight' : ''}`}>
              <div className={`experience__dot ${item.current ? 'experience__dot--active' : ''}`} />
              <div className="experience__details">
                <div className="experience__header">
                  <h3 className="experience__role">{item.title}</h3>
                  {item.current && <span className="experience__badge">{t.experience.current}</span>}
                </div>
                <p className="experience__company">
                  {item.company} · {item.period}
                  <span className="experience__duration"> ({getDuration(item.startDate, item.endDate, item.current)} {lang === 'fr' ? 'ans' : 'years'})</span>
                </p>

                {item.achievements && item.achievements.length > 0 && (
                  <ul className="experience__achievements">
                    {item.achievements.map((a, i) => (
                      <li key={i}>{a}</li>
                    ))}
                  </ul>
                )}

                {item.skills.length > 0 && (
                  <div className="experience__skills">
                    {item.skills.map((skill) => (
                      <span key={skill} className="experience__skill">
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
