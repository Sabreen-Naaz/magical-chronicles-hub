import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { getTodaysOwlMail } from "@/lib/dailyContent";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/owl")({ component: OwlMailPage });

function OwlMailPage() {
  const [mail] = useState(() => getTodaysOwlMail());
  const [showAnswer, setShowAnswer] = useState(false);
  useEffect(() => { setShowAnswer(false); }, [mail]);

  return (
    <div>
      <PageHeader title="🦉 Owl Post" subtitle="A fresh letter arrives every dawn from the Owlery." />
      <div className="mx-auto max-w-2xl space-y-5">
        <Card title="📜 Rare Fact">{mail.fact}</Card>
        <Card title="🔮 Hidden Secret Hint">{mail.secret}</Card>
        <Card title="🧠 Character Trivia">
          <p className="mb-2">{mail.trivia.q}</p>
          {showAnswer ? (
            <p className="text-gold italic">{mail.trivia.a}</p>
          ) : (
            <button onClick={() => setShowAnswer(true)} className="text-sm text-gold underline">Reveal answer</button>
          )}
        </Card>
        <Card title="⚡ Daily Challenge">{mail.challenge}</Card>
      </div>
    </div>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="magic-card p-6">
      <h3 className="font-display text-gold text-xl mb-2">{title}</h3>
      <div className="text-sm text-foreground/90 leading-relaxed">{children}</div>
    </div>
  );
}
