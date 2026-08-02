import './Projects.css';
import { projects } from '../data/portfolio.js';

export default function Projects() {
  return (
    <section id="projects" className="projects-section">
      <div className="projects-blob projects-blob--1"></div>
      <div className="projects-blob projects-blob--2"></div>
      <div className="projects-blob projects-blob--3"></div>

      <h2 className="projects-title">Projects</h2>

      <div className="projects-grid">
        {projects.map((project) => (
          <div key={project.name} className="projects-card">
            <div className="projects-card__header">
              <span className="projects-card__emoji">📋</span>
              <h3 className="projects-card__name">{project.name}</h3>
            </div>
            <p className="projects-card__desc">
              {project.description}
            </p>
            <div className="projects-card__tech">
              {project.tech.map((t) => <span key={t}>{t}</span>)}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
