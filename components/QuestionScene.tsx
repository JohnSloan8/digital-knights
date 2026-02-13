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
import { isWebGLAvailable } from '@/utils/checkWebGL'

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

  // State machine for speed control
  // phases: 'normal' -> 'rampDown' -> 'paused' -> 'rampUp' -> 'finishedMiddle'
  const animState = useRef({
    phase: 'normal',
    timer: 0,
  })

  useEffect(() => {
    let timeout: NodeJS.Timeout
    // Play the first animation found, if any
    if (animations.length > 0) {
      const firstAnim = animations[0]
      const action = actions[firstAnim.name]
      if (action) {
        // Ensure it loops
        action.reset().setLoop(THREE.LoopOnce, 1)
        action.clampWhenFinished = true
        action.play()

        const onFinished = (e: { action: THREE.AnimationAction }) => {
          if (e.action === action) {
            timeout = setTimeout(() => {
              action.reset().play()
            }, 5000)
          }
        }
        mixer.addEventListener('finished', onFinished)
        return () => {
          mixer.removeEventListener('finished', onFinished)
          clearTimeout(timeout)
        }
      }
    }
  }, [actions, animations, mixer])

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

  useFrame((state, delta) => {
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
        const t = action.time

        // Reset logic if we loop back
        if (t < 0.2 && animState.current.phase === 'finishedMiddle') {
          animState.current.phase = 'normal'
          animState.current.timer = 0
        }

        const mid = d / 2
        // Start ramping down slightly before middle
        const rampDownPoint = mid - 0.25

        if (animState.current.phase === 'normal') {
          action.setEffectiveTimeScale(1.0)
          if (t >= rampDownPoint) {
            animState.current.phase = 'rampDown'
            animState.current.timer = 0
          }
        } else if (animState.current.phase === 'rampDown') {
          animState.current.timer += delta
          // Ramp 1.0 -> 0.0 over 0.25s
          const duration = 0.25
          const p = Math.min(animState.current.timer / duration, 1.0)
          action.setEffectiveTimeScale(1.0 - p)

          if (animState.current.timer >= duration) {
            action.setEffectiveTimeScale(0.0)
            animState.current.phase = 'paused'
            animState.current.timer = 0
          }
        } else if (animState.current.phase === 'paused') {
          action.setEffectiveTimeScale(0.0)
          animState.current.timer += delta
          // Pause for 0.5s
          if (animState.current.timer >= 0.5) {
            animState.current.phase = 'rampUp'
            animState.current.timer = 0
          }
        } else if (animState.current.phase === 'rampUp') {
          animState.current.timer += delta
          // Ramp 0.0 -> 1.0 over 0.25s
          const duration = 0.25
          const p = Math.min(animState.current.timer / duration, 1.0)
          action.setEffectiveTimeScale(p)

          if (animState.current.timer >= duration) {
            action.setEffectiveTimeScale(1.0)
            animState.current.phase = 'finishedMiddle'
          }
        } else if (animState.current.phase === 'finishedMiddle') {
          action.setEffectiveTimeScale(1.0)
        }
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
      className={`bg-background pointer-events-none absolute inset-0 z-50 transition-opacity duration-1000 ${
        finished ? 'opacity-0' : 'opacity-100'
      }`}
    />
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
  const [webGLAvailable, setWebGLAvailable] = useState(true)

  useEffect(() => {
    setWebGLAvailable(isWebGLAvailable())
  }, [])

  if (!webGLAvailable) {
    return (
      <div className={className || 'relative h-[500px] w-full'}>
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900/50">
          <div className="rounded-lg border border-red-500 bg-gray-900/90 p-6 text-center shadow-lg">
            <h3 className="mb-2 text-xl font-bold text-red-500">WebGL not detected</h3>
            <p className="text-gray-300">
              Animation cannot be played because WebGL is not detected in your browser.
            </p>
          </div>
        </div>
      </div>
    )
  }

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
;<LoadingScreen />
