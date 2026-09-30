import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProject, projects } from '@/content/projects';
import { Tag } from '@/components/ui/Tag';
import { Reveal } from '@/components/ui/Reveal';
import { ArrowUpRight } from '@/components/ui/Icons';

type Params = { params: { id: string } };

export function generateStaticParams() {
  return projects.map((project) => ({ id: project.id }));
}

export function generateMetadata({ params }: Params): Metadata {
  const project = getProject(params.id);
  if (!project) return { title: 'Project not found' };
  return { title: project.name, description: project.summary };
}

export default function ProjectPage({ params }: Params) {
  const project = getProject(params.id);
  if (!project) notFound();

  return (
    <main id="main" className="mx-auto w-full max-w-3xl px-6 pb-32 pt-32">
      <Link
        href="/#work"
        className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-faint transition-colors hover:text-paper"
      >
        ← All work
      </Link>

      <header className="mt-10">
        <p
          className="font-mono text-xs uppercase tracking-[0.2em]"
          style={{ color: project.accent }}
        >
          {project.index} · {project.category}
        </p>
        <h1 className="mt-4 font-display text-4xl tracking-tight text-paper sm:text-6xl">
          {project.name}
        </h1>
        <p className="mt-6 font-sans text-base leading-relaxed text-muted">
          {project.description}
        </p>
      </header>

      <ul className="mt-8 flex flex-wrap gap-2">
        {project.technologies.map((tech) => (
          <li key={tech}>
            <Tag>{tech}</Tag>
          </li>
        ))}
      </ul>

      {project.links.length > 0 && (
        <ul className="mt-10 flex flex-wrap gap-4">
          {project.links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.16em] text-paper underline decoration-white/20 underline-offset-4 transition-colors hover:decoration-signal"
              >
                {link.label}
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-20 space-y-12">
        {project.caseStudy.map((block) => (
          <Reveal key={block.id}>
            <section>
              <h2 className="font-display text-xl tracking-tight text-paper">{block.title}</h2>
              <p className="mt-3 font-sans text-base leading-relaxed text-muted">{block.body}</p>
            </section>
          </Reveal>
        ))}
      </div>

      {project.placeholder && (
        <aside className="mt-20 rounded-2xl border border-white/[0.08] bg-ink-soft p-6">
          <p className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-signal">
            Case study in progress
          </p>
          <p className="mt-3 font-sans text-sm leading-relaxed text-muted">
            I am still documenting this build. What is here is what is settled so far; the rest is being
            written up as I finish it.
          </p>
          {project.todo.length > 0 && (
            <ul className="mt-4 list-disc space-y-1 pl-5 font-sans text-sm text-faint">
              {project.todo.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          )}
        </aside>
      )}
    </main>
  );
}
