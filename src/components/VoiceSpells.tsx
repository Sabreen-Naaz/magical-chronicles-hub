import { useEffect, useRef, useState } from "react";
import { Mic, MicOff } from "lucide-react";
import { toast } from "sonner";
import { useInventory } from "@/lib/inventory";

const SPELLS: Record<string, () => void> = {};

export function VoiceSpells() {
  const [on, setOn] = useState(false);
  const [supported, setSupported] = useState(true);
  const recRef = useRef<any>(null);
  const { discoverSecret } = useInventory();

  useEffect(() => {
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SR) { setSupported(false); return; }

    SPELLS["lumos"] = () => {
      document.documentElement.style.setProperty("filter", "brightness(1.6) saturate(1.1)");
      toast.success("✨ Lumos! The world brightens.");
      discoverSecret("voice-lumos");
    };
    SPELLS["nox"] = () => {
      document.documentElement.style.removeProperty("filter");
      toast("🌑 Nox. Lights out.");
    };
    SPELLS["alohomora"] = () => {
      toast.success("🔓 Alohomora! Try a secret password now…");
      discoverSecret("voice-alohomora");
    };
    SPELLS["expecto patronum"] = () => {
      toast.success("🦌 A silver Patronus bursts forth!");
      discoverSecret("voice-patronus");
    };
  }, [discoverSecret]);

  useEffect(() => {
    if (!on || !supported) return;
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const rec = new SR();
    rec.continuous = true;
    rec.interimResults = false;
    rec.lang = "en-US";
    rec.onresult = (ev: any) => {
      for (let i = ev.resultIndex; i < ev.results.length; i++) {
        const t = ev.results[i][0].transcript.toLowerCase().trim();
        for (const [spell, fn] of Object.entries(SPELLS)) {
          if (t.includes(spell)) fn();
        }
      }
    };
    rec.onerror = () => setOn(false);
    rec.onend = () => { if (recRef.current === rec) try { rec.start(); } catch {} };
    recRef.current = rec;
    try { rec.start(); } catch {}
    return () => { recRef.current = null; try { rec.stop(); } catch {} };
  }, [on, supported]);

  if (!supported) return null;
  return (
    <button
      onClick={() => setOn((v) => !v)}
      className={`fixed bottom-20 right-4 z-40 rounded-full p-3 shadow-lg transition ${on ? "bg-gold text-primary-foreground animate-pulse" : "bg-midnight/80 text-gold border border-gold/40"}`}
      title={on ? "Voice spells on (say Lumos, Nox, Alohomora)" : "Enable voice spells"}
    >
      {on ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
    </button>
  );
}
