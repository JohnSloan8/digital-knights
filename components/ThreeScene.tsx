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
  const cubesRef = useRef<(THREE.Object3D | null)[]>([])
  const vec = useMemo(() => new THREE.Vector3(), [])
  const activeIndicesRef = useRef<Set<number>>(new Set())
  const [visibleCubes, setVisibleCubes] = useState<boolean[]>(new Array(6).fill(true))
  const [debrisList, setDebrisList] = useState<
    { id: number; position: THREE.Vector3; colorMap: Record<string, number> }[]
  >([])
  const allGoneRef = useRef(false)
  const debrisIdCounter = useRef(0)

  const texturePaths = [
    '/static/animation-files/sprites/location-min.png',
    '/static/animation-files/sprites/hacker-min.png',
    '/static/animation-files/sprites/facial-recognition-min.png',
    '/static/animation-files/sprites/cookies-min.png',
    '/static/animation-files/sprites/ads-min.png',
    '/static/animation-files/sprites/password-min.png',

    '/static/animation-files/sprites/misinformation.png',
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
          // 1/6 of circle is 2PI/6 = PI/3. Half width is PI/6.
          // Center is PI/2. Range [PI/2 - PI/6, PI/2 + PI/6] => [PI/3, 2PI/3]
          const isActive = angle > Math.PI / 3 && angle < (2 * Math.PI) / 3

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
        {Array.from({ length: 6 }).map((_, i) => {
          if (!visibleCubes[i]) return null
          const angle = (i / 6) * Math.PI * 2
          const x = Math.cos(angle) * radius
          const z = Math.sin(angle) * radius
          const texture = textures[i]
          const aspect = texture.image.width / texture.image.height
          const isFacialRecognition = texturePaths[i].includes('facial-recognition')
          const isAds = texturePaths[i].includes('ads')
          const baseScale = 0.65
          const scale = isFacialRecognition ? baseScale * 1.33 : baseScale
          const w = aspect > 1 ? scale : scale * aspect
          const h = aspect > 1 ? scale / aspect : scale

          if (isAds) {
            return (
              <group
                key={i}
                ref={(el) => {
                  cubesRef.current[i] = el
                  if (el) {
                    el.lookAt(0, yPos, 0)
                  }
                }}
                position={[x, yPos, z]}
              >
                <mesh castShadow receiveShadow>
                  <planeGeometry args={[w, h]} />
                  <meshStandardMaterial
                    map={texture}
                    color="#ffffff"
                    transparent
                    side={THREE.FrontSide}
                  />
                </mesh>
                <mesh castShadow receiveShadow rotation={[0, 0, 0]} scale={[-1, 1, 1]}>
                  <planeGeometry args={[w, h]} />
                  <meshStandardMaterial
                    map={texture}
                    color="#ffffff"
                    transparent
                    side={THREE.BackSide}
                  />
                </mesh>
              </group>
            )
          }

          return (
            <mesh
              key={i}
              ref={(el) => {
                cubesRef.current[i] = el
                if (el) {
                  el.lookAt(0, yPos, 0)
                }
              }}
              position={[x, yPos, z]}
              castShadow
              receiveShadow
            >
              <planeGeometry args={[w, h]} />
              <meshStandardMaterial
                map={texture}
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
  const modelPath = '/static/animation-files/Male.A.glb'
  const texturePath = '/static/animation-files/maps/Knights_01.png'
  const { scene, animations } = useGLTF(encodeURI(modelPath))
  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene])
  const { ref, actions, mixer } = useAnimations(animations)
  const texture = useTexture(encodeURI(texturePath))

  texture.colorSpace = THREE.SRGBColorSpace

  useEffect(() => {
    const idleAlertAction = actions['idle-alert']
    const idleStillAction = actions['idle-still']
    const slashAction = actions['slash-simple']
    const powerUpAction = actions['power-up']

    if (currentAnimation === 'idle') {
      if (slashAction) slashAction.fadeOut(0.2)
      if (powerUpAction) powerUpAction.fadeOut(0.2)
      if (idleStillAction) idleStillAction.fadeOut(0.2)
      if (idleAlertAction) idleAlertAction.reset().fadeIn(0.2).play()
    } else if (currentAnimation === 'idle-still') {
      if (slashAction) slashAction.fadeOut(0.2)
      if (powerUpAction) powerUpAction.fadeOut(0.2)
      if (idleAlertAction) idleAlertAction.fadeOut(0.2)
      if (idleStillAction) idleStillAction.reset().fadeIn(0.2).play()
    } else if (currentAnimation === 'slash') {
      if (idleAlertAction) idleAlertAction.fadeOut(0.2)
      if (idleStillAction) idleStillAction.fadeOut(0.2)
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
    } else if (currentAnimation === 'power-up') {
      if (idleAlertAction) idleAlertAction.fadeOut(0.2)
      if (idleStillAction) idleStillAction.fadeOut(0.2)
      if (slashAction) slashAction.fadeOut(0.2)
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

function Floor() {
  const texture = useTexture('/static/images/circuit-floor-triple-width.webp')
  return (
    <mesh rotation={[-Math.PI / 2, 0, -0.4]} position={[0, 0, 0]} receiveShadow>
      <planeGeometry args={[14, 7]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  )
}

function CameraHandler() {
  const { camera } = useThree()
  useEffect(() => {
    camera.lookAt(0, 1.0, 0)
  }, [camera])
  return null
}

export default function ThreeScene({ className }: { className?: string }) {
  const [animation, setAnimation] = useState('idle')
  const [slashTrigger, setSlashTrigger] = useState(0)
  const [resetKey, setResetKey] = useState(0)
  const gameOverRef = useRef(false)

  return (
    <div className={className || 'relative h-[500px] w-full'}>
      <Canvas shadows gl={{ alpha: true }} camera={{ position: [-2.5, 2.0, 6], fov: 40 }}>
        <ambientLight intensity={2.0} />
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
              if (animation === 'power-up') {
                setAnimation('idle-still')
              } else {
                setAnimation('idle')
              }
            }}
          />
          <OrbitingCubes
            key={resetKey}
            slashTrigger={slashTrigger}
            onAllCubesGone={() => {
              gameOverRef.current = true
              setTimeout(() => {
                setAnimation('power-up')
              }, 500)
            }}
          />
          <Floor />
        </Suspense>
        <CameraHandler />
        {/* <OrbitControls target={[0, 1, 0]} /> */}
      </Canvas>
      <div className="absolute bottom-40 left-1/2 z-30 -translate-x-1/2 transform">
        <button
          disabled={animation !== 'idle' || gameOverRef.current}
          onClick={() => {
            setAnimation('slash')
            setSlashTrigger(Date.now())
          }}
          className={`flex items-center gap-3 rounded-full border-2 bg-black/50 px-6 py-4 text-xl font-bold transition-colors ${
            animation !== 'idle' || gameOverRef.current
              ? 'cursor-not-allowed border-gray-500 text-gray-500 opacity-50'
              : 'cursor-pointer border-[#00f0ff] text-[#00f0ff] hover:bg-black/70'
          }`}
        >
          Use Sword
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
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
