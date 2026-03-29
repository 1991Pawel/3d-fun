import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF, Center } from '@react-three/drei'
import * as THREE from 'three'

export function Satelite(props: JSX.IntrinsicElements['group']) {
  const ref = useRef<THREE.Group>(null!)
  const { scene } = useGLTF('/models/satelite.glb')

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime
    ref.current.rotation.y += delta * 0.08
    ref.current.rotation.x = Math.sin(t * 0.3) * 0.15
    ref.current.rotation.z = Math.cos(t * 0.2) * 0.1
  })

  return (
    <group ref={ref} {...props}>
      <pointLight intensity={1} distance={20} />
      <Center>
        <primitive object={scene} />
      </Center>
    </group>
  )
}

useGLTF.preload('/models/satelite.glb')
