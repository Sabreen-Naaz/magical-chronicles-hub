import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { useInventory } from "@/lib/inventory";

const PASSWORDS: Record<string, { secret: string; reward: string; route?: string }> = {
  "i solemnly swear that i am up to no good": { secret: "marauders-map", reward: "Marauder's Map revealed!", route: "/marauders" },
  "mischief managed": { secret: "mischief-managed", reward: "The map clears…" },
  "fortuna major": { secret: "fortuna", reward: "A lucky charm appears in your inventory!" },
  "caput draconis": { secret: "gryffindor-pass", reward: "Gryffindor common room unlocked!" },
  "pure blood": { secret: "slytherin-pass", reward: "Slytherin common room unlocked!" },
  "lemon drop": { secret: "headmaster", reward: "The Headmaster's office opens!" },
  "dissendium": { secret: "honeydukes", reward: "Secret passage to Honeydukes revealed!" },
};

export function SecretPasswordListener() {
  const [buffer, setBuffer] = useState("");
  const navigate = useNavigate();
  const { discoverSecret, collect } = useInventory();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable)) return;
      const k = e.key.length === 1 ? e.key.toLowerCase() : e.key === "Backspace" ? "BACK" : "";
      if (!k) return;
      setBuffer((prev) => {
        let next = k === "BACK" ? prev.slice(0, -1) : (prev + k).slice(-80);
        for (const [phrase, meta] of Object.entries(PASSWORDS)) {
          if (next.endsWith(phrase)) {
            discoverSecret(meta.secret);
            collect({ id: `pw-${meta.secret}`, kind: "scroll", name: phrase, rarity: "rare" });
            toast.success("✨ " + meta.reward, { description: `Password: "${phrase}"` });
            if (meta.route) navigate({ to: meta.route });
            next = "";
            break;
          }
        }
        return next;
      });
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [navigate, discoverSecret, collect]);

  return null;
}
