import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-surface p-6 text-center">
      <div className="flex justify-center gap-4 text-caption text-text-secondary">
        <Link className="transition hover:text-primary" href="/about">
          About
        </Link>
        <Link className="transition hover:text-primary" href="/privacy">
          Privacy Policy
        </Link>
        <Link className="transition hover:text-primary" href="/contact">
          Contact
        </Link>
      </div>
      <p className="mt-4 text-subtext text-text-secondary/60">
        &copy; 2026 Scholar Nexus. Our Team.
      </p>
    </footer>
  );
}
