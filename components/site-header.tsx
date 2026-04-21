import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="group flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary text-sm font-semibold text-primary-foreground shadow-panel transition-transform group-hover:-translate-y-0.5">
            N/B
          </div>
          <div>
            <div className="font-semibold tracking-tight text-text-primary">Net din Brut</div>
            <div className="text-xs text-text-muted">Calculator salariu România 2026</div>
          </div>
        </Link>
        <nav className="hidden items-center gap-6 text-sm text-text-secondary md:flex">
          <Link href="/#calculator" className="transition hover:text-primary">
            Calculator
          </Link>
          <Link href="/#ghid" className="transition hover:text-primary">
            Ghid complet
          </Link>
          <Link href="/#faq" className="transition hover:text-primary">
            FAQ
          </Link>
        </nav>
      </div>
    </header>
  );
}
