import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, Sparkles, User, ScrollText, ArrowRight } from "lucide-react";
import { characters } from "@/data/characters";
import { spells } from "@/data/spells";
import { facts } from "@/data/facts";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Wizarding World Explorer — Home" },
      { name: "description", content: "Enter the wizarding world. Explore characters, spells, lore, creatures, and games." },
      { property: "og:title", content: "Wizarding World Explorer" },
      { property: "og:description", content: "An immersive Harry Potter encyclopedia." },
    ],
  }),
  component: Home,
});

function dayIndex(len: number) {
  const day = Math.floor(Date.now() / (1000 * 60 * 60 * 24));
  return day % len;
}

function Home() {
  const [q, setQ] = useState("");
  const charOfDay = characters[dayIndex(characters.length)];
  const spellOfDay = spells[dayIndex(spells.length)];
  const factOfDay = facts[dayIndex(facts.length)];

  const results = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return [] as Array<{ type: string; label: string; to: string }>;
    const out: Array<{ type: string; label: string; to: string }> = [];
    characters.forEach((c) => c.name.toLowerCase().includes(term) && out.push({ type: "Character", label: c.name, to: "/characters" }));
    spells.forEach((s) => s.name.toLowerCase().includes(term) && out.push({ type: "Spell", label: s.name, to: "/spells" }));
    facts.forEach((f) => f.title.toLowerCase().includes(term) && out.push({ type: "Fact", label: f.title, to: "/facts" }));
    return out.slice(0, 8);
  }, [q]);

  return (
    <div>
      {/* Hero */}
      <section className="relative mb-16 overflow-hidden rounded-2xl magic-card p-8 md:p-16 text-center">
        <div
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "radial-gradient(circle at 50% 100%, oklch(0.4 0.12 265 / 0.6), transparent 70%), radial-gradient(circle at 20% 0%, oklch(0.5 0.18 85 / 0.2), transparent 60%)",
          }}
        />
        {/* Castle silhouette in SVG */}
        <svg viewBox="0 0 800 200" className="absolute bottom-0 left-0 w-full opacity-40" preserveAspectRatio="none">
          <path
            d="M0,200 L0,140 L40,140 L40,110 L60,110 L60,80 L80,80 L80,110 L100,110 L100,130 L140,130 L140,90 L160,70 L180,90 L180,130 L220,130 L220,100 L240,100 L240,60 L260,40 L280,60 L280,100 L320,100 L320,140 L360,140 L360,80 L380,80 L380,50 L400,30 L420,50 L420,80 L440,80 L440,140 L480,140 L480,100 L500,100 L500,60 L520,40 L540,60 L540,100 L580,100 L580,130 L620,130 L620,90 L640,70 L660,90 L660,130 L700,130 L700,110 L720,110 L720,80 L740,80 L740,110 L760,110 L760,140 L800,140 L800,200 Z"
            fill="oklch(0.08 0.05 265)"
          />
        </svg>

        <div className="relative">
          <p className="text-gold-soft tracking-[0.4em] text-xs md:text-sm uppercase">Welcome, Witch or Wizard</p>
          <h1 className="mt-4 text-5xl md:text-7xl font-display font-bold text-shimmer glow-text">
            Wizarding World
          </h1>
          <h2 className="text-2xl md:text-4xl font-display text-gold/90 mt-2">Explorer</h2>
          <p className="mt-6 max-w-2xl mx-auto text-lg italic text-muted-foreground">
            "It does not do to dwell on dreams and forget to live." Discover characters, spells, hidden lore and the secrets the films never told you.
          </p>

          {/* Search */}
          <div className="relative mt-10 max-w-xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gold" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search the wizarding archives…"
              className="w-full rounded-full border border-gold/40 bg-midnight/60 backdrop-blur pl-11 pr-4 py-3 text-sm placeholder:text-muted-foreground focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/40"
            />
            {results.length > 0 && (
              <div className="absolute z-20 mt-2 w-full magic-card overflow-hidden text-left">
                {results.map((r, i) => (
                  <Link
                    key={i}
                    to={r.to}
                    className="flex items-center justify-between px-4 py-2 hover:bg-gold/10 transition"
                    onClick={() => setQ("")}
                  >
                    <span className="text-sm">{r.label}</span>
                    <span className="text-xs text-gold-soft">{r.type}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Featured trio */}
      <section className="grid gap-6 md:grid-cols-3 mb-16">
        <FeaturedCard
          icon={<User className="h-5 w-5" />}
          label="Character of the Day"
          title={charOfDay.name}
          body={charOfDay.bio.slice(0, 140) + "…"}
          to="/characters"
        />
        <FeaturedCard
          icon={<Sparkles className="h-5 w-5" />}
          label="Spell of the Day"
          title={spellOfDay.name}
          body={`${spellOfDay.pronunciation} — ${spellOfDay.effect}`}
          to="/spells"
        />
        <FeaturedCard
          icon={<ScrollText className="h-5 w-5" />}
          label="Magical Fact"
          title={factOfDay.title}
          body={factOfDay.body}
          to="/facts"
        />
      </section>

      {/* Nav tiles */}
      <section className="mb-12">
        <h2 className="text-2xl md:text-3xl font-display text-gold mb-6 text-center">Begin Your Journey</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { to: "/characters", label: "Characters", desc: "Major, minor & book-only" },
            { to: "/spells", label: "Spells", desc: "Incantations of every kind" },
            { to: "/facts", label: "Hidden Lore", desc: "What the movies never told you" },
            { to: "/creatures", label: "Creatures", desc: "Magical beasts & beings" },
            { to: "/objects", label: "Artifacts", desc: "Hallows & Horcruxes" },
            { to: "/locations", label: "Locations", desc: "Hogwarts & beyond" },
            { to: "/map", label: "Hogwarts Map", desc: "Interactive castle" },
            { to: "/games", label: "Games", desc: "Quizzes, brewing, dueling" },
          ].map((tile) => (
            <Link
              key={tile.to}
              to={tile.to}
              className="magic-card magic-card-hover p-5 group"
            >
              <div className="font-display text-lg text-gold">{tile.label}</div>
              <p className="text-sm text-muted-foreground mt-1">{tile.desc}</p>
              <div className="mt-3 flex items-center text-xs text-gold-soft group-hover:text-gold">
                Explore <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

function FeaturedCard({
  icon, label, title, body, to,
}: { icon: React.ReactNode; label: string; title: string; body: string; to: string }) {
  return (
    <Link to={to} className="magic-card magic-card-hover p-6 flex flex-col">
      <div className="flex items-center gap-2 text-gold-soft uppercase tracking-widest text-xs">
        {icon} {label}
      </div>
      <h3 className="mt-3 font-display text-2xl text-gold glow-text">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground leading-relaxed flex-1">{body}</p>
      <div className="mt-4 text-xs text-gold-soft flex items-center">
        Learn more <ArrowRight className="ml-1 h-3 w-3" />
      </div>
    </Link>
  );
}
