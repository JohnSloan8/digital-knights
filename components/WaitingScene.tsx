'use client'

import { Canvas, useFrame, useThree } from '@react-three/fiber'
import {
  OrbitControls,
  useGLTF,
  useAnimations,
  ContactShadows,
  useTexture,
  useProgress,
} from '@react-three/drei'
import { useEffect, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'
import { SkeletonUtils } from 'three-stdlib'

interface AnimatedCharacterProps {
  modelPath: string
  position: [number, number, number]
  rotation?: [number, number, number]
  armRotationX?: number
}

function AnimatedCharacter({
  modelPath,
  position,
  rotation = [0, 0, 0],
  armRotationX,
}: AnimatedCharacterProps) {
  const { scene, animations } = useGLTF(encodeURI(modelPath))
  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene])
  const { ref, actions } = useAnimations(animations)

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

function SequencedAnimatedCharacter({
  modelPath,
  position,
  rotation = [0, 0, 0],
  armRotationX,
}: {
  modelPath: string
  position: [number, number, number]
  rotation?: [number, number, number]
  armRotationX?: number
}) {
  const { scene, animations } = useGLTF(encodeURI(modelPath))
  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene])
  const { ref, actions, mixer } = useAnimations(animations)
  const { clock } = useThree()

  // Store references to arm bones
  const bones = useRef<{
    rightArm?: THREE.Bone
    leftArm?: THREE.Bone
  }>({})

  // State to track running movement
  const runState = useRef<{ startTime: number | null; duration: number }>({
    startTime: null,
    duration: 0,
  })

  useEffect(() => {
    if (animations.length >= 4) {
      // Explicitly find animations by name (sequence: Run -> Fist Pump -> Look Behind -> IdleWait02)
      const runClip = animations.find((a) => a.name.toLowerCase().includes('run')) || animations[3]
      const fistPumpClip =
        animations.find((a) => a.name.toLowerCase().includes('fist')) || animations[0]
      const lookBehindClip =
        animations.find((a) => a.name.toLowerCase().includes('look')) || animations[2]
      const idleWaitClip =
        animations.find((a) => a.name.toLowerCase().includes('idle-wait-02')) || animations[1]

      const run = actions[runClip.name]
      const fistPump = actions[fistPumpClip.name]
      const lookBehind = actions[lookBehindClip.name]
      const idleWait = actions[idleWaitClip.name]

      if (run && fistPump && lookBehind && idleWait) {
        // 1. Run (5 times)
        run.reset().fadeIn(0.1).setLoop(THREE.LoopRepeat, 5).play()
        run.clampWhenFinished = true

        // Start movement
        runState.current.startTime = clock.elapsedTime
        runState.current.duration = runClip.duration * 5
        if (ref.current) ref.current.position.z = -20

        const onFinished = (e: { action: THREE.AnimationAction }) => {
          if (e.action === run) {
            // Ensure final position
            runState.current.startTime = null
            if (ref.current) ref.current.position.z = -2

            // 2. Fist Pump (One shot)
            run.fadeOut(0.25)
            fistPump.reset().fadeIn(0.25).setLoop(THREE.LoopOnce, 1).play()
            fistPump.clampWhenFinished = true
          } else if (e.action === fistPump) {
            // 3. Look Behind (One shot)
            fistPump.fadeOut(0.5)
            lookBehind.reset().fadeIn(0.5).setLoop(THREE.LoopOnce, 1).play()
            lookBehind.clampWhenFinished = true
          } else if (e.action === lookBehind) {
            // 4. Idle Wait (One shot)
            lookBehind.fadeOut(5)
            idleWait.reset().fadeIn(5).setLoop(THREE.LoopOnce, 1).play()
            idleWait.clampWhenFinished = true
          } else if (e.action === idleWait) {
            // 5. Back to Look Behind (Cycle)
            idleWait.fadeOut(0.5)
            lookBehind.reset().fadeIn(0.5).setLoop(THREE.LoopOnce, 1).play()
            lookBehind.clampWhenFinished = true
          }
        }

        mixer.addEventListener('finished', onFinished)
        return () => mixer.removeEventListener('finished', onFinished)
      }
    }
  }, [actions, animations, mixer, clock])

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
    // Handle run movement
    if (runState.current.startTime !== null && ref.current) {
      const elapsed = clock.elapsedTime - runState.current.startTime
      const t = Math.min(elapsed / runState.current.duration, 1)

      // Constant speed for first 80%, then smooth slow down
      let progress
      if (t < 0.8) {
        // Constant velocity k = 10/9
        progress = (10 / 9) * t
      } else {
        // Smooth deceleration
        progress = 1 - (25 / 9) * Math.pow(1 - t, 2)
      }

      // Lerp -20 -> -2
      const currentZ = -20 + (-2 - -20) * progress
      ref.current.position.z = currentZ
    }

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

