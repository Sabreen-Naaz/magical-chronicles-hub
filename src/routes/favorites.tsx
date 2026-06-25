import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { useFavorites } from "@/lib/storage";
import { Heart } from "lucide-react";

export const Route = createFileRoute("/favorites")({
  head: () => ({
    meta: [
      { title: "Favorites — Wizarding World Explorer" },
      { name: "description", content: "Your saved characters, spells, facts, creatures and locations." },
    ],
  }),
  component: FavoritesPage,
});

const KINDS = ["character", "spell", "fact", "creature", "object", "location"] as const;
const LABELS: Record<string, string> = {
  character: "Characters", spell: "Spells", fact: "Facts",
  creature: "Creatures", object: "Artifacts", location: "Locations",
};

function FavoritesPage() {
  const { favs, toggle } = useFavorites();
  const grouped = KINDS.map((k) => ({
    kind: k,
    items: Object.values(favs).filter((f) => f.kind === k),
  }));
  const total = Object.keys(favs).length;

  return (
    <div>
      <PageHeader title="Your Favorites" subtitle={`${total} saved treasure${total === 1 ? "" : "s"}.`} />
      {total === 0 ? (
        <div className="magic-card p-10 text-center max-w-md mx-auto">
          <Heart className="h-10 w-10 text-gold mx-auto" />
          <p className="mt-4 italic text-muted-foreground">No favorites yet. Tap the heart next to any character, spell, or fact to begin your collection.</p>
        </div>
      ) : (
        <div className="space-y-8">
          {grouped.map(({ kind, items }) => items.length > 0 && (
            <section key={kind}>
              <h2 className="font-display text-xl text-gold mb-3">{LABELS[kind]}</h2>
              <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((f) => (
                  <div key={f.id} className="magic-card p-3 flex items-center justify-between">
                    <span className="truncate">{f.label}</span>
                    <button
                      onClick={() => toggle(f.kind, f.id, f.label)}
                      className="text-gold hover:text-red-400 p-1"
                      aria-label="Remove"
                    >
                      <Heart className="h-4 w-4 fill-current" />
                    </button>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
