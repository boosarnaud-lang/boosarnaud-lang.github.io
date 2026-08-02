import Nav from './components/Nav'
import Hero from './sections/Hero'
import Experience from './sections/Experience'
import Skills from './sections/Skills'
import DomainExpertise from './sections/DomainExpertise'
import GetToKnowMe from './sections/GetToKnowMe'
import Projects from './sections/Projects'
import Education from './sections/Education'
import './App.css'

function App() {
  return (
    <>
      <div className="wip-banner">
        🚧 This portfolio is a work in progress — crafted by Arnaud & AI
      </div>
      <Nav />
      <Hero />
      <Experience />
      <Skills />
      <DomainExpertise />
      <GetToKnowMe />
      <Projects />
      <Education />
      <footer className="footer">&copy; 2026 Arnaud Boos</footer>
    </>
  )
}

export default App
