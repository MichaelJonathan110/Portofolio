import { Button } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <main
      id="main"
      className="flex min-h-[100svh] flex-col items-center justify-center px-6 text-center"
    >
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-signal">404</p>
      <h1 className="mt-6 font-display text-4xl tracking-tight text-paper sm:text-5xl">
        This page isn&apos;t here.
      </h1>
      <p className="mt-4 max-w-md font-sans text-sm leading-relaxed text-muted">
        The link may be old, or the page may never have existed. The work is all on the home page.
      </p>
      <div className="mt-10">
        <Button href="/" variant="primary" size="md">
          Back to home
        </Button>
      </div>
    </main>
  );
}
