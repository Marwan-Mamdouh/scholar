import type { Metadata } from "next";
import {
  faBriefcase,
  faBuilding,
  faBullseye,
  faDatabase,
  faFolderOpen,
  faLayerGroup,
  faMicroscope,
  faSitemap,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { Hero } from "./_components/home/Hero";
import { Pillar } from "./_components/home/Pillar";
import {
  PillarCard,
  type PillarCardProps,
} from "./_components/home/PillarCard";
import { Stats, type StatItem } from "./_components/home/Stats";

export const metadata: Metadata = {
  title: "NEXUS | Academic & Industry Bridge",
  description:
    "Connect researchers, discover opportunities, and bridge academia with industry through AI-powered academic intelligence.",
};

const stats: StatItem[] = [
  {
    accentClassName: "bg-purple-lighter-soft text-purple-lighter",
    icon: faUsers,
    id: "users",
    label: "Registered Researchers",
    source: {
      mode: "count-field",
      url: "/api/stats/users",
    },
    suffix: "+",
  },
  {
    accentClassName: "bg-success-soft text-success",
    icon: faBuilding,
    id: "companies",
    label: "Companies in Directory",
    source: {
      mode: "array-length",
      url: "/api/companies",
    },
    suffix: "+",
  },
  {
    accentClassName: "bg-primary-soft text-primary",
    icon: faFolderOpen,
    id: "projects",
    label: "Graduation Projects",
    source: {
      mode: "array-length",
      url: "/api/grad-projects",
    },
    suffix: "+",
  },
];

const academicCards: PillarCardProps[] = [
  {
    description:
      "AI-powered researcher profiling. Describe your research area and instantly match with the most relevant academics and supervisors.",
    href: "/scanner",
    icon: faBullseye,
    title: "Author Explorer",
  },
  {
    description:
      "Search millions of academic papers across top-tier journals. Discover research networks, citations, and open-access publications.",
    href: "/explorer",
    icon: faLayerGroup,
    title: "Paper Explorer",
  },
  {
    description:
      "Browse our curated database of local academics. Explore their publications, co-author networks, and research domains in depth.",
    href: "/local-search",
    icon: faUsers,
    title: "Researcher Database",
  },
  {
    description:
      "Explore aggregated research statistics, graduation project indexes, and academic data insights across universities.",
    href: "/grad-dashboard",
    icon: faDatabase,
    title: "Projects Database",
  },
];

const industryCards: PillarCardProps[] = [
  {
    description:
      "Explore detailed profiles of top companies, including their branches, operational fields, and pages.",
    href: "/companies.html",
    icon: faSitemap,
    title: "Company Directory",
  },
  {
    description:
      "Browse available vacancies and employment opportunities tailored to recent graduates and researchers.",
    href: "/jobs",
    icon: faBriefcase,
    title: "Job Openings",
  },
];

export default function HomePage() {
  return (
    <main>
      <Hero
        description="The ultimate unified platform bridging the gap between rigorous academic research and dynamic industrial opportunities. Discover networks, projects, and careers all in one place."
        title="Scholar Nexus"
      />
      <Stats items={stats} />
      <div className="container grid gap-10 pb-20 lg:grid-cols-2">
        <Pillar
          description="Connect with Arab researchers, explore international journals, and utilize AI to align your graduation project with the perfect supervisors and reference papers."
          icon={faMicroscope}
          title="Academic Ecosystem"
          tone="academic"
        >
          {academicCards.map((card) => (
            <PillarCard key={card.href} {...card} />
          ))}
        </Pillar>

        <Pillar
          description="A direct gateway for graduates to explore the corporate landscape. Discover company branches, understand their fields, and find your next big career move."
          icon={faBuilding}
          title="Industry Network"
          tone="industry"
        >
          {industryCards.map((card) => (
            <PillarCard key={card.href} {...card} />
          ))}
        </Pillar>
      </div>
    </main>
  );
}
