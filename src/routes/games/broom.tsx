import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { useEffect, useRef, useState } from "react";
import { useInventory } from "@/lib/inventory";
import { toast } from "sonner";

export const Route = createFileRoute("/games/broom")({ component: BroomGame });

type Obj = { id: number; x: number; y: number; kind: "snitch" | "frog" | "bludger" };

function BroomGame() {
  const [score, setScore] = useState(0);
  const [running, setRunning] = useState(false);
  const [pos, setPos] = useState(50);
  const [objs, setObjs] = useState<Obj[]>([]);
  const idRef = useRef(0);
  const { collect } = useInventory();

  useEffect(() => {
    if (!running) return;
    const spawn = setInterval(() => {
      const kinds: Obj["kind"][] = ["snitch", "frog", "frog", "bludger"];
      setObjs((arr) => [...arr, { id: ++idRef.current, x: Math.random() * 90 + 5, y: -5, kind: kinds[Math.floor(Math.random() * kinds.length)] }]);
    }, 700);
    const tick = setInterval(() => {
      setObjs((arr) => arr.map((o) => ({ ...o, y: o.y + 3 })).filter((o) => o.y < 110));
    }, 50);
    return () => { clearInterval(spawn); clearInterval(tick); };
  }, [running]);

  useEffect(() => {
    if (!running) return;
    setObjs((arr) => {
      const remain: Obj[] = [];
      for (const o of arr) {
        const dx = Math.abs(o.x - pos);
        if (o.y > 80 && o.y < 95 && dx < 7) {
          if (o.kind === "bludger") {
            toast.error("💥 Bludger! Game over.");
            setRunning(false);
            return [];
          } else if (o.kind === "snitch") {
            setScore((s) => s + 50);
            collect({ id: `snitch-${Date.now()}`, kind: "artifact", name: "Golden Snitch", rarity: "legendary" });
            toast.success("✨ Caught the Snitch!");
          } else {
            setScore((s) => s + 10);
            collect({ id: `frog-${Date.now()}`, kind: "frog", name: "Chocolate Frog Card" });
          }
        } else remain.push(o);
      }
      return remain;
    });
  }, [objs, pos, running, collect]);

  useEffect(() => {
    const k = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") setPos((p) => Math.max(2, p - 6));
      if (e.key === "ArrowRight") setPos((p) => Math.min(98, p + 6));
    };
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, []);

  return (
    <div>
      <PageHeader title="🧹 Flying Broom" subtitle="Catch Snitches and chocolate frogs. Dodge Bludgers!" />
      <div className="mx-auto max-w-2xl">
        <div className="flex items-center justify-between mb-3">
          <div className="font-display text-gold text-xl">Score: {score}</div>
          <button onClick={() => { setScore(0); setObjs([]); setRunning(true); }} className="rounded bg-gold px-4 py-2 text-sm text-primary-foreground">
            {running ? "Restart" : "Take off"}
          </button>
        </div>
        <div
          className="relative aspect-[3/4] rounded-lg border-2 border-gold/40 bg-gradient-to-b from-blue-950 to-indigo-950 overflow-hidden"
          onMouseMove={(e) => {
            const r = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
            setPos(((e.clientX - r.left) / r.width) * 100);
          }}
          onTouchMove={(e) => {
            const r = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
            setPos(((e.touches[0].clientX - r.left) / r.width) * 100);
          }}
        >
          {objs.map((o) => (
            <div key={o.id} className="absolute text-2xl -translate-x-1/2 -translate-y-1/2" style={{ left: `${o.x}%`, top: `${o.y}%` }}>
              {o.kind === "snitch" ? "✨" : o.kind === "frog" ? "🐸" : "⚫"}
            </div>
          ))}
          <div className="absolute text-3xl -translate-x-1/2" style={{ left: `${pos}%`, bottom: "5%" }}>🧹</div>
        </div>
        <p className="text-xs text-muted-foreground mt-2 text-center">Arrow keys or mouse/touch to steer.</p>
      </div>
    </div>
  );
}
