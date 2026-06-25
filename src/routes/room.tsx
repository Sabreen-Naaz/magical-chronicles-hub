import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { getRoomOfRequirementContent } from "@/lib/dailyContent";
import { useState } from "react";

export const Route = createFileRoute("/room")({ component: RoomOfRequirement });

function RoomOfRequirement() {
  const [content, setContent] = useState(() => getRoomOfRequirementContent());
  return (
    <div>
      <PageHeader title="The Room of Requirement" subtitle="It becomes only what the seeker has need of." />
      <div className="mx-auto max-w-2xl magic-card p-10 text-center">
        <h2 className="font-display text-3xl text-shimmer mb-4">{content.title}</h2>
        <p className="italic text-foreground/85 leading-relaxed">{content.body}</p>
        <button
          onClick={() => setContent(getRoomOfRequirementContent())}
          className="mt-8 rounded-md bg-gold px-5 py-2 text-sm font-display text-primary-foreground hover:opacity-90"
        >
          Pace three times again
        </button>
      </div>
    </div>
  );
}
