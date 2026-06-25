import { useEffect, useRef, useState } from "react";
import { useRouterState } from "@tanstack/react-router";
import { Music, VolumeX } from "lucide-react";

// Page → musical key (Web Audio synthesized ambient pad)
const KEYS: Record<string, number[]> = {
  default: [220, 277.18, 329.63], // A minor
  "/": [261.63, 329.63, 392], // C major (Great Hall)
  "/locations": [196, 246.94, 293.66], // forest-ish G
  "/spells": [220, 261.63, 329.63],
  "/games": [261.63, 311.13, 392],
  "/marauders": [174.61, 220, 261.63],
};

export function MusicPlayer() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [on, setOn] = useState(false);
  const ctxRef = useRef<AudioContext | null>(null);
  const oscsRef = useRef<OscillatorNode[]>([]);
  const gainRef = useRef<GainNode | null>(null);

  useEffect(() => {
    if (!on) return;
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    ctxRef.current = ctx;
    const master = ctx.createGain();
    master.gain.value = 0.05;
    master.connect(ctx.destination);
    gainRef.current = master;

    return () => {
      oscsRef.current.forEach((o) => { try { o.stop(); } catch {} });
      oscsRef.current = [];
      try { ctx.close(); } catch {}
    };
  }, [on]);

  useEffect(() => {
    const ctx = ctxRef.current;
    const master = gainRef.current;
    if (!on || !ctx || !master) return;
    oscsRef.current.forEach((o) => { try { o.stop(); } catch {} });
    oscsRef.current = [];
    const freqs = KEYS[pathname] ?? KEYS.default;
    freqs.forEach((f, i) => {
      const o = ctx.createOscillator();
      o.type = i === 0 ? "sine" : "triangle";
      o.frequency.value = f;
      const g = ctx.createGain();
      g.gain.value = 0;
      g.gain.linearRampToValueAtTime(0.3, ctx.currentTime + 1.5);
      o.connect(g).connect(master);
      o.start();
      oscsRef.current.push(o);
    });
  }, [on, pathname]);

  return (
    <button
      onClick={() => setOn((v) => !v)}
      className={`fixed bottom-4 right-4 z-40 rounded-full p-3 shadow-lg transition ${on ? "bg-gold text-primary-foreground" : "bg-midnight/80 text-gold border border-gold/40"}`}
      title={on ? "Mute magical ambience" : "Play magical ambience"}
    >
      {on ? <Music className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
    </button>
  );
}
