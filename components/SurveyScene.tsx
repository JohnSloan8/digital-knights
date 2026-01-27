'use client'

import { Canvas, useFrame, useThree } from '@react-three/fiber'
import {
  OrbitControls,
  useGLTF,
  useAnimations,
  ContactShadows,
  useProgress,
  useTexture,
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
        // action.reset().fadeIn(0.5).setLoop(THREE.LoopRepeat, Infinity).play()
        action.reset().setLoop(THREE.LoopRepeat, Infinity).play()
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

function OldWoodenChair({
  position = [1, 0, 0],
  rotation = [0, 0, 0],
}: {
  position?: [number, number, number]
  rotation?: [number, number, number]
}) {
  const { scene } = useGLTF('/static/animation-files/objects/old_wooden_chair.gltf')
  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene])

  useEffect(() => {
    clone.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true
        child.receiveShadow = true
      }
    })
  }, [clone])

  return (
    <primitive
      object={clone}
      position={position}
      rotation={rotation}
      scale={[0.00525, 0.00525, 0.00525]}
    />
  )
}
function SurveyParchment({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = [0.5, 0.5, 0.5],
}: {
  position?: [number, number, number]
  rotation?: [number, number, number]
  scale?: [number, number, number]
}) {
  const texture = useTexture('/static/animation-files/textures/survey-parchment.png')
  return (
    <mesh position={position} rotation={rotation} scale={scale}>
      {/* Aspect ratio 407/333 ~= 1.22 */}
      <planeGeometry args={[1.22, 1]} />
      <meshBasicMaterial map={texture} transparent side={THREE.DoubleSide} />
    </mesh>
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
    camera.lookAt(0, 0.6, 0.4)
  }, [camera])
  return null
}

export default function SurveyScene({ className }: { className?: string }) {
  return (
    <div className={className || 'relative h-[500px] w-full'}>
      <Canvas shadows gl={{ alpha: true }} camera={{ position: [-2, 1.25, -1.0], fov: 40 }}>
        <ambientLight intensity={1.5} />
        <directionalLight position={[-3, 5, -5]} castShadow intensity={5} />

        <ThankfulCharacter
          modelPath="/static/animation-files/knights-no-weapons/Female.C.writing.glb"
          position={[0, 0, 0]}
          armRotationX={40}
        />

        <OldWoodenChair position={[0, 0, 0.2]} rotation={[0, 0, 0]} />
        <SurveyParchment position={[0, 0.8, 0.825]} rotation={[1, Math.PI, 0]} />
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
        {/* <OrbitControls target={[0, 0.6, 0.4]} /> */}
      </Canvas>
      <LoadingScreen />
    </div>
  )
}
