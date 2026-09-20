import React, { useEffect, useRef, useState } from "react";

interface GoogleCampusBadgeProps {
  className?: string;
  size?: "sm" | "md";
  href?: string;
}

// 12 master color stops from Google's gradient spectrum
const COLOR_STOPS: [number, number, number][] = [
  [66, 133, 244],  // 0.00: Google Blue (#4285F4)
  [92, 107, 192],  // 0.09: Indigo
  [142, 36, 170],  // 0.18: Violet / Purple (#8E24AA)
  [216, 27, 96],   // 0.27: Magenta / Rose (#D81B60)
  [234, 67, 53],   // 0.36: Google Red (#EA4335)
  [255, 87, 34],   // 0.45: Deep Orange (#FF5722)
  [255, 152, 0],   // 0.55: Vibrant Orange (#FF9800)
  [251, 188, 5],   // 0.64: Google Yellow (#FBBC05)
  [139, 195, 74],  // 0.73: Lime Green (#8BC34A)
  [52, 168, 83],   // 0.82: Google Green (#34A853)
  [0, 176, 255],   // 0.91: Sky Cyan (#00B0FF)
  [66, 133, 244],  // 1.00: Back to Google Blue (#4285F4)
];

function interpolateColor(t: number): string {
  t = ((t % 1) + 1) % 1;
  const numSegments = COLOR_STOPS.length - 1;
  const scaled = t * numSegments;
  const idx = Math.floor(scaled);
  const frac = scaled - idx;
  const c1 = COLOR_STOPS[idx];
  const c2 = COLOR_STOPS[idx + 1] || COLOR_STOPS[0];
  const r = Math.round(c1[0] + (c2[0] - c1[0]) * frac);
  const g = Math.round(c1[1] + (c2[1] - c1[1]) * frac);
  const b = Math.round(c1[2] + (c2[2] - c1[2]) * frac);
  return `rgb(${r},${g},${b})`;
}

// Maps arc-length distance `s` to exact (x, y) coordinates along a rounded pill path
function getPillPoint(
  s: number,
  W: number,
  H: number,
  R: number,
  inset: number
): { x: number; y: number } {
  const innerW = W - 2 * inset;
  const innerH = H - 2 * inset;
  const innerR = innerH / 2;
  const L = innerW - 2 * innerR;
  const P = 2 * L + 2 * Math.PI * innerR;

  s = ((s % P) + P) % P;

  let x = 0;
  let y = 0;

  if (s <= L) {
    // Top straight edge (left to right)
    x = innerR + s;
    y = 0;
  } else if (s <= L + Math.PI * innerR) {
    // Right semicircular cap (top to bottom)
    const arc = s - L;
    const alpha = -Math.PI / 2 + arc / innerR;
    x = innerW - innerR + innerR * Math.cos(alpha);
    y = innerR + innerR * Math.sin(alpha);
  } else if (s <= 2 * L + Math.PI * innerR) {
    // Bottom straight edge (right to left)
    const d = s - (L + Math.PI * innerR);
    x = innerW - innerR - d;
    y = innerH;
  } else {
    // Left semicircular cap (bottom to top)
    const arc = s - (2 * L + Math.PI * innerR);
    const beta = Math.PI / 2 + arc / innerR;
    x = innerR + innerR * Math.cos(beta);
    y = innerR + innerR * Math.sin(beta);
  }

  return { x: inset + x, y: inset + y };
}

