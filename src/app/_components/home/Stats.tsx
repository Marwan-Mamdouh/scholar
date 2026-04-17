"use client";

import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

type StatSourceMode = "array-length" | "count-field";

export type StatSource = {
  field?: string;
  mode: StatSourceMode;
  url: string;
};

export type StatItem = {
  accentClassName: string;
  icon: IconDefinition;
  id: string;
  label: string;
  source?: StatSource;
  suffix?: string;
};

export type StatsProps = {
  items: StatItem[];
};

type StatValues = Record<string, number | null>;

function readCount(data: unknown, source: StatSource): number | null {
  if (source.mode === "array-length") {
    return Array.isArray(data) ? data.length : null;
  }

  if (typeof data !== "object" || data === null) {
    return null;
  }

  const field = source.field ?? "count";
  const value = (data as Record<string, unknown>)[field];

  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }

  if (typeof value === "string") {
    const numericValue = Number(value);
    return Number.isFinite(numericValue) ? numericValue : null;
  }

  return null;
}

function formatCount(value: number, suffix = "") {
  if (value >= 1000) {
    return `${(value / 1000).toFixed(1)}K+`;
  }

  return `${value.toLocaleString()}${suffix}`;
}

function AnimatedValue({
  value,
  suffix,
}: {
  value: number | null;
  suffix?: string;
}) {
  const [animatedValue, setAnimatedValue] = useState(0);
  const shouldAnimate = value !== null && value < 1000;

  useEffect(() => {
    if (!shouldAnimate) {
      return;
    }

    const target = value;
    let frame = 0;
    let startTime: number | null = null;
    const duration = 1800;

    function animate(timestamp: number) {
      if (startTime === null) {
        startTime = timestamp;
      }

      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - (1 - progress) ** 3;
      const current = Math.floor(eased * target);

      setAnimatedValue(current);

      if (progress < 1) {
        frame = requestAnimationFrame(animate);
      } else {
        setAnimatedValue(target);
      }
    }

    frame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(frame);
  }, [shouldAnimate, value]);

  if (value === null) {
    return <>—</>;
  }

  if (!shouldAnimate) {
    return <>{formatCount(value, suffix)}</>;
  }

  return <>{formatCount(animatedValue, suffix)}</>;
}

export function Stats({ items }: StatsProps) {
  const [values, setValues] = useState<StatValues>(() =>
    Object.fromEntries(items.map((item) => [item.id, null])),
  );

  useEffect(() => {
    let cancelled = false;

    async function loadStats() {
      const nextValues = await Promise.all(
        items.map(async (item) => {
          if (!item.source) {
            return [item.id, null] as const;
          }

          try {
            const response = await fetch(item.source.url);

            if (!response.ok) {
              return [item.id, null] as const;
            }

            const data = await response.json();
            return [item.id, readCount(data, item.source)] as const;
          } catch {
            return [item.id, null] as const;
          }
        }),
      );

      if (!cancelled) {
        setValues(Object.fromEntries(nextValues));
      }
    }

    loadStats();

    return () => {
      cancelled = true;
    };
  }, [items]);

  return (
    <section className="container mb-14">
      <div className="flex mx-auto max-w-205 flex-col gap-6 rounded-lg border border-border bg-surface p-6 shadow-[0_4px_24px_rgba(0,0,0,0.12)] sm:p-7 lg:flex-row lg:items-center lg:justify-around">
        {items.map((item, index) => (
          <div className="contents" key={item.id}>
            {index > 0 ? (
              <div className="h-px bg-border lg:h-12 lg:w-px" />
            ) : null}
            <div className="flex flex-1 items-center gap-4 lg:justify-center">
              <div
                className={`flex size-13 shrink-0 items-center justify-center rounded-lg ${item.accentClassName}`}
              >
                <FontAwesomeIcon className="text-icon-lg" icon={item.icon} />
              </div>
              <div className="flex flex-col gap-1">
                <div className=" font-rajdhani text-h3-sm text-text md:text-h3">
                  <AnimatedValue suffix={item.suffix} value={values[item.id]} />
                </div>
                <div className="text-subtext uppercase tracking-wider text-text-secondary">
                  {item.label}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
