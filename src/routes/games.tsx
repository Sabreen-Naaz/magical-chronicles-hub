import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { FlaskConical, Wand2, BrainCircuit, Eye, ScrollText } from "lucide-react";

export const Route = createFileRoute("/games")({
  head: () => ({
    meta: [
      { title: "Magical Games — Wizarding World Explorer" },
      { name: "description", content: "Brew potions, cast spells, take the wizard quiz, and hunt hidden artifacts." },
      { property: "og:title", content: "Magical Games" },
      { property: "og:description", content: "Five mini-games inside the Wizarding World." },
    ],
  }),
  component: GamesIndex,
});

const games = [
  { to: "/games/potion", label: "Potion Brewing", desc: "Add ingredients in the right order to brew a perfect potion.", icon: FlaskConical },
  { to: "/games/spells", label: "Spell Casting", desc: "Type the incantation before the duel timer runs out.", icon: Wand2 },
  { to: "/games/quiz", label: "Wizard Quiz", desc: "Test your knowledge of the wizarding world.", icon: BrainCircuit },
  { to: "/games/hidden", label: "Hidden Object Hunt", desc: "Find the magical artifacts hidden in the parchment.", icon: Eye },
  { to: "/games/trivia", label: "Trivia Challenge", desc: "Rapid-fire trivia: how many can you answer in 60 seconds?", icon: ScrollText },
] as const;

function GamesIndex() {
  return (
    <div>
      <PageHeader title="The Game Room" subtitle="Pick your magical challenge. Achievements await." />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {games.map((g) => {
          const Icon = g.icon;
          return (
            <Link key={g.to} to={g.to} className="magic-card magic-card-hover p-6">
              <Icon className="h-8 w-8 text-gold mb-3" />
              <h3 className="font-display text-xl text-gold">{g.label}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{g.desc}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
