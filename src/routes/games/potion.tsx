import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { useAchievements } from "@/lib/storage";
import { toast } from "sonner";

export const Route = createFileRoute("/games/potion")({
  component: PotionGame,
});

const RECIPE = ["Moonstone", "Powdered Asphodel", "Mandrake Root", "Phoenix Feather", "Dragon Blood"];
const INGREDIENTS = ["Moonstone", "Powdered Asphodel", "Mandrake Root", "Phoenix Feather", "Dragon Blood", "Boomslang Skin", "Bezoar", "Wolfsbane"];

function PotionGame() {
  const [picked, setPicked] = useState<string[]>([]);
  const [status, setStatus] = useState<"playing" | "won" | "lost">("playing");
  const { unlock } = useAchievements();

  const pick = (ing: string) => {
    if (status !== "playing") return;
    const next = [...picked, ing];
    const idx = next.length - 1;
    if (ing !== RECIPE[idx]) {
      setStatus("lost");
      toast.error("The cauldron erupts! Wrong ingredient.");
      return;
    }
    setPicked(next);
    if (next.length === RECIPE.length) {
      setStatus("won");
      toast.success("Felix Felicis brewed perfectly! ✨");
      unlock("potion-master", "Potion Master", "Brewed a perfect potion.");
    }
  };

  const reset = () => { setPicked([]); setStatus("playing"); };

  return (
    <div>
      <PageHeader title="Potion Brewing" subtitle="Add the ingredients in the exact order. One mistake and the cauldron blows." />

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="magic-card p-6 text-center">
          <div className="text-[10px] uppercase tracking-widest text-gold-soft">Cauldron</div>
          <div className="relative mx-auto mt-4 h-48 w-48 rounded-b-full border-4 border-gold/40 bg-gradient-to-b from-purple-900/40 to-indigo-900/60 overflow-hidden">
            <div className="absolute inset-x-0 top-2 h-3 bg-gradient-to-r from-emerald-300/40 via-amber-300/60 to-pink-400/40 animate-pulse blur-sm" />
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-purple-700/80 to-transparent" />
            {status === "won" && <div className="absolute inset-0 animate-pulse bg-amber-300/30" />}
            {status === "lost" && <div className="absolute inset-0 animate-pulse bg-red-700/40" />}
          </div>
          <div className="mt-6">
            <div className="text-[10px] uppercase tracking-widest text-gold-soft mb-2">Added</div>
            <div className="flex flex-wrap justify-center gap-1">
              {picked.length === 0 && <span className="text-xs italic text-muted-foreground">nothing yet</span>}
              {picked.map((p, i) => (
                <span key={i} className="rounded-full bg-gold/20 px-2 py-0.5 text-xs text-gold">{p}</span>
              ))}
            </div>
          </div>
          {status !== "playing" && (
            <button onClick={reset} className="mt-6 rounded-md bg-gold px-4 py-2 text-sm text-primary-foreground">
              Brew again
            </button>
          )}
        </div>

        <div className="magic-card p-6">
          <div className="text-[10px] uppercase tracking-widest text-gold-soft mb-3">Recipe Hint</div>
          <ol className="space-y-1 mb-6 text-sm">
            {RECIPE.map((r, i) => (
              <li key={i} className={`${i < picked.length ? "text-emerald-300" : "text-muted-foreground"}`}>
                {i + 1}. {i < picked.length ? r : "???"}
              </li>
            ))}
          </ol>
          <div className="text-[10px] uppercase tracking-widest text-gold-soft mb-2">Ingredients</div>
          <div className="grid grid-cols-2 gap-2">
            {INGREDIENTS.map((ing) => (
              <button
                key={ing}
                disabled={status !== "playing"}
                onClick={() => pick(ing)}
                className="rounded-md border border-gold/30 bg-midnight/60 px-3 py-2 text-sm hover:bg-gold/10 disabled:opacity-50"
              >
                {ing}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
