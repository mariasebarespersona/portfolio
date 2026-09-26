import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { major, minor, evidence, outcome, pending, domain, about, facts, neuropop, EMAIL } from "../data/content";

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section className="mt-10 first:mt-0">
    <h3 className="text-[15px] font-semibold tracking-[-0.01em]">{title}</h3>
    <div className="mt-1 h-px w-full bg-[color:var(--screen-line)]" />
    <div className="mt-5">{children}</div>
  </section>
);

export function WorkPanel() {
  return (
    <>
      <h2 className="text-3xl font-semibold tracking-[-0.035em] md:text-5xl">
        What I am building
      </h2>
      <p className="mt-3 max-w-[58ch] text-[16px] leading-relaxed text-[color:var(--on-void-2)]">
        Two products with customers paying for them, and one experiment I keep
        coming back to.
      </p>

      <Section title="The main three">
        <ul className="grid gap-5 sm:grid-cols-2">
          {/* Tumai */}
          <li className="card-surface overflow-hidden rounded-xl border border-[color:var(--screen-line)] sm:col-span-2">
            <div className="grid sm:grid-cols-2">
              <Image
                src={major[0].cover}
                alt={`${major[0].name} interface`}
                width={1280}
                height={800}
                className="h-full w-full object-cover"
              />
              <div className="p-5">
                <div className="mono flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] text-[color:var(--on-void-2)]">
                  <span className="strong">{evidence[major[0].slug]}</span>
                  <span>{major[0].year}</span>
                </div>
                <h4 className="mt-1.5 text-xl font-semibold tracking-[-0.02em]">
                  {major[0].name}
                </h4>
                <p className="mt-2 text-[14px] leading-relaxed">{outcome[major[0].slug]}</p>
                <div className="-mx-2 mt-2 flex flex-wrap items-center gap-1 text-[12px]">
                  <a
                    href={`/work/${major[0].slug}`}
                    className="wash rounded-md px-2 py-2 underline decoration-[color:var(--on-void-2)] underline-offset-4 transition-colors hover:decoration-[color:var(--on-void)]"
                  >
                    Read the case
                  </a>
                  <a
                    href={major[0].externalLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="wash inline-flex items-center gap-1 rounded-md px-2 py-2 text-[color:var(--on-void-2)] transition-colors hover:text-[color:var(--on-void)]"
                  >
                    {domain(major[0])} <ArrowUpRight size={12} strokeWidth={1.5} />
                  </a>
                </div>
              </div>
            </div>
          </li>

          {/* The Madrid one. No screenshot on purpose: it has no public face
              yet, and a stock image would be a lie about how finished it is. */}
          <li className="card-surface flex flex-col rounded-xl border border-dashed border-[color:var(--screen-line)] p-5">
            <div className="mono flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] text-[color:var(--on-void-2)]">
              <span className="strong">In production</span>
              <span>{pending.year}</span>
              <span>{pending.note}</span>
            </div>
            <h4 className="mt-1.5 text-lg font-semibold tracking-[-0.02em]">{pending.name}</h4>
            <p className="mt-1.5 text-[14px] leading-relaxed">{pending.outcome}</p>
          </li>

          {/* NeuroPop */}
          <li className="card-surface overflow-hidden rounded-xl border border-[color:var(--screen-line)]">
            <Image
              src={major[1].cover}
              alt={`${major[1].name} interface`}
              width={1280}
              height={800}
              className="h-auto w-full"
            />
            <div className="p-4">
              <div className="mono flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] text-[color:var(--on-void-2)]">
                <span className="strong">{evidence[major[1].slug]}</span>
                <span>{major[1].year}</span>
              </div>
              <h4 className="mt-1.5 text-lg font-semibold tracking-[-0.02em]">
                {major[1].name}
              </h4>
              <p className="mt-1.5 text-[14px] leading-relaxed">{outcome[major[1].slug]}</p>
              <div className="-mx-2 mt-2 flex flex-wrap items-center gap-1 text-[12px]">
                <a
                  href={`/work/${major[1].slug}`}
                  className="wash rounded-md px-2 py-2 underline decoration-[color:var(--on-void-2)] underline-offset-4 transition-colors hover:decoration-[color:var(--on-void)]"
                >
                  Read the case
                </a>
                <a
                  href={major[1].externalLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="wash inline-flex items-center gap-1 rounded-md px-2 py-2 text-[color:var(--on-void-2)] transition-colors hover:text-[color:var(--on-void)]"
                >
                  {domain(major[1])} <ArrowUpRight size={12} strokeWidth={1.5} />
                </a>
              </div>
            </div>
          </li>
        </ul>
      </Section>

      <Section title="Also built">
        <ul>
          {minor.map((p) => (
            <li key={p.slug} className="border-t border-[color:var(--screen-line)]">
              <div className="grid gap-1 py-4 md:grid-cols-[11rem_1fr_8rem] md:items-baseline md:gap-6">
                <span className="text-[15px] font-semibold tracking-[-0.01em]">{p.name}</span>
                <span className="text-[13.5px] leading-relaxed text-[color:var(--on-void-2)]">
                  {outcome[p.slug]}
                </span>
                <a
                  href={p.externalLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mono wash inline-flex items-center gap-1 rounded-md px-2 py-2 text-[11px] text-[color:var(--on-void-2)] transition-colors hover:text-[color:var(--on-void)] md:justify-self-end"
                >
                  Open <ArrowUpRight size={11} strokeWidth={1.5} />
                </a>
              </div>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}

export function AboutPanel() {
  return (
    <>
      <h2 className="text-3xl font-semibold tracking-[-0.035em] md:text-5xl">
        Neuroscience, then AI
      </h2>
      <div className="mt-4 space-y-4">
        {about.map((p) => (
          <p
            key={p.slice(0, 18)}
            className="max-w-[64ch] text-[16px] leading-relaxed text-[color:var(--on-void-2)]"
          >
            {p}
          </p>
        ))}
      </div>

      <Section title="NeuroPop">
        <p className="max-w-[64ch] text-[16px] leading-relaxed">{neuropop.lead}</p>
        <p className="mt-3 max-w-[64ch] text-[16px] leading-relaxed text-[color:var(--on-void-2)]">
          {neuropop.body}
        </p>
        <p className="mt-4 max-w-[64ch] text-[16px] leading-relaxed">{neuropop.ask}</p>
        <div className="mt-5 flex flex-wrap gap-3">
          <a
            href={`mailto:${EMAIL}?subject=NeuroPop`}
            className="cta inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[13px] font-medium transition-transform hover:scale-[1.03] active:translate-y-px"
          >
            Work on this with me <ArrowUpRight size={14} strokeWidth={1.5} />
          </a>
          <a
            href="https://neurpop.space/"
            target="_blank"
            rel="noopener noreferrer"
            className="cta-ghost rounded-full px-5 py-2.5 text-[13px] font-medium transition-colors active:translate-y-px"
          >
            neurpop.space
          </a>
        </div>
      </Section>

      <Section title="On paper">
        <dl className="mono grid gap-x-10 text-[13px] sm:grid-cols-2">
          {facts.map(([k, v]) => (
            <div
              key={k}
              className="flex items-baseline justify-between gap-5 border-b border-[color:var(--screen-line)] py-2.5"
            >
              <dt className="text-[color:var(--on-void-2)]">{k}</dt>
              <dd className="text-right">{v}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section title="Résumé">
        <a
          href="/resume"
          className="cta inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[13px] font-medium transition-transform hover:scale-[1.03] active:translate-y-px"
        >
          The full CV <ArrowUpRight size={14} strokeWidth={1.5} />
        </a>
      </Section>
    </>
  );
}
