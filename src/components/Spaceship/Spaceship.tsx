import * as THREE from 'three'
import React, { useEffect, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF, useAnimations } from '@react-three/drei'
import { SkeletonUtils } from 'three-stdlib'
import { scrollDirection, scrollY } from '../../store/scroll'

export function Spaceship(props: JSX.IntrinsicElements['group']) {
  const outerRef = useRef<THREE.Group>(null!)
  const animatedRef = useRef<THREE.Group>(null!)
  const modelRef = useRef<THREE.Group>(null!)
  const prevX = useRef(0)

  const { scene, animations } = useGLTF('/models/spaceship.glb')
  const clone = React.useMemo(() => SkeletonUtils.clone(scene), [scene])
  const { actions } = useAnimations(animations, modelRef)

  useEffect(() => {
    actions['Armature.002|Armature.002Action']?.play()
  }, [actions])

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    animatedRef.current.rotation.x = Math.sin(t * 1.2) * 0.2

    const targetX = Math.sin(scrollY.current) * 3
    outerRef.current.position.x = THREE.MathUtils.lerp(
      outerRef.current.position.x,
      targetX,
      0.02
    )

    const velocity = outerRef.current.position.x - prevX.current
    prevX.current = outerRef.current.position.x

    const tiltDown = scrollDirection.current === "down" ? 0.15 : 0
    const tiltSide = -velocity * 3
    animatedRef.current.rotation.z = THREE.MathUtils.lerp(
      animatedRef.current.rotation.z,
      tiltDown + tiltSide,
      0.03
    )

    animatedRef.current.rotation.y = THREE.MathUtils.lerp(
      animatedRef.current.rotation.y,
      velocity * 5,
      0.03
    )
  })
 
  return (
    <group ref={outerRef} {...props}>
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
