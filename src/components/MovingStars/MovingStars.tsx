import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Stars } from '@react-three/drei'
import { Group } from 'three'
import { scrollDirection } from '../../store/scroll'

export function MovingStars() {
  const ref = useRef<Group>(null!)


  useFrame((_, delta) => {
    const dir = scrollDirection.current
    const speed = dir === 'down' ? 0.5 : dir === 'up' ? -0.5 : 0.02

    ref.current.rotation.x += delta * speed
  })

  return (
    <group ref={ref}>
      <Stars radius={100} depth={50} count={5000} factor={4} fade speed={2} />
    </group>
  )
}
