import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { characters, type Character } from "@/data/characters";
import { characterImages } from "@/data/characterImages";
import { PageHeader } from "@/components/PageHeader";
import { FavoriteButton } from "@/components/FavoriteButton";
import { X, Search, UserCircle2 } from "lucide-react";

export const Route = createFileRoute("/characters")({
  head: () => ({
    meta: [
      { title: "Characters — Wizarding World Explorer" },
      { name: "description", content: "Major, minor, and book-only Harry Potter characters with wands, patronuses, quotes, and hidden facts." },
      { property: "og:title", content: "Characters of the Wizarding World" },
      { property: "og:description", content: "Including book-only heroes the films never gave their due." },
    ],
  }),
  component: CharactersPage,
});

function CharactersPage() {
  const [q, setQ] = useState("");
  const [tier, setTier] = useState<"all" | "major" | "minor" | "book-only">("all");
  const [selected, setSelected] = useState<Character | null>(null);

  const filtered = useMemo(() => {
    const t = q.trim().toLowerCase();
    return characters.filter(
      (c) => (tier === "all" || c.tier === tier) && (!t || c.name.toLowerCase().includes(t) || c.bio.toLowerCase().includes(t)),
    );
  }, [q, tier]);

  return (
    <div>
      <PageHeader title="Characters" subtitle="The witches, wizards and strange souls of the wizarding world." />

      <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gold" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search by name or trait…"
            className="w-full rounded-full border border-gold/30 bg-midnight/60 pl-10 pr-4 py-2 text-sm focus:border-gold focus:outline-none"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {(["all", "major", "minor", "book-only"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTier(t)}
              className={`rounded-full px-4 py-1.5 text-xs font-display tracking-wider uppercase transition ${
                tier === t ? "bg-gold text-primary-foreground" : "border border-gold/30 text-gold hover:bg-gold/10"
              }`}
            >
              {t === "all" ? "All" : t === "book-only" ? "Book-Only" : t}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((c) => {
          const img = characterImages[c.id];
          return (
            <button
              key={c.id}
              onClick={() => setSelected(c)}
              className="magic-card magic-card-hover overflow-hidden text-left flex flex-col"
            >
              <div className="relative aspect-square w-full overflow-hidden bg-midnight">
                {img ? (
                  <img src={img} alt={c.name} loading="lazy" width={512} height={512} className="h-full w-full object-cover transition-transform duration-500 hover:scale-105" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-gold/40">
                    <UserCircle2 className="h-20 w-20" />
                  </div>
                )}
                <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-midnight to-transparent" />
                <div className="absolute top-2 right-2">
                  <FavoriteButton kind="character" id={c.id} label={c.name} />
                </div>
              </div>
              <div className="p-4 flex-1">
                <h3 className="font-display text-xl text-gold truncate">{c.name}</h3>
                <div className="mt-1 flex flex-wrap gap-1 text-[10px] uppercase tracking-widest">
                  {c.house && <span className="rounded bg-accent/40 px-2 py-0.5 text-accent-foreground">{c.house}</span>}
                  {c.blood && <span className="rounded bg-secondary px-2 py-0.5">{c.blood}</span>}
                  <span className="rounded border border-gold/30 px-2 py-0.5 text-gold-soft">{c.tier}</span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{c.bio}</p>
              </div>
            </button>
          );
        })}
        {filtered.length === 0 && (
          <div className="col-span-full text-center text-muted-foreground italic py-10">
            No characters found. The portraits are silent.
          </div>
        )}
      </div>

      {selected && <CharacterModal character={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}

function CharacterModal({ character: c, onClose }: { character: Character; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />
      <div
        className="relative magic-card max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8 animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 rounded-full p-2 text-gold hover:bg-gold/10"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>

        <h2 className="font-display text-3xl text-shimmer">{c.name}</h2>
        <div className="mt-2 flex flex-wrap gap-2 text-[10px] uppercase tracking-widest">
          {c.house && <span className="rounded bg-accent/40 px-2 py-0.5">{c.house}</span>}
          {c.blood && <span className="rounded bg-secondary px-2 py-0.5">{c.blood}</span>}
          <span className="rounded border border-gold/30 px-2 py-0.5 text-gold-soft">{c.tier}</span>
        </div>

        <p className="mt-5 text-base leading-relaxed">{c.bio}</p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 text-sm">
          {c.wand && <Field label="Wand" value={c.wand} />}
          {c.patronus && <Field label="Patronus" value={c.patronus} />}
          {c.family && <ListField label="Family" items={c.family} />}
          {c.friends && <ListField label="Friends" items={c.friends} />}
          {c.enemies && <ListField label="Enemies" items={c.enemies} />}
        </div>

        {c.quotes && c.quotes.length > 0 && (
          <div className="mt-6">
            <h4 className="font-display text-gold text-sm uppercase tracking-widest mb-2">Quotes</h4>
            {c.quotes.map((q, i) => (
              <blockquote key={i} className="border-l-2 border-gold pl-4 italic text-muted-foreground my-2">
                "{q}"
              </blockquote>
            ))}
          </div>
        )}

        {c.hidden && c.hidden.length > 0 && (
          <div className="mt-6 rounded-lg border border-gold/30 bg-gold/5 p-4">
            <h4 className="font-display text-gold text-sm uppercase tracking-widest mb-2">Hidden Facts</h4>
            <ul className="space-y-2 text-sm">
              {c.hidden.map((h, i) => (
                <li key={i} className="before:content-['✦'] before:text-gold before:mr-2">{h}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-widest text-gold-soft">{label}</div>
      <div className="mt-1">{value}</div>
    </div>
  );
}
function ListField({ label, items }: { label: string; items: string[] }) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-widest text-gold-soft">{label}</div>
      <ul className="mt-1 space-y-0.5 text-muted-foreground">
        {items.map((i, k) => <li key={k}>• {i}</li>)}
      </ul>
    </div>
  );
}
