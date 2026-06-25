import { createFileRoute } from "@tanstack/react-router";
import { creatures } from "@/data/creatures";
import { PageHeader } from "@/components/PageHeader";
import { FavoriteButton } from "@/components/FavoriteButton";

export const Route = createFileRoute("/creatures")({
  head: () => ({
    meta: [
      { title: "Magical Creatures — Wizarding World Explorer" },
      { name: "description", content: "Phoenixes, basilisks, thestrals, hippogriffs and more from the Wizarding World." },
      { property: "og:title", content: "Magical Creatures" },
      { property: "og:description", content: "Powers, habitats, and curious facts." },
    ],
  }),
  component: CreaturesPage,
});

function CreaturesPage() {
  return (
    <div>
      <PageHeader title="Magical Creatures" subtitle="From the Forbidden Forest to the Black Lake — beasts both gentle and terrible." />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {creatures.map((c) => (
          <div key={c.id} className="magic-card magic-card-hover p-5">
            <div className="flex items-start justify-between">
              <h3 className="font-display text-xl text-gold">{c.name}</h3>
              <FavoriteButton kind="creature" id={c.id} label={c.name} />
            </div>
            <p className="mt-2 text-sm">{c.description}</p>
            <div className="mt-3 text-[10px] uppercase tracking-widest text-gold-soft">Habitat</div>
            <p className="text-sm text-muted-foreground">{c.habitat}</p>
            <div className="mt-3 text-[10px] uppercase tracking-widest text-gold-soft">Powers</div>
            <div className="flex flex-wrap gap-1 mt-1">
              {c.powers.map((p) => <span key={p} className="rounded-full bg-secondary px-2 py-0.5 text-[11px]">{p}</span>)}
            </div>
            <div className="mt-3 text-[10px] uppercase tracking-widest text-gold-soft">Curious Facts</div>
            <ul className="mt-1 space-y-1 text-sm">
              {c.facts.map((f, i) => <li key={i} className="before:content-['✦'] before:text-gold before:mr-2">{f}</li>)}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
