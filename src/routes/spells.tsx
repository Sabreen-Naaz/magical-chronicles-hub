import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { spells, type Spell } from "@/data/spells";
import { PageHeader } from "@/components/PageHeader";
import { FavoriteButton } from "@/components/FavoriteButton";
import { Search } from "lucide-react";

export const Route = createFileRoute("/spells")({
  head: () => ({
    meta: [
      { title: "Spells — Wizarding World Explorer" },
      { name: "description", content: "Every spell, charm, jinx, hex, and curse — with pronunciations, effects, and notable casters." },
      { property: "og:title", content: "Spells of the Wizarding World" },
      { property: "og:description", content: "From Lumos to Avada Kedavra." },
    ],
  }),
  component: SpellsPage,
});

const TYPES = ["All", "Charm", "Curse", "Jinx", "Hex", "Transfiguration", "Counter-Spell", "Healing"] as const;
const DIFFS = ["All", "Beginner", "Intermediate", "Advanced", "Forbidden"] as const;

function diffColor(d: Spell["difficulty"]) {
  switch (d) {
    case "Beginner": return "text-emerald-300 border-emerald-300/40 bg-emerald-300/10";
    case "Intermediate": return "text-sky-300 border-sky-300/40 bg-sky-300/10";
    case "Advanced": return "text-amber-300 border-amber-300/40 bg-amber-300/10";
    case "Forbidden": return "text-red-400 border-red-400/40 bg-red-400/10";
  }
}

function SpellsPage() {
  const [q, setQ] = useState("");
  const [type, setType] = useState<typeof TYPES[number]>("All");
  const [diff, setDiff] = useState<typeof DIFFS[number]>("All");

  const filtered = useMemo(() => {
    const t = q.trim().toLowerCase();
    return spells.filter((s) =>
      (type === "All" || s.type === type) &&
      (diff === "All" || s.difficulty === diff) &&
      (!t || s.name.toLowerCase().includes(t) || s.effect.toLowerCase().includes(t)),
    );
  }, [q, type, diff]);

  return (
    <div>
      <PageHeader title="Spellbook" subtitle="Every incantation a young wizard could want — and a few they shouldn't." />

      <div className="mb-8 space-y-3">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gold" />
          <input
            value={q} onChange={(e) => setQ(e.target.value)}
            placeholder="Search spells…"
            className="w-full rounded-full border border-gold/30 bg-midnight/60 pl-10 pr-4 py-2 text-sm focus:border-gold focus:outline-none"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {TYPES.map((t) => (
            <button key={t} onClick={() => setType(t)}
              className={`rounded-full px-3 py-1 text-[11px] uppercase tracking-wider transition ${type === t ? "bg-gold text-primary-foreground" : "border border-gold/30 text-gold-soft hover:bg-gold/10"}`}>
              {t}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          {DIFFS.map((d) => (
            <button key={d} onClick={() => setDiff(d)}
              className={`rounded-full px-3 py-1 text-[11px] uppercase tracking-wider transition ${diff === d ? "bg-gold text-primary-foreground" : "border border-gold/30 text-gold-soft hover:bg-gold/10"}`}>
              {d}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {filtered.map((s) => (
          <div key={s.id} className="magic-card magic-card-hover p-5">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <h3 className="font-display text-xl text-gold glow-text">{s.name}</h3>
                <div className="text-xs italic text-muted-foreground">{s.pronunciation}</div>
              </div>
              <FavoriteButton kind="spell" id={s.id} label={s.name} />
            </div>
            <p className="mt-3 text-sm">{s.effect}</p>
            <p className="mt-2 text-xs text-muted-foreground italic">{s.usage}</p>
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-secondary px-2.5 py-0.5 text-[10px] uppercase tracking-widest">{s.type}</span>
              <span className={`rounded-full border px-2.5 py-0.5 text-[10px] uppercase tracking-widest ${diffColor(s.difficulty)}`}>{s.difficulty}</span>
              <span className="text-[10px] text-gold-soft ml-auto truncate">used by: {s.notable.join(", ")}</span>
            </div>
          </div>
        ))}
        {filtered.length === 0 && <div className="col-span-full text-center text-muted-foreground italic py-10">No spells match your filters.</div>}
      </div>
    </div>
  );
}
