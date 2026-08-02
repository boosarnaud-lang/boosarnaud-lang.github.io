import { useState, useEffect } from 'react';
import './GetToKnowMe.css';

// Daily schedules
const weekdaySchedule = [
  { start: 0, end: 7.5, label: 'Sleeping', icon: '😴' },
  { start: 7.5, end: 8, label: 'Wake up', icon: '☀️' },
  { start: 8, end: 9, label: 'Dog walk', icon: '🐕' },
  { start: 9, end: 12, label: 'Work — coding & data', icon: '💻' },
  { start: 12, end: 12.5, label: 'Lunch', icon: '🍽️' },
  { start: 12.5, end: 18, label: 'Work — deep focus', icon: '⚡' },
  { start: 18, end: 22, label: 'Family, sport, reading', icon: '🏡' },
  { start: 22, end: 24, label: 'Geeking', icon: '🎮' },
];

const weekendSchedule = [
  { start: 0, end: 7.5, label: 'Sleeping', icon: '😴' },
  { start: 7.5, end: 8, label: 'Wake up', icon: '☀️' },
  { start: 8, end: 9, label: 'Dog walk', icon: '🐕' },
  { start: 9, end: 24, label: 'Charging batteries', icon: '🔋' },
];

function getSchedule() {
  const day = new Date().getDay();
  return (day === 0 || day === 6) ? weekendSchedule : weekdaySchedule;
}

// Fun facts
const facts = [
  { icon: '🍫', text: 'Ice chocolate in summer, hot chocolate in winter' },
  { icon: '🦉', text: 'Night owl — best ideas after 22h' },
  { icon: '🐕', text: 'Golden Retriever dad (born June 2025)' },
  { icon: '🎮', text: 'Gamer — after hours ritual' },
  { icon: '⚽', text: 'Football, cycling, padel' },
  { icon: '🎸', text: 'Music = rock mostly, listens to everything' },
  { icon: '📚', text: 'Dune (book 4), WoT ✓, HP ✓, Witcher ✓' },
  { icon: '🖥️', text: 'Kiro / Cursor / VS Code on Linux (WSL)' },
];

// Ask me about
const topics = [
  'Data lifecycle',
  'Gaming',
  'Future projects',
  'Life in general',
  'Psychology',
  'Dogs',
  'Books',
  'Sports',
];

function getCurrentHour() {
  const now = new Date();
  return now.getHours() + now.getMinutes() / 60;
}

function getLocalTime() {
  return new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Paris' });
}

export default function GetToKnowMe() {
  const [currentHour, setCurrentHour] = useState(getCurrentHour());
  const [localTime, setLocalTime] = useState(getLocalTime());
  const schedule = getSchedule();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHour(getCurrentHour());
      setLocalTime(getLocalTime());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  // Find current activity
  const currentActivity = schedule.find((s) => currentHour >= s.start && currentHour < s.end);
  const isWeekend = new Date().getDay() === 0 || new Date().getDay() === 6;

  return (
    <section id="about" className="about">
      <div className="about__content">
        <h2 className="about__title">Get to Know Me</h2>

        <div className="about__grid">
          {/* Live status card */}
          <div className="about__card about__card--live">
            <div className="about__card-header">
              <span className="about__live-dot"></span>
              Live — {localTime} (Schiltigheim)
            </div>
            <div className="about__current-activity">
              {currentActivity ? (
                <>
                  <span className="about__activity-icon">{currentActivity.icon}</span>
                  <span className="about__activity-label">{currentActivity.label}</span>
                </>
              ) : (
                <>
                  <span className="about__activity-icon">😴</span>
                  <span className="about__activity-label">Sleeping</span>
                </>
              )}
            </div>
          </div>

          {/* Day timeline */}
          <div className="about__card about__card--timeline">
            <div className="about__card-header">📅 {isWeekend ? 'Weekend mode' : 'A typical weekday'}</div>
            <div className="about__timeline">
              {schedule.map((s) => {
                const width = ((s.end - s.start) / 24) * 100;
                const left = (s.start / 24) * 100;
                const isCurrent = currentHour >= s.start && currentHour < s.end;
                return (
                  <div
                    key={s.label}
                    className={`about__timeline-block ${isCurrent ? 'active' : ''}`}
                    style={{ width: `${width}%`, left: `${left}%` }}
                    title={`${s.label} (${Math.floor(s.start)}h–${Math.floor(s.end)}h)`}
                  >
                    <span className="about__timeline-icon">{s.icon}</span>
                  </div>
                );
              })}
              {/* Current time indicator */}
              <div
                className="about__timeline-now"
                style={{ left: `${(currentHour / 24) * 100}%` }}
              />
            </div>
            <div className="about__timeline-labels">
              <span>0h</span><span>6h</span><span>12h</span><span>18h</span><span>24h</span>
            </div>
          </div>

          {/* Fun facts */}
          <div className="about__card about__card--facts">
            <div className="about__card-header">⚡ Quick facts</div>
            <div className="about__facts">
              {facts.map((f) => (
                <div key={f.text} className="about__fact">
                  <span className="about__fact-icon">{f.icon}</span>
                  <span className="about__fact-text">{f.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Ask me about */}
          <div className="about__card about__card--topics">
            <div className="about__card-header">💬 Ask me about</div>
            <div className="about__topics">
              {topics.map((t) => (
                <span key={t} className="about__topic">{t}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
