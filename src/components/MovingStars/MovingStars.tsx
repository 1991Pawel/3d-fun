import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Stars } from '@react-three/drei'
import { Group } from 'three'

export function MovingStars() {
  const ref = useRef<Group>(null!)

  useFrame((_, delta) => {
    ref.current.rotation.y += delta * 0.05
    ref.current.rotation.x += delta * 0.02
  })

  return (
    <group ref={ref}>
      <Stars radius={100} depth={50} count={5000} factor={4} fade speed={2} />
    </group>
  )
}
