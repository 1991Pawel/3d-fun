import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { scrollY } from '../../store/scroll'

interface WorldProps {
  children: React.ReactNode
  position?: THREE.Vector3Tuple
}

export function World({ children, position = [0, 0, 0] }: WorldProps) {
  const ref = useRef<THREE.Group>(null!)

  useFrame(() => {
    ref.current.position.y = THREE.MathUtils.lerp(
      ref.current.position.y,
      position[1] + scrollY.current,
      0.05
    )
  })

  return <group ref={ref} position={position}>{children}</group>
}
