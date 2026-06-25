import { createFileRoute } from "@tanstack/react-router";
import { locations } from "@/data/locations";
import { PageHeader } from "@/components/PageHeader";
import { FavoriteButton } from "@/components/FavoriteButton";

export const Route = createFileRoute("/locations")({
  head: () => ({
    meta: [
      { title: "Locations — Wizarding World Explorer" },
      { name: "description", content: "Hogwarts, Diagon Alley, Hogsmeade, the Ministry, Azkaban, Godric's Hollow — every place that matters." },
      { property: "og:title", content: "Wizarding Locations" },
      { property: "og:description", content: "Descriptions and hidden facts of every magical place." },
    ],
  }),
  component: LocationsPage,
});

function LocationsPage() {
  return (
    <div>
      <PageHeader title="Magical Locations" subtitle="From the Great Hall to the cells of Azkaban." />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {locations.map((l) => (
          <div key={l.id} className="magic-card magic-card-hover p-5">
            <div className="flex items-start justify-between">
              <div className="min-w-0">
                <h3 className="font-display text-xl text-gold truncate">{l.name}</h3>
                <div className="text-[10px] uppercase tracking-widest text-gold-soft">{l.region}</div>
              </div>
              <FavoriteButton kind="location" id={l.id} label={l.name} />
            </div>
            <p className="mt-3 text-sm">{l.description}</p>
            <div className="mt-3 text-[10px] uppercase tracking-widest text-gold-soft">Hidden Facts</div>
            <ul className="mt-1 space-y-1 text-sm">
              {l.hidden.map((h, i) => <li key={i} className="before:content-['✦'] before:text-gold before:mr-2">{h}</li>)}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
