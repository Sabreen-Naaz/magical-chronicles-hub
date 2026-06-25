import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/games")({
  head: () => ({
    meta: [
      { title: "Magical Games — Wizarding World Explorer" },
      { name: "description", content: "Brew potions, cast spells, take the wizard quiz, and hunt hidden artifacts." },
      { property: "og:title", content: "Magical Games" },
      { property: "og:description", content: "Five mini-games inside the Wizarding World." },
    ],
  }),
  component: () => <Outlet />,
});
