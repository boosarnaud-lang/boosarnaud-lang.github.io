import './Education.css';

export default function Education() {
  return (
    <section id="education" className="education-section">
      {/* Decorative botanical shapes */}
      <div className="edu-leaf edu-leaf--1"></div>
      <div className="edu-leaf edu-leaf--2"></div>
      <div className="edu-leaf edu-leaf--3"></div>
      <div className="edu-leaf edu-leaf--4"></div>
      <div className="edu-branch edu-branch--1"></div>
      <div className="edu-branch edu-branch--2"></div>

      <h2 className="education-title">Education</h2>

      <div className="education-timeline">
        <div className="education-card">
          <div className="education-card__accent"></div>
          <div className="education-card__content">
            <h3 className="education-card__degree">DUT Informatique</h3>
            <p className="education-card__school">IUT Robert Schuman</p>
            <span className="education-card__year">2010 – 2012</span>
          </div>
        </div>

        <div className="education-card">
          <div className="education-card__accent"></div>
          <div className="education-card__content">
            <h3 className="education-card__degree">Baccalauréat Scientifique</h3>
            <p className="education-card__school">Lycée Leclerc</p>
            <span className="education-card__year">2007 – 2010</span>
          </div>
        </div>
      </div>
    </section>
  );
}
