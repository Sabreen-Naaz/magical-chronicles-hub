import { useCallback } from "react";
import { useLocalStorage } from "./storage";

export type CollectibleKind = "frog" | "wand" | "creature" | "artifact" | "ingredient" | "scroll" | "potion";
export type Collectible = { id: string; kind: CollectibleKind; name: string; rarity?: "common" | "rare" | "legendary"; foundAt: number };

export const TOTAL_SECRETS = 50;

export function useInventory() {
  const [items, setItems] = useLocalStorage<Record<string, Collectible>>("wwx:inventory", {});
  const [secrets, setSecrets] = useLocalStorage<Record<string, number>>("wwx:secrets", {});

  const collect = useCallback((c: Omit<Collectible, "foundAt">) => {
    setItems((prev) => (prev[c.id] ? prev : { ...prev, [c.id]: { ...c, foundAt: Date.now() } }));
  }, [setItems]);

  const discoverSecret = useCallback((id: string) => {
    setSecrets((prev) => (prev[id] ? prev : { ...prev, [id]: Date.now() }));
  }, [setSecrets]);

  return {
    items,
    secrets,
    secretsCount: Object.keys(secrets).length,
    totalSecrets: TOTAL_SECRETS,
    collect,
    discoverSecret,
  };
}

export type WizardProfile = {
  name: string;
  house: string;
  wand: string;
  patronus: string;
  favoriteSpell: string;
};

export function useProfile() {
  const [profile, setProfile] = useLocalStorage<WizardProfile>("wwx:profile", {
    name: "",
    house: "",
    wand: "Holly, 11\", Phoenix feather",
    patronus: "Stag",
    favoriteSpell: "Expecto Patronum",
  });
  return { profile, setProfile };
}
