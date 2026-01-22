'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import {
  OrbitControls,
  useGLTF,
  useAnimations,
  ContactShadows,
  useProgress,
} from '@react-three/drei'
import { useEffect, useMemo, useState, useRef } from 'react'
import * as THREE from 'three'
import { SkeletonUtils } from 'three-stdlib'

interface AnimatedCharacterProps {
  modelPath: string
  position: [number, number, number]
  rotation?: [number, number, number]
  armRotationX?: number
}

function ThankfulCharacter({
  modelPath,
  position,
  rotation = [0, 0, 0],
  armRotationX,
}: AnimatedCharacterProps) {
  const { scene, animations } = useGLTF(encodeURI(modelPath))
  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene])
  const { ref, actions, mixer } = useAnimations(animations)

  // Store references to arm bones
  const bones = useRef<{
    rightArm?: THREE.Bone
    leftArm?: THREE.Bone
  }>({})

  useEffect(() => {
    // Play the first animation found, if any
    if (animations.length > 0) {
      const firstAnim = animations[0]
      const action = actions[firstAnim.name]
      if (action) {
        // Ensure it loops
        action.reset().fadeIn(0.5).setLoop(THREE.LoopRepeat, Infinity).play()
      }
    }
  }, [actions, animations])

  useEffect(() => {
    clone.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true
        child.receiveShadow = true
      }
      // Identify arm bones
      if ((child.name.includes('RightArm') || child.name === 'RightArm') && child.type === 'Bone') {
        bones.current.rightArm = child as THREE.Bone
      }
      if ((child.name.includes('LeftArm') || child.name === 'LeftArm') && child.type === 'Bone') {
        bones.current.leftArm = child as THREE.Bone
      }
    })
  }, [clone])

  useFrame(() => {
    if (armRotationX !== undefined) {
      const rad = THREE.MathUtils.degToRad(armRotationX)
      if (bones.current.rightArm) {
        bones.current.rightArm.rotation.x = rad
      }
      if (bones.current.leftArm) {
        bones.current.leftArm.rotation.x = rad
      }
    }
  })

  return (
    <primitive object={clone} ref={ref} position={position} rotation={rotation} scale={[1, 1, 1]} />
  )
}

function LoadingScreen() {
  const { progress } = useProgress()
  const [finished, setFinished] = useState(false)

  useEffect(() => {
    if (progress === 100) {
      const timer = setTimeout(() => setFinished(true), 500)
      return () => clearTimeout(timer)
    }
  }, [progress])

  return (
    <div
      className={`pointer-events-none absolute inset-0 z-50 flex items-center justify-center bg-black transition-opacity duration-1000 ${
        finished ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <div className="relative z-60 flex flex-col items-center gap-4">
        <div className="font-mono text-xl text-[#00f0ff]">LOADING...</div>
        <div className="h-8 w-64 border-4 border-[#00f0ff] p-1">
          <div
            className="h-full bg-[#00f0ff] transition-all duration-200"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  )
}

export default function QuestionScene({ className }: { className?: string }) {
  return (
    <div className={className || 'relative h-[500px] w-full'}>
      <Canvas shadows gl={{ alpha: true }} camera={{ position: [0, 1.5, 3.5], fov: 40 }}>
        <ambientLight intensity={1.5} />
        <directionalLight position={[3, 5, 5]} castShadow intensity={5} />

        <ThankfulCharacter
          modelPath="/static/animation-files/knights-no-weapons/Female.A.hand-raising.glb"
          position={[0, 0, 0]}
          armRotationX={50}
        />

        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
          <planeGeometry args={[10, 10]} />
          <shadowMaterial transparent opacity={0.7} />
        </mesh>
        <ContactShadows
          resolution={512}
          scale={10}
          blur={2}
          opacity={0.5}
          far={10}
          color="#000000"
        />
        <OrbitControls target={[0, 1, 0]} />
      </Canvas>
      <LoadingScreen />
    </div>
  )
}
