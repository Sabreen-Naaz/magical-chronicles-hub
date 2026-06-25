import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { useAchievements } from "@/lib/storage";
import { toast } from "sonner";

export const Route = createFileRoute("/games/hidden")({
  component: HiddenObjectGame,
});

const OBJECTS = [
  { id: "wand", emoji: "🪄", name: "Wand" },
  { id: "key", emoji: "🗝️", name: "Golden Key" },
  { id: "snitch", emoji: "🟡", name: "Snitch" },
  { id: "book", emoji: "📕", name: "Spellbook" },
  { id: "potion", emoji: "🧪", name: "Potion" },
  { id: "owl", emoji: "🦉", name: "Owl" },
];

function HiddenObjectGame() {
  const placements = useMemo(
    () => OBJECTS.map((o) => ({ ...o, top: Math.random() * 80 + 5, left: Math.random() * 90 + 2, rot: Math.random() * 30 - 15 })),
    [],
  );
  const [found, setFound] = useState<Set<string>>(new Set());
  const { unlock } = useAchievements();

  const tap = (id: string) => {
    if (found.has(id)) return;
    const next = new Set(found); next.add(id); setFound(next);
    toast.success(`Found ${OBJECTS.find((o) => o.id === id)?.name}!`);
    if (next.size === OBJECTS.length) {
      unlock("eagle-eye", "Eagle Eye", "Found every hidden artifact.");
    }
  };

  return (
    <div>
      <PageHeader title="Hidden Object Hunt" subtitle="Find every magical artifact concealed in the scene." />
      <div className="grid gap-4 lg:grid-cols-[2fr_1fr]">
        <div className="magic-card relative h-[500px] overflow-hidden" style={{
          background:
            "radial-gradient(circle at 30% 20%, oklch(0.25 0.08 280 / 0.6), transparent 60%), radial-gradient(circle at 70% 80%, oklch(0.18 0.06 250 / 0.8), transparent 70%)",
        }}>
          {/* decoy clutter */}
          {Array.from({ length: 30 }).map((_, i) => (
            <div key={i} className="absolute opacity-20 text-xl" style={{
              top: `${Math.random() * 95}%`, left: `${Math.random() * 95}%`,
              transform: `rotate(${Math.random() * 360}deg)`,
            }}>{["✦","✧","✩","✪","✫"][i % 5]}</div>
          ))}
          {placements.map((p) => (
            <button key={p.id} onClick={() => tap(p.id)}
              className={`absolute text-3xl transition-all ${found.has(p.id) ? "opacity-30 scale-150" : "hover:scale-125"}`}
              style={{ top: `${p.top}%`, left: `${p.left}%`, transform: `rotate(${p.rot}deg)` }}
              aria-label={p.name}
            >{p.emoji}</button>
          ))}
        </div>
        <div className="magic-card p-6">
          <h3 className="font-display text-gold text-lg">Find these</h3>
          <ul className="mt-3 space-y-2">
            {OBJECTS.map((o) => (
              <li key={o.id} className={`flex items-center gap-2 text-sm ${found.has(o.id) ? "line-through text-emerald-300" : ""}`}>
                <span className="text-xl">{o.emoji}</span> {o.name}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs text-muted-foreground italic">{found.size}/{OBJECTS.length} found</p>
        </div>
      </div>
    </div>
  );
}
