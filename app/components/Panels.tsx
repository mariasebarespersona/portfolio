import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { major, minor, evidence, outcome, pending, domain, facts, tracks, path, EMAIL } from "../data/content";

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

/** One track: a lane label, the thing, its live status, and who it is for. */
function Track({ t }: { t: (typeof tracks)[number] }) {
  return (
    <div>
      <span className="mono block text-[10.5px] uppercase tracking-[0.18em] text-[color:var(--on-void-2)]">
        {t.lane}
      </span>
      <h3 className="mt-1 text-[20px] font-semibold tracking-[-0.02em]">{t.title}</h3>
      <span className="mono mt-2 inline-flex items-center gap-2 rounded-full border border-[color:var(--accent)]/35 px-2.5 py-1 text-[10.5px] text-[color:var(--accent-ink)]">
        <span className="h-[6px] w-[6px] rounded-full bg-[color:var(--accent)]" />
        {t.status}
      </span>
      <p className="mt-3 text-[14px] leading-relaxed text-[color:var(--on-void-2)]">{t.body}</p>
      <p className="mt-2.5 text-[14px] leading-relaxed">{t.ask}</p>
    </div>
  );
}

export function AboutPanel() {
  return (
    <>
      <h2 className="text-3xl font-semibold tracking-[-0.035em] md:text-5xl">
        Neuroscience, then AI
      </h2>
      <p className="mt-3 max-w-[56ch] text-[16px] leading-relaxed text-[color:var(--on-void-2)]">
        Founder of a B2B startup with paying customers, raising an angel round. And a
        second thing I keep building on the side.
      </p>

      <ol className="relative mt-8 border-l border-[color:var(--screen-line)] pl-6">
        {path.map((e) => (
          <li key={e.when} className="relative pb-6">
            <span className="absolute -left-[26px] top-[7px] h-2 w-2 rounded-full bg-[color:var(--screen-line)]" />
            <span className="mono block text-[11px] text-[color:var(--on-void-2)]">{e.when}</span>
            <span className="mt-0.5 block text-[15px] font-semibold tracking-[-0.01em]">
              {e.what}
            </span>
            <p className="mt-1 max-w-[58ch] text-[13.5px] leading-relaxed text-[color:var(--on-void-2)]">
              {e.body}
            </p>
          </li>
        ))}
      </ol>

      {/* The line splits rather than the text explaining that it does. Two
          things at once is the one thing this section kept failing to say. */}
      <div className="pl-6">
        <svg
          viewBox="0 0 320 54"
          className="h-[54px] w-full"
          aria-hidden
          preserveAspectRatio="none"
        >
          <path
            d="M2 0 V22 Q2 34 20 34 H300 Q318 34 318 46 V54"
            fill="none"
            stroke="var(--screen-line)"
            strokeWidth="1.5"
          />
          <path d="M2 34 V54" fill="none" stroke="var(--accent)" strokeWidth="1.5" />
          <path d="M318 46 V54" fill="none" stroke="var(--accent)" strokeWidth="1.5" />
        </svg>
      </div>
      <p className="mono mb-5 mt-1 text-[11px] uppercase tracking-[0.2em] text-[color:var(--accent-ink)]">
        Since 2025, both at once
      </p>
      <div className="grid gap-8 border-t border-[color:var(--accent)]/25 pt-7 sm:grid-cols-2 sm:gap-10">
        {tracks.map((t) => (
          <Track key={t.title} t={t} />
        ))}
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <a
          href={`mailto:${EMAIL}`}
          className="cta inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[13px] font-medium transition-transform hover:scale-[1.03] active:translate-y-px"
        >
          Email me <ArrowUpRight size={14} strokeWidth={1.5} />
        </a>
        <a
          href="/resume"
          className="cta-ghost rounded-full px-5 py-2.5 text-[13px] font-medium transition-colors active:translate-y-px"
        >
          The full CV
        </a>
      </div>

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
    </>
  );
}
