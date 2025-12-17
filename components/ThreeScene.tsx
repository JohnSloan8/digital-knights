'use client'

import { Canvas, useFrame, useThree } from '@react-three/fiber'
import {
  OrbitControls,
  useGLTF,
  useAnimations,
  useTexture,
  useProgress,
  Line,
} from '@react-three/drei'
import { useEffect, useMemo, Suspense, useRef, useState, useCallback } from 'react'
import Image from 'next/image'
import * as THREE from 'three'
import { SkeletonUtils } from 'three-stdlib'
import spriteColors from '../public/static/animation-files/sprites/color_analysis.json'

type Line2Impl = THREE.Mesh & {
  geometry: THREE.BufferGeometry & {
    setPositions: (positions: number[] | Float32Array) => void
  }
  material: THREE.Material & {
    opacity: number
  }
}

function Lightning({
  start,
  end,
  delay = 0,
}: {
  start: THREE.Vector3
  end: THREE.Vector3
  delay?: number
}) {
  const lineRef = useRef<Line2Impl>(null)
  const age = useRef(0)
  const pointsCount = 8

  // Initial points
  const initialPoints = useMemo(() => {
    const pts: THREE.Vector3[] = []
    for (let i = 0; i < pointsCount; i++) {
      pts.push(start.clone().lerp(end, i / (pointsCount - 1)))
    }
    return pts
  }, [start, end])

  useFrame((state, delta) => {
    if (!lineRef.current) return

    age.current += delta

    // Fade in: 0s to 1s
    const fadeIn = Math.min(Math.max((age.current - delay) / 1, 0), 1)

    // Disappear completely after 1.5s
    if (age.current > 1.5) {
      lineRef.current.visible = false
      return
    }

    const opacity = fadeIn

    // Update positions
    const flatPoints: number[] = []
    for (let i = 0; i < pointsCount; i++) {
      const t = i / (pointsCount - 1)
      const x = THREE.MathUtils.lerp(start.x, end.x, t)
      const y = THREE.MathUtils.lerp(start.y, end.y, t)
      const z = THREE.MathUtils.lerp(start.z, end.z, t)

      if (i !== 0 && i !== pointsCount - 1) {
        const jitter = 0.1
        flatPoints.push(
          x + (Math.random() - 0.5) * jitter,
          y + (Math.random() - 0.5) * jitter,
          z + (Math.random() - 0.5) * jitter
        )
      } else {
        flatPoints.push(x, y, z)
      }
    }

    // Update geometry
    if (lineRef.current.geometry) {
      lineRef.current.geometry.setPositions(flatPoints)
    }

    // Flicker opacity
    if (lineRef.current.material) {
      lineRef.current.material.opacity = opacity * (Math.random() > 0.5 ? 1 : 0.3)
    }
  })

  return (
    <Line
      ref={lineRef}
      points={initialPoints}
      color="#00f0ff"
      lineWidth={4}
      transparent
      opacity={0}
    />
  )
}

function ElectricEffect({ position }: { position: [number, number, number] }) {
  const node1 = useMemo(() => new THREE.Vector3(-0.3, 0, 0), [])
  const node2 = useMemo(() => new THREE.Vector3(0.3, 0, 0), [])

  return (
    <group position={position}>
      <Lightning start={node1} end={node2} />
      <Lightning start={node1} end={node2} delay={0.1} />
    </group>
  )
}

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

