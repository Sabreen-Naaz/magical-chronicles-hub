import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useInventory } from "@/lib/inventory";

type Event = { id: string; emoji: string; label: string; from: "left" | "right" };

const EVENTS: Omit<Event, "id">[] = [
  { emoji: "🦉", label: "An owl swoops across the sky.", from: "left" },
  { emoji: "👻", label: "A ghost drifts by, whispering…", from: "right" },
  { emoji: "🕯️", label: "A candle falls — and relights itself.", from: "left" },
  { emoji: "🦊", label: "A magical creature darts past!", from: "right" },
  { emoji: "🧹", label: "A broomstick zooms overhead.", from: "left" },
  { emoji: "⭐", label: "A shooting star — make a wish.", from: "right" },
];

export function RandomEvents() {
  const [active, setActive] = useState<Event | null>(null);
  const { discoverSecret } = useInventory();

  useEffect(() => {
    // First event after 4-9s, then every 25-60s
    let timer: ReturnType<typeof setTimeout>;
    const fire = () => {
      const e = EVENTS[Math.floor(Math.random() * EVENTS.length)];
      const id = String(Date.now());
      setActive({ ...e, id });
      setTimeout(() => setActive((cur) => (cur?.id === id ? null : cur)), 6000);
      timer = setTimeout(fire, 25000 + Math.random() * 35000);
    };
    timer = setTimeout(fire, 4000 + Math.random() * 5000);
    return () => clearTimeout(timer);
  }, []);

  if (!active) return null;
  const isGhost = active.emoji === "👻";

  return (
    <button
      onClick={() => {
        toast(active.emoji + " " + active.label);
        if (isGhost) {
          discoverSecret("ghost-" + active.id);
          toast.success("👻 You spoke with a ghost! Secret discovered.");
        }
        setActive(null);
      }}
      className="fixed top-1/3 z-30 text-5xl pointer-events-auto select-none"
      style={{
        [active.from]: "-10%",
        animation: `wwx-fly-${active.from} 6s linear forwards`,
        filter: "drop-shadow(0 0 8px gold)",
      } as React.CSSProperties}
      aria-label={active.label}
    >
      {active.emoji}
    </button>
  );
}
