import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text3D, Center } from '@react-three/drei'
import * as THREE from 'three'

interface FloatingText3DProps {
  children: string
  position?: THREE.Vector3Tuple
  size?: number
  color?: string
  floatSpeed?: number
  floatAmount?: number
  side?: 'left' | 'right'
}

export function FloatingText3D({
  children,
  position = [0, 0, 0],
  size = 0.5,
  color = 'white',
  floatSpeed = 1,
  floatAmount = 0.2,
  side = 'left',
}: FloatingText3DProps) {
  const ref = useRef<THREE.Group>(null!)

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    ref.current.position.y = position[1] + Math.sin(t * floatSpeed) * floatAmount
    ref.current.position.x = position[0] + Math.sin(t * floatSpeed * 0.5) * 0.1
  })

  return (
    <group ref={ref} position={position}>
      <Center>
        <Text3D
          font="/fonts/helvetiker_bold.typeface.json"
          size={size}
          height={0.1}
          bevelEnabled
          bevelSize={0.02}
          bevelThickness={0.05}
        >
          {children}
          <meshStandardMaterial color={color} />
        </Text3D>
      </Center>
    </group>
  )
}
