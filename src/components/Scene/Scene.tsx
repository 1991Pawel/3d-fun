import { Canvas } from '@react-three/fiber'
import { useEffect } from 'react'
import { Spaceship } from '../Spaceship/Spaceship'
import { MovingStars } from '../MovingStars/MovingStars'
import { Mars } from '../Mars/Mars'
import { Space } from '../Space/Space'
import { World } from '../World/World'
import { Satelite } from '../Satelite/Satelite'
import { Deimos } from '../Deimos/Deimos'
import { scrollY, scrollDirection } from '../../store/scroll'


let scrollTimeout: ReturnType<typeof setTimeout>

export function Scene() {

  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY
      const prev = scrollY.current

      scrollDirection.current = current > prev ? 'down' : 'up'
      scrollY.current = current * 0.005

      clearTimeout(scrollTimeout)
      scrollTimeout = setTimeout(() => {
        scrollDirection.current = 'none'
      }, 150)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
      <ambientLight intensity={4} />

   

      <World>
        <Mars position={[7, 4, 2]} scale={1} />
        <Deimos position={[-2.5, -4.65, -2]} scale={0.0003} />
        <Deimos position={[-7.5, -6.65, -2]} scale={0.0002} />
        <Deimos position={[3.5, -8.65, -3]} scale={0.0001} />
        <Deimos position={[1.2, 0.1, -1.5]} scale={0.0002} />
        <Deimos position={[-4.0, -2.2, 2.0]} scale={0.0004} />
        <Deimos position={[5.5, -5.0, 1.0]} scale={0.0001} />
        <Deimos position={[-1.0, -7.5, 0.5]} scale={0.0003} />
        <Deimos position={[2.8, -0.5, -3.0]} scale={0.0002} />
        <Deimos position={[-6.0, -1.5, -1.0]} scale={0.0001} />
        <Deimos position={[0.5, -3.8, 3.5]} scale={0.0004} />
        <Deimos position={[-3.5, -5.8, 1.5]} scale={0.0002} />
        <Deimos position={[4.2, -2.7, -2.5]} scale={0.0003} />
        <Deimos position={[-5.0, 0.5, 0.8]} scale={0.0001} />
        <Satelite position={[-6, -2.5, 0]} scale={0.010} />
      </World>
         <Spaceship rotation={[Math.PI / 2, Math.PI / 2, 0]} scale={0.06} />

      <MovingStars />
    </Canvas>
  )
}
