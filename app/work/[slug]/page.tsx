import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Github } from "lucide-react";
import { projects, getProject } from "../../data/projects";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return { title: "Project not found" };
  return {
    title: `${p.name} — María Sebares`,
    description: p.summary,
    openGraph: {
      title: `${p.name} — María Sebares`,
      description: p.summary,
      images: [p.cover],
      type: "article",
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();

  return (
    <div className="min-h-[100dvh] w-full bg-[#f0e9da] text-[#26211b]">
      {/* Background noise */}
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      <article className="relative mx-auto max-w-[920px] px-5 py-10 md:px-8 md:py-14">
        {/* Back */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.18em] text-[#6f6657] transition-colors hover:text-[#9a7a4c]"
        >
          <ArrowLeft size={16} /> Back to portfolio
        </Link>

        {/* Header */}
        <header className="mt-8 border-b border-[#26211b]/12 pb-8">
          <div className="flex flex-wrap items-center gap-3 text-[11px] font-medium uppercase tracking-[0.16em] text-[#9a7a4c]">
            {p.badge && (
              <span className="rounded-full bg-[#161310] px-2.5 py-1 text-[#efe6d4]">{p.badge}</span>
            )}
            <span>{p.role}</span>
            <span className="text-[#9a7a4c]/40">·</span>
            <span>{p.year}</span>
          </div>
          <h1 className="mt-4 text-4xl font-normal tracking-tight text-[#26211b] md:text-6xl">
            {p.name}
          </h1>
          <p className="mt-4 max-w-[640px] text-lg leading-relaxed text-[#6f6657]">{p.summary}</p>

          <div className="mt-6 flex flex-wrap gap-2">
            {p.externalLink && (
              <a
                href={p.externalLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 rounded-full border border-[#26211b]/50 px-4 py-2 text-[10px] font-medium uppercase tracking-[0.18em] text-[#26211b] transition-colors hover:bg-[#26211b] hover:text-[#efe6d4]"
              >
                <ArrowUpRight size={13} /> {p.externalLabel ?? "Visit"}
              </a>
            )}
            {p.repo && (
              <a
                href={p.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 rounded-full border border-[#26211b]/30 px-4 py-2 text-[10px] font-medium uppercase tracking-[0.18em] text-[#26211b] transition-colors hover:bg-[#26211b]/5"
              >
                <Github size={13} /> Code
              </a>
            )}
          </div>
        </header>

        {/* Body */}
        <div className="mt-8 max-w-[680px] space-y-5 text-[15px] leading-relaxed text-[#3f3a31]">
          {p.body.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>

        {/* Gallery — window-framed images */}
        <div className="mt-10 space-y-6">
          {p.gallery.map((src, i) => (
            <figure
              key={src + i}
              className="overflow-hidden rounded-xl border border-[#26211b]/12 bg-[#f4eee0] shadow-[0_18px_40px_-22px_rgba(38,33,27,0.45)]"
            >
              <div className="flex items-center gap-1.5 border-b border-[#26211b]/10 bg-[#ebe3d2]/70 px-3 py-2">
                <span className="h-2.5 w-2.5 rounded-full bg-[#c4694f]/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#caa45a]/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#7f9a6b]/80" />
                <span className="ml-1 truncate text-[10px] uppercase tracking-[0.16em] text-[#6f6657]">
                  {p.windowLabel}
                </span>
              </div>
              <div className="relative aspect-[16/10] w-full bg-[#ebe3d2]">
                <Image
                  src={src}
                  alt={`${p.name} screenshot ${i + 1}`}
                  fill
                  sizes="(max-width: 920px) 100vw, 920px"
                  className="object-cover object-top"
                />
              </div>
            </figure>
          ))}
        </div>

        {/* Meta — tags & stack */}
        <div className="mt-10 grid gap-8 border-t border-[#26211b]/12 pt-8 sm:grid-cols-2">
          <div>
            <h2 className="mb-3 text-[10px] font-medium uppercase tracking-[0.22em] text-[#9a7a4c]">
              Focus
            </h2>
            <div className="flex flex-wrap gap-2">
              {p.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-[#9a7a4c]/40 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.15em] text-[#9a7a4c]"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h2 className="mb-3 text-[10px] font-medium uppercase tracking-[0.22em] text-[#9a7a4c]">
              Stack
            </h2>
            <div className="flex flex-wrap gap-2">
              {p.stack.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-[#26211b]/20 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.15em] text-[#26211b]"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer nav */}
        <div className="mt-12 border-t border-[#26211b]/12 pt-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.18em] text-[#6f6657] transition-colors hover:text-[#9a7a4c]"
          >
            <ArrowLeft size={16} /> Back to portfolio
          </Link>
        </div>
      </article>
    </div>
  );
}
