import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { useInventory, TOTAL_SECRETS, useProfile } from "@/lib/inventory";

export const Route = createFileRoute("/profile")({ component: ProfilePage });

const HOUSES = ["Gryffindor", "Slytherin", "Ravenclaw", "Hufflepuff"];

function ProfilePage() {
  const { profile, setProfile } = useProfile();
  const { items, secretsCount } = useInventory();
  const itemList = Object.values(items);

  return (
    <div>
      <PageHeader title="Your Wizard Profile" subtitle="Your inventory, collection, and secrets." />
      <div className="mx-auto max-w-4xl grid gap-6 md:grid-cols-2">
        <div className="magic-card p-6">
          <h3 className="font-display text-gold text-xl mb-4">📜 Wizard Identity</h3>
          <div className="space-y-3">
            <Field label="Name" value={profile.name} onChange={(v) => setProfile({ ...profile, name: v })} />
            <div>
              <label className="text-xs uppercase tracking-widest text-muted-foreground">House</label>
              <select
                value={profile.house}
                onChange={(e) => setProfile({ ...profile, house: e.target.value })}
                className="mt-1 w-full rounded-md bg-midnight/60 border border-gold/30 px-3 py-2 text-sm"
              >
                <option value="">— choose —</option>
                {HOUSES.map((h) => <option key={h}>{h}</option>)}
              </select>
            </div>
            <Field label="Wand" value={profile.wand} onChange={(v) => setProfile({ ...profile, wand: v })} />
            <Field label="Patronus" value={profile.patronus} onChange={(v) => setProfile({ ...profile, patronus: v })} />
            <Field label="Favorite Spell" value={profile.favoriteSpell} onChange={(v) => setProfile({ ...profile, favoriteSpell: v })} />
          </div>
        </div>

        <div className="magic-card p-6">
          <h3 className="font-display text-gold text-xl mb-2">🔍 Secrets Discovered</h3>
          <div className="text-4xl font-display text-shimmer">{secretsCount}/{TOTAL_SECRETS}</div>
          <div className="mt-2 h-2 rounded-full bg-midnight overflow-hidden">
            <div className="h-full bg-gold transition-all" style={{ width: `${Math.min(100, (secretsCount / TOTAL_SECRETS) * 100)}%` }} />
          </div>
          <p className="mt-3 text-xs text-muted-foreground italic">
            Try secret passwords, voice spells, ghost clicks, and hidden objects.
          </p>
        </div>

        <div className="magic-card p-6 md:col-span-2">
          <h3 className="font-display text-gold text-xl mb-4">🎒 Inventory ({itemList.length})</h3>
          {itemList.length === 0 ? (
            <p className="text-sm text-muted-foreground italic">Your trunk is empty. Explore to collect chocolate frog cards, wands, and rare artifacts.</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {itemList.map((it) => (
                <div key={it.id} className="rounded-md border border-gold/20 bg-midnight/50 p-3">
                  <div className="text-2xl">{iconFor(it.kind)}</div>
                  <div className="font-display text-sm text-gold mt-1 truncate">{it.name}</div>
                  <div className="text-xs text-muted-foreground capitalize">{it.kind} {it.rarity ? `· ${it.rarity}` : ""}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function iconFor(k: string) {
  return ({ frog: "🐸", wand: "🪄", creature: "🐉", artifact: "💎", ingredient: "🧪", scroll: "📜", potion: "🧉" } as Record<string, string>)[k] ?? "✨";
}

function Field({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="text-xs uppercase tracking-widest text-muted-foreground">{label}</label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full rounded-md bg-midnight/60 border border-gold/30 px-3 py-2 text-sm"
      />
    </div>
  );
}
