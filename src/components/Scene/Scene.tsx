import { Canvas } from '@react-three/fiber'
import { useEffect } from 'react'
import { Spaceship } from '../Spaceship/Spaceship'
import { MovingStars } from '../MovingStars/MovingStars'
import { scrollY, scrollDirection } from '../../store/scroll'



let scrollTimeout: ReturnType<typeof setTimeout>

export function Scene() {

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      scrollDirection.current = e.deltaY > 0 ? 'down' : 'up'
      scrollY.current += e.deltaY * 0.01

    
      clearTimeout(scrollTimeout)
      scrollTimeout = setTimeout(() => {
        scrollDirection.current = 'none'
      }, 150)
    }

    window.addEventListener('wheel', handleWheel)
    return () => window.removeEventListener('wheel', handleWheel)
  }, [])

  return (
    <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
      <ambientLight intensity={5} />
    
      <directionalLight position={[5, 1, -5]} intensity={12} />
       
  
      <Spaceship rotation={[Math.PI / 2, Math.PI / 2, 0]} scale={0.06} />
      <MovingStars />
    </Canvas>
  )
}
