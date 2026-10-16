"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { CtaLink } from "./cta-link";
import { ThemeToggle } from "./theme-toggle";
import { Wordmark } from "./wordmark";

const links = [
  { href: "#problem", label: "The problem" },
  { href: "#how-it-works", label: "How it works" },
  { href: "#sponsors", label: "Sponsors" },
  { href: "#materials", label: "Materials" },
  { href: "#water", label: "Water" },
  { href: "#faq", label: "FAQ" },
];

export function SiteNav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-[background-color,box-shadow,border-color] duration-300",
        scrolled || open ? "border-b border-border/60 bg-background/80 backdrop-blur-xl" : "border-b border-transparent",
      )}
    >
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:rounded-md focus:bg-card focus:px-3 focus:py-2">
        Skip to content
      </a>
      <nav aria-label="Main" className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5 sm:px-8">
        <a href="#top" className="rounded-md focus-visible:outline-2 focus-visible:outline-ring" aria-label="Mumith Water, back to top">
          <Wordmark />
        </a>
        <ul className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="rounded-full px-3 py-2 text-sm text-foreground/75 transition hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-1">
          <ThemeToggle />
          <CtaLink href="#waitlist" className="hidden sm:inline-flex">
            Join the waitlist
          </CtaLink>
          <button
            type="button"
            className="inline-flex size-10 items-center justify-center rounded-full hover:bg-muted focus-visible:outline-2 focus-visible:outline-ring lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" aria-hidden /> : <Menu className="size-5" aria-hidden />}
          </button>
        </div>
      </nav>
      {open && (
        <div id="mobile-menu" className="border-t border-border/60 px-5 pb-6 pt-2 lg:hidden">
          <ul className="flex flex-col">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} onClick={() => setOpen(false)} className="block rounded-lg px-2 py-3 text-base font-medium hover:bg-muted">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <CtaLink href="#waitlist" onClick={() => setOpen(false)} className="mt-3 w-full">
            Join the waitlist
          </CtaLink>
        </div>
      )}
    </header>
  );
}
