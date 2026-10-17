"use client";

import { useId } from "react";
import { m } from "motion/react";

export type RouteKey = "all" | "jaisalmer" | "udaipur" | "osian" | "jaipur" | "mount-abu" | "nakodaji";

interface HeroRouteBackdropProps {
  activeRoute?: RouteKey;
}

export function HeroRouteBackdrop({ activeRoute = "all" }: HeroRouteBackdropProps) {
  const uid = useId();

  // Highway corridors radiating from Jodhpur Dispatch Hub (cx: 735, cy: 435)
  // Perfectly positioned in the spatial gap between left content and right booking card
  const corridors = [
    {
      id: "jaisalmer",
      name: "JAISALMER",
      distance: "285 KM · NH-125",
      path: "M 735 435 C 520 510, 260 460, 65 390",
      destX: 65,
      destY: 390,
      textAnchor: "start" as const,
      textOffsetX: 16,
      textOffsetY: 4,
    },
    {
      id: "osian",
      name: "OSIAN DUNES",
      distance: "65 KM · NH-62",
      path: "M 735 435 C 770 300, 830 180, 880 75",
      destX: 880,
      destY: 75,
      textAnchor: "middle" as const,
      textOffsetX: 0,
      textOffsetY: -14,
    },
    {
      id: "jaipur",
      name: "JAIPUR",
      distance: "335 KM · NH-25 / 48",
      path: "M 735 435 C 920 350, 1120 260, 1360 190",
      destX: 1360,
      destY: 190,
      textAnchor: "end" as const,
      textOffsetX: -16,
      textOffsetY: 4,
    },
    {
      id: "udaipur",
      name: "UDAIPUR",
      distance: "255 KM · NH-62",
      path: "M 735 435 C 870 510, 1040 600, 1220 700",
      destX: 1220,
      destY: 700,
      textAnchor: "end" as const,
      textOffsetX: -16,
      textOffsetY: 4,
    },
    {
      id: "mount-abu",
      name: "MOUNT ABU",
      distance: "265 KM · NH-27",
      path: "M 735 435 C 600 540, 480 630, 370 710",
      destX: 370,
      destY: 710,
      textAnchor: "middle" as const,
      textOffsetX: 0,
      textOffsetY: 20,
    },
    {
      id: "nakodaji",
      name: "NAKODA JI",
      distance: "115 KM · SH-65",
      path: "M 735 435 C 500 510, 280 550, 85 580",
      destX: 85,
      destY: 580,
      textAnchor: "start" as const,
      textOffsetX: 16,
      textOffsetY: 4,
    },
  ];

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden select-none"
    >
      <svg
        viewBox="0 0 1440 760"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-full object-cover"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* Radial gold underglow centered at Jodhpur hub */}
          <radialGradient
            id={`${uid}-hub-light`}
            cx="735"
            cy="435"
            r="650"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#C8962E" stopOpacity="0.28" />
            <stop offset="35%" stopColor="#EA761F" stopOpacity="0.09" />
            <stop offset="70%" stopColor="#0B172A" stopOpacity="0.02" />
            <stop offset="100%" stopColor="#0B172A" stopOpacity="0" />
          </radialGradient>

          {/* Golden Highway Glow Filter */}
          <filter id={`${uid}-glow`} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Coordinate Cartography Grid */}
          <pattern
            id={`${uid}-geo-grid`}
            width="90"
            height="90"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 90 0 L 0 0 0 90"
              fill="none"
              stroke="#C8962E"
              strokeWidth="0.5"
              strokeOpacity="0.06"
            />
            {/* Fine coordinate crosshair */}
            <path
              d="M 45 40 L 45 50 M 40 45 L 50 45"
              stroke="#E5B84B"
              strokeWidth="0.6"
              strokeOpacity="0.12"
            />
          </pattern>
        </defs>

        {/* Ambient Grid and Radial Glow */}
        <rect width="1440" height="760" fill={`url(#${uid}-hub-light)`} />
        <rect width="1440" height="760" fill={`url(#${uid}-geo-grid)`} />

        {/* Topographic Elevation Curves (Simulating Thar dunes and Aravalli ranges) */}
        <g stroke="#C8962E" strokeOpacity="0.06" strokeWidth="1" fill="none">
          <ellipse cx="735" cy="435" rx="150" ry="95" />
          <ellipse cx="735" cy="435" rx="290" ry="185" strokeDasharray="3 4" />
          <ellipse cx="735" cy="435" rx="470" ry="300" strokeDasharray="6 8" />
          <ellipse cx="735" cy="435" rx="700" ry="430" strokeOpacity="0.04" />
        </g>

        {/* Terrain Contours */}
        <g stroke="#E5B84B" strokeOpacity="0.05" strokeWidth="0.75" fill="none">
          <path d="M 40 120 Q 340 70 640 110 T 1150 80 T 1400 120" />
          <path d="M 20 220 Q 300 190 600 210 T 1100 180 T 1420 210" strokeDasharray="4 6" />
          <path d="M 60 620 Q 360 650 660 600 T 1140 640 T 1420 600" />
        </g>

        {/* Technical Perimeter Coordinates (Automotive Instrument Style) */}
        <text
          x="48"
          y="42"
          fill="#94A3B8"
          opacity="0.5"
          fontSize="10"
          fontFamily="ui-monospace, monospace"
          letterSpacing="1"
        >
          MARWAR CORRIDOR TELEMETRY · 26°17&apos;12&quot;N 73°01&apos;45&quot;E
        </text>
        <text
          x="1392"
          y="42"
          textAnchor="end"
          fill="#E5B84B"
          opacity="0.55"
          fontSize="10"
          fontFamily="ui-monospace, monospace"
          letterSpacing="1"
        >
          DISPATCH RADIUS: 350+ KM · 24×7 DISPATCH
        </text>

        {/* Illustrated Highway Corridors */}
        {corridors.map((c) => {
          const isSelected = activeRoute === c.id || activeRoute === "all";
          const isFocal = activeRoute === c.id;

          return (
            <g key={c.id}>
              {/* Outer Highway Path Line */}
              <path
                d={c.path}
                stroke={isFocal ? "#E5B84B" : isSelected ? "#C8962E" : "#475569"}
                strokeOpacity={isFocal ? "0.95" : isSelected ? "0.3" : "0.12"}
                strokeWidth={isFocal ? "2.5" : "1.25"}
                strokeDasharray={isFocal ? "none" : "5 5"}
                fill="none"
                filter={isFocal ? `url(#${uid}-glow)` : undefined}
                className="transition-all duration-300"
              />

              {/* Dynamic Light Pulse Trailing Along the Route */}
              {(isFocal || activeRoute === "all") && (
                <m.path
                  d={c.path}
                  stroke={isFocal ? "#FFFFFF" : "#E5B84B"}
                  strokeWidth={isFocal ? "2.5" : "1.25"}
                  strokeDasharray="16 110"
                  animate={{ strokeDashoffset: [-126, 0] }}
                  transition={{
                    repeat: Infinity,
                    duration: isFocal ? 1.6 : 3.8,
                    ease: "linear",
                  }}
                  fill="none"
                  strokeOpacity={isFocal ? "1" : "0.45"}
                />
              )}

              {/* Destination Beacon Node */}
              <circle
                cx={c.destX}
                cy={c.destY}
                r={isFocal ? 5.5 : 3.5}
                fill={isFocal ? "#E5B84B" : "#94A3B8"}
                stroke="#0B172A"
                strokeWidth="2"
                opacity={isFocal ? "1" : "0.75"}
              />

              {/* Subtle Pulsing Halo around Destination if Active */}
              {isFocal && (
                <circle
                  cx={c.destX}
                  cy={c.destY}
                  r="12"
                  fill="none"
                  stroke="#E5B84B"
                  strokeWidth="1.2"
                  opacity="0.6"
                >
                  <animate
                    attributeName="r"
                    values="5;14;5"
                    dur="2.4s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity"
                    values="0.8;0.1;0.8"
                    dur="2.4s"
                    repeatCount="indefinite"
                  />
                </circle>
              )}

              {/* Destination Monospace Coordinate Label */}
              <g transform={`translate(${c.destX + c.textOffsetX}, ${c.destY + c.textOffsetY})`}>
                <text
                  x="0"
                  y="0"
                  textAnchor={c.textAnchor}
                  fill={isFocal ? "#FFFFFF" : "#CBD5E1"}
                  fontSize={isFocal ? "11.5" : "10"}
                  fontWeight={isFocal ? "800" : "600"}
                  fontFamily="ui-monospace, monospace"
                  letterSpacing="0.8"
                  opacity={isFocal ? "1" : "0.75"}
                >
                  {c.name}
                </text>
                <text
                  x="0"
                  y="12"
                  textAnchor={c.textAnchor}
                  fill={isFocal ? "#E5B84B" : "#64748B"}
                  fontSize="8.5"
                  fontWeight="600"
                  fontFamily="ui-monospace, monospace"
                  opacity={isFocal ? "1" : "0.55"}
                >
                  {c.distance}
                </text>
              </g>
            </g>
          );
        })}

        {/* Central Origin Hub: JODHPUR */}
        <g>
          {/* Subtle Radar Ring Radiating from Hub */}
          <circle cx="735" cy="435" r="28" fill="#C8962E" opacity="0.12">
            <animate
              attributeName="r"
              values="16;42;16"
              dur="4s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values="0.25;0.02;0.25"
              dur="4s"
              repeatCount="indefinite"
            />
          </circle>

          {/* Central Hub Core Pin */}
          <circle
            cx="735"
            cy="435"
            r="7"
            fill="#C8962E"
            stroke="#FFFFFF"
            strokeWidth="2"
            filter={`url(#${uid}-glow)`}
          />
          <circle cx="735" cy="435" r="2.5" fill="#0B172A" />

          {/* Sleek Hub Coordinate Badge */}
          <text
            x="735"
            y="457"
            textAnchor="middle"
            fill="#E5B84B"
            fontSize="8"
            fontWeight="700"
            fontFamily="ui-monospace, monospace"
            letterSpacing="0.8"
            opacity="0.8"
          >
            JODHPUR DISPATCH BASE
          </text>
        </g>
      </svg>
    </div>
  );
}
