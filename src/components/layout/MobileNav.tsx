import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import type { NavItem } from "@/config/site";

interface Props {
  items: NavItem[];
  resumePath: string;
}

/**
 * Mobile slide-over navigation. A small React island for the interactive bits
 * (Escape-to-close, scroll lock, focus management) — the motion itself is pure
 * CSS, so no animation library ships to the client.
 */
export default function MobileNav({ items, resumePath }: Props) {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    // Move focus into the panel once it's open.
    const id = window.setTimeout(() => {
      panelRef.current?.querySelector<HTMLAnchorElement>("a")?.focus();
    }, 50);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      window.clearTimeout(id);
    };
  }, [open]);

  // Close when navigating via the Astro client router.
  useEffect(() => {
    const close = () => setOpen(false);
    document.addEventListener("astro:after-swap", close);
    return () => document.removeEventListener("astro:after-swap", close);
  }, []);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        aria-expanded={open}
        className="inline-grid size-10 place-items-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:hidden"
      >
        <Menu className="size-5" />
      </button>

      <div
        className={`fixed inset-0 z-50 md:hidden ${open ? "" : "pointer-events-none"}`}
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
        aria-hidden={!open}
      >
        {/* Scrim */}
        <button
          type="button"
          tabIndex={-1}
          aria-label="Close menu"
          onClick={() => setOpen(false)}
          className={`absolute inset-0 bg-background/70 backdrop-blur-sm transition-opacity duration-300 ${
            open ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Panel */}
        <div
          ref={panelRef}
          // @ts-expect-error — `inert` is valid in React 19's DOM types.
          inert={open ? undefined : ""}
          className={`absolute inset-y-0 right-0 flex w-[min(20rem,85vw)] flex-col border-l border-border bg-card p-6 shadow-2xl transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
              Menu
            </span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="inline-grid size-10 place-items-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <X className="size-5" />
            </button>
          </div>

          <nav className="mt-6 flex flex-col gap-1" aria-label="Mobile">
            {items.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-lg px-3 py-2.5 text-base font-medium text-foreground/80 transition-colors hover:bg-muted hover:text-foreground"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <a
            href={resumePath}
            className="mt-auto inline-flex h-11 items-center justify-center rounded-lg bg-foreground px-5 text-sm font-medium text-background transition-colors hover:bg-foreground/90"
          >
            Download Résumé
          </a>
        </div>
      </div>
    </>
  );
}
