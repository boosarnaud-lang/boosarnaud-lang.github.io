import './Experience.css';
import { experience } from '../data/portfolio.js';

export default function Experience() {
  return (
    <section id="experience" className="experience">
      <div className="experience__blob experience__blob--1" />
      <div className="experience__blob experience__blob--2" />
      <div className="experience__blob experience__blob--3" />

      <div className="experience__content">
        <h2 className="experience__title">Experience</h2>

        <div className="experience__timeline">
          {experience.map((item, index) => (
            <div key={index} className="experience__item">
              <div className="experience__dot" />
              <div className="experience__details">
                <h3 className="experience__role">{item.title}</h3>
                <p className="experience__company">
                  {item.company} · {item.period}
                </p>
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
