import * as THREE from 'three'
import React, { useEffect, useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF, useAnimations } from '@react-three/drei'
import { SkeletonUtils } from 'three-stdlib'
import { scrollDirection, scrollY } from '../../store/scroll'

const PARTICLE_COUNT = 200

function FireParticles(props: JSX.IntrinsicElements['group']) {
  const meshRef = useRef<THREE.Points>(null!)

  const { positions, velocities, lifetimes } = useMemo(() => {
    const positions = new Float32Array(PARTICLE_COUNT * 3)
    const velocities = new Float32Array(PARTICLE_COUNT * 3)
    const lifetimes = new Float32Array(PARTICLE_COUNT)

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      lifetimes[i] = Math.random()
    }

    return { positions, velocities, lifetimes }
  }, [])

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    return geo
  }, [positions])

  useFrame((_, delta) => {
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      lifetimes[i] -= delta * 1.5

      if (lifetimes[i] <= 0) {
        lifetimes[i] = Math.random()
        positions[i * 3 + 0] = (Math.random() - 0.5) * 0.3
        positions[i * 3 + 1] = 0
        positions[i * 3 + 2] = (Math.random() - 0.5) * 0.3
        velocities[i * 3 + 0] = (Math.random() - 0.5) * 0.5
        velocities[i * 3 + 1] = Math.random() * 2 + 1
        velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.5
      }

      positions[i * 3 + 0] += velocities[i * 3 + 0] * delta
      positions[i * 3 + 1] += velocities[i * 3 + 1] * delta
      positions[i * 3 + 2] += velocities[i * 3 + 2] * delta
    }

    meshRef.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <group {...props}>
      <points ref={meshRef} geometry={geometry}>
        <pointsMaterial
          size={0.08}
          color="#a9401a"
          transparent
          opacity={0.6}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  )
}

export function Spaceship(props: JSX.IntrinsicElements['group']) {
  const outerRef = useRef<THREE.Group>(null!)
  const animatedRef = useRef<THREE.Group>(null!)
  const modelRef = useRef<THREE.Group>(null!)
  const prevX = useRef(0)
  // const cloudRef = useRef<THREE.Group>(null!)

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

    // const targetScale = scrollDirection.current === "down" ? Math.sin(t * 2) * 0.5 + 1 : 0
    // const s = THREE.MathUtils.lerp(cloudRef.current.scale.x, targetScale, 0.05)
    // cloudRef.current?.scale.set(s, s, s)

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
          {/* <Cloud ref={cloudRef} position={[-50, 0, 0]} opacity={0.15} speed={0} /> */}
     <FireParticles position={[-51,0,0]} scale={7} />

          <group ref={modelRef} dispose={null}>
            <primitive object={clone} />
          </group>
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/models/spaceship.glb')
