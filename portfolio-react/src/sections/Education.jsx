import { useLang } from '../context/LanguageContext';
import './Education.css';
import { getEducation } from '../data/portfolio.js';

export default function Education() {
  const { lang, t } = useLang();
  const education = getEducation(lang);
  
  return (
    <section id="education" className="education-section reveal">
      {/* Decorative botanical shapes */}
      <div className="edu-leaf edu-leaf--1"></div>
      <div className="edu-leaf edu-leaf--2"></div>
      <div className="edu-leaf edu-leaf--3"></div>
      <div className="edu-leaf edu-leaf--4"></div>
      <div className="edu-branch edu-branch--1"></div>
      <div className="edu-branch edu-branch--2"></div>

      <h2 className="education-title">{t.education.title}</h2>

      <div className="education-timeline">
        {education.map((edu) => (
          <div key={edu.degree} className="education-card">
            <div className="education-card__accent"></div>
            <div className="education-card__content">
              <h3 className="education-card__degree">{edu.degree}</h3>
              <p className="education-card__school">{edu.school}</p>
              <span className="education-card__year">{edu.period}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
