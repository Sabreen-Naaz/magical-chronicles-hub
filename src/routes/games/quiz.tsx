import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { useAchievements } from "@/lib/storage";

export const Route = createFileRoute("/games/quiz")({
  component: QuizGame,
});

const QUESTIONS = [
  { q: "What's the core of Harry's wand?", choices: ["Dragon heartstring", "Unicorn hair", "Phoenix feather", "Veela hair"], answer: 2 },
  { q: "Who is the Half-Blood Prince?", choices: ["Voldemort", "Snape", "Dumbledore", "Sirius"], answer: 1 },
  { q: "What form does Hermione's Patronus take?", choices: ["Otter", "Doe", "Hare", "Cat"], answer: 0 },
  { q: "Which Hallow did Harry use last in the final book?", choices: ["Elder Wand", "Cloak", "Resurrection Stone", "All three"], answer: 2 },
  { q: "Who killed Bellatrix Lestrange?", choices: ["Harry", "Neville", "Molly Weasley", "Ginny"], answer: 2 },
  { q: "Where is Slytherin's locket hidden?", choices: ["Gringotts", "A sea cave", "The Chamber", "Hogwarts kitchens"], answer: 1 },
  { q: "What is the password to the Marauder's Map?", choices: ["Open sesame", "Lumos", "I solemnly swear that I am up to no good", "Alohomora"], answer: 2 },
  { q: "Which creature pulls the Hogwarts carriages?", choices: ["Hippogriffs", "Centaurs", "Thestrals", "Winged horses"], answer: 2 },
  { q: "Who is the original owner of the Resurrection Stone?", choices: ["Cadmus Peverell", "Ignotus Peverell", "Antioch Peverell", "Marvolo Gaunt"], answer: 0 },
  { q: "Which professor is secretly a werewolf?", choices: ["Quirrell", "Lockhart", "Lupin", "Moody"], answer: 2 },
];

function QuizGame() {
  const [i, setI] = useState(0);
  const [score, setScore] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [done, setDone] = useState(false);
  const { unlock } = useAchievements();

  const choose = (idx: number) => {
    if (picked !== null) return;
    setPicked(idx);
    if (idx === QUESTIONS[i].answer) setScore((s) => s + 1);
    setTimeout(() => {
      if (i + 1 >= QUESTIONS.length) {
        setDone(true);
        if (score + (idx === QUESTIONS[i].answer ? 1 : 0) >= 8) {
          unlock("ravenclaw-mind", "Ravenclaw Mind", "Scored 8 or more on the wizard quiz.");
        }
      } else {
        setI((x) => x + 1);
        setPicked(null);
      }
    }, 800);
  };

  const reset = () => { setI(0); setScore(0); setPicked(null); setDone(false); };

  if (done) {
    return (
      <div>
        <PageHeader title="Quiz Complete" />
        <div className="magic-card p-10 text-center max-w-md mx-auto">
          <div className="text-7xl font-display text-shimmer glow-text">{score}/{QUESTIONS.length}</div>
          <p className="mt-4 text-muted-foreground italic">
            {score >= 8 ? "A true Ravenclaw mind." : score >= 5 ? "Not bad, young wizard." : "Back to the library with you."}
          </p>
          <button onClick={reset} className="mt-6 rounded-md bg-gold px-5 py-2 text-primary-foreground">Try again</button>
        </div>
      </div>
    );
  }

  const cur = QUESTIONS[i];
  return (
    <div>
      <PageHeader title="Wizard Quiz" subtitle={`Question ${i + 1} of ${QUESTIONS.length}`} />
      <div className="magic-card p-8 max-w-2xl mx-auto">
        <div className="h-1 w-full bg-secondary rounded-full overflow-hidden mb-6">
          <div className="h-full bg-gold transition-all" style={{ width: `${((i + 1) / QUESTIONS.length) * 100}%` }} />
        </div>
        <h3 className="font-display text-2xl text-gold">{cur.q}</h3>
        <div className="mt-6 grid gap-2">
          {cur.choices.map((c, idx) => {
            const isAns = idx === cur.answer;
            const isPick = picked === idx;
            const show = picked !== null;
            return (
              <button
                key={idx}
                onClick={() => choose(idx)}
                disabled={picked !== null}
                className={`rounded-md border px-4 py-3 text-left text-sm transition ${
                  show && isAns ? "border-emerald-400 bg-emerald-400/15" :
                  show && isPick && !isAns ? "border-red-400 bg-red-400/15" :
                  "border-gold/30 hover:bg-gold/10"
                }`}
              >
                {c}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
