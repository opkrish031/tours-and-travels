"use client";

import { useId } from "react";
import { m } from "motion/react";

export type RouteId = "jaisalmer" | "udaipur" | "osian" | "jaipur" | "mount-abu" | "nakodaji";

interface HeroRouteIllustrationProps {
  activeRoute: RouteId;
  onSelectRoute?: (route: RouteId) => void;
  className?: string;
}

export function HeroRouteIllustration({
  activeRoute,
  onSelectRoute,
  className = "",
}: HeroRouteIllustrationProps) {
  const uid = useId();

  // Route definitions with real geographic vectors relative to Jodhpur (480, 320)
  const corridors = [
    {
      id: "jaisalmer" as RouteId,
      name: "Jaisalmer",
      subtitle: "Sam Sand Dunes",
      distance: "285 KM",
      time: "4.5h",
      highway: "NH-125 / NH-11",
      path: "M 480 320 Q 350 300 280 260 T 120 210",
      destX: 120,
      destY: 210,
      midX: 280,
      midY: 255,
      midLabel: "Pokhran",
    },
    {
      id: "osian" as RouteId,
      name: "Osian",
      subtitle: "Desert Oasis",
      distance: "65 KM",
      time: "1.2h",
      highway: "NH-62",
      path: "M 480 320 Q 480 230 475 140",
      destX: 475,
      destY: 140,
      midX: 478,
      midY: 220,
      midLabel: "Mathania",
    },
    {
      id: "jaipur" as RouteId,
      name: "Jaipur",
      subtitle: "Pink City Corridor",
      distance: "335 KM",
      time: "5.5h",
      highway: "NH-25 / NH-48",
      path: "M 480 320 Q 610 300 680 270 T 840 220",
      destX: 840,
      destY: 220,
      midX: 680,
      midY: 265,
      midLabel: "Ajmer / Pushkar",
    },
    {
      id: "udaipur" as RouteId,
      name: "Udaipur",
      subtitle: "via Ranakpur Ghats",
      distance: "255 KM",
      time: "5.0h",
      highway: "NH-62",
      path: "M 480 320 Q 520 400 560 460 T 620 530",
      destX: 620,
      destY: 530,
      midX: 540,
      midY: 425,
      midLabel: "Ranakpur",
    },
    {
      id: "mount-abu" as RouteId,
      name: "Mount Abu",
      subtitle: "Hill Station Climb",
      distance: "265 KM",
      time: "4.5h",
      highway: "NH-62 & NH-27",
      path: "M 480 320 Q 440 430 380 490 T 310 540",
      destX: 310,
      destY: 540,
      midX: 385,
      midY: 460,
      midLabel: "Sirohi",
    },
    {
      id: "nakodaji" as RouteId,
      name: "Nakoda Ji",
      subtitle: "Balotra Tirth",
      distance: "115 KM",
      time: "2.2h",
      highway: "State Highway",
      path: "M 480 320 Q 380 360 300 390 T 210 415",
      destX: 210,
      destY: 415,
      midX: 310,
      midY: 380,
      midLabel: "Pachpadra",
    },
  ];

  return (
    <div className={`relative w-full overflow-hidden select-none pointer-events-auto ${className}`}>
      <svg
        viewBox="0 0 960 620"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto max-h-[580px] drop-shadow-2xl"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          {/* Subtle Radial Gradient for Night Canvas */}
          <radialGradient
            id={`${uid}-hub-glow`}
            cx="480"
            cy="320"
            r="380"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#C8962E" stopOpacity="0.18" />
            <stop offset="45%" stopColor="#EA761F" stopOpacity="0.06" />
            <stop offset="100%" stopColor="#0B172A" stopOpacity="0" />
          </radialGradient>

          {/* Active Path Glow Filter */}
          <filter id={`${uid}-gold-glow`} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Coordinate Grid Pattern */}
          <pattern
            id={`${uid}-grid`}
            width="60"
            height="60"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 60 0 L 0 0 0 60"
              fill="none"
              stroke="#C8962E"
              strokeWidth="0.5"
              strokeOpacity="0.07"
            />
            <circle cx="60" cy="60" r="1" fill="#C8962E" fillOpacity="0.15" />
          </pattern>
        </defs>

        {/* Ambient Map Glow */}
        <rect width="960" height="620" fill={`url(#${uid}-hub-glow)`} />
        <rect width="960" height="620" fill={`url(#${uid}-grid)`} />

        {/* Topographic Aesthetic Contour Curves */}
        <g stroke="#C8962E" strokeOpacity="0.08" strokeWidth="1" fill="none">
          <ellipse cx="480" cy="320" rx="140" ry="90" strokeDasharray="3 3" />
          <ellipse cx="480" cy="320" rx="260" ry="170" />
          <ellipse cx="480" cy="320" rx="380" ry="250" strokeDasharray="4 4" />
          <path d="M 100 120 C 300 80, 600 90, 880 140" strokeOpacity="0.05" />
          <path d="M 80 480 C 280 540, 700 550, 900 480" strokeOpacity="0.05" />
        </g>

        {/* Latitude & Longitude Aesthetic Markings */}
        <text x="40" y="45" fill="#A3B3CA" opacity="0.4" fontSize="10" fontFamily="monospace">
          26°17&apos;N · 73°01&apos;E [MARWAR GEOGRAPHIC SECTOR]
        </text>
        <text x="740" y="45" fill="#E5B84B" opacity="0.6" fontSize="10" fontFamily="monospace">
          RADIAL DISPATCH: 15 MIN
        </text>

        {/* Inactive & Active Route Highways */}
        {corridors.map((route) => {
          const isActive = activeRoute === route.id;

          return (
            <g
              key={route.id}
              onClick={() => onSelectRoute?.(route.id)}
              className="cursor-pointer group"
            >
              {/* Thick transparent hit-area for easy hover/click */}
              <path
                d={route.path}
                stroke="transparent"
                strokeWidth="28"
                fill="none"
              />

              {/* Background Path Line */}
              <path
                d={route.path}
                stroke={isActive ? "#E5B84B" : "#A3B3CA"}
                strokeOpacity={isActive ? "0.9" : "0.22"}
                strokeWidth={isActive ? "3" : "1.5"}
                strokeDasharray={isActive ? "none" : "6 4"}
                filter={isActive ? `url(#${uid}-gold-glow)` : undefined}
                className="transition-all duration-300"
              />

              {/* Animated Light Flow on Active Route */}
              {isActive && (
                <m.path
                  d={route.path}
                  stroke="#FFFFFF"
                  strokeWidth="2.5"
                  strokeDasharray="16 120"
                  animate={{ strokeDashoffset: [-136, 0] }}
                  transition={{ repeat: Infinity, duration: 2.2, ease: "linear" }}
                  fill="none"
                />
              )}

              {/* Highway Midway Halt Node */}
              <circle
                cx={route.midX}
                cy={route.midY}
                r={isActive ? 3.5 : 2}
                fill={isActive ? "#E5B84B" : "#A3B3CA"}
                opacity={isActive ? 0.9 : 0.4}
              />
              <text
                x={route.midX}
                y={route.midY - 8}
                textAnchor="middle"
                fill={isActive ? "#FAF7F2" : "#A3B3CA"}
                opacity={isActive ? 0.85 : 0.35}
                fontSize="9"
                fontFamily="sans-serif"
                fontWeight="500"
              >
                {route.midLabel}
              </text>

              {/* Destination Pin Outer Beacon */}
              {isActive && (
                <circle
                  cx={route.destX}
                  cy={route.destY}
                  r="14"
                  fill="#C8962E"
                  opacity="0.25"
                >
                  <animate
                    attributeName="r"
                    values="8;22;8"
                    dur="2.5s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity"
                    values="0.4;0.05;0.4"
                    dur="2.5s"
                    repeatCount="indefinite"
                  />
                </circle>
              )}

              {/* Destination Pin Core */}
              <circle
                cx={route.destX}
                cy={route.destY}
                r={isActive ? 6 : 4}
                fill={isActive ? "#E5B84B" : "#CBD5E1"}
                stroke="#0B172A"
                strokeWidth="2"
                className="transition-all duration-300"
              />

              {/* Destination Name & Distance Badge */}
              <g transform={`translate(${route.destX}, ${route.destY})`}>
                <rect
                  x={route.destX > 500 ? 12 : -112}
                  y="-16"
                  width="100"
                  height="32"
                  rx="6"
                  fill={isActive ? "#132542" : "#0B172A"}
                  stroke={isActive ? "#C8962E" : "#334155"}
                  strokeWidth={isActive ? "1.5" : "1"}
                  className="transition-all duration-300 shadow-md"
                />
                <text
                  x={route.destX > 500 ? 20 : -104}
                  y="-2"
                  fill={isActive ? "#FFFFFF" : "#E2E8F0"}
                  fontSize="11"
                  fontWeight="700"
                  fontFamily="sans-serif"
                >
                  {route.name}
                </text>
                <text
                  x={route.destX > 500 ? 20 : -104}
                  y="10"
                  fill={isActive ? "#E5B84B" : "#94A3B8"}
                  fontSize="9.5"
                  fontWeight="600"
                  fontFamily="monospace"
                >
                  {route.distance} · {route.time}
                </text>
              </g>
            </g>
          );
        })}

        {/* Central Hub: JODHPUR (Origin Base) */}
        <g className="pointer-events-none">
          {/* Outer Pulsing Hub Ring */}
          <circle cx="480" cy="320" r="28" fill="#C8962E" opacity="0.15">
            <animate
              attributeName="r"
              values="18;38;18"
              dur="3s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values="0.3;0.05;0.3"
              dur="3s"
              repeatCount="indefinite"
            />
          </circle>

          {/* Central Gold Beacon Base */}
          <circle
            cx="480"
            cy="320"
            r="10"
            fill="#C8962E"
            stroke="#FFFFFF"
            strokeWidth="2.5"
            filter={`url(#${uid}-gold-glow)`}
          />
          <circle cx="480" cy="320" r="3.5" fill="#0B172A" />

          {/* Central Hub Label Pill */}
          <rect
            x="410"
            y="342"
            width="140"
            height="34"
            rx="17"
            fill="#0B172A"
            stroke="#E5B84B"
            strokeWidth="1.5"
            className="shadow-xl"
          />
          <text
            x="480"
            y="358"
            textAnchor="middle"
            fill="#FFFFFF"
            fontSize="11.5"
            fontWeight="800"
            letterSpacing="0.8"
            fontFamily="sans-serif"
          >
            📍 JODHPUR HUB
          </text>
          <text
            x="480"
            y="370"
            textAnchor="middle"
            fill="#E5B84B"
            fontSize="8.5"
            fontWeight="600"
            letterSpacing="0.5"
            fontFamily="monospace"
          >
            AIRPORT & JUNCTION BASE
          </text>
        </g>
      </svg>
    </div>
  );
}
