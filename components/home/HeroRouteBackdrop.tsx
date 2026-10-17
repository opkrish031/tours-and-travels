"use client";

import { useId } from "react";
import { m } from "motion/react";

export type RouteKey = "all" | "jaisalmer" | "udaipur" | "osian" | "jaipur" | "mount-abu" | "nakodaji";

interface HeroRouteBackdropProps {
  activeRoute?: RouteKey;
}

export function HeroRouteBackdrop({ activeRoute = "all" }: HeroRouteBackdropProps) {
  const uid = useId();

  // Highway corridors mapped from Jodhpur origin (cx: 640, cy: 380)
  const corridors = [
    {
      id: "jaisalmer",
      name: "JAISALMER",
      distance: "285 KM · 4.5H",
      highway: "NH-125 / NH-11",
      path: "M 640 380 C 480 360, 340 310, 180 240",
      destX: 180,
      destY: 240,
      midX: 390,
      midY: 325,
      midLabel: "Pokhran Halt",
    },
    {
      id: "osian",
      name: "OSIAN DESERT",
      distance: "65 KM · 1.2H",
      highway: "NH-62",
      path: "M 640 380 C 640 280, 630 200, 620 110",
      destX: 620,
      destY: 110,
      midX: 632,
      midY: 240,
      midLabel: "Mathania",
    },
    {
      id: "jaipur",
      name: "JAIPUR",
      distance: "335 KM · 5.5H",
      highway: "NH-25 / NH-48",
      path: "M 640 380 C 820 350, 980 320, 1220 250",
      destX: 1220,
      destY: 250,
      midX: 950,
      midY: 320,
      midLabel: "Ajmer / Pushkar",
    },
    {
      id: "udaipur",
      name: "UDAIPUR",
      distance: "255 KM · 5.0H",
      highway: "NH-62 via Ranakpur",
      path: "M 640 380 C 720 470, 780 540, 870 650",
      destX: 870,
      destY: 650,
      midX: 745,
      midY: 510,
      midLabel: "Ranakpur Temple",
    },
    {
      id: "mount-abu",
      name: "MOUNT ABU",
      distance: "265 KM · 4.5H",
      highway: "NH-62 / NH-27",
      path: "M 640 380 C 580 500, 500 580, 420 670",
      destX: 420,
      destY: 670,
      midX: 520,
      midY: 560,
      midLabel: "Sirohi Ghats",
    },
    {
      id: "nakodaji",
      name: "NAKODA JI",
      distance: "115 KM · 2.2H",
      highway: "SH-65",
      path: "M 640 380 C 500 420, 390 460, 270 490",
      destX: 270,
      destY: 490,
      midX: 420,
      midY: 435,
      midLabel: "Balotra",
    },
  ];

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
    >
      <svg
        viewBox="0 0 1440 760"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-full object-cover opacity-35 sm:opacity-45 md:opacity-55"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* Radial gold gradient centered at Jodhpur hub */}
          <radialGradient
            id={`${uid}-hub-light`}
            cx="640"
            cy="380"
            r="600"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#C8962E" stopOpacity="0.22" />
            <stop offset="35%" stopColor="#EA761F" stopOpacity="0.08" />
            <stop offset="75%" stopColor="#0B172A" stopOpacity="0.02" />
            <stop offset="100%" stopColor="#0B172A" stopOpacity="0" />
          </radialGradient>

          {/* Topographic glow filter */}
          <filter id={`${uid}-glow`} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* High-precision latitude/longitude grid */}
          <pattern
            id={`${uid}-geo-grid`}
            width="80"
            height="80"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 80 0 L 0 0 0 80"
              fill="none"
              stroke="#C8962E"
              strokeWidth="0.5"
              strokeOpacity="0.08"
            />
            <circle cx="80" cy="80" r="0.75" fill="#E5B84B" fillOpacity="0.2" />
          </pattern>
        </defs>

        {/* Ambient Gradient & Grid Fill */}
        <rect width="1440" height="760" fill={`url(#${uid}-hub-light)`} />
        <rect width="1440" height="760" fill={`url(#${uid}-geo-grid)`} />

        {/* Topographic Contour Rings radiating from Jodhpur */}
        <g stroke="#C8962E" strokeOpacity="0.07" strokeWidth="1" fill="none">
          <ellipse cx="640" cy="380" rx="160" ry="100" />
          <ellipse cx="640" cy="380" rx="320" ry="200" strokeDasharray="3 3" />
          <ellipse cx="640" cy="380" rx="520" ry="320" strokeDasharray="6 6" />
          <ellipse cx="640" cy="380" rx="720" ry="440" strokeOpacity="0.04" />
        </g>

        {/* Elevation Lines simulating Thar desert terrain & Aravalli ridges */}
        <g stroke="#E5B84B" strokeOpacity="0.06" strokeWidth="0.8" fill="none">
          <path d="M 60 140 Q 300 80 580 120 T 1100 90 T 1400 130" />
          <path d="M 40 280 Q 260 250 540 270 T 1050 240 T 1420 270" strokeDasharray="4 6" />
          <path d="M 80 560 Q 380 590 680 540 T 1180 580 T 1420 540" />
          <path d="M 120 700 Q 420 730 760 690 T 1250 720" strokeDasharray="2 4" />
        </g>

        {/* Technical Coordinate Telemetry */}
        <text x="60" y="55" fill="#A3B3CA" opacity="0.45" fontSize="11" fontFamily="monospace">
          26°17&apos;12&quot;N · 73°01&apos;45&quot;E [MARWAR HIGHWAY SECTOR]
        </text>
        <text x="1180" y="55" fill="#E5B84B" opacity="0.6" fontSize="11" fontFamily="monospace">
          DISPATCH RADIUS: 350+ KM
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
                strokeOpacity={isFocal ? "0.9" : isSelected ? "0.35" : "0.15"}
                strokeWidth={isFocal ? "3" : "1.75"}
                strokeDasharray={isFocal ? "none" : "6 4"}
                fill="none"
                filter={isFocal ? `url(#${uid}-glow)` : undefined}
                className="transition-all duration-300"
              />

              {/* Animated Light Pulses on Active / Highlighted Corridor */}
              {(isFocal || activeRoute === "all") && (
                <m.path
                  d={c.path}
                  stroke={isFocal ? "#FFFFFF" : "#E5B84B"}
                  strokeWidth={isFocal ? "2.5" : "1.5"}
                  strokeDasharray="14 120"
                  animate={{ strokeDashoffset: [-134, 0] }}
                  transition={{
                    repeat: Infinity,
                    duration: isFocal ? 1.8 : 3.5,
                    ease: "linear",
                  }}
                  fill="none"
                  strokeOpacity={isFocal ? "1" : "0.55"}
                />
              )}

              {/* Highway Route Number Label along curve */}
              <text
                x={c.midX}
                y={c.midY - 10}
                textAnchor="middle"
                fill={isFocal ? "#FFFFFF" : "#E5B84B"}
                opacity={isFocal ? "0.9" : "0.4"}
                fontSize="9.5"
                fontFamily="monospace"
                fontWeight="600"
                letterSpacing="0.5"
              >
                {c.highway}
              </text>

              {/* Waypoint Halt Node */}
              <circle
                cx={c.midX}
                cy={c.midY}
                r={isFocal ? 3.5 : 2}
                fill={isFocal ? "#E5B84B" : "#A3B3CA"}
                opacity={isFocal ? "0.95" : "0.4"}
              />

              {/* Destination Beacon Node */}
              <circle
                cx={c.destX}
                cy={c.destY}
                r={isFocal ? 6 : 4}
                fill={isFocal ? "#E5B84B" : "#CBD5E1"}
                stroke="#0B172A"
                strokeWidth="2"
                opacity={isFocal ? "1" : "0.75"}
              />

              {/* Destination Text Pill */}
              <g transform={`translate(${c.destX}, ${c.destY})`}>
                <text
                  x={c.destX > 640 ? 12 : -12}
                  y="-8"
                  textAnchor={c.destX > 640 ? "start" : "end"}
                  fill={isFocal ? "#FFFFFF" : "#E2E8F0"}
                  fontSize="11.5"
                  fontWeight="800"
                  fontFamily="sans-serif"
                  letterSpacing="0.5"
                  opacity={isFocal ? "1" : "0.85"}
                >
                  {c.name}
                </text>
                <text
                  x={c.destX > 640 ? 12 : -12}
                  y="6"
                  textAnchor={c.destX > 640 ? "start" : "end"}
                  fill={isFocal ? "#E5B84B" : "#94A3B8"}
                  fontSize="9"
                  fontWeight="600"
                  fontFamily="monospace"
                  opacity={isFocal ? "1" : "0.6"}
                >
                  {c.distance}
                </text>
              </g>
            </g>
          );
        })}

        {/* Central Origin Hub: JODHPUR */}
        <g>
          {/* Subtle Radar Ring */}
          <circle cx="640" cy="380" r="32" fill="#C8962E" opacity="0.12">
            <animate
              attributeName="r"
              values="20;46;20"
              dur="4s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values="0.25;0.03;0.25"
              dur="4s"
              repeatCount="indefinite"
            />
          </circle>

          {/* Central Origin Pin */}
          <circle
            cx="640"
            cy="380"
            r="10"
            fill="#C8962E"
            stroke="#FFFFFF"
            strokeWidth="2.5"
            filter={`url(#${uid}-glow)`}
          />
          <circle cx="640" cy="380" r="3.5" fill="#0B172A" />

          {/* Origin Hub Callout Tag */}
          <rect
            x="565"
            y="404"
            width="150"
            height="32"
            rx="16"
            fill="#0B172A"
            stroke="#E5B84B"
            strokeWidth="1.25"
            strokeOpacity="0.8"
          />
          <text
            x="640"
            y="420"
            textAnchor="middle"
            fill="#FFFFFF"
            fontSize="11"
            fontWeight="800"
            letterSpacing="0.8"
            fontFamily="sans-serif"
          >
            📍 JODHPUR BASE
          </text>
          <text
            x="640"
            y="431"
            textAnchor="middle"
            fill="#E5B84B"
            fontSize="7.5"
            fontWeight="600"
            letterSpacing="0.5"
            fontFamily="monospace"
          >
            AIRPORT & JUNCTION DISPATCH
          </text>
        </g>
      </svg>
    </div>
  );
}
