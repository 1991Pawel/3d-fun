import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Stars } from '@react-three/drei'
import { Group } from 'three'
import * as THREE from 'three'
import { scrollDirection } from '../../store/scroll'

export function MovingStars() {
  const ref = useRef<Group>(null!)
  const speed = useRef(0.02)

  useFrame((_, delta) => {
    const dir = scrollDirection.current
    const target = dir === 'down' ? 0.5 : dir === 'up' ? -0.5 : 0.02
    speed.current = THREE.MathUtils.lerp(speed.current, target, 0.03)

    ref.current.rotation.x += delta * speed.current
  })

  return (
    <group ref={ref}>
      <Stars radius={100} depth={50} count={10000} factor={window.innerWidth < 768 ? 8 : 4} fade speed={5} />
    </group>
  )
}
