'use client'

import { Canvas, useFrame, useThree } from '@react-three/fiber'
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
        action.reset().fadeIn(0.5).setLoop(THREE.LoopOnce, 1)
        action.clampWhenFinished = true
        action.play()
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

    // Speed modulation
    if (animations.length > 0) {
      const firstAnim = animations[0]
      const action = actions[firstAnim.name]
      if (action) {
        const d = action.getClip().duration
        const t = action.time % d

        // 1. Middle Slowdown Profile (Middle 0.5s + 0.25s ramps)
        let midSpeed = 1.0
        const mid = d / 2
        const midSlowStart = mid - 0.25
        const midSlowEnd = mid + 0.25
        const midRampDownStart = mid - 0.5
        const midRampUpEnd = mid + 0.5

        if (t >= midRampDownStart && t < midRampUpEnd) {
          if (t < midSlowStart) {
            // Ramp Down 1.0 -> 0.0
            const p = (t - midRampDownStart) / (midSlowStart - midRampDownStart)
            midSpeed = 1.0 - 1.0 * p
          } else if (t < midSlowEnd) {
            // Hold 0.0
            midSpeed = 0.0
          } else {
            // Ramp Up 0.0 -> 1.0
            const p = (t - midSlowEnd) / (midRampUpEnd - midSlowEnd)
            midSpeed = 0.0 + 1.0 * p
          }
        }

        action.setEffectiveTimeScale(midSpeed)
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

function CameraHandler() {
  const { camera } = useThree()
  useEffect(() => {
    camera.lookAt(0, 1, 0)
  }, [camera])
  return null
}

export default function QuestionScene({ className }: { className?: string }) {
  return (
    <div className={className || 'relative h-[500px] w-full'}>
      <Canvas shadows gl={{ alpha: true }} camera={{ position: [0, 1.5, 3], fov: 41 }}>
        <ambientLight intensity={1.5} />
        <directionalLight position={[1, 5, 4]} castShadow intensity={5} />

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
        <CameraHandler />
        {/* <OrbitControls target={[0, 1, 0]} /> */}
      </Canvas>
      {/* <LoadingScreen /> */}
    </div>
  )
}
