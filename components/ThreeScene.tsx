'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, useGLTF, useAnimations, useTexture, useHelper } from '@react-three/drei'
import { useEffect, useMemo, Suspense, useRef, useState, MutableRefObject } from 'react'
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

  const radius = 8
  const yPos = 0.0

  return (
    <group ref={groupRef}>
      {textures.map((texture, i) => {
        const angle = (i / 3) * Math.PI * 2
        const x = Math.cos(angle) * radius
        const z = Math.sin(angle) * radius
        return (
          <sprite key={i} position={[x, yPos, z]} scale={[4, 4, 4]}>
            <spriteMaterial map={texture} />
          </sprite>
        )
      })}
    </group>
  )
}

function Knight({ playAction, onActionEnd }: { playAction: boolean; onActionEnd: () => void }) {
  const { scene, animations } = useGLTF(encodeURI('/static/animation-files/Female Survivor 1 .glb'))
  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene])
  const { ref, actions, mixer } = useAnimations(animations)
  useHelper(ref as MutableRefObject<THREE.Object3D>, THREE.SkeletonHelper)
  const texture = useTexture(encodeURI('/static/animation-files/maps/F Surv 1 512x512.png'))
  console.log('scene', scene)
  texture.colorSpace = THREE.SRGBColorSpace
  texture.flipY = false

  useEffect(() => {
    const idle = actions['NlaTrack']
    if (idle) {
      idle.reset().fadeIn(0.5).play()
    }
    return () => {
      idle?.fadeOut(0.5)
    }
  }, [actions])

  useEffect(() => {
    if (playAction) {
      const idle = actions['NlaTrack']
      const action = actions['NlaTrack.004']

      if (idle && action) {
        action.reset()
        action.setLoop(THREE.LoopOnce, 1)
        action.clampWhenFinished = true

        idle.crossFadeTo(action, 0.5, true)
        action.play()

        const onFinished = (e: { action: THREE.AnimationAction }) => {
          if (e.action === action) {
            action.fadeOut(0.5)
            idle.reset().fadeIn(0.5).play()
            onActionEnd()
            mixer.removeEventListener('finished', onFinished)
          }
        }
        mixer.addEventListener('finished', onFinished)

        return () => {
          mixer.removeEventListener('finished', onFinished)
        }
      }
    }
  }, [playAction, actions, mixer, onActionEnd])

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
  const [playAction, setPlayAction] = useState(false)

  return (
    <div className="relative h-[500px] w-full">
      <button
        className="absolute top-4 right-4 z-10 rounded bg-blue-600 px-4 py-2 font-bold text-white hover:bg-blue-700 disabled:opacity-50"
        onClick={() => setPlayAction(true)}
        disabled={playAction}
      >
        Play Action
      </button>
      <Canvas shadows gl={{ alpha: true }} camera={{ position: [-5, 5, 15] }}>
        <ambientLight intensity={0.75} />
        <pointLight position={[5, 10, 10]} castShadow />
        <Suspense fallback={null}>
          <Knight playAction={playAction} onActionEnd={() => setPlayAction(false)} />
          <OrbitingSprites />
        </Suspense>
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -9.5, 0]} receiveShadow>
          <planeGeometry args={[100, 100]} />
          <shadowMaterial transparent opacity={0.4} />
        </mesh>
        <OrbitControls />
      </Canvas>
    </div>
  )
}
