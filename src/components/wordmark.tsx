import { cn } from "@/lib/utils";

export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2 font-display text-lg font-bold tracking-tight", className)}>
      <svg viewBox="0 0 24 24" className="size-6" aria-hidden>
        <path d="M12 2.5c3.6 4.3 6.5 8.1 6.5 11.6A6.5 6.5 0 0 1 5.5 14.1C5.5 10.6 8.4 6.8 12 2.5Z" className="fill-primary" />
        <path d="M9 14.5a3 3 0 0 0 3 3" className="stroke-primary-foreground" strokeWidth="1.6" fill="none" strokeLinecap="round" />
      </svg>
      Mumith Water
    </span>
  );
}
