import { useEffect, useState, useCallback } from "react";

export function useLocalStorage<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(initial);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(key);
      if (raw) setValue(JSON.parse(raw));
    } catch {}
    setHydrated(true);
  }, [key]);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {}
  }, [key, value, hydrated]);

  return [value, setValue, hydrated] as const;
}

export type FavoriteKind = "character" | "spell" | "fact" | "creature" | "object" | "location";

export function useFavorites() {
  const [favs, setFavs] = useLocalStorage<Record<string, { kind: FavoriteKind; id: string; label: string }>>(
    "wwx:favorites",
    {},
  );
  const toggle = useCallback(
    (kind: FavoriteKind, id: string, label: string) => {
      const key = `${kind}:${id}`;
      setFavs((prev) => {
        const next = { ...prev };
        if (next[key]) delete next[key];
        else next[key] = { kind, id, label };
        return next;
      });
    },
    [setFavs],
  );
  const has = (kind: FavoriteKind, id: string) => !!favs[`${kind}:${id}`];
  return { favs, toggle, has };
}

export type Achievement = { id: string; label: string; description: string; unlockedAt: number };

export function useAchievements() {
  const [unlocked, setUnlocked] = useLocalStorage<Record<string, Achievement>>("wwx:achievements", {});
  const unlock = useCallback(
    (id: string, label: string, description: string) => {
      setUnlocked((prev) => {
        if (prev[id]) return prev;
        return { ...prev, [id]: { id, label, description, unlockedAt: Date.now() } };
      });
    },
    [setUnlocked],
  );
  return { unlocked, unlock };
}
