import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'

export function Mars(props: JSX.IntrinsicElements['group']) {
  const ref = useRef<THREE.Group>(null!)
  const { scene } = useGLTF('/models/mars.glb')

  useFrame(() => {
    ref.current.rotation.y += 0.0002
    ref.current.rotation.x = Math.sin(Date.now() * 0.0002) * 0.01
  })



  return (
    <group ref={ref} {...props}>
      <pointLight color={"#ff4400"} position={[2, 1, 3]} intensity={20} distance={100} decay={1} />
      <primitive object={scene} />
    </group>
  )
}

useGLTF.preload('/models/mars.glb')
