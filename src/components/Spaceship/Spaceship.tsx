import { useGLTF } from '@react-three/drei'
import { GroupProps } from '@react-three/fiber'
import { Group } from 'three'
import { useRef } from 'react'

type GLTFResult = ReturnType<typeof useGLTF>

interface SpaceshipProps extends GroupProps {}

export function Spaceship(props: SpaceshipProps) {
  const groupRef = useRef<Group>(null!)
  const { scene } = useGLTF('/models/spaceship.glb') as GLTFResult

  return (
    <group ref={groupRef} {...props}>
      <primitive object={scene} />
    </group>
  )
}

useGLTF.preload('/models/spaceship.glb')
