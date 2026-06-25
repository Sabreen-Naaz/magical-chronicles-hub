import { useEffect, useState } from "react";
import { X, Sparkles } from "lucide-react";

type House = "Gryffindor" | "Slytherin" | "Ravenclaw" | "Hufflepuff";

const HOUSES: Record<House, { color: string; trait: string; founder: string; animal: string; quote: string }> = {
  Gryffindor: { color: "from-red-700 to-amber-500", trait: "Brave, daring, chivalrous", founder: "Godric Gryffindor", animal: "Lion", quote: "Where dwell the brave at heart." },
  Slytherin:  { color: "from-emerald-700 to-slate-400", trait: "Cunning, ambitious, resourceful", founder: "Salazar Slytherin", animal: "Serpent", quote: "Those cunning folk use any means to achieve their ends." },
  Ravenclaw:  { color: "from-blue-700 to-amber-600", trait: "Wise, witty, curious", founder: "Rowena Ravenclaw", animal: "Eagle", quote: "Wit beyond measure is man's greatest treasure." },
  Hufflepuff: { color: "from-yellow-500 to-stone-700", trait: "Loyal, patient, just", founder: "Helga Hufflepuff", animal: "Badger", quote: "Those patient Hufflepuffs are true, and unafraid of toil." },
};

function sortHouse(name: string, dob: string): House {
  const seed = (name.trim().toLowerCase() + dob).split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  const houses: House[] = ["Gryffindor", "Slytherin", "Ravenclaw", "Hufflepuff"];
  // Weight by name length parity & DOB day for variety
  const day = parseInt(dob.slice(-2), 10) || 0;
  return houses[(seed + day) % 4];
}

export function SortingHat() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [result, setResult] = useState<House | null>(null);
  const [sorting, setSorting] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("wwx:house");
      if (!saved) setOpen(true);
    } catch {}
  }, []);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !dob) return;
    setSorting(true);
    setTimeout(() => {
      const h = sortHouse(name, dob);
      setResult(h);
      setSorting(false);
      try {
        localStorage.setItem("wwx:house", JSON.stringify({ name: name.trim(), dob, house: h }));
        window.dispatchEvent(new Event("wwx:house-changed"));
      } catch {}
    }, 1800);
  };

  const close = () => { setOpen(false); setResult(null); setName(""); setDob(""); };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-md" />
      <div className="relative magic-card max-w-lg w-full p-8 animate-fade-in">
        <button onClick={close} className="absolute top-4 right-4 rounded-full p-2 text-gold hover:bg-gold/10" aria-label="Close">
          <X className="h-5 w-5" />
        </button>

        {!result && !sorting && (
          <>
            <div className="text-center">
              <div className="text-5xl mb-3">🎩</div>
              <h2 className="font-display text-3xl text-shimmer glow-text">The Sorting Hat</h2>
              <p className="mt-2 text-sm text-muted-foreground italic">
                "Oh, you may not think I'm pretty, but don't judge on what you see…"
              </p>
            </div>
            <form onSubmit={submit} className="mt-6 space-y-4">
              <div>
                <label className="text-[10px] uppercase tracking-widest text-gold-soft">Your Name</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  maxLength={50}
                  placeholder="e.g. Harry Potter"
                  className="mt-1 w-full rounded-md border border-gold/40 bg-midnight/60 px-4 py-2.5 text-sm focus:border-gold focus:outline-none"
                />
              </div>
              <div>
                <label className="text-[10px] uppercase tracking-widest text-gold-soft">Date of Birth</label>
                <input
                  type="date"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  required
                  className="mt-1 w-full rounded-md border border-gold/40 bg-midnight/60 px-4 py-2.5 text-sm focus:border-gold focus:outline-none"
                />
              </div>
              <button type="submit" className="w-full rounded-md bg-gold px-5 py-3 font-display tracking-wider text-primary-foreground hover:opacity-90 flex items-center justify-center gap-2">
                <Sparkles className="h-4 w-4" /> Place the Hat on My Head
              </button>
              <button type="button" onClick={close} className="w-full text-xs text-muted-foreground hover:text-gold">
                Skip for now
              </button>
            </form>
          </>
        )}

        {sorting && (
          <div className="text-center py-10">
            <div className="text-7xl mb-6 animate-pulse">🎩</div>
            <p className="font-display text-xl text-gold animate-pulse">Hmm… difficult, very difficult…</p>
            <p className="mt-2 text-sm text-muted-foreground italic">The Hat is deliberating…</p>
          </div>
        )}

        {result && (
          <div className="text-center">
            <div className="text-xs uppercase tracking-widest text-gold-soft">The Sorting Hat declares</div>
            <div className={`mt-4 rounded-2xl p-8 bg-gradient-to-br ${HOUSES[result].color}`}>
              <div className="text-6xl mb-2">{result === "Gryffindor" ? "🦁" : result === "Slytherin" ? "🐍" : result === "Ravenclaw" ? "🦅" : "🦡"}</div>
              <div className="font-display text-4xl text-white drop-shadow">{result.toUpperCase()}!</div>
            </div>
            <div className="mt-5 text-sm space-y-2">
              <p><span className="text-gold-soft">Trait:</span> {HOUSES[result].trait}</p>
              <p><span className="text-gold-soft">Founder:</span> {HOUSES[result].founder}</p>
              <p><span className="text-gold-soft">Symbol:</span> {HOUSES[result].animal}</p>
              <p className="italic text-muted-foreground mt-3">"{HOUSES[result].quote}"</p>
            </div>
            <button onClick={close} className="mt-6 rounded-md bg-gold px-6 py-2 text-primary-foreground hover:opacity-90">
              Enter the Castle
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export function useHouse() {
  const [data, setData] = useState<{ name: string; dob: string; house: House } | null>(null);
  useEffect(() => {
    const read = () => {
      try {
        const raw = localStorage.getItem("wwx:house");
        setData(raw ? JSON.parse(raw) : null);
      } catch { setData(null); }
    };
    read();
    window.addEventListener("wwx:house-changed", read);
    return () => window.removeEventListener("wwx:house-changed", read);
  }, []);
  return data;
}
