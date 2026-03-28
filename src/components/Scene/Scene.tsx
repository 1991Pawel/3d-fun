import { Canvas } from '@react-three/fiber'
import { Spaceship } from '../Spaceship/Spaceship'
import { MovingStars } from '../MovingStars/MovingStars'

export function Scene() {
  return (
    <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
      <ambientLight intensity={5} />
      <directionalLight position={[5, 5, 5]} intensity={2} />
      <Spaceship rotation={[Math.PI / 2, -Math.PI / 2, 0]} scale={0.05} />
      <MovingStars />
    </Canvas>
  )
}
