import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { useState } from "react";
import { useInventory } from "@/lib/inventory";
import { toast } from "sonner";

export const Route = createFileRoute("/detective")({ component: Detective });

const CASES = [
  {
    id: "regulus",
    title: "The R.A.B. Mystery",
    clues: [
      "A locket horcrux is found, but the real one was already taken.",
      "The note is signed only with three initials.",
      "A Slytherin family known for service to the Dark Lord — and one son who defected.",
    ],
    options: ["Rabastan Lestrange", "Regulus Arcturus Black", "Rodolphus Black", "Rita Skeeter"],
    answer: "Regulus Arcturus Black",
  },
  {
    id: "winky",
    title: "Who Cast the Dark Mark at the Quidditch Cup?",
    clues: [
      "A house-elf is found holding Harry's wand.",
      "The elf's master is hiding something — and someone — at home.",
      "Polyjuice Potion has been brewed in great quantities at Hogwarts that year.",
    ],
    options: ["Winky", "Barty Crouch Jr.", "Ludo Bagman", "Igor Karkaroff"],
    answer: "Barty Crouch Jr.",
  },
  {
    id: "prince",
    title: "The Half-Blood Prince",
    clues: [
      "A Muggle father named Tobias.",
      "A witch mother whose maiden name was a royal title.",
      "The textbook is filled with hexes a teenager invented.",
    ],
    options: ["James Potter", "Tom Riddle", "Severus Snape", "Albus Dumbledore"],
    answer: "Severus Snape",
  },
];

function Detective() {
  const { discoverSecret, collect } = useInventory();
  const [solved, setSolved] = useState<Record<string, boolean>>({});

  return (
    <div>
      <PageHeader title="🔍 Detective Mode" subtitle="Mysteries from the books the films left unsolved." />
      <div className="mx-auto max-w-3xl space-y-6">
        {CASES.map((c) => (
          <div key={c.id} className="magic-card p-6">
            <h3 className="font-display text-xl text-gold mb-3">{c.title}</h3>
            <ul className="space-y-1 mb-4 text-sm text-foreground/85 list-disc pl-5">
              {c.clues.map((cl) => <li key={cl}>{cl}</li>)}
            </ul>
            {solved[c.id] ? (
              <div className="text-green-400 font-display">✓ Solved: {c.answer}</div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                {c.options.map((o) => (
                  <button
                    key={o}
                    onClick={() => {
                      if (o === c.answer) {
                        setSolved((s) => ({ ...s, [c.id]: true }));
                        discoverSecret("case-" + c.id);
                        collect({ id: "case-" + c.id, kind: "scroll", name: c.title, rarity: "rare" });
                        toast.success("Case solved!");
                      } else toast.error("Not quite. Re-read the clues.");
                    }}
                    className="rounded-md border border-gold/30 bg-midnight/60 px-3 py-2 text-sm hover:bg-gold/10"
                  >{o}</button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
