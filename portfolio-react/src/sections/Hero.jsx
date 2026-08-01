import { useState, useEffect } from 'react';
import './Hero.css';
import { generateCV } from '../utils/generateCV';

// Dynamic calculations
const BIRTH_YEAR = 1992;
const BIRTH_MONTH = 1; // TODO: update with actual birth month
const CAREER_START = new Date(2012, 6); // July 2012

function getAge() {
  const today = new Date();
  let age = today.getFullYear() - BIRTH_YEAR;
  const monthDiff = today.getMonth() + 1 - BIRTH_MONTH;
  if (monthDiff < 0) age--;
  return age;
}

function getYearsExperience() {
  const today = new Date();
  const diff = today - CAREER_START;
  return Math.floor(diff / (365.25 * 24 * 60 * 60 * 1000));
}

const roles = [
  'Full Stack Engineer',
  'Automotive Data Expert',
  'AI Agent Builder',
  'Data Manager',
];

export default function Hero() {
  const age = getAge();
  const yearsExp = getYearsExperience();
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = roles[roleIndex];
    let timeout;

    if (!isDeleting && displayed.length < currentRole.length) {
      timeout = setTimeout(() => setDisplayed(currentRole.slice(0, displayed.length + 1)), 80);
    } else if (!isDeleting && displayed.length === currentRole.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40);
    } else if (isDeleting && displayed.length === 0) {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }

    return () => clearTimeout(timeout);
  }, [displayed, isDeleting, roleIndex]);

  return (
    <section id="hero" className="hero">
      <div className="hero__shape hero__shape--1" />
      <div className="hero__shape hero__shape--2" />
      <div className="hero__shape hero__shape--3" />
      <div className="hero__shape hero__shape--4" />
      <div className="hero__shape hero__shape--5" />

      <div className="hero__content">
        {/* Photo placeholder */}
        <div className="hero__avatar">
          <span className="hero__avatar-initials">AB</span>
        </div>

        <h1 className="hero__name">Arnaud Boos</h1>

        {/* Typing animation */}
        <p className="hero__role">
          <span className="hero__role-text">{displayed}</span>
          <span className="hero__cursor">|</span>
        </p>

        <p className="hero__meta">
          {age} yo · {yearsExp}+ years at <strong>Catdata</strong> (TecAlliance group) · Schiltigheim, France
        </p>

        {/* Tech stack icons */}
        <div className="hero__stack">
          <span className="hero__stack-item" title="TypeScript">TS</span>
          <span className="hero__stack-item" title="Go">Go</span>
          <span className="hero__stack-item" title="PHP">PHP</span>
          <span className="hero__stack-item" title="React">⚛</span>
          <span className="hero__stack-item" title="Docker">🐳</span>
          <span className="hero__stack-item" title="Node.js">⬢</span>
        </div>

        <div className="hero__links">
          <a href="mailto:boosarnaud@gmail.com" className="hero__link">
            ✉ Email
          </a>
          <a
            href="https://www.linkedin.com/in/arnaud-boos-28a3a67b/"
            target="_blank"
            rel="noopener noreferrer"
            className="hero__link"
          >
            ⌘ LinkedIn
          </a>
          <a
            href="https://github.com/boosarnaud-lang"
            target="_blank"
            rel="noopener noreferrer"
            className="hero__link"
          >
            ⟩ GitHub
          </a>
          <button onClick={generateCV} className="hero__link hero__link--cv">
            ↓ Download CV
          </button>
        </div>
      </div>
    </section>
  );
}
