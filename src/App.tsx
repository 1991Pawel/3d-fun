import { useEffect } from 'react'
import Lenis from 'lenis'
import { Scene } from './components/Scene/Scene'
import './styles/global.scss'

export default function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    })

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => lenis.destroy()
  }, [])

  return (
    <main className="main-wrapper">
      <div className="canvas-wrapper">
        <Scene />
      </div>

      <div className="section section1">
        <div className="section-content">
          <h1>Paweł Leśnik</h1>
          <p>Front-end Developer</p>
        </div>
      </div>

      <div className="section section2">
        <div className="section-content section-content--right">
          <h2>About Me</h2>
          <p>
            Jestem frontend developerem z pięcioletnim doświadczeniem, głównie w React.
            Codziennie staram się uczyć czegoś nowego, ostatnio mocniej wchodzę w 3D i WebGL.
          </p>
          <ul className="tech-list">
            <li>React / Next.js</li>
            <li>TypeScript</li>
            <li>Three.js / R3F</li>
            <li>TanStack Query</li>
            <li>Redux</li>
            <li>GraphQL</li>
            <li>Tailwind CSS</li>
          </ul>
        </div>
      </div>

      <div className="section section3">
        <div className="section-content">
          <h2>Contact</h2>
          <p>Masz pytanie albo chcesz pogadać o kodzie? Tu mnie znajdziesz.</p>
          <ul className="contact-list">
            <li>
              <a href="mailto:lesnik.pawel1991@gmail.com">lesnik.pawel1991@gmail.com</a>
            </li>
            <li>
              <a href="https://www.linkedin.com/in/pawe%C5%82-le%C5%9Bnik-95081b210/" target="_blank" rel="noreferrer">LinkedIn</a>
            </li>
            <li>
              <a href="https://github.com/1991Pawel" target="_blank" rel="noreferrer">GitHub</a>
            </li>
          </ul>
        </div>
      </div>
    </main>
  )
}
