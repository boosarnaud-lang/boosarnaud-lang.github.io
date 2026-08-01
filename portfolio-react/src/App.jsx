import Nav from './components/Nav'
import Hero from './sections/Hero'
import Experience from './sections/Experience'
import Skills from './sections/Skills'
import DomainExpertise from './sections/DomainExpertise'
import Projects from './sections/Projects'
import Education from './sections/Education'
import './App.css'

function App() {
  return (
    <>
      <Nav />
      <Hero />
      <Experience />
      <Skills />
      <DomainExpertise />
      <Projects />
      <Education />
      <footer className="footer">&copy; 2026 Arnaud Boos</footer>
    </>
  )
}

export default App
