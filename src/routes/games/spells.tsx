import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { spells } from "@/data/spells";
import { useAchievements } from "@/lib/storage";
import { toast } from "sonner";

export const Route = createFileRoute("/games/spells")({
  component: SpellGame,
});

function pickSpell() {
  return spells[Math.floor(Math.random() * spells.length)];
}

function SpellGame() {
  const [target, setTarget] = useState(pickSpell());
  const [input, setInput] = useState("");
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(15);
  const [running, setRunning] = useState(false);
  const { unlock } = useAchievements();

  useEffect(() => {
    if (!running) return;
    if (time <= 0) {
      setRunning(false);
      toast("Time's up! Final score: " + score);
      if (score >= 5) unlock("duelist", "Hogwarts Duelist", "Cast 5+ spells correctly in a duel.");
      return;
    }
    const id = setTimeout(() => setTime((t) => t - 1), 1000);
    return () => clearTimeout(id);
  }, [running, time, score, unlock]);

  const start = () => { setScore(0); setTime(15); setRunning(true); setInput(""); setTarget(pickSpell()); };

  useEffect(() => {
    if (!running) return;
    if (input.trim().toLowerCase() === target.name.toLowerCase()) {
      setScore((s) => s + 1);
      setInput("");
      setTarget(pickSpell());
      setTime((t) => Math.min(t + 2, 20));
    }
  }, [input, target, running]);

  return (
    <div>
      <PageHeader title="Spell Casting Duel" subtitle="Type the incantation exactly to cast it. The timer ticks." />
      <div className="magic-card p-8 max-w-xl mx-auto text-center">
        <div className="flex justify-between text-sm">
          <span>Score: <span className="text-gold">{score}</span></span>
          <span>Time: <span className={`text-gold ${time <= 5 ? "animate-pulse text-red-400" : ""}`}>{time}s</span></span>
        </div>
        <div className="my-10">
          <div className="text-[10px] uppercase tracking-widest text-gold-soft">Cast</div>
          <div className="font-display text-5xl text-shimmer glow-text mt-2">{target.name}</div>
          <div className="text-xs italic text-muted-foreground mt-2">{target.pronunciation}</div>
        </div>
        {running ? (
          <input
            autoFocus
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type the incantation…"
            className="w-full rounded-full border border-gold/40 bg-midnight/60 px-4 py-3 text-center font-display tracking-widest focus:border-gold focus:outline-none"
          />
        ) : (
          <button onClick={start} className="rounded-md bg-gold px-6 py-3 font-display text-primary-foreground hover:opacity-90">
            {score > 0 ? "Duel again" : "Begin Duel"}
          </button>
        )}
      </div>
    </div>
  );
}
