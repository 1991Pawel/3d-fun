import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF, Center } from '@react-three/drei'
import * as THREE from 'three'

export function Deimos(props: JSX.IntrinsicElements['group']) {
  const ref = useRef<THREE.Group>(null!)
  const { scene } = useGLTF('/models/deimos.glb')
  const cloned = useMemo(() => scene.clone(), [scene])

  const rotSpeed = useMemo(() => ({
    x: (Math.random() - 0.5) * 0.6,
    y: (Math.random() - 0.5) * 0.6,
    z: (Math.random() - 0.5) * 0.6,
  }), [])

  const initRot = useMemo(() => ({
    x: Math.random() * Math.PI * 2,
    y: Math.random() * Math.PI * 2,
    z: Math.random() * Math.PI * 2,
  }), [])

  useFrame((_, delta) => {
    ref.current.rotation.x += delta * rotSpeed.x
    ref.current.rotation.y += delta * rotSpeed.y
    ref.current.rotation.z += delta * rotSpeed.z
  })

  return (
    <group ref={ref} rotation={[initRot.x, initRot.y, initRot.z]} {...props}>
      <Center>
        <primitive object={cloned} />
      </Center>
    </group>
  )
}

useGLTF.preload('/models/deimos.glb')
