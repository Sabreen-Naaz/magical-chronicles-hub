import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { locations, type MagicalLocation } from "@/data/locations";
import { PageHeader } from "@/components/PageHeader";

export const Route = createFileRoute("/map")({
  head: () => ({
    meta: [
      { title: "Hogwarts Map — Wizarding World Explorer" },
      { name: "description", content: "Interactive Marauder's-Map-style view of the wizarding world. Click each location to explore." },
      { property: "og:title", content: "Interactive Hogwarts Map" },
      { property: "og:description", content: "Click and discover hidden places." },
    ],
  }),
  component: MapPage,
});

function MapPage() {
  const [active, setActive] = useState<MagicalLocation | null>(locations[0]);

  return (
    <div>
      <PageHeader
        title="The Marauder's Map"
        subtitle="I solemnly swear that I am up to no good."
      />

      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <div className="magic-card relative aspect-[4/3] overflow-hidden">
          {/* Parchment look */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at center, oklch(0.35 0.08 80 / 0.25), transparent 70%), repeating-linear-gradient(45deg, transparent 0 20px, oklch(0.82 0.16 85 / 0.04) 20px 21px)",
            }}
          />
          {/* Outlines */}
          <svg viewBox="0 0 100 75" className="absolute inset-0 w-full h-full text-gold/40" preserveAspectRatio="none">
            <path d="M5 40 L20 25 L40 30 L55 18 L75 25 L95 35 L90 60 L60 65 L30 60 L10 55 Z"
              fill="none" stroke="currentColor" strokeWidth="0.3" strokeDasharray="1 1" />
            <circle cx="50" cy="55" r="8" fill="none" stroke="currentColor" strokeWidth="0.3" />
          </svg>

          {locations.map((l) => (
            <button
              key={l.id}
              onClick={() => setActive(l)}
              className="absolute -translate-x-1/2 -translate-y-1/2 group"
              style={{ left: `${l.x}%`, top: `${l.y}%` }}
              title={l.name}
            >
              <div className={`relative h-3 w-3 rounded-full bg-gold animate-twinkle transition-all ${active?.id === l.id ? "scale-150 shadow-[0_0_20px_gold]" : "group-hover:scale-150"}`} />
              <div className={`absolute left-4 top-1/2 -translate-y-1/2 whitespace-nowrap rounded bg-midnight/90 px-2 py-0.5 text-[10px] font-display tracking-widest text-gold transition-opacity ${active?.id === l.id ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}>
                {l.name}
              </div>
            </button>
          ))}
        </div>

        <div className="magic-card p-6">
          {active ? (
            <div className="animate-fade-in">
              <div className="text-[10px] uppercase tracking-widest text-gold-soft">{active.region}</div>
              <h3 className="mt-1 font-display text-2xl text-gold glow-text">{active.name}</h3>
              <p className="mt-3 text-sm">{active.description}</p>
              <div className="mt-4 text-[10px] uppercase tracking-widest text-gold-soft">Hidden Facts</div>
              <ul className="mt-1 space-y-1 text-sm">
                {active.hidden.map((h, i) => <li key={i} className="before:content-['✦'] before:text-gold before:mr-2">{h}</li>)}
              </ul>
            </div>
          ) : (
            <p className="italic text-muted-foreground">Tap a glowing point on the map.</p>
          )}
          <p className="mt-6 text-xs italic text-muted-foreground">Mischief managed.</p>
        </div>
      </div>
    </div>
  );
}
