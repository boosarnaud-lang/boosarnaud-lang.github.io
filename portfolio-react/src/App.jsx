import Nav from './components/Nav'
import Hero from './sections/Hero'
import Experience from './sections/Experience'
import Skills from './sections/Skills'
import DomainExpertise from './sections/DomainExpertise'
import GetToKnowMe from './sections/GetToKnowMe'
import Projects from './sections/Projects'
import Education from './sections/Education'
import { LanguageProvider, useLang } from './context/LanguageContext'
import { ThemeProvider } from './context/ThemeContext'
import './App.css'

function AppContent() {
  const { t } = useLang();
  
  return (
    <>
      <div className="wip-banner">
        {t.wip}
      </div>
      <Nav />
      <Hero />
      <Experience />
      <Skills />
      <DomainExpertise />
      <GetToKnowMe />
      <Projects />
      <Education />
      <footer className="footer">{t.footer}</footer>
    </>
  )
}

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AppContent />
      </LanguageProvider>
    </ThemeProvider>
  )
}

export default App
