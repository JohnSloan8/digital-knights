'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, useGLTF, useAnimations, useTexture } from '@react-three/drei'
import { useEffect, useMemo, Suspense, useRef } from 'react'
import * as THREE from 'three'
import { SkeletonUtils } from 'three-stdlib'

function OrbitingSprites() {
  const groupRef = useRef<THREE.Group>(null)
  const textures = useTexture([
    encodeURI('/static/animation-files/sprites/ChatGPT Image Dec 3, 2025, 10_56_30 AM.png'),
    encodeURI('/static/animation-files/sprites/ChatGPT Image Dec 3, 2025, 10_57_40 AM.png'),
    encodeURI('/static/animation-files/sprites/ChatGPT Image Dec 3, 2025, 10_59_59 AM.png'),
  ])

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.5
    }
  })

  const radius = 6
  const yPos = 2.5

  return (
    <group ref={groupRef}>
      {textures.map((texture, i) => {
        const angle = (i / 3) * Math.PI * 2
        const x = Math.cos(angle) * radius
        const z = Math.sin(angle) * radius
        return (
          <sprite key={i} position={[x, yPos, z]} scale={[5, 5, 5]}>
            <spriteMaterial map={texture} />
          </sprite>
        )
      })}
    </group>
  )
}

function Knight() {
  const { scene, animations } = useGLTF(encodeURI('/static/animation-files/Male Survivor 1 .glb'))
  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene])
  const { ref, actions } = useAnimations(animations)
  const texture = useTexture(encodeURI('/static/animation-files/maps/Surv 1 512x512.png'))

  texture.colorSpace = THREE.SRGBColorSpace
  texture.flipY = false

  useEffect(() => {
    if (actions) {
      const actionNames = Object.keys(actions)
      if (actionNames.length > 0) {
        actions[actionNames[0]]?.reset().fadeIn(0.5).play()
      }
    }
  }, [actions])

  useEffect(() => {
    clone.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true
        child.receiveShadow = true
        if (child.material instanceof THREE.Material) {
          child.material = child.material.clone()
          if ('map' in child.material) {
            ;(child.material as THREE.MeshStandardMaterial).map = texture
            child.material.needsUpdate = true
          }
        }
      }
    })
  }, [clone, texture])

  return <primitive object={clone} ref={ref} position={[0, 0, 0]} />
}

export default function ThreeScene() {
  return (
    <div className="h-[500px] w-full">
      <Canvas shadows gl={{ alpha: true }} camera={{ position: [-5, 5, 15] }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[5, 10, 10]} castShadow />
        <Suspense fallback={null}>
          <Knight />
          <OrbitingSprites />
        </Suspense>
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
          <planeGeometry args={[100, 100]} />
          <shadowMaterial transparent opacity={0.4} />
        </mesh>
        <OrbitControls />
      </Canvas>
    </div>
  )
}
