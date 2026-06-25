import { useMemo } from "react";

export function MagicalBackground() {
  const stars = useMemo(
    () =>
      Array.from({ length: 60 }).map(() => ({
        top: Math.random() * 100,
        left: Math.random() * 100,
        size: Math.random() * 2 + 1,
        delay: Math.random() * 3,
        duration: Math.random() * 3 + 2,
      })),
    [],
  );
  const particles = useMemo(
    () =>
      Array.from({ length: 18 }).map(() => ({
        left: Math.random() * 100,
        size: Math.random() * 4 + 2,
        delay: Math.random() * 15,
        duration: Math.random() * 15 + 15,
      })),
    [],
  );
  const candles = useMemo(
    () =>
      Array.from({ length: 8 }).map(() => ({
        top: Math.random() * 70 + 5,
        left: Math.random() * 90 + 5,
        delay: Math.random() * 2,
      })),
    [],
  );

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {stars.map((s, i) => (
        <div
          key={`s${i}`}
          className="absolute rounded-full bg-gold animate-twinkle"
          style={{
            top: `${s.top}%`,
            left: `${s.left}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.duration}s`,
            boxShadow: "0 0 6px currentColor",
          }}
        />
      ))}
      {candles.map((c, i) => (
        <div
          key={`c${i}`}
          className="absolute animate-candle"
          style={{
            top: `${c.top}%`,
            left: `${c.left}%`,
            animationDelay: `${c.delay}s`,
          }}
        >
          <div
            className="h-3 w-3 rounded-full"
            style={{
              background:
                "radial-gradient(circle, #fff4c2 0%, #ffb347 40%, transparent 70%)",
              boxShadow:
                "0 0 20px #ffb347, 0 0 40px rgba(255,179,71,0.4), 0 0 60px rgba(255,179,71,0.2)",
            }}
          />
        </div>
      ))}
      {particles.map((p, i) => (
        <div
          key={`p${i}`}
          className="absolute bottom-0 rounded-full"
          style={{
            left: `${p.left}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            background:
              "radial-gradient(circle, rgba(255,220,140,0.9), rgba(255,200,100,0))",
            animation: `float-up ${p.duration}s linear infinite`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
