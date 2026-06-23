import Link from "next/link";
import { ArrowRight } from "lucide-react";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  primaryCta?: {
    href: string;
    label: string;
  };
  secondaryCta?: {
    href: string;
    label: string;
  };
  asideTitle?: string;
  asideItems?: string[];
};

export function PageHero({
  eyebrow,
  title,
  description,
  primaryCta,
  secondaryCta,
  asideTitle,
  asideItems,
}: PageHeroProps) {
  return (
    <section className="px-4 pb-8 pt-6 sm:px-6 lg:px-8">
      <div className="mx-auto grid w-full max-w-7xl gap-8 rounded-[40px] border border-[var(--border)] bg-[var(--surface-elevated)] px-6 py-8 shadow-[var(--shadow-large)] md:px-10 md:py-12 lg:grid-cols-[minmax(0,1.3fr)_minmax(280px,360px)]">
        <div className="space-y-6">
          <p className="text-xs uppercase tracking-[0.36em] text-[var(--muted)]">{eyebrow}</p>
          <h1 className="max-w-4xl text-4xl font-semibold tracking-[-0.06em] text-[var(--foreground)] md:text-6xl">
            {title}
          </h1>
          <p className="max-w-2xl text-sm leading-7 text-[var(--muted)] md:text-base">
            {description}
          </p>
          <div className="flex flex-wrap gap-3">
            {primaryCta ? (
              <Link
                href={primaryCta.href}
                className="inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-5 py-3 text-sm font-medium text-[var(--accent-foreground)] transition hover:-translate-y-0.5 hover:shadow-[0_14px_40px_rgba(96,165,250,0.28)]"
              >
                {primaryCta.label}
                <ArrowRight className="h-4 w-4" />
              </Link>
            ) : null}
            {secondaryCta ? (
              <Link
                href={secondaryCta.href}
                className="inline-flex items-center rounded-full border border-[var(--border-strong)] px-5 py-3 text-sm text-[var(--foreground)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
              >
                {secondaryCta.label}
              </Link>
            ) : null}
          </div>
        </div>

        <aside className="rounded-[28px] border border-[var(--border)] bg-[var(--panel)] p-6">
          <p className="text-xs uppercase tracking-[0.28em] text-[var(--muted)]">
            {asideTitle ?? "Core Notes"}
          </p>
          <div className="mt-5 space-y-3">
            {(asideItems ?? []).map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-[var(--border)] bg-black/10 px-4 py-3 text-sm leading-6 text-[var(--muted)]"
              >
                {item}
              </div>
            ))}
          </div>
        </aside>
      </div>
    </section>
  );
}
