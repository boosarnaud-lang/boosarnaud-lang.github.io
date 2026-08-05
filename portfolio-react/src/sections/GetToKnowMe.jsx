import { useState, useEffect } from 'react';
import { useLang } from '../context/LanguageContext';
import './GetToKnowMe.css';

// Daily schedules
function getWeekdaySchedule(t) {
  return [
    { start: 0, end: 7.5, label: t.about.sleeping, icon: '😴' },
    { start: 7.5, end: 8, label: t.about.schedule.wakeUp, icon: '☀️' },
    { start: 8, end: 9, label: t.about.schedule.dogWalk, icon: '🐕' },
    { start: 9, end: 12, label: t.about.schedule.workCoding, icon: '💻' },
    { start: 12, end: 12.5, label: t.about.schedule.lunch, icon: '🍽️' },
    { start: 12.5, end: 18, label: t.about.schedule.workDeep, icon: '⚡' },
    { start: 18, end: 22, label: t.about.schedule.family, icon: '🏡' },
    { start: 22, end: 24, label: t.about.schedule.geeking, icon: '🎮' },
  ];
}

function getWeekendSchedule(t) {
  return [
    { start: 0, end: 7.5, label: t.about.sleeping, icon: '😴' },
    { start: 7.5, end: 8, label: t.about.schedule.wakeUp, icon: '☀️' },
    { start: 8, end: 9, label: t.about.schedule.dogWalk, icon: '🐕' },
    { start: 9, end: 24, label: t.about.schedule.charging, icon: '🔋' },
  ];
}

function getSchedule(t) {
  const day = new Date().getDay();
  return (day === 0 || day === 6) ? getWeekendSchedule(t) : getWeekdaySchedule(t);
}

// Dynamic dates
const DOG_BIRTH = new Date(2025, 5, 17); // June 17, 2025
const MARRIAGE_DATE = new Date(2022, 1, 12); // February 12, 2022

function getDogAge() {
  const now = new Date();
  const months = (now.getFullYear() - DOG_BIRTH.getFullYear()) * 12 + (now.getMonth() - DOG_BIRTH.getMonth());
  if (months < 12) return `${months} months old`;
  const years = Math.floor(months / 12);
  const rem = months % 12;
  return rem > 0 ? `${years}y ${rem}m old` : `${years}y old`;
}

function getMarriageDuration() {
  const now = new Date();
  const years = now.getFullYear() - MARRIAGE_DATE.getFullYear();
  const monthDiff = now.getMonth() - MARRIAGE_DATE.getMonth();
  const adjusted = monthDiff < 0 || (monthDiff === 0 && now.getDate() < MARRIAGE_DATE.getDate()) ? years - 1 : years;
  return `${adjusted}+ years`;
}

function getCurrentHour() {
  const now = new Date();
  return now.getHours() + now.getMinutes() / 60;
}

function getLocalTime() {
  return new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Paris' });
}

// Fun facts
function getFacts(t) {
  return [
    { icon: '💍', text: `${t.about.facts.married} (${getMarriageDuration()})` },
    { icon: '🐕', text: `${t.about.facts.dog} (${getDogAge()})` },
    { icon: '🍫', text: t.about.facts.chocolate },
    { icon: '🦉', text: t.about.facts.nightOwl },
    { icon: '🎮', text: t.about.facts.gamer },
    { icon: '⚽', text: t.about.facts.sports },
    { icon: '🎸', text: t.about.facts.music },
    { icon: '📚', text: t.about.facts.books },
    { icon: '🖥️', text: t.about.facts.editor },
  ];
}

export default function GetToKnowMe() {
  const { t } = useLang();
  const [currentHour, setCurrentHour] = useState(getCurrentHour());
  const [localTime, setLocalTime] = useState(getLocalTime());
  const schedule = getSchedule(t);
  const facts = getFacts(t);
  const topics = t.about.topics;

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
    <section id="about" className="about reveal">
      <div className="about__content">
        <h2 className="about__title">{t.about.title}</h2>

        <div className="about__grid">
          {/* Live status card */}
          <div className="about__card about__card--live">
            <div className="about__card-header">
              <span className="about__live-dot"></span>
              {t.about.live} — {localTime} (Schwindratzheim)
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
                  <span className="about__activity-label">{t.about.sleeping}</span>
                </>
              )}
            </div>
          </div>

          {/* Day timeline */}
          <div className="about__card about__card--timeline">
            <div className="about__card-header">📅 {isWeekend ? t.about.weekend : t.about.weekday}</div>
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
            <div className="about__card-header">{t.about.quickFacts}</div>
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
            <div className="about__card-header">{t.about.askMe}</div>
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
