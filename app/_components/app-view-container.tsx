"use client";

import { CircleHelpIcon, MessageCircleIcon, type LucideIcon } from "lucide-react";
import { type ReactNode, useState } from "react";
import { SupportPanel } from "./support-panel";

type View = "chat" | "support";

export function AppViewContainer({ children }: { readonly children: ReactNode }) {
  const [view, setView] = useState<View>("chat");

  return (
    <div className="h-dvh overflow-hidden">
      <nav
        aria-label="Primary navigation"
        className="fixed top-3 left-4 z-50 inline-flex items-center rounded-lg border bg-background/95 p-1 shadow-sm backdrop-blur"
      >
        <ViewButton
          active={view === "chat"}
          icon={MessageCircleIcon}
          label="Chat"
          onClick={() => setView("chat")}
        />
        <ViewButton
          active={view === "support"}
          icon={CircleHelpIcon}
          label="Support"
          onClick={() => setView("support")}
        />
      </nav>

      <div aria-hidden={view !== "chat"} className={view === "chat" ? "h-full" : "hidden"}>
        {children}
      </div>
      <div aria-hidden={view !== "support"} className={view === "support" ? "h-full" : "hidden"}>
        <SupportPanel />
      </div>
    </div>
  );
}

function ViewButton({
  active,
  icon: Icon,
  label,
  onClick,
}: {
  readonly active: boolean;
  readonly icon: LucideIcon;
  readonly label: string;
  readonly onClick: () => void;
}) {
  return (
    <button
      aria-pressed={active}
      className={`inline-flex h-8 items-center gap-1.5 rounded-md px-3 text-sm transition-colors ${active ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-accent hover:text-foreground"}`}
      onClick={onClick}
      type="button"
    >
      <Icon className="size-4" />
      {label}
    </button>
  );
}
