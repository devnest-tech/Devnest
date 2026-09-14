import React, { useRef, useEffect, useCallback } from "react";

export interface ClickSparkProps {
  sparkColor?: string;
  sparkSize?: number;
  sparkRadius?: number;
  sparkCount?: number;
  duration?: number;
  easing?: "linear" | "ease-in" | "ease-out" | "ease-in-out";
  extraScale?: number;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

interface Spark {
  x: number;
  y: number;
  angle: number;
  startTime: number;
}

export const ClickSpark: React.FC<ClickSparkProps> = ({
  sparkColor = "#fff",
  sparkSize = 10,
  sparkRadius = 15,
  sparkCount = 8,
  duration = 400,
  easing = "ease-out",
  extraScale = 1.0,
  children,
  className = "",
  style = {},
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const sparksRef = useRef<Spark[]>([]);
  const isAnimatingRef = useRef<boolean>(false);
  const animationIdRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const parent = canvas.parentElement;
    if (!parent) return;

    let resizeTimeout: NodeJS.Timeout;

    const resizeCanvas = () => {
      const { width, height } = parent.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const pixelWidth = Math.max(1, Math.floor(width * dpr));
      const pixelHeight = Math.max(1, Math.floor(height * dpr));

      if (canvas.width !== pixelWidth || canvas.height !== pixelHeight) {
        canvas.width = pixelWidth;
        canvas.height = pixelHeight;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.scale(dpr, dpr);
        }
      }
    };

    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(resizeCanvas, 150);
    };

    const ro = new ResizeObserver(handleResize);
    ro.observe(parent);

    resizeCanvas();

    return () => {
      ro.disconnect();
      clearTimeout(resizeTimeout);
    };
  }, []);

  const easeFunc = useCallback(
    (t: number) => {
      switch (easing) {
        case "linear":
          return t;
        case "ease-in":
          return t * t;
        case "ease-in-out":
          return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        default:
          return t * (2 - t);
      }
    },
    [easing]
  );

  // On-demand animation loop — runs ONLY while active sparks exist, then halts cleanly
  const startAnimationLoop = useCallback(() => {
    if (isAnimatingRef.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    isAnimatingRef.current = true;

    const draw = (timestamp: number) => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const cssWidth = canvas.width / dpr;
      const cssHeight = canvas.height / dpr;

      ctx.clearRect(0, 0, cssWidth, cssHeight);

      sparksRef.current = sparksRef.current.filter((spark) => {
        const elapsed = timestamp - spark.startTime;
        if (elapsed >= duration) {
          return false;
        }

        const progress = elapsed / duration;
        const eased = easeFunc(progress);

        const distance = eased * sparkRadius * extraScale;
        const lineLength = sparkSize * (1 - eased);

        const x1 = spark.x + distance * Math.cos(spark.angle);
        const y1 = spark.y + distance * Math.sin(spark.angle);
        const x2 = spark.x + (distance + lineLength) * Math.cos(spark.angle);
        const y2 = spark.y + (distance + lineLength) * Math.sin(spark.angle);

        ctx.strokeStyle = sparkColor;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();

        return true;
      });

      if (sparksRef.current.length > 0) {
        animationIdRef.current = requestAnimationFrame(draw);
      } else {
        // Clear canvas once and stop the animation loop completely (0% idle CPU/GPU usage)
        ctx.clearRect(0, 0, cssWidth, cssHeight);
        isAnimatingRef.current = false;
        animationIdRef.current = null;
      }
    };

    animationIdRef.current = requestAnimationFrame(draw);
  }, [duration, easeFunc, extraScale, sparkColor, sparkRadius, sparkSize]);

  // Clean up any running animation frame on unmount
  useEffect(() => {
    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
        animationIdRef.current = null;
        isAnimatingRef.current = false;
      }
    };
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const now = performance.now();
    const newSparks: Spark[] = Array.from({ length: sparkCount }, (_, i) => ({
      x,
      y,
      angle: (2 * Math.PI * i) / sparkCount,
      startTime: now,
    }));

    sparksRef.current.push(...newSparks);
    startAnimationLoop();
  };

  return (
    <div
      className={className}
      style={{
        position: "relative",
        width: "100%",
        minHeight: "100%",
        ...style,
      }}
      onClick={handleClick}
    >
      <canvas
        ref={canvasRef}
        style={{
          width: "100%",
          height: "100%",
          display: "block",
          userSelect: "none",
          position: "absolute",
          top: 0,
          left: 0,
          pointerEvents: "none",
          zIndex: 60,
        }}
      />
      {children}
    </div>
  );
};

export default ClickSpark;
