import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { useAchievements } from "@/lib/storage";
import { Trophy, Lock } from "lucide-react";

export const Route = createFileRoute("/achievements")({
  head: () => ({
    meta: [
      { title: "Achievements — Wizarding World Explorer" },
      { name: "description", content: "Your unlocked badges and magical achievements." },
    ],
  }),
  component: AchievementsPage,
});

const ALL: { id: string; label: string; description: string }[] = [
  { id: "potion-master", label: "Potion Master", description: "Brew a perfect potion." },
  { id: "duelist", label: "Hogwarts Duelist", description: "Cast 5+ spells correctly in a duel." },
  { id: "ravenclaw-mind", label: "Ravenclaw Mind", description: "Score 8+ on the wizard quiz." },
  { id: "eagle-eye", label: "Eagle Eye", description: "Find every hidden artifact." },
  { id: "trivia-champion", label: "Trivia Champion", description: "Score 8+ in trivia." },
];

function AchievementsPage() {
  const { unlocked } = useAchievements();
  return (
    <div>
      <PageHeader title="Achievements" subtitle={`${Object.keys(unlocked).length} of ${ALL.length} unlocked`} />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {ALL.map((a) => {
          const isUnlocked = !!unlocked[a.id];
          return (
            <div key={a.id} className={`magic-card p-6 text-center transition ${isUnlocked ? "border-gold" : "opacity-60"}`}>
              <div className="mx-auto h-16 w-16 rounded-full grid place-items-center" style={{
                background: isUnlocked ? "radial-gradient(circle, oklch(0.85 0.18 85 / 0.4), transparent)" : "oklch(0.25 0.05 265 / 0.5)",
              }}>
                {isUnlocked ? <Trophy className="h-8 w-8 text-gold animate-float-y" /> : <Lock className="h-7 w-7 text-muted-foreground" />}
              </div>
              <h3 className={`mt-4 font-display text-lg ${isUnlocked ? "text-gold glow-text" : "text-muted-foreground"}`}>{a.label}</h3>
              <p className="mt-1 text-xs text-muted-foreground">{a.description}</p>
              {isUnlocked && <p className="mt-3 text-[10px] uppercase tracking-widest text-gold-soft">Unlocked</p>}
            </div>
          );
        })}
      </div>
    </div>
  );
}
