type SectionShellProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  children: React.ReactNode;
};

export function SectionShell({
  eyebrow,
  title,
  description,
  children,
}: SectionShellProps) {
  return (
    <section className="px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-7xl rounded-[32px] border border-[var(--border)] bg-[var(--surface-card)] px-6 py-8 shadow-[var(--shadow-soft)] md:px-8 md:py-10">
        <div className="max-w-3xl">
          {eyebrow ? (
            <p className="text-xs uppercase tracking-[0.32em] text-[var(--muted)]">{eyebrow}</p>
          ) : null}
          <h2 className="mt-4 text-3xl font-semibold tracking-[-0.05em] text-[var(--foreground)] md:text-4xl">
            {title}
          </h2>
          {description ? (
            <p className="mt-4 max-w-2xl text-sm leading-7 text-[var(--muted)] md:text-base">
              {description}
            </p>
          ) : null}
        </div>
        <div className="mt-8">{children}</div>
      </div>
    </section>
  );
}