function CubeGroup({
  texture,
  texturePath,
  position,
  lookAtTarget,
  onRef,
}: {
  texture: THREE.Texture
  texturePath: string
  position: [number, number, number]
  lookAtTarget: [number, number, number]
  onRef: (el: THREE.Object3D | null) => void
}) {
  const groupRef = useRef<THREE.Group>(null)
  const meshRef = useRef<THREE.Mesh>(null)
  const backMeshRef = useRef<THREE.Mesh>(null)
  const age = useRef(0)

  const aspect =
    (texture.image as HTMLImageElement).width / (texture.image as HTMLImageElement).height
  const isFacialRecognition = texturePath.includes('facial-recognition')
  const isAds = texturePath.includes('ads')
  const baseScale = 0.65
  const scale = isFacialRecognition ? baseScale * 1.33 : baseScale
  const w = aspect > 1 ? scale : scale * aspect
  const h = aspect > 1 ? scale / aspect : scale

  useFrame((state, delta) => {
    age.current += delta

    // Cube opacity: 0.5s to 1.5s
    const opacity = Math.max(0, Math.min(1, (age.current - 0.5) / 1.0))

    if (meshRef.current) {
      const mat = meshRef.current.material as THREE.MeshStandardMaterial
      mat.opacity = opacity
    }
    if (backMeshRef.current) {
      const mat = backMeshRef.current.material as THREE.MeshStandardMaterial
      mat.opacity = opacity
    }

    if (groupRef.current) {
      groupRef.current.lookAt(...lookAtTarget)
    }
  })

  return (
    <group ref={groupRef} position={position}>
      <ElectricEffect position={[0, 0, 0]} />
      {isAds ? (
        <group
          ref={(el) => {
            onRef(el)
          }}
        >
          <mesh ref={meshRef} castShadow receiveShadow>
            <planeGeometry args={[w, h]} />
            <meshStandardMaterial
              map={texture}
              color="#ffffff"
              transparent
              opacity={0}
              side={THREE.FrontSide}
            />
          </mesh>
          <mesh ref={backMeshRef} castShadow receiveShadow rotation={[0, 0, 0]} scale={[-1, 1, 1]}>
            <planeGeometry args={[w, h]} />
            <meshStandardMaterial
              map={texture}
              color="#ffffff"
              transparent
              opacity={0}
              side={THREE.BackSide}
            />
          </mesh>
        </group>
      ) : (
        <mesh
          ref={(el) => {
            meshRef.current = el
            onRef(el)
          }}
          castShadow
          receiveShadow
        >
          <planeGeometry args={[w, h]} />
          <meshStandardMaterial
            map={texture}
            color="#ffffff"
            transparent
            opacity={0}
            side={THREE.DoubleSide}
          />
        </mesh>
      )}
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
  const [appearingCubes, setAppearingCubes] = useState<boolean[]>(new Array(6).fill(false))
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
  ]
  const textures = useTexture(texturePaths)
  useMemo(() => textures.forEach((t) => (t.colorSpace = THREE.SRGBColorSpace)), [textures])

  useEffect(() => {
    const timer = setTimeout(() => {
      setAppearingCubes(new Array(6).fill(true))
    }, 4000)

    return () => clearTimeout(timer)
  }, [])

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
    }, 550)
    return () => clearTimeout(timer)
  }, [slashTrigger])

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.665
      groupRef.current.updateMatrixWorld(true)

      cubesRef.current.forEach((cube, i) => {
        if (cube) {
          cube.getWorldPosition(vec)
          const angle = Math.atan2(vec.z, vec.x)

          // Active section: Front (Z+) rotated 1/12 CCW then 1/24 CW
          // Net rotation: PI/6 - PI/12 = PI/12 CCW from original Front (PI/2)
          // Center: PI/2 + PI/12 = 7PI/12
          // Range: [7PI/12 - PI/6, 7PI/12 + PI/6] => [5PI/12, 3PI/4]
          const isActive = angle > (5 * Math.PI) / 12 && angle < (3 * Math.PI) / 4

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
          if (!visibleCubes[i] || !appearingCubes[i]) return null
          const angle = (i / 6) * Math.PI * 2
          const x = Math.cos(angle) * radius
          const z = Math.sin(angle) * radius

          return (
            <CubeGroup
              key={i}
              texture={textures[i]}
              texturePath={texturePaths[i]}
              position={[x, yPos, z]}
              lookAtTarget={[0, yPos, 0]}
              onRef={(el) => (cubesRef.current[i] = el)}
            />
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
  onFirstIdleCycleEnd,
}: {
  currentAnimation: string
  onAnimationEnd: () => void
  onFirstIdleCycleEnd?: () => void
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
      if (idleAlertAction) {
        idleAlertAction.reset().fadeIn(0.2).play()
        if (onFirstIdleCycleEnd) {
          const duration = idleAlertAction.getClip().duration
          const timer = setTimeout(onFirstIdleCycleEnd, (duration / 2) * 1000)
          return () => clearTimeout(timer)
        }
      }
    } else if (currentAnimation === 'idle-still') {
      if (slashAction) slashAction.fadeOut(0.2)
      if (powerUpAction) powerUpAction.fadeOut(0.2)
      if (idleAlertAction) idleAlertAction.fadeOut(0.2)
      if (idleStillAction) idleStillAction.reset().fadeIn(0.2).play()
    } else if (currentAnimation === 'slash') {
      if (idleAlertAction) idleAlertAction.fadeOut(0.2)
      if (idleStillAction) idleStillAction.fadeOut(0.2)
      if (slashAction) {
        slashAction
          .reset()
          .setLoop(THREE.LoopOnce, 1)
          .fadeIn(0.2)
          .setEffectiveTimeScale(1.25)
          .play()
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
  }, [currentAnimation, actions, mixer, onAnimationEnd, onFirstIdleCycleEnd])

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

  return (
    <primitive
      object={clone}
      ref={ref}
      position={[0, 0, 0]}
      rotation={[0, -0.2, 0]}
      scale={[1, 1, 1]}
    />
  )
}

function Floor() {
  const texture = useTexture('/static/images/circuit-background-flipped-double.webp')
  return (
    <mesh rotation={[-Math.PI / 2, 0, -0.4]} position={[0, 0, 0]} receiveShadow>
      <planeGeometry args={[20, 10]} />
      <meshStandardMaterial map={texture} transparent />
    </mesh>
  )
}

function CameraHandler() {
  const { camera } = useThree()
  useEffect(() => {
    camera.lookAt(0, 0.67, 0)
  }, [camera])
  return null
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
      className={`pointer-events-none absolute inset-0 z-50 flex items-center justify-center ${
        finished ? 'bg-transparent' : 'bg-black'
      }`}
    >
      {/* Left Curtain */}
      <div
        className={`absolute top-0 left-0 h-full w-1/2 bg-black transition-transform duration-1000 ease-in-out ${
          finished ? '-translate-x-full' : 'translate-x-0'
        }`}
      />

      {/* Right Curtain */}
      <div
        className={`absolute top-0 right-0 h-full w-1/2 bg-black transition-transform duration-1000 ease-in-out ${
          finished ? 'translate-x-full' : 'translate-x-0'
        }`}
      />

      {/* Loading Bar */}
      <div
        className={`relative z-60 flex flex-col items-center gap-4 transition-opacity duration-500 ${
          finished ? 'opacity-0' : 'opacity-100'
        }`}
      >
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

export default function ThreeScene({ className }: { className?: string }) {
  const [animation, setAnimation] = useState('idle-still')
  const [slashTrigger, setSlashTrigger] = useState(0)
  const [resetKey, setResetKey] = useState(0)
  const [buttonVisible, setButtonVisible] = useState(false)
  const gameOverRef = useRef(false)

  const handleAnimationEnd = useCallback(() => {
    setAnimation((prev) => {
      if (prev === 'power-up') {
        return 'idle-still'
      } else {
        return 'idle'
      }
    })
  }, [])

  const handleFirstIdleCycleEnd = useCallback(() => {
    setButtonVisible(true)
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimation((prev) => (prev === 'idle-still' ? 'idle' : prev))
    }, 5000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className={className || 'relative h-[500px] w-full'}>
      <LoadingScreen />
      <Canvas
        shadows
        gl={{ alpha: true }}
        camera={{ position: [-2.5, 2.0, 6], fov: 40 }}

        // fog={{ color: '#000612', near: 5, far: 20 }}
      >
        <color attach="background" args={['#000612']} />
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
            onAnimationEnd={handleAnimationEnd}
            onFirstIdleCycleEnd={handleFirstIdleCycleEnd}
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
      <div className="absolute bottom-0 left-0 z-40 w-full bg-gradient-to-t from-black/50 to-transparent pt-32 pb-4 text-center">
        <div className="flex justify-center pb-4">
          <Image
            src="/static/images/DK-logo-full-text-blue.webp"
            alt="Digital Knights"
            width={600}
            height={150}
            className="h-auto w-full max-w-[300px] md:max-w-[500px]"
            priority
          />
        </div>
        <p className="text-2xl leading-7 font-medium text-gray-300">
          Cybersecurity for kids, teens and parents
        </p>
      </div>
      <div className="absolute bottom-60 left-1/2 z-41 -translate-x-1/2 transform">
        <button
          disabled={!buttonVisible || animation !== 'idle' || gameOverRef.current}
          onClick={() => {
            setAnimation('slash')
            setSlashTrigger(Date.now())
          }}
          className={`flex items-center gap-3 rounded-full border-2 bg-black/50 px-4 py-2 text-lg font-bold ${
            !buttonVisible || animation !== 'idle' || gameOverRef.current
              ? 'cursor-not-allowed border-gray-500 text-gray-500 opacity-0'
              : 'cursor-pointer border-[#00f0ff] text-[#00f0ff] opacity-100 hover:bg-black/70'
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
