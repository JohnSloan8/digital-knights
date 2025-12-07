'use client'

import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, useGLTF, useAnimations, useTexture } from '@react-three/drei'
import { useEffect, useMemo, Suspense, useRef, useState, MutableRefObject } from 'react'
import * as THREE from 'three'
import { SkeletonUtils } from 'three-stdlib'

function OrbitingCubes() {
  const groupRef = useRef<THREE.Group>(null)
  const cubesRef = useRef<(THREE.Mesh | null)[]>([])
  const vec = useMemo(() => new THREE.Vector3(), [])

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.5
      groupRef.current.updateMatrixWorld(true)

      cubesRef.current.forEach((cube, i) => {
        if (cube) {
          cube.getWorldPosition(vec)
          const angle = Math.atan2(vec.z, vec.x)

          // Active section: Front (Z+)
          // 1/5 of circle is 2PI/5. Half width is PI/5.
          // Center is PI/2. Range [PI/2 - PI/5, PI/2 + PI/5] => [3PI/10, 7PI/10]
          const isActive = angle > (3 * Math.PI) / 10 && angle < (7 * Math.PI) / 10

          const material = cube.material as THREE.MeshStandardMaterial
          if (isActive) {
            material.color.set('#00f0ff')
            material.emissive.set('#00f0ff')
            material.emissiveIntensity = 2
          } else {
            material.color.set('#4488ff')
            material.emissive.set('#000000')
            material.emissiveIntensity = 0
          }
        }
      })
    }
  })

  const radius = 2
  const yPos = 0.9

  return (
    <group ref={groupRef}>
      {Array.from({ length: 5 }).map((_, i) => {
        const angle = (i / 5) * Math.PI * 2
        const x = Math.cos(angle) * radius
        const z = Math.sin(angle) * radius
        return (
          <mesh
            key={i}
            ref={(el) => {
              cubesRef.current[i] = el
            }}
            position={[x, yPos, z]}
            rotation={[0, -angle - Math.PI / 2, 0]}
            castShadow
            receiveShadow
          >
            <boxGeometry args={[0.65, 0.65, 0.05]} />
            <meshStandardMaterial color="#4488ff" />
          </mesh>
        )
      })}
    </group>
  )
}

function Knight({
  currentAnimation,
  onAnimationEnd,
}: {
  currentAnimation: string
  onAnimationEnd: () => void
}) {
  const modelPath = '/static/animation-files/Studio Ochi Medieval Knights_Male.A.glb'
  const texturePath = '/static/animation-files/maps/Knights_01.png'
  const { scene, animations } = useGLTF(encodeURI(modelPath))
  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene])
  const { ref, actions, mixer } = useAnimations(animations)
  const texture = useTexture(encodeURI(texturePath))

  texture.colorSpace = THREE.SRGBColorSpace

  useEffect(() => {
    const idleAction = actions['Knight.Idle.New'] || actions['Knight.Idle']
    const slashAction = actions['Knight.Slash.New']
    const powerUpAction = actions['Knight.PowerUp']

    if (currentAnimation === 'Idle') {
      if (slashAction) slashAction.fadeOut(0.2)
      if (powerUpAction) powerUpAction.fadeOut(0.2)
      if (idleAction) idleAction.reset().fadeIn(0.2).play()
    } else if (currentAnimation === 'Slash') {
      if (idleAction) idleAction.fadeOut(0.2)
      if (slashAction) {
        slashAction.reset().setLoop(THREE.LoopOnce, 1).fadeIn(0.2).play()
        slashAction.clampWhenFinished = true

        const onFinished = (e: { action: THREE.AnimationAction }) => {
          if (e.action === slashAction) {
            onAnimationEnd()
          }
        }
        mixer.addEventListener('finished', onFinished)

        return () => {
          mixer.removeEventListener('finished', onFinished)
        }
      }
    } else if (currentAnimation === 'PowerUp') {
      if (idleAction) idleAction.fadeOut(0.2)
      if (powerUpAction) {
        powerUpAction.reset().setLoop(THREE.LoopOnce, 1).fadeIn(0.2).play()
        powerUpAction.clampWhenFinished = true

        const onFinished = (e: { action: THREE.AnimationAction }) => {
          if (e.action === powerUpAction) {
            onAnimationEnd()
          }
        }
        mixer.addEventListener('finished', onFinished)

        return () => {
          mixer.removeEventListener('finished', onFinished)
        }
      }
    }
  }, [currentAnimation, actions, mixer, onAnimationEnd])

  useEffect(() => {
    clone.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        console.log('Applying texture to', child.name)
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

  return <primitive object={clone} ref={ref} position={[0, 0, 0]} scale={[1, 1, 1]} />
}

function CameraHandler() {
  const { camera } = useThree()
  useEffect(() => {
    camera.lookAt(0, 1.0, 0)
  }, [camera])
  return null
}

export default function ThreeScene() {
  const [animation, setAnimation] = useState('Idle')

  return (
    <div className="relative h-[500px] w-full">
      <Canvas shadows gl={{ alpha: true }} camera={{ position: [-1.5, 1.5, 4], fov: 40 }}>
        <ambientLight intensity={1.5} />
        <directionalLight
          position={[5, 10, 7.5]}
          castShadow
          intensity={3.0}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <Suspense fallback={null}>
          <Knight currentAnimation={animation} onAnimationEnd={() => setAnimation('Idle')} />
          <OrbitingCubes />
        </Suspense>
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
          <planeGeometry args={[100, 100]} />
          <shadowMaterial transparent opacity={0.4} />
        </mesh>
        <CameraHandler />
        <OrbitControls target={[0, 1, 0]} />
      </Canvas>
      <div className="absolute bottom-0 left-1/2 z-10 -translate-x-1/2 transform">
        <button
          onClick={() => setAnimation('Slash')}
          className="flex cursor-pointer items-center gap-2 rounded-full border-2 border-[#00f0ff] bg-transparent px-6 py-3 font-bold text-[#00f0ff] transition-colors hover:bg-[#00f0ff]/10"
        >
          Use Sword
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="14.5 17.5 3 6 3 3 6 3 17.5 14.5" />
            <line x1="13" y1="19" x2="19" y2="13" />
            <line x1="16" y1="16" x2="20" y2="20" />
            <line x1="19" y1="21" x2="21" y2="19" />
          </svg>
        </button>
      </div>
    </div>
  )
}
