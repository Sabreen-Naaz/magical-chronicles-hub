import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { useState } from "react";

export const Route = createFileRoute("/professor")({ component: ProfessorChat });

const KB: { match: RegExp; reply: string }[] = [
  { match: /horcrux/i, reply: "A Horcrux is a vessel into which a witch or wizard has hidden a fragment of their soul, achieved through murder. Voldemort made seven — though only six were intentional." },
  { match: /patronus/i, reply: "The Patronus Charm conjures a guardian, taking the form of an animal that reflects the caster's innermost self. The incantation is Expecto Patronum, and it requires a powerfully happy memory." },
  { match: /house|sort/i, reply: "There are four Houses: brave Gryffindor, loyal Hufflepuff, clever Ravenclaw, and ambitious Slytherin. The Sorting Hat considers your traits — and your choices." },
  { match: /wand/i, reply: "The wand chooses the wizard, Mr. Potter. Ollivander matches wood, core, length, and flexibility to the witch or wizard's nature." },
  { match: /quidditch/i, reply: "Quidditch is played on broomsticks with four balls: the Quaffle, two Bludgers, and the Golden Snitch. Catching the Snitch ends the game and awards 150 points." },
  { match: /(snape|severus)/i, reply: "Severus Snape was a double agent loyal to Dumbledore. His love for Lily Evans defined his every action — even at the cost of his life." },
  { match: /dumbledore/i, reply: "Albus Percival Wulfric Brian Dumbledore — Headmaster of Hogwarts, defeater of Grindelwald, master of the Elder Wand. A flawed man who loved deeply." },
  { match: /voldemort|riddle/i, reply: "Tom Marvolo Riddle — the half-blood orphan who became the Dark Lord. He fragmented his soul to escape death, and that very act undid him." },
];

function answer(q: string) {
  for (const k of KB) if (k.match.test(q)) return k.reply;
  return "An interesting question. Consult Hogwarts: A History, or rephrase — I respond to topics like Horcruxes, Patronuses, Houses, wands, Quidditch, Snape, Dumbledore, and Voldemort.";
}

function ProfessorChat() {
  const [msgs, setMsgs] = useState<{ from: "you" | "prof"; text: string }[]>([
    { from: "prof", text: "Welcome. I am Professor Aurelius. Ask me about the wizarding world." },
  ]);
  const [input, setInput] = useState("");

  const send = () => {
    const q = input.trim();
    if (!q) return;
    setMsgs((m) => [...m, { from: "you", text: q }, { from: "prof", text: answer(q) }]);
    setInput("");
  };

  return (
    <div>
      <PageHeader title="🧙 Ask Professor Aurelius" subtitle="A wizened scholar answers your questions." />
      <div className="mx-auto max-w-2xl magic-card p-6">
        <div className="space-y-3 max-h-[420px] overflow-y-auto mb-4">
          {msgs.map((m, i) => (
            <div key={i} className={`flex ${m.from === "you" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[80%] rounded-lg px-3 py-2 text-sm ${m.from === "you" ? "bg-gold text-primary-foreground" : "bg-midnight/70 border border-gold/30 text-foreground"}`}>
                {m.text}
              </div>
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
            placeholder="What is a Horcrux?"
            className="flex-1 rounded-md bg-midnight/60 border border-gold/30 px-3 py-2 text-sm"
          />
          <button onClick={send} className="rounded-md bg-gold px-4 py-2 text-sm font-display text-primary-foreground">Ask</button>
        </div>
      </div>
    </div>
  );
}
