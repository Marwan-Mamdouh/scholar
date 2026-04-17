export type HeroProps = {
  eyebrow?: string;
  title: string;
  description: string;
};

export function Hero({ eyebrow, title, description }: HeroProps) {
  return (
    <section className="mx-auto max-w-4xl px-5 pb-12 pt-20 text-center sm:pt-24">
      {eyebrow ? (
        <p className="mb-4 text-caption uppercase tracking-widest text-primary">
          {eyebrow}
        </p>
      ) : null}
      <h1 className="bg-linear-to-r from-purple-lighter to-success bg-clip-text font-rajdhani text-h1-sm tracking-wide text-transparent md:text-h1">
        {title}
      </h1>
      <p className="mx-auto mt-5 max-w-3xl text-h4-sm text-text-secondary md:text-h4">
        {description}
      </p>
    </section>
  );
}
