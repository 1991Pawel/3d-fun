import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF, Center } from '@react-three/drei'
import * as THREE from 'three'

export function Space(props: JSX.IntrinsicElements['group']) {
  const ref = useRef<THREE.Group>(null!)
  const { scene } = useGLTF('/models/space.glb')

  useFrame((_, delta) => {
    ref.current.rotation.y += delta * 0.03
  })

  return (
    <group ref={ref} {...props}>
      <Center>
        <primitive object={scene} />
      </Center>
    </group>
  )
}

useGLTF.preload('/models/space.glb')
