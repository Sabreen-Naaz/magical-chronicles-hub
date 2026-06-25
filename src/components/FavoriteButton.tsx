import { Heart } from "lucide-react";
import { useFavorites, type FavoriteKind } from "@/lib/storage";

export function FavoriteButton({
  kind,
  id,
  label,
}: {
  kind: FavoriteKind;
  id: string;
  label: string;
}) {
  const { has, toggle } = useFavorites();
  const isFav = has(kind, id);
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        toggle(kind, id, label);
      }}
      className={`inline-flex items-center justify-center rounded-full p-2 transition-all ${
        isFav
          ? "bg-gold/20 text-gold glow-text"
          : "text-muted-foreground hover:text-gold hover:bg-gold/10"
      }`}
      aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
    >
      <Heart className={`h-4 w-4 ${isFav ? "fill-current" : ""}`} />
    </button>
  );
}
