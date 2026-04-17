import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { ReactNode } from "react";

export type PillarTone = "academic" | "industry";

export type PillarProps = {
  children: ReactNode;
  description: string;
  icon: IconDefinition;
  title: string;
  tone: PillarTone;
};

const toneStyles: Record<
  PillarTone,
  {
    accent: string;
    shadow: string;
  }
> = {
  academic: {
    accent: "text-purple-lighter hover:border-purple-lighter",
    shadow: "shadow-[0_10px_40px_rgba(168,85,247,0.15)]",
  },
  industry: {
    accent: "text-success hover:border-success",
    shadow: "shadow-[0_10px_40px_rgba(16,185,129,0.15)]",
  },
};

export function Pillar({
  children,
  description,
  icon,
  title,
  tone,
}: PillarProps) {
  const styles = toneStyles[tone];

  return (
    <section
      className={`rounded-lg border border-border bg-surface p-6 transition hover:-translate-y-1 sm:p-10 ${styles.shadow} ${styles.accent}`}
    >
      <div className="flex items-center gap-4 font-rajdhani text-h3-sm md:text-h3">
        <FontAwesomeIcon className="shrink-0 text-icon-xl" icon={icon} />
        <h2>{title}</h2>
      </div>
      <p className="mt-4 max-w-2xl text-h4-sm text-text-secondary">
        {description}
      </p>
      <div className="mt-8 grid gap-5 sm:grid-cols-2">{children}</div>
    </section>
  );
}
