import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { Menu, X } from "lucide-react";
import { Toaster } from "sonner";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { MagicalBackground } from "../components/MagicalBackground";
import { AppSidebar } from "../components/AppSidebar";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="max-w-md text-center magic-card p-10">
        <h1 className="text-7xl font-display font-bold text-shimmer glow-text">404</h1>
        <h2 className="mt-4 text-xl font-display text-gold">Page not found in the Restricted Section</h2>
        <p className="mt-2 text-sm text-muted-foreground italic">
          This spell seems to have misfired. Mischief… not managed.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-gold px-5 py-2 text-sm font-display text-primary-foreground hover:opacity-90 transition"
          >
            Return to the Great Hall
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="max-w-md text-center magic-card p-10">
        <h1 className="text-xl font-display text-gold">The spell fizzled</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went sideways. Try the incantation again.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => { router.invalidate(); reset(); }}
            className="inline-flex items-center justify-center rounded-md bg-gold px-4 py-2 text-sm text-primary-foreground hover:opacity-90 transition"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-gold/40 px-4 py-2 text-sm text-gold hover:bg-gold/10"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Wizarding World Explorer" },
      { name: "description", content: "An interactive Harry Potter encyclopedia: characters, spells, hidden lore, creatures, locations, and magical games." },
      { property: "og:title", content: "Wizarding World Explorer" },
      { property: "og:description", content: "Discover the secrets the films never told you." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Cinzel:wght@500;700;900&family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&display=swap" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <MagicalBackground />
      <div className="relative z-10 flex min-h-screen w-full">
        {/* Desktop sidebar */}
        <aside className="hidden md:block w-64 shrink-0 border-r border-gold/20">
          <div className="sticky top-0 h-screen">
            <AppSidebar />
          </div>
        </aside>

        {/* Mobile drawer */}
        {mobileOpen && (
          <div className="fixed inset-0 z-40 md:hidden">
            <div
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />
            <aside className="absolute left-0 top-0 h-full w-72 border-r border-gold/20 shadow-2xl animate-fade-in">
              <AppSidebar onNavigate={() => setMobileOpen(false)} />
            </aside>
          </div>
        )}

        <div className="flex min-w-0 flex-1 flex-col">
          {/* Mobile header */}
          <header className="md:hidden sticky top-0 z-30 flex items-center justify-between border-b border-gold/20 bg-midnight/80 backdrop-blur px-4 py-3">
            <button
              onClick={() => setMobileOpen(true)}
              className="rounded-md p-2 text-gold hover:bg-gold/10"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>
            <div className="font-display text-gold tracking-wider">Wizarding World</div>
            <div className="w-9" />
          </header>

          <main className="min-w-0 flex-1 px-4 py-8 md:px-10 md:py-12">
            <div key={typeof window === "undefined" ? "" : window.location.pathname} className="animate-fade-in">
              <Outlet />
            </div>
          </main>

          <footer className="border-t border-gold/15 px-6 py-6 text-center text-xs text-muted-foreground italic">
            "Of course it is happening inside your head, Harry, but why on earth should that mean that it is not real?"
          </footer>
        </div>
      </div>
      {/* Mobile menu close button overlay (when open) */}
      {mobileOpen && (
        <button
          onClick={() => setMobileOpen(false)}
          className="fixed top-3 right-3 z-50 md:hidden rounded-full bg-gold/20 p-2 text-gold"
          aria-label="Close menu"
        >
          <X className="h-5 w-5" />
        </button>
      )}
      <Toaster theme="dark" position="top-center" toastOptions={{ style: { background: "oklch(0.18 0.05 265)", color: "oklch(0.95 0.04 85)", border: "1px solid oklch(0.82 0.16 85 / 0.4)" } }} />
    </QueryClientProvider>
  );
}
