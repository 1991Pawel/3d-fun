import * as THREE from 'three'
import React, { useEffect, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF, useAnimations } from '@react-three/drei'
import { SkeletonUtils } from 'three-stdlib'
import { scrollDirection } from '../../store/scroll'

export function Spaceship(props: JSX.IntrinsicElements['group']) {
  const animatedRef = useRef<THREE.Group>(null!)
  const modelRef = useRef<THREE.Group>(null!)



  const { scene, animations } = useGLTF('/models/spaceship.glb')
  const clone = React.useMemo(() => SkeletonUtils.clone(scene), [scene])
  const { actions } = useAnimations(animations, modelRef)

  useEffect(() => {
    actions['Armature.002|Armature.002Action']?.play()
  }, [actions])

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    animatedRef.current.rotation.x = Math.sin(t * 1.2) * 0.2

    const targetDown = scrollDirection.current === "down" ? 0.15 : 0
    animatedRef.current.rotation.z = THREE.MathUtils.lerp(
      animatedRef.current.rotation.z,
      targetDown,
      0.05
    )

  })

  return (
    <group {...props}>
      <group rotation={[0, Math.PI, 0]}>
        <group ref={animatedRef}>
          <group ref={modelRef} dispose={null}>
            <primitive object={clone} />
          </group>
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/models/spaceship.glb')
