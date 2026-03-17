import React from 'react'

const RaspberryPi = () => (
  <g transform="translate(50, 50)">
    <rect x="0" y="0" width="200" height="140" rx="10" fill="#4B9B4B" /> {/* PCB */}
    <rect x="10" y="10" width="40" height="40" fill="#C0C0C0" /> {/* USB */}
    <rect x="10" y="90" width="40" height="40" fill="#C0C0C0" /> {/* Ethernet */}
    <rect x="80" y="40" width="60" height="60" fill="#333" /> {/* CPU */}
    <rect x="160" y="30" width="40" height="80" fill="#333" /> {/* GPIO */}
  </g>
)

const LED = () => (
  <g transform="translate(260, 60)">
    <circle cx="15" cy="15" r="15" fill="#FF0000" className="animate-pulse" />
    <line x1="15" y1="30" x2="15" y2="60" stroke="#999" strokeWidth="4" />
    <line x1="25" y1="30" x2="35" y2="60" stroke="#999" strokeWidth="4" />
    <text x="0" y="80" fontSize="12" fill="currentColor">
      LED
    </text>
  </g>
)

const Motor = () => (
  <g transform="translate(260, 140)">
    <circle cx="20" cy="20" r="20" fill="#666" />
    <rect x="15" y="40" width="10" height="20" fill="#999" />
    <text x="0" y="80" fontSize="12" fill="currentColor">
      Motor
    </text>
  </g>
)

const Speaker = () => (
  <g transform="translate(180, 200)">
    <circle cx="30" cy="30" r="30" fill="#222" />
    <circle cx="30" cy="30" r="10" fill="#444" />
    <text x="5" y="70" fontSize="12" fill="currentColor">
      Speaker
    </text>
  </g>
)

const Sensors = () => (
  <g transform="translate(50, 200)">
    <rect x="0" y="0" width="30" height="30" fill="#FFA500" />
    <text x="0" y="45" fontSize="12" fill="currentColor">
      Sensors
    </text>
  </g>
)

const MicCamera = () => (
  <g transform="translate(100, 200)">
    <circle cx="15" cy="15" r="10" fill="#555" />
    <rect x="40" y="0" width="20" height="30" fill="#777" />
    <text x="0" y="45" fontSize="12" fill="currentColor">
      Mic/Cam
    </text>
  </g>
)

const Connectivity = () => (
  <g transform="translate(20, 20)">
    <path d="M10,20 Q30,0 50,20" fill="none" stroke="#00BFFF" strokeWidth="3" />
    <path d="M20,25 Q30,15 40,25" fill="none" stroke="#00BFFF" strokeWidth="3" />
    <circle cx="30" cy="30" r="3" fill="#00BFFF" />
    <text x="10" y="50" fontSize="10" fill="#00BFFF">
      Wi-Fi/BT
    </text>
  </g>
)

const ScreenGPS = () => (
  <g transform="translate(50, 50)">
    <rect x="0" y="0" width="200" height="140" fill="#111" opacity="0.8" />
    <text x="60" y="70" fontSize="20" fill="#FFF">
      Touch Screen
    </text>
    <text x="170" y="20" fontSize="10" fill="#FFD700">
      GPS
    </text>
  </g>
)

const SimCard = () => (
  <g transform="translate(260, 10)">
    <rect x="0" y="0" width="20" height="30" fill="#FFD700" />
    <path d="M0,0 L10,0 L0,10 Z" fill="#FFF" />
    <text x="0" y="45" fontSize="10" fill="currentColor">
      SIM
    </text>
  </g>
)

const Case = () => (
  <rect x="10" y="10" width="320" height="400" rx="30" fill="none" stroke="#333" strokeWidth="10" />
)

export default function PhoneVisual({ step }: { step: number }) {
  // Logic to determine what to show based on step
  // Step 1 & 2: Maybe just abstract blocks or empty
  // Step 3: Pi + LED
  // Step 4: + Motor + Speaker
  // ...

  if (step < 3)
    return (
      <div className="flex h-64 items-center justify-center rounded-lg border-2 border-dashed border-gray-600 bg-gray-800/50">
        <p className="text-gray-400">Foundational Skills (No Hardware Yet)</p>
      </div>
    )

  return (
    <svg
      viewBox="0 0 400 300"
      className="h-auto w-full rounded-lg bg-gray-100 p-4 shadow-inner dark:bg-gray-800"
    >
      {step >= 10 && <Case />}
      {/* Base components showing up from step 3 */}
      <RaspberryPi />

      {step >= 3 && <LED />}
      {step >= 4 && (
        <>
          <Motor />
          <Speaker />
        </>
      )}
      {step >= 5 && <Sensors />}
      {step >= 6 && <MicCamera />}
      {step >= 7 && <Connectivity />}
      {step >= 8 && <ScreenGPS />}
      {step >= 9 && <SimCard />}
    </svg>
  )
}
