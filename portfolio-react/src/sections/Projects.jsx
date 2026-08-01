import './Projects.css';

export default function Projects() {
  return (
    <section id="projects" className="projects-section">
      <div className="projects-blob projects-blob--1"></div>
      <div className="projects-blob projects-blob--2"></div>
      <div className="projects-blob projects-blob--3"></div>

      <h2 className="projects-title">Projects</h2>

      <div className="projects-grid">
        <div className="projects-card">
          <div className="projects-card__header">
            <span className="projects-card__emoji">📋</span>
            <h3 className="projects-card__name">Krate</h3>
          </div>
          <p className="projects-card__desc">
            Personal project manager with Kanban boards, task tracking, and git integration.
          </p>
          <div className="projects-card__tech">
            <span>React</span>
            <span>TypeScript</span>
            <span>Express</span>
            <span>Docker</span>
          </div>
        </div>
      </div>
    </section>
  );
}
