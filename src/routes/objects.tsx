import { createFileRoute } from "@tanstack/react-router";
import { magicalObjects } from "@/data/objects";
import { PageHeader } from "@/components/PageHeader";
import { FavoriteButton } from "@/components/FavoriteButton";

export const Route = createFileRoute("/objects")({
  head: () => ({
    meta: [
      { title: "Magical Artifacts — Wizarding World Explorer" },
      { name: "description", content: "The Deathly Hallows, Horcruxes, the Marauder's Map, the Mirror of Erised, and more." },
      { property: "og:title", content: "Magical Artifacts" },
      { property: "og:description", content: "History, owners, and importance." },
    ],
  }),
  component: ObjectsPage,
});

function ObjectsPage() {
  return (
    <div>
      <PageHeader title="Artifacts of Power" subtitle="The objects that shaped the wizarding world — and broke it." />
      <div className="grid gap-5 md:grid-cols-2">
        {magicalObjects.map((o) => (
          <div key={o.id} className="magic-card magic-card-hover p-6">
            <div className="flex items-start justify-between">
              <h3 className="font-display text-2xl text-gold glow-text">{o.name}</h3>
              <FavoriteButton kind="object" id={o.id} label={o.name} />
            </div>
            <p className="mt-3 text-sm">{o.history}</p>
            <div className="mt-4 text-[10px] uppercase tracking-widest text-gold-soft">Owners</div>
            <div className="flex flex-wrap gap-1 mt-1">
              {o.owners.map((p) => <span key={p} className="rounded-full bg-secondary px-2 py-0.5 text-[11px]">{p}</span>)}
            </div>
            <div className="mt-4 rounded-md border border-gold/30 bg-gold/5 p-3">
              <div className="text-[10px] uppercase tracking-widest text-gold-soft mb-1">Importance</div>
              <p className="text-sm">{o.importance}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
