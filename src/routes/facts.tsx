import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { facts } from "@/data/facts";
import { PageHeader } from "@/components/PageHeader";
import { FavoriteButton } from "@/components/FavoriteButton";

export const Route = createFileRoute("/facts")({
  head: () => ({
    meta: [
      { title: "Things The Movies Never Told You — Wizarding World" },
      { name: "description", content: "Book-only facts, removed scenes, missing characters, deleted storylines and tiny details from Harry Potter." },
      { property: "og:title", content: "Things The Movies Never Told You" },
      { property: "og:description", content: "Hidden lore from the books, restored." },
    ],
  }),
  component: FactsPage,
});

const CATS = ["All", "Book-Only", "Removed Scene", "Hidden Lore", "Missing Character", "Deleted Storyline", "Tiny Detail"] as const;

function FactsPage() {
  const [cat, setCat] = useState<typeof CATS[number]>("All");
  const filtered = useMemo(() => cat === "All" ? facts : facts.filter((f) => f.category === cat), [cat]);

  return (
    <div>
      <PageHeader
        title="Things The Movies Never Told You"
        subtitle="The book-only lore, removed scenes, and quiet details lost between page and screen."
      />

      <div className="mb-8 flex flex-wrap justify-center gap-2">
        {CATS.map((c) => (
          <button key={c} onClick={() => setCat(c)}
            className={`rounded-full px-3 py-1 text-[11px] uppercase tracking-wider transition ${cat === c ? "bg-gold text-primary-foreground" : "border border-gold/30 text-gold-soft hover:bg-gold/10"}`}>
            {c}
          </button>
        ))}
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {filtered.map((f) => (
          <article key={f.id} className="magic-card magic-card-hover p-6 relative">
            <div className="absolute top-3 right-3">
              <FavoriteButton kind="fact" id={f.id} label={f.title} />
            </div>
            <div className="text-[10px] uppercase tracking-widest text-gold-soft">{f.category}</div>
            <h3 className="mt-1 font-display text-xl text-gold">{f.title}</h3>
            <p className="mt-3 text-sm leading-relaxed">{f.body}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
