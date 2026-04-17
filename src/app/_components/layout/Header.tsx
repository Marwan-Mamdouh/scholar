"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  config,
  library,
  type IconDefinition,
} from "@fortawesome/fontawesome-svg-core";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
import {
  faAdjust,
  faAtom,
  faBars,
  faBuilding,
  faChevronDown,
  faDatabase,
  faMapMarkerAlt,
  faSearch,
  faSignInAlt,
  faTimes,
  faUserAstronaut,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

config.autoAddCss = false;
library.add(
  faAdjust,
  faAtom,
  faBars,
  faBuilding,
  faChevronDown,
  faDatabase,
  faLinkedin,
  faMapMarkerAlt,
  faSearch,
  faSignInAlt,
  faTimes,
  faUserAstronaut,
  faUsers,
);

type NavLink = {
  href: string;
  icon: IconDefinition;
  label: string;
};

type NavGroup = {
  label: string;
  match: string[];
  items: NavLink[];
};

const researchLinks: NavLink[] = [
  { href: "/scanner", icon: faUserAstronaut, label: "Target Scanner" },
  { href: "/explorer", icon: faSearch, label: "Paper Explorer" },
  { href: "/local-search", icon: faMapMarkerAlt, label: "Local Researchers" },
  { href: "/grad-dashboard", icon: faDatabase, label: "Database Stats" },
  { href: "/profiles", icon: faUsers, label: "Community" },
];

const marketLinks: NavLink[] = [
  { href: "/jobs", icon: faLinkedin, label: "Job Search & Map" },
  { href: "/companies.html", icon: faBuilding, label: "Companies List" },
  { href: "/tools.html", icon: faBuilding, label: "open-source" },
];

const navGroups: NavGroup[] = [
  {
    items: researchLinks,
    label: "Research",
    match: [
      "/scanner",
      "/explorer",
      "/local-search",
      "/grad-dashboard",
      "/profiles",
    ],
  },
  {
    items: marketLinks,
    label: "Jobs & Market",
    match: ["/jobs", "/companies.html", "/tools.html"],
  },
];

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function isActive(pathname: string, href: string) {
  return pathname === href || pathname === `${href}.html`;
}

function Dropdown({
  group,
  onNavigate,
  pathname,
}: {
  group: NavGroup;
  onNavigate: () => void;
  pathname: string;
}) {
  const active = group.match.some((href) => pathname.includes(href));

  return (
    <div className="group/nav relative flex w-fit shrink-0 flex-col items-start md:h-full md:flex-row md:items-center">
      <button
        className={cx(
          "flex w-fit appearance-none items-center gap-1 rounded-md border-0 bg-transparent px-3 py-2 text-left text-btn text-text-secondary transition hover:bg-primary-soft hover:text-primary",
          active && "bg-primary-soft text-primary",
        )}
        type="button"
      >
        {group.label}
        <FontAwesomeIcon
          className="shrink-0 text-icon-xs"
          icon={faChevronDown}
        />
      </button>
      <div className="mt-2 hidden min-w-50 flex-col border-l-2 border-border pl-4 group-hover/nav:flex group-focus-within/nav:flex md:absolute md:left-0 md:top-full md:mt-0 md:rounded-md md:border md:border-border md:bg-surface md:p-1 md:pl-0 md:shadow-[0_4px_12px_rgba(0,0,0,0.3)]">
        {group.items.map((item) => (
          <Link
            className={cx(
              "flex items-center gap-2 px-4 py-2.5 text-btn text-text transition hover:text-primary",
              isActive(pathname, item.href) && "text-primary",
            )}
            href={item.href}
            key={item.href}
            onClick={onNavigate}
          >
            <FontAwesomeIcon
              className="shrink-0 text-icon-sm"
              icon={item.icon}
            />
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

function getStoredTheme() {
  if (typeof window === "undefined") {
    return "dark";
  }

  return localStorage.getItem("theme") || "dark";
}

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [theme, setTheme] = useState(getStoredTheme);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  function toggleTheme() {
    const nextTheme = theme === "dark" ? "light" : "dark";

    document.documentElement.setAttribute("data-theme", nextTheme);
    localStorage.setItem("theme", nextTheme);
    setTheme(nextTheme);

    document.querySelectorAll("iframe").forEach((iframe) => {
      iframe.contentWindow?.postMessage(
        { theme: nextTheme, type: "THEME_CHANGE" },
        "*",
      );
    });
  }

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-surface/95 backdrop-blur">
      <div className="flex h-17.5 items-center justify-between px-5 md:px-10">
        <Link
          className="flex items-center gap-2 font-rajdhani text-h3-sm tracking-wider text-primary"
          href="/"
        >
          <FontAwesomeIcon className="shrink-0 text-icon-md" icon={faAtom} />
          NEXUS
        </Link>

        <button
          aria-controls="primary-navigation"
          aria-expanded={mobileOpen}
          aria-label="Toggle navigation menu"
          className="z-1200 ml-auto mr-4 text-h4 text-text md:hidden"
          onClick={() => setMobileOpen((open) => !open)}
          type="button"
        >
          <FontAwesomeIcon
            className="shrink-0 text-icon-lg"
            icon={mobileOpen ? faTimes : faBars}
          />
        </button>

        <nav
          aria-label="Main navigation"
          className={cx(
            "fixed -right-70 top-0 z-1100 flex h-screen w-65 flex-col items-start gap-4 overflow-y-auto bg-surface px-5 pb-5 pt-20 shadow-[-4px_0_15px_rgba(0,0,0,0.5)] transition-[right] duration-300 md:static md:z-auto md:h-full md:w-auto md:flex-row md:items-center md:gap-4 md:overflow-visible md:bg-transparent md:p-0 md:shadow-none",
            mobileOpen && "right-0",
          )}
          id="primary-navigation"
        >
          <Link
            className={cx(
              "w-full rounded-md px-3 py-2 text-btn text-text-secondary transition hover:bg-primary-soft hover:text-primary md:w-auto",
              pathname === "/" && "bg-primary-soft text-primary",
            )}
            href="/"
            onClick={() => setMobileOpen(false)}
          >
            Home
          </Link>

          {navGroups.map((group) => (
            <Dropdown
              group={group}
              key={group.label}
              onNavigate={() => setMobileOpen(false)}
              pathname={pathname}
            />
          ))}

          <Link
            className={cx(
              "w-full rounded-md px-3 py-2 text-btn text-text-secondary transition hover:bg-primary-soft hover:text-primary md:w-auto",
              isActive(pathname, "/team.html") &&
                "bg-primary-soft text-primary",
            )}
            href="/team.html"
            onClick={() => setMobileOpen(false)}
          >
            Team
          </Link>
          <Link
            className={cx(
              "w-full rounded-md px-3 py-2 text-btn text-text-secondary transition hover:bg-primary-soft hover:text-primary md:w-auto",
              isActive(pathname, "/feedback.html") &&
                "bg-primary-soft text-primary",
            )}
            href="/feedback.html"
            onClick={() => setMobileOpen(false)}
          >
            Feedback
          </Link>

          <Link
            className="flex items-center gap-2 rounded-md px-3 py-2 text-btn text-primary transition hover:bg-primary-soft"
            href="/login"
            onClick={() => setMobileOpen(false)}
          >
            <FontAwesomeIcon
              className="shrink-0 text-icon-sm"
              icon={faSignInAlt}
            />
            Login
          </Link>
        </nav>

        <button
          aria-label="Toggle color theme"
          className="z-1101 text-h4 text-text transition hover:text-primary"
          onClick={toggleTheme}
          type="button"
        >
          <FontAwesomeIcon className="shrink-0 text-icon-md" icon={faAdjust} />
        </button>
      </div>
    </header>
  );
}
