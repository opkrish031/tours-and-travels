"use client";

import { useId } from "react";
import { m, useReducedMotion } from "motion/react";

/** Merlon (crenellation) helper — draws raised blocks along a wall top. */
function crenellations(from: number, to: number, y: number, w = 10, h = 8): string {
  let d = "";
  for (let x = from; x < to; x += w * 2) {
    const notch = Math.min(x + w, to);
    d += ` L ${x} ${y} L ${x} ${y - h} L ${notch} ${y - h} L ${notch} ${y}`;
  }
  return d;
}

/**
 * Atmospheric backdrop: Mehrangarh Fort on its hill above the Thar dunes,
 * with the highway curving in. Full-bleed behind hero content on desktop,
 * a quiet panorama band along the bottom on mobile. Decorative only.
 */
export function HeroRouteBackdrop() {
  const uid = useId();
  const reduced = useReducedMotion();

  const routePath = "M 40 728 C 250 708, 470 682, 630 628 C 710 600, 752 584, 788 570";

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-24 overflow-hidden select-none sm:h-36 lg:inset-0 lg:h-auto"
    >
      <svg
        viewBox="0 0 1440 760"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-full"
        preserveAspectRatio="xMidYMax slice"
      >
        <defs>
          <radialGradient
            id={`${uid}-sky`}
            cx="800"
            cy="300"
            r="880"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#C8962E" stopOpacity="0.3" />
            <stop offset="48%" stopColor="#EA761F" stopOpacity="0.09" />
            <stop offset="100%" stopColor="#0B172A" stopOpacity="0" />
          </radialGradient>
          <linearGradient
            id={`${uid}-hill`}
            x1="800"
            y1="560"
            x2="800"
            y2="760"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#13233F" />
            <stop offset="100%" stopColor="#0C1930" />
          </linearGradient>
          <filter id={`${uid}-glow`} x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <rect width="1440" height="760" fill={`url(#${uid}-sky)`} />

        {/* Sun behind the fort */}
        <g stroke="#C8962E" fill="none">
          <circle cx="800" cy="272" r="158" strokeOpacity="0.26" strokeWidth="1" />
          <circle cx="800" cy="272" r="108" strokeOpacity="0.12" strokeWidth="1" strokeDasharray="2 7" />
          <circle cx="800" cy="272" r="52" strokeOpacity="0.08" strokeWidth="1" />
        </g>

        {/* Far dunes */}
        <path
          d="M 0 598 C 170 574, 330 566, 500 582 C 660 598, 790 578, 930 570 C 1100 560, 1280 578, 1440 592"
          stroke="#C8962E"
          strokeOpacity="0.24"
          strokeWidth="1"
        />
        <path
          d="M 0 652 C 210 628, 390 624, 560 642 C 740 662, 900 638, 1080 632 C 1250 626, 1360 642, 1440 650"
          stroke="#C8962E"
          strokeOpacity="0.32"
          strokeWidth="1"
        />

        {/* The hill Mehrangarh sits on — wide ridge across the scene */}
        <path
          d="M 240 760 C 380 736, 500 698, 580 590 L 1020 590 C 1100 656, 1240 720, 1380 760 Z"
          fill={`url(#${uid}-hill)`}
          stroke="#C8962E"
          strokeOpacity="0.48"
          strokeWidth="1.25"
          strokeLinejoin="round"
        />
        <g stroke="#C8962E" strokeOpacity="0.22" strokeWidth="1" fill="none">
          <path d="M 660 612 L 700 590" />
          <path d="M 940 596 L 1000 640" />
          <path d="M 520 668 L 560 632" />
        </g>

        {/* Mehrangarh Fort — wide ridge silhouette */}
        <g>
          {/* Body fill */}
          <path
            d={`M 480 590 L 480 462${crenellations(480, 1060, 462, 12, 9)} L 1060 590 Z`}
            fill="#0E1E38"
            fillOpacity="0.94"
          />

          {/* Left bastion */}
          <path
            d="M 480 590 L 480 418 A 19 19 0 0 1 518 418 L 518 590"
            fill="#0E1E38"
            fillOpacity="0.94"
            stroke="#C8962E"
            strokeOpacity="0.65"
            strokeWidth="1.35"
            strokeLinejoin="round"
          />
          <circle cx="499" cy="430" r="2" fill="#C8962E" fillOpacity="0.6" />

          {/* Mid tower */}
          <path
            d="M 640 590 L 640 438 A 14 14 0 0 1 668 438 L 668 590"
            fill="#0E1E38"
            fillOpacity="0.94"
            stroke="#C8962E"
            strokeOpacity="0.6"
            strokeWidth="1.3"
            strokeLinejoin="round"
          />

          {/* Right bastion */}
          <path
            d="M 1022 590 L 1022 418 A 19 19 0 0 1 1060 418 L 1060 590"
            fill="#0E1E38"
            fillOpacity="0.94"
            stroke="#C8962E"
            strokeOpacity="0.65"
            strokeWidth="1.35"
            strokeLinejoin="round"
          />
          <circle cx="1041" cy="430" r="2" fill="#C8962E" fillOpacity="0.6" />

          {/* Curtain wall + merlons */}
          <path
            d={`M 480 590 L 480 462${crenellations(480, 1060, 462, 12, 9)} L 1060 590`}
            stroke="#C8962E"
            strokeOpacity="0.72"
            strokeWidth="1.35"
            strokeLinejoin="round"
          />

          {/* Palace block rising behind the wall */}
          <path
            d="M 730 462 L 730 396 L 736 396 L 736 388 L 744 388 L 744 396
               L 766 396 L 766 378 L 774 378 L 774 370 L 782 370 L 782 378
               L 790 378 L 790 396 L 812 396 L 812 388 L 820 388 L 820 396
               L 828 396 L 828 462 Z"
            fill="#101F3A"
            stroke="#C8962E"
            strokeOpacity="0.7"
            strokeWidth="1.35"
            strokeLinejoin="round"
          />

          {/* Chhatri (domed kiosk) */}
          <g stroke="#C8962E" strokeOpacity="0.7" strokeWidth="1.2" fill="none" strokeLinecap="round">
            <path d="M 769 370 L 769 362" />
            <path d="M 787 370 L 787 362" />
            <path d="M 763 362 Q 778 348 793 362" />
            <path d="M 778 348 L 778 342" />
          </g>

          {/* Jharokha windows along the ridge */}
          <g fill="#C8962E" fillOpacity="0.5">
            <rect x="740" y="414" width="5" height="10" rx="2.5" />
            <rect x="758" y="414" width="5" height="10" rx="2.5" />
            <rect x="794" y="414" width="5" height="10" rx="2.5" />
            <rect x="812" y="414" width="5" height="10" rx="2.5" />
            <rect x="540" y="500" width="6" height="12" rx="3" />
            <rect x="580" y="500" width="6" height="12" rx="3" />
            <rect x="700" y="500" width="6" height="12" rx="3" />
            <rect x="860" y="500" width="6" height="12" rx="3" />
            <rect x="920" y="500" width="6" height="12" rx="3" />
            <rect x="980" y="500" width="6" height="12" rx="3" />
          </g>

          {/* Gate arch */}
          <path
            d="M 768 590 L 768 562 A 13 13 0 0 1 794 562 L 794 590"
            stroke="#C8962E"
            strokeOpacity="0.55"
            strokeWidth="1.2"
            fill="none"
          />
        </g>

        {/* Birds */}
        <g stroke="#C8962E" strokeOpacity="0.45" strokeWidth="1" fill="none" strokeLinecap="round">
          <path d="M 470 318 q 6 -6 12 0 q 6 -6 12 0" />
          <path d="M 518 288 q 5 -5 10 0 q 5 -5 10 0" />
          <path d="M 1120 330 q 5 -5 10 0 q 5 -5 10 0" />
        </g>

        {/* Foreground dune */}
        <path
          d="M 0 760 L 0 706 C 200 684, 430 680, 640 700 C 850 720, 1060 692, 1260 688
             C 1340 686, 1402 694, 1440 704 L 1440 760 Z"
          fill="#0A1526"
          stroke="#C8962E"
          strokeOpacity="0.28"
          strokeWidth="1"
        />

        {/* The highway */}
        <g>
          <path
            d={routePath}
            stroke="#C8962E"
            strokeOpacity="0.48"
            strokeWidth="1.25"
            strokeDasharray="6 8"
            fill="none"
          />
          {!reduced ? (
            <m.path
              d={routePath}
              stroke="#E5B84B"
              strokeWidth="1.5"
              strokeDasharray="14 140"
              animate={{ strokeDashoffset: [-154, 0] }}
              transition={{ repeat: Infinity, duration: 6.5, ease: "linear" }}
              fill="none"
              strokeOpacity="0.8"
            />
          ) : null}
          <circle
            cx="150"
            cy="720"
            r="4"
            fill="#E5B84B"
            stroke="#0B172A"
            strokeWidth="1.5"
            filter={`url(#${uid}-glow)`}
          />
        </g>
      </svg>
    </div>
  );
}
