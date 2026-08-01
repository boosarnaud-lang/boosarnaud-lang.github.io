import './Hero.css';

export default function Hero() {
  return (
    <section id="hero" className="hero">
      <div className="hero__shape hero__shape--1" />
      <div className="hero__shape hero__shape--2" />
      <div className="hero__shape hero__shape--3" />
      <div className="hero__shape hero__shape--4" />
      <div className="hero__shape hero__shape--5" />

      <div className="hero__content">
        <h1 className="hero__name">Arnaud Boos</h1>
        <p className="hero__subtitle">Full Stack Engineer &amp; Data Manager</p>
        <p className="hero__meta">14+ years experience · Schiltigheim, France</p>

        <div className="hero__links">
          <a href="mailto:boosarnaud@gmail.com" className="hero__link">
            Email
          </a>
          <a
            href="https://www.linkedin.com/in/arnaud-boos-28a3a67b/"
            target="_blank"
            rel="noopener noreferrer"
            className="hero__link"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/boosarnaud-lang"
            target="_blank"
            rel="noopener noreferrer"
            className="hero__link"
          >
            GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
