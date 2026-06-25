import { Link, useRouterState } from "@tanstack/react-router";
import {
  Home,
  Users,
  Sparkles,
  ScrollText,
  Cat,
  Gem,
  MapPin,
  Map,
  Gamepad2,
  Trophy,
  Heart,
  Info,
  Wand2,
  Bird,
  Footprints,
  Search,
  GraduationCap,
  UserCircle,
  DoorOpen,
} from "lucide-react";

const items = [
  { to: "/", label: "Great Hall", icon: Home },
  { to: "/characters", label: "Characters", icon: Users },
  { to: "/spells", label: "Spells", icon: Sparkles },
  { to: "/facts", label: "Hidden Lore", icon: ScrollText },
  { to: "/creatures", label: "Creatures", icon: Cat },
  { to: "/objects", label: "Artifacts", icon: Gem },
  { to: "/locations", label: "Locations", icon: MapPin },
  { to: "/map", label: "Hogwarts Map", icon: Map },
  { to: "/marauders", label: "Marauder's Map", icon: Footprints },
  { to: "/owl", label: "Owl Post", icon: Bird },
  { to: "/professor", label: "Ask Professor", icon: GraduationCap },
  { to: "/detective", label: "Detective Mode", icon: Search },
  { to: "/room", label: "Room of Requirement", icon: DoorOpen },
  { to: "/games", label: "Games", icon: Gamepad2 },
  { to: "/profile", label: "Wizard Profile", icon: UserCircle },
  { to: "/achievements", label: "Achievements", icon: Trophy },
  { to: "/favorites", label: "Favorites", icon: Heart },
  { to: "/about", label: "About", icon: Info },
] as const;


export function AppSidebar({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <nav
      className="flex h-full w-full flex-col gap-1 overflow-y-auto p-4"
      style={{ backgroundColor: "var(--sidebar)" }}
    >
      <Link
        to="/"
        onClick={onNavigate}
        className="mb-6 flex items-center gap-2 px-2 pt-2"
      >
        <Wand2 className="h-7 w-7 text-gold animate-float-y" />
        <div className="font-display text-lg leading-tight">
          <div className="text-shimmer font-bold">Wizarding World</div>
          <div className="text-xs text-muted-foreground tracking-widest">EXPLORER</div>
        </div>
      </Link>
      {items.map((item) => {
        const active = pathname === item.to;
        const Icon = item.icon;
        return (
          <Link
            key={item.to}
            to={item.to}
            onClick={onNavigate}
            className={`group flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-all ${
              active
                ? "bg-gold text-primary-foreground glow-text shadow-[0_0_20px_oklch(0.82_0.16_85/0.4)]"
                : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-gold"
            }`}
          >
            <Icon className={`h-4 w-4 shrink-0 ${active ? "" : "text-gold-soft"}`} />
            <span className="truncate font-display tracking-wide">{item.label}</span>
          </Link>
        );
      })}
      <div className="mt-auto pt-6 text-center text-xs text-muted-foreground">
        <p className="italic">"Happiness can be found</p>
        <p className="italic">even in the darkest of times."</p>
      </div>
    </nav>
  );
}
