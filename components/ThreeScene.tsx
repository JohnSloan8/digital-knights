'use client'

import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, useGLTF, useAnimations, useTexture } from '@react-three/drei'
import { useEffect, useMemo, Suspense, useRef, useState, MutableRefObject } from 'react'
import * as THREE from 'three'
import { SkeletonUtils } from 'three-stdlib'
import spriteColors from '../public/static/animation-files/sprites/color_analysis.json'

function Debris({
  position,
  colorMap,
}: {
  position: THREE.Vector3
  colorMap: Record<string, number>
}) {
  const groupRef = useRef<THREE.Group>(null)
  const shards = useMemo(() => {
    // Prepare cumulative distribution for colors
    const colors = Object.keys(colorMap)
    const cumulative: number[] = []
    let sum = 0
    for (const color of colors) {
      sum += colorMap[color]
      cumulative.push(sum)
    }

    return new Array(8).fill(0).map(() => {
      const r = Math.random()
      let scale = 0
      if (r < 0.4) {
        // Small 0.1-0.4 (40%)
        scale = Math.random() * 0.3 + 0.1
      } else if (r < 0.7) {
        // Medium 0.4-0.8 (30%)
        scale = Math.random() * 0.4 + 0.4
      } else {
        // Large 0.8-1.2 (30%)
        scale = Math.random() * 0.4 + 0.8
      }

      // Pick color
      const randColor = Math.random() * sum
      let selectedColor = colors[0]
      for (let i = 0; i < cumulative.length; i++) {
        if (randColor <= cumulative[i]) {
          selectedColor = colors[i]
          break
        }
      }

      return {
        offset: [
          Math.random() * 0.4 - 0.2,
          Math.random() * 0.4 - 0.2,
          Math.random() * 0.4 - 0.2,
        ] as [number, number, number],
        velocity: [Math.random() * 2 - 1, Math.random() * 2 + 2, Math.random() * 2 - 1],
        rotation: [Math.random() * Math.PI, Math.random() * Math.PI, 0] as [number, number, number],
        scale,
        color: selectedColor,
      }
    })
  }, [colorMap])

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.children.forEach((child, i) => {
        const shard = shards[i]
        shard.velocity[1] -= 9.8 * delta
        child.position.x += shard.velocity[0] * delta
        child.position.y += shard.velocity[1] * delta
        child.position.z += shard.velocity[2] * delta
        child.rotation.x += delta * 2
        child.rotation.z += delta * 2
      })
    }
  })

  return (
    <group ref={groupRef} position={position}>
      {shards.map((s, i) => (
        <mesh key={i} position={s.offset} rotation={s.rotation} scale={s.scale}>
          <circleGeometry args={[0.1, 3]} />
          <meshStandardMaterial color={s.color} side={THREE.DoubleSide} />
        </mesh>
      ))}
    </group>
  )
}

function OrbitingCubes({
  slashTrigger,
  onAllCubesGone,
}: {
  slashTrigger: number
  onAllCubesGone: () => void
}) {
  const groupRef = useRef<THREE.Group>(null)
  const cubesRef = useRef<(THREE.Mesh | null)[]>([])
  const vec = useMemo(() => new THREE.Vector3(), [])
  const activeIndicesRef = useRef<Set<number>>(new Set())
  const [visibleCubes, setVisibleCubes] = useState<boolean[]>(new Array(5).fill(true))
  const [debrisList, setDebrisList] = useState<
    { id: number; position: THREE.Vector3; colorMap: Record<string, number> }[]
  >([])
  const allGoneRef = useRef(false)
  const debrisIdCounter = useRef(0)

  const texturePaths = [
    '/static/animation-files/sprites/location.png',
    '/static/animation-files/sprites/hacker.png',
    '/static/animation-files/sprites/password.png',
    '/static/animation-files/sprites/cookies.png',
    '/static/animation-files/sprites/virus.png',
  ]
  const textures = useTexture(texturePaths)

  useEffect(() => {
    if (visibleCubes.every((v) => !v) && !allGoneRef.current) {
      allGoneRef.current = true
      onAllCubesGone()
    }
  }, [visibleCubes, onAllCubesGone])

  useEffect(() => {
    if (slashTrigger === 0) return
    const timer = setTimeout(() => {
      setVisibleCubes((prev) => {
        const next = [...prev]
        const newDebris: {
          id: number
          position: THREE.Vector3
          colorMap: Record<string, number>
        }[] = []

        activeIndicesRef.current.forEach((index) => {
          if (next[index]) {
            next[index] = false
            if (cubesRef.current[index]) {
              const worldPos = new THREE.Vector3()
              cubesRef.current[index]!.getWorldPosition(worldPos)

              const texturePath = texturePaths[index]
              const filename = texturePath.split('/').pop()!
              const colorMap = (spriteColors as Record<string, Record<string, number>>)[
                filename
              ] || {
                '#ffffff': 1,
              }

              newDebris.push({
                id: debrisIdCounter.current++,
                position: worldPos,
                colorMap,
              })
            }
          }
        })

        if (newDebris.length > 0) {
          setDebrisList((prev) => [...prev, ...newDebris])
          setTimeout(() => {
            setDebrisList((prev) => prev.filter((d) => !newDebris.find((nd) => nd.id === d.id)))
          }, 2000)
        }

        return next
      })
    }, 750)
    return () => clearTimeout(timer)
  }, [slashTrigger])

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

          if (isActive) {
            activeIndicesRef.current.add(i)
          } else {
            activeIndicesRef.current.delete(i)
          }
        } else {
          activeIndicesRef.current.delete(i)
        }
      })
    }
  })

  const radius = 2
  const yPos = 0.9

  return (
    <>
      <group ref={groupRef}>
        {Array.from({ length: 5 }).map((_, i) => {
          if (!visibleCubes[i]) return null
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
              <planeGeometry args={[0.65, 0.65]} />
              <meshStandardMaterial
                map={textures[i]}
                color="#ffffff"
                transparent
                side={THREE.DoubleSide}
              />
            </mesh>
          )
        })}
      </group>
      {debrisList.map((d) => (
        <Debris key={d.id} position={d.position} colorMap={d.colorMap} />
      ))}
    </>
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
  const [slashTrigger, setSlashTrigger] = useState(0)
  const [resetKey, setResetKey] = useState(0)
  const gameOverRef = useRef(false)

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
          <Knight
            currentAnimation={animation}
            onAnimationEnd={() => {
              if (animation === 'PowerUp') {
                setAnimation('Idle')
                gameOverRef.current = false
                setResetKey((prev) => prev + 1)
                setSlashTrigger(0)
              } else if (animation === 'Slash' && gameOverRef.current) {
                setAnimation('Idle')
                setTimeout(() => setAnimation('PowerUp'), 200)
              } else {
                setAnimation('Idle')
              }
            }}
          />
          <OrbitingCubes
            key={resetKey}
            slashTrigger={slashTrigger}
            onAllCubesGone={() => {
              gameOverRef.current = true
            }}
          />
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
          disabled={animation !== 'Idle' || gameOverRef.current}
          onClick={() => {
            setAnimation('Slash')
            setSlashTrigger(Date.now())
          }}
          className={`flex items-center gap-2 rounded-full border-2 px-6 py-3 font-bold transition-colors ${
            animation !== 'Idle' || gameOverRef.current
              ? 'cursor-not-allowed border-gray-500 text-gray-500 opacity-50'
              : 'cursor-pointer border-[#00f0ff] text-[#00f0ff] hover:bg-[#00f0ff]/10'
          }`}
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
