import { useState, useEffect } from 'react'
import { useLang } from '../context/LanguageContext'
import './Nav.css'

const sections = ['hero', 'experience', 'skills', 'domain', 'about', 'projects', 'education']

function Nav() {
  const { t, lang, toggleLang } = useLang();
  const [activeSection, setActiveSection] = useState('hero')
  const [menuOpen, setMenuOpen] = useState(false)

  const navLinks = [
    { id: 'hero', label: t.nav.home },
    { id: 'experience', label: t.nav.experience },
    { id: 'skills', label: t.nav.skills },
    { id: 'domain', label: t.nav.expertise },
    { id: 'about', label: t.nav.about },
    { id: 'projects', label: t.nav.projects },
    { id: 'education', label: t.nav.education },
  ]

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  useEffect(() => {
    const observers = []

    sections.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id)
          }
        },
        { threshold: 0.4 }
      )

      observer.observe(el)
      observers.push(observer)
    })

    return () => observers.forEach((obs) => obs.disconnect())
  }, [])

  const handleClick = (e, id) => {
    e.preventDefault()
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
    setMenuOpen(false)
  }

  return (
    <nav className={`nav ${menuOpen ? 'nav--open' : ''}`} data-section={activeSection}>
      <div className="nav-inner">
        <a href="#hero" className="nav-logo" onClick={(e) => handleClick(e, 'hero')}>
          AB
        </a>

        <button
          className="nav-lang"
          onClick={toggleLang}
          aria-label="Toggle language"
        >
          {lang === 'en' ? 'FR' : 'EN'}
        </button>

        <button
          className="nav-burger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span className="nav-burger__line"></span>
          <span className="nav-burger__line"></span>
          <span className="nav-burger__line"></span>
        </button>

        <ul className={`nav-links ${menuOpen ? 'nav-links--open' : ''}`}>
          {navLinks.map(({ id, label }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                className={`nav-link ${activeSection === id ? 'active' : ''}`}
                onClick={(e) => handleClick(e, id)}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}

export default Nav
