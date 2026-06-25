import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";

export const Route = createFileRoute("/marauders")({ component: MaraudersMap });

const SPOTS = [
  { name: "Harry Potter", x: 30, y: 40, where: "Gryffindor Common Room" },
  { name: "Ron Weasley", x: 32, y: 42, where: "Gryffindor Common Room" },
  { name: "Hermione Granger", x: 55, y: 30, where: "Library" },
  { name: "Draco Malfoy", x: 70, y: 70, where: "Slytherin Dungeons" },
  { name: "Severus Snape", x: 72, y: 75, where: "Potions Classroom" },
  { name: "Albus Dumbledore", x: 50, y: 15, where: "Headmaster's Office" },
  { name: "Hagrid", x: 15, y: 80, where: "Hut on the grounds" },
  { name: "Minerva McGonagall", x: 45, y: 35, where: "Transfiguration Classroom" },
  { name: "Peeves", x: 80, y: 25, where: "Anywhere he pleases" },
  { name: "Nearly Headless Nick", x: 60, y: 55, where: "Great Hall" },
];

function MaraudersMap() {
  return (
    <div>
      <PageHeader title="The Marauder's Map" subtitle='"I solemnly swear that I am up to no good."' />
      <div className="mx-auto max-w-4xl">
        <div className="relative aspect-[4/3] rounded-lg border-2 border-gold/40 bg-gradient-to-br from-amber-950/40 to-amber-900/20 overflow-hidden">
          {/* Parchment lines */}
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} className="absolute left-0 right-0 border-t border-gold/5" style={{ top: `${i * 5}%` }} />
          ))}
          {SPOTS.map((s) => (
            <div
              key={s.name}
              className="absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
              style={{ left: `${s.x}%`, top: `${s.y}%` }}
            >
              <div className="text-2xl animate-pulse">👣</div>
              <div className="absolute left-1/2 -translate-x-1/2 mt-1 whitespace-nowrap rounded bg-midnight/90 px-2 py-1 text-xs text-gold opacity-0 group-hover:opacity-100 transition border border-gold/30">
                <div className="font-display">{s.name}</div>
                <div className="text-muted-foreground italic">{s.where}</div>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-4 text-center text-sm text-muted-foreground italic">
          Hover each pair of footprints to see who treads there. Whisper "mischief managed" to clear the map.
        </p>
      </div>
    </div>
  );
}