export function GoogleCampusBadge({
  className = "",
  size = "md",
  href,
}: GoogleCampusBadgeProps) {
  const isSm = size === "sm";
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const glowCanvasRef = useRef<HTMLCanvasElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (!containerRef.current) return;
    const update = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        });
      }
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  // Animation loop driving continuous, mathematically perfect color gradient traversal
  useEffect(() => {
    if (dimensions.width === 0 || dimensions.height === 0) return;
    const canvas = canvasRef.current;
    const glowCanvas = glowCanvasRef.current;
    if (!canvas || !glowCanvas) return;

    const ctx = canvas.getContext("2d");
    const glowCtx = glowCanvas.getContext("2d");
    if (!ctx || !glowCtx) return;

    const dpr = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;
    canvas.width = dimensions.width * dpr;
    canvas.height = dimensions.height * dpr;
    glowCanvas.width = dimensions.width * dpr;
    glowCanvas.height = dimensions.height * dpr;

    ctx.scale(dpr, dpr);
    glowCtx.scale(dpr, dpr);

    const strokeWidth = 2.5;
    const inset = strokeWidth / 2;
    const W = dimensions.width;
    const H = dimensions.height;
    const innerH = H - 2 * inset;
    const innerR = innerH / 2;
    const innerW = W - 2 * inset;
    const L = innerW - 2 * innerR;
    const P = 2 * L + 2 * Math.PI * innerR;

    const STEPS = 360; // 360 micro-segments for subpixel continuous gradient blending
    let animId: number;
    const speed = 0.00018; // rotation rate (approx 5.5s full cycle)

    const render = (time: number) => {
      const offset = (time * speed) % 1;

      ctx.clearRect(0, 0, W, H);
      glowCtx.clearRect(0, 0, W, H);

      ctx.lineCap = "round";
      ctx.lineWidth = strokeWidth;

      glowCtx.lineCap = "round";
      glowCtx.lineWidth = 4.5;

      for (let i = 0; i < STEPS; i++) {
        const s1 = (i * P) / STEPS;
        const s2 = ((i + 1.25) * P) / STEPS; // subtle overlap to eliminate any gap

        const t = (s1 / P + offset) % 1;
        const color = interpolateColor(t);

        const p1 = getPillPoint(s1, W, H, innerR, inset);
        const p2 = getPillPoint(s2, W, H, innerR, inset);

        // Draw crisp border
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.strokeStyle = color;
        ctx.stroke();

        // Draw ambient glow
        glowCtx.beginPath();
        glowCtx.moveTo(p1.x, p1.y);
        glowCtx.lineTo(p2.x, p2.y);
        glowCtx.strokeStyle = color;
        glowCtx.stroke();
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [dimensions]);

  const content = (
    <div
      ref={containerRef}
      className={`group relative inline-flex items-center rounded-full p-[2.5px] transition-transform duration-200 hover:scale-[1.03] active:scale-[0.98] select-none ${className}`}
    >
      {/* Ambient Glow Canvas */}
      <canvas
        ref={glowCanvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none rounded-full"
        style={{
          filter: "blur(3px)",
          opacity: 0.5,
        }}
        aria-hidden="true"
      />

      {/* Crisp Mathematical Continuous Gradient Border Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none rounded-full"
        aria-hidden="true"
      />

      {/* Inner White Pill */}
      <div
        className={`relative z-10 flex items-center bg-white rounded-full shadow-sm ${
          isSm
            ? "px-3 py-1 gap-2 text-xs"
            : "px-3.5 sm:px-4 py-1.5 sm:py-2 gap-2 sm:gap-2.5 text-xs sm:text-sm"
        }`}
      >
        {/* Google 'G' Multicolor SVG */}
        <svg
          className={`shrink-0 ${isSm ? "w-3.5 h-3.5" : "w-4 h-4 sm:w-4.5 sm:h-4.5"}`}
          viewBox="0 0 24 24"
        >
          <path
            fill="#4285F4"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="#34A853"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="#FBBC05"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
          />
          <path
            fill="#EA4335"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
          />
        </svg>

        {/* Divider */}
        <span className="h-3.5 sm:h-4 w-[1px] bg-neutral-200" aria-hidden="true" />

        {/* Label */}
        <span className="font-medium text-neutral-800 tracking-tight whitespace-nowrap">
          Google Campus Ambassador Initiative
        </span>
      </div>
    </div>
  );

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black rounded-full"
      >
        {content}
      </a>
    );
  }

  return content;
}

export default GoogleCampusBadge;
