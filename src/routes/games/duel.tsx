import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useInventory } from "@/lib/inventory";

export const Route = createFileRoute("/games/duel")({ component: Duel });

const SPELLS = [
  { name: "Expelliarmus", dmg: 15, cd: 1 },
  { name: "Stupefy", dmg: 25, cd: 3 },
  { name: "Sectumsempra", dmg: 40, cd: 6 },
  { name: "Protego", dmg: 0, cd: 4, heal: 20 },
];

function Duel() {
  const [you, setYou] = useState(100);
  const [foe, setFoe] = useState(100);
  const [cds, setCds] = useState<number[]>(SPELLS.map(() => 0));
  const [diff, setDiff] = useState<"easy" | "hard">("easy");
  const [over, setOver] = useState<string | null>(null);
  const { discoverSecret } = useInventory();

  useEffect(() => {
    if (over) return;
    const t = setInterval(() => setCds((arr) => arr.map((c) => Math.max(0, c - 1))), 1000);
    return () => clearInterval(t);
  }, [over]);

  useEffect(() => {
    if (over) return;
    const t = setInterval(() => {
      const dmg = diff === "easy" ? 8 + Math.random() * 10 : 14 + Math.random() * 14;
      setYou((h) => Math.max(0, h - dmg));
    }, 2500);
    return () => clearInterval(t);
  }, [over, diff]);

  useEffect(() => {
    if (you <= 0 && !over) { setOver("You were defeated."); toast.error("⚡ You lost the duel."); }
    if (foe <= 0 && !over) { setOver("Victory!"); toast.success("🏆 Duel won!"); discoverSecret("duel-win"); }
  }, [you, foe, over, discoverSecret]);

  const cast = (i: number) => {
    if (over || cds[i] > 0) return;
    const s = SPELLS[i];
    if (s.heal) setYou((h) => Math.min(100, h + s.heal!));
    if (s.dmg) setFoe((f) => Math.max(0, f - s.dmg));
    setCds((arr) => arr.map((c, idx) => (idx === i ? s.cd : c)));
    toast(s.name + "!");
  };

  const reset = () => { setYou(100); setFoe(100); setCds(SPELLS.map(() => 0)); setOver(null); };

  return (
    <div>
      <PageHeader title="⚔️ Duelling Arena" subtitle="Cast quickly. Manage your cooldowns." />
      <div className="mx-auto max-w-2xl">
        <div className="flex gap-2 justify-center mb-4">
          {(["easy", "hard"] as const).map((d) => (
            <button key={d} onClick={() => { setDiff(d); reset(); }} className={`rounded px-3 py-1 text-sm ${diff === d ? "bg-gold text-primary-foreground" : "border border-gold/30 text-gold"}`}>{d}</button>
          ))}
        </div>
        <Bar label="You" hp={you} color="bg-green-500" />
        <Bar label="Dark Wizard" hp={foe} color="bg-red-500" />
        <div className="grid grid-cols-2 gap-3 mt-6">
          {SPELLS.map((s, i) => (
            <button
              key={s.name}
              onClick={() => cast(i)}
              disabled={cds[i] > 0 || !!over}
              className="magic-card p-4 text-left disabled:opacity-40"
            >
              <div className="font-display text-gold">{s.name}</div>
              <div className="text-xs text-muted-foreground">{s.heal ? `+${s.heal} shield` : `${s.dmg} dmg`} · CD {s.cd}s</div>
              {cds[i] > 0 && <div className="text-xs text-red-400 mt-1">Cooldown: {cds[i]}s</div>}
            </button>
          ))}
        </div>
        {over && (
          <div className="mt-6 text-center">
            <div className="text-2xl font-display text-shimmer">{over}</div>
            <button onClick={reset} className="mt-3 rounded bg-gold px-4 py-2 text-sm text-primary-foreground">Duel again</button>
          </div>
        )}
      </div>
    </div>
  );
}

function Bar({ label, hp, color }: { label: string; hp: number; color: string }) {
  return (
    <div className="mb-3">
      <div className="flex justify-between text-sm mb-1"><span>{label}</span><span>{Math.round(hp)}/100</span></div>
      <div className="h-3 rounded-full bg-midnight overflow-hidden border border-gold/30">
        <div className={`h-full ${color} transition-all`} style={{ width: `${hp}%` }} />
      </div>
    </div>
  );
}
