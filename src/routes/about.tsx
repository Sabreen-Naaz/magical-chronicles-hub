import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Wizarding World Explorer" },
      { name: "description", content: "A fan-made educational tribute to the Harry Potter series. Not affiliated or commercial." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto">
      <PageHeader title="About this Archive" subtitle="A fan-made magical encyclopedia." />
      <div className="magic-card p-8 space-y-5 leading-relaxed">
        <p>
          <span className="font-display text-gold">Wizarding World Explorer</span> is an
          interactive fan project inspired by the Harry Potter books by J.K. Rowling.
          It is intended purely for <strong>educational and entertainment</strong>{" "}
          purposes — a love letter from readers to the series that shaped a generation.
        </p>
        <p>
          All characters, spells, places, and creatures referenced here are the
          intellectual property of their respective rights holders, including J.K.
          Rowling, Bloomsbury Publishing, Scholastic, and Warner Bros. Entertainment.
          This site has no official affiliation with those entities and is{" "}
          <strong>not intended for any commercial use</strong>.
        </p>
        <p>
          Special care has been taken to highlight book-only lore, removed scenes,
          and characters who were diminished or cut from the films — so that the
          richness of the written world can keep glowing for new readers.
        </p>
        <p className="italic text-muted-foreground">
          "Words are, in my not so humble opinion, our most inexhaustible source of magic." — Albus Dumbledore
        </p>
      </div>
    </div>
  );
}
