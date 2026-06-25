import type { ReactNode } from "react";

export function PageHeader({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children?: ReactNode;
}) {
  return (
    <header className="mb-10 text-center animate-fade-in">
      <h1 className="text-4xl md:text-6xl font-display font-bold text-shimmer glow-text">
        {title}
      </h1>
      {subtitle && (
        <p className="mt-3 text-base md:text-lg text-muted-foreground italic max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
      {children && <div className="mt-6">{children}</div>}
    </header>
  );
}
