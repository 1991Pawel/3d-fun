import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF, Center } from '@react-three/drei'
import * as THREE from 'three'

export function Satelite(props: JSX.IntrinsicElements['group']) {
  const ref = useRef<THREE.Group>(null!)
  const { scene } = useGLTF('/models/satelite.glb')

  useFrame((_, delta) => {
    ref.current.rotation.y += delta * 0.1
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
