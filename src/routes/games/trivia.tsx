import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { useAchievements } from "@/lib/storage";

export const Route = createFileRoute("/games/trivia")({
  component: TriviaGame,
});

const POOL = [
  { q: "Number of Horcruxes Voldemort intentionally created?", a: ["6", "7", "5", "8"], i: 0 },
  { q: "Hagrid's pet dragon was named?", a: ["Smaug", "Norbert", "Charlie", "Aragog"], i: 1 },
  { q: "Founder of Slytherin?", a: ["Salazar", "Helga", "Godric", "Rowena"], i: 0 },
  { q: "Hermione's middle name?", a: ["Jean", "Mary", "Anne", "Rose"], i: 0 },
  { q: "Who taught Defense in Year 4?", a: ["Lockhart", "Lupin", "Moody (Crouch)", "Umbridge"], i: 2 },
  { q: "Color of the Hogwarts Express?", a: ["Black", "Scarlet", "Green", "Gold"], i: 1 },
  { q: "Number of Quidditch players per team?", a: ["6", "7", "5", "9"], i: 1 },
  { q: "Spell to open locks?", a: ["Lumos", "Alohomora", "Aparecium", "Reparo"], i: 1 },
  { q: "Mr Weasley's first name?", a: ["Arthur", "Bilius", "Septimus", "Cedrella"], i: 0 },
  { q: "Headmaster after Dumbledore (briefly)?", a: ["McGonagall", "Snape", "Slughorn", "Umbridge"], i: 1 },
  { q: "Who founded Hufflepuff?", a: ["Helga Hufflepuff", "Rowena Ravenclaw", "Pomona Sprout", "Lily Evans"], i: 0 },
  { q: "What is Newt Scamander's profession?", a: ["Auror", "Magizoologist", "Healer", "Unspeakable"], i: 1 },
];

function TriviaGame() {
  const [i, setI] = useState(0);
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(60);
  const [running, setRunning] = useState(false);
  const [done, setDone] = useState(false);
  const { unlock } = useAchievements();
  const order = useMemo(() => [...POOL].sort(() => Math.random() - 0.5), [running]);

  useEffect(() => {
    if (!running) return;
    if (time <= 0) {
      setRunning(false); setDone(true);
      if (score >= 8) unlock("trivia-champion", "Trivia Champion", "Scored 8+ in the trivia challenge.");
      return;
    }
    const id = setTimeout(() => setTime((t) => t - 1), 1000);
    return () => clearTimeout(id);
  }, [running, time, score, unlock]);

  const start = () => { setI(0); setScore(0); setTime(60); setRunning(true); setDone(false); };
  const answer = (idx: number) => {
    if (!running) return;
    if (order[i].i === idx) setScore((s) => s + 1);
    setI((x) => (x + 1) % order.length);
  };

  if (!running && !done) {
    return (
      <div>
        <PageHeader title="Trivia Challenge" subtitle="60 seconds. As many right as you can." />
        <div className="magic-card p-10 text-center max-w-md mx-auto">
          <button onClick={start} className="rounded-md bg-gold px-6 py-3 font-display text-primary-foreground hover:opacity-90">Begin</button>
        </div>
      </div>
    );
  }
  if (done) {
    return (
      <div>
        <PageHeader title="Time's Up" />
        <div className="magic-card p-10 text-center max-w-md mx-auto">
          <div className="text-7xl font-display text-shimmer glow-text">{score}</div>
          <p className="mt-4 text-muted-foreground">correct answers</p>
          <button onClick={start} className="mt-6 rounded-md bg-gold px-5 py-2 text-primary-foreground">Play again</button>
        </div>
      </div>
    );
  }
  const cur = order[i];
  return (
    <div>
      <PageHeader title="Trivia Challenge" />
      <div className="magic-card p-8 max-w-2xl mx-auto">
        <div className="flex justify-between text-sm mb-4">
          <span>Score: <span className="text-gold">{score}</span></span>
          <span>Time: <span className={`text-gold ${time <= 10 ? "animate-pulse text-red-400" : ""}`}>{time}s</span></span>
        </div>
        <h3 className="font-display text-2xl text-gold">{cur.q}</h3>
        <div className="mt-6 grid gap-2">
          {cur.a.map((opt, idx) => (
            <button key={idx} onClick={() => answer(idx)}
              className="rounded-md border border-gold/30 px-4 py-3 text-left text-sm hover:bg-gold/10">
              {opt}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
