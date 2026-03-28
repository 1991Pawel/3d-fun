import { Canvas } from '@react-three/fiber'
import { useEffect } from 'react'
import { Text as DreiText } from '@react-three/drei'
import { Spaceship } from '../Spaceship/Spaceship'
import { MovingStars } from '../MovingStars/MovingStars'
import { Mars } from '../Mars/Mars'
import { World } from '../World/World'
import { scrollY, scrollDirection } from '../../store/scroll'

let scrollTimeout: ReturnType<typeof setTimeout>
let touchStartY = 0

export function Scene() {

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      scrollDirection.current = e.deltaY > 0 ? 'down' : 'up'
      scrollY.current = Math.max(0, Math.min(20, scrollY.current + e.deltaY * 0.003))

      clearTimeout(scrollTimeout)
      scrollTimeout = setTimeout(() => {
        scrollDirection.current = 'none'
      }, 150)
    }

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY
    }

    const handleTouchMove = (e: TouchEvent) => {
      const deltaY = touchStartY - e.touches[0].clientY
      touchStartY = e.touches[0].clientY

      scrollDirection.current = deltaY > 0 ? 'down' : 'up'
      scrollY.current = Math.max(0, Math.min(20, scrollY.current + deltaY * 0.01))

      clearTimeout(scrollTimeout)
      scrollTimeout = setTimeout(() => {
        scrollDirection.current = 'none'
      }, 150)
    }

    window.addEventListener('wheel', handleWheel)
    window.addEventListener('touchstart', handleTouchStart)
    window.addEventListener('touchmove', handleTouchMove)

    return () => {
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchmove', handleTouchMove)
    }
  }, [])

  return (
    <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
      <ambientLight intensity={3} />

      <Spaceship rotation={[Math.PI / 2, Math.PI / 2, 0]} scale={0.06} />

      <World>
        <DreiText position={[-3, -3, -1]} fontSize={1} color="white" anchorX="left">
          Pawel 
        </DreiText>
        <DreiText position={[-3, -4.2, -1]} fontSize={0.4} color="#aaaaaa" anchorX="left">
          Front-end Developer
        </DreiText>


        <DreiText position={[-3, -22, 0]} fontSize={0.8} color="white" anchorX="left">
          Contact
        </DreiText>

        <Mars position={[7, 4, 2]} scale={1} />
      </World>

      <MovingStars />
    </Canvas>
  )
}