function CyclingAnimatedCharacter({
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
    if (animations.length >= 2) {
      // Default to 0, but if 'idle-wait-02' exists, start with that one as requested
      const waitIndex = animations.findIndex((a) => a.name.includes('idle-wait-02'))
      let currentIndex = waitIndex !== -1 ? waitIndex : 0

      const playCurrent = () => {
        const clip = animations[currentIndex]
        const action = actions[clip.name]
        if (action) {
          action.reset().fadeIn(0.25).setLoop(THREE.LoopOnce, 1).play()
          action.clampWhenFinished = true
        }
      }

      const onFinished = (e: { action: THREE.AnimationAction }) => {
        e.action.fadeOut(0.25)
        currentIndex = (currentIndex + 1) % animations.length
        playCurrent()
      }

      mixer.addEventListener('finished', onFinished)
      playCurrent()

      return () => {
        mixer.removeEventListener('finished', onFinished)
      }
    } else if (animations.length > 0) {
      const action = actions[animations[0].name]
      action?.reset().fadeIn(0.5).setLoop(THREE.LoopRepeat, Infinity).play()
    }
  }, [actions, animations, mixer])

  useEffect(() => {
    clone.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true
        child.receiveShadow = true
      }
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

function SignPost({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
}: {
  position?: [number, number, number]
  rotation?: [number, number, number]
}) {
  const texture = useTexture('/static/animation-files/textures/gemini-wait-here-sign-min.png')
  return (
    <group position={position} rotation={rotation}>
      {/* Post */}
      <mesh position={[0, 0.625, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.075, 1.25, 0.075]} />
        <meshStandardMaterial color="#5C4033" />
      </mesh>
      {/* Signboard */}
      <mesh position={[0, 1, 0.04]} castShadow receiveShadow>
        <boxGeometry args={[0.65, 0.65, 0.05]} />
        <meshStandardMaterial map={texture} />
      </mesh>
    </group>
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

export default function WaitingScene({ className }: { className?: string }) {
  return (
    <div className={className || 'relative h-[500px] w-full'}>
      <Canvas shadows gl={{ alpha: true }} camera={{ position: [-6, 2, 3], fov: 40 }}>
        <ambientLight intensity={1.5} />
        <directionalLight position={[3, 5, 5]} castShadow intensity={5} />

        <SignPost position={[1, 0, 1.75]} rotation={[0, -Math.PI / 2, 0]} />

        <AnimatedCharacter
          modelPath="/static/animation-files/knights-no-weapons/Male.B.happy-idle.glb"
          position={[0, 0, 1]}
          armRotationX={50}
        />
        <CyclingAnimatedCharacter
          modelPath="/static/animation-files/knights-no-weapons/Male.C.looking.glb"
          // Cycles through all available animations (e.g. idle-still -> idle-looking)
          position={[0, 0, -1]}
          armRotationX={50}
        />
        <AnimatedCharacter
          modelPath="/static/animation-files/knights-no-weapons/Female.B.very-happy.glb"
          position={[0, 0, 0]}
          armRotationX={40}
        />
        <SequencedAnimatedCharacter
          modelPath="/static/animation-files/knights-no-weapons/Female.A.run-fist-pump-breath.glb"
          position={[0, 0, -2]}
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
        <OrbitControls target={[0, 1.1, 0]} />
      </Canvas>
      <LoadingScreen />
    </div>
  )
}
