import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export type PillarCardProps = {
  description: string;
  href: string;
  icon: IconDefinition;
  title: string;
};

export function PillarCard({
  description,
  href,
  icon,
  title,
}: PillarCardProps) {
  return (
    <Link
      className="group flex min-h-52 flex-col gap-3 rounded-lg border border-border bg-black/20 p-5 text-inherit transition hover:border-current hover:shadow-[0_10px_24px_rgba(0,0,0,0.22)]"
      href={href}
    >
      <FontAwesomeIcon className="text-icon-xl text-current" icon={icon} />
      <h3 className="text-btn text-text">{title}</h3>
      <p className="text-caption text-text-secondary">{description}</p>
    </Link>
  );
}
