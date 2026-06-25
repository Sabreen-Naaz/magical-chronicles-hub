import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/games/_layout")({
  component: () => (
    <div>
      <Link to="/games" className="inline-flex items-center text-sm text-gold-soft hover:text-gold mb-6">
        <ArrowLeft className="h-4 w-4 mr-1" /> Back to Games
      </Link>
      <Outlet />
    </div>
  ),
});
