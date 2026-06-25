import { useEffect, useState } from "react";

export function useTimeOfDay() {
  const [phase, setPhase] = useState<"morning" | "day" | "sunset" | "night">("night");
  useEffect(() => {
    const calc = () => {
      const h = new Date().getHours();
      const m = new Date().getMonth();
      // snow in Dec-Feb handled separately
      if (h >= 5 && h < 10) setPhase("morning");
      else if (h >= 10 && h < 17) setPhase("day");
      else if (h >= 17 && h < 20) setPhase("sunset");
      else setPhase("night");
      void m;
    };
    calc();
    const i = setInterval(calc, 60_000);
    return () => clearInterval(i);
  }, []);
  return phase;
}

export function isSnowSeason() {
  const m = new Date().getMonth();
  return m === 11 || m === 0 || m === 1;
}

export function DayNightTint() {
  const phase = useTimeOfDay();
  const tint =
    phase === "morning" ? "linear-gradient(180deg, rgba(255,200,120,0.08), transparent 40%)"
    : phase === "day" ? "linear-gradient(180deg, rgba(180,210,255,0.06), transparent 50%)"
    : phase === "sunset" ? "linear-gradient(180deg, rgba(255,120,80,0.12), rgba(80,20,80,0.08) 60%)"
    : "linear-gradient(180deg, rgba(10,20,60,0.25), transparent 70%)";

  return (
    <div className="pointer-events-none fixed inset-0 z-0" style={{ background: tint }}>
      {isSnowSeason() && <Snow />}
    </div>
  );
}

function Snow() {
  const flakes = Array.from({ length: 30 });
  return (
    <div className="absolute inset-0 overflow-hidden">
      {flakes.map((_, i) => (
        <span
          key={i}
          className="absolute text-white/70"
          style={{
            left: `${(i * 37) % 100}%`,
            top: `-${Math.random() * 20}%`,
            fontSize: `${10 + Math.random() * 14}px`,
            animation: `wwx-snow ${8 + Math.random() * 10}s linear ${Math.random() * 8}s infinite`,
          }}
        >
          ❄
        </span>
      ))}
    </div>
  );
}
