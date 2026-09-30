import type { Metadata, Viewport } from 'next';
import { fontVars } from '@/lib/fonts';
import { site } from '@/content/site';
import { SiteNav } from '@/components/SiteNav';
import { Cursor } from '@/components/ui/Cursor';
import '@/styles/globals.css';

const description = `${site.intro} ${site.tagline}`;

// Set NEXT_PUBLIC_SITE_URL in the Vercel dashboard (or .env.local) to the real
// domain. The fallback keeps metadata valid before the domain exists.
const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://michael-portfolio.vercel.app'
).replace(/\/$/, '');

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${site.name} — ${site.roles[0]}`,
    template: `%s — ${site.name}`,
  },
  description,
  keywords: [site.name, ...site.roles, 'portfolio', 'data analyst', 'databases', 'Indonesia'],
  authors: [{ name: site.name }],
  creator: site.name,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    title: `${site.name} — ${site.roles[0]}`,
    description,
    siteName: site.name,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${site.name} — ${site.roles[0]}`,
    description,
  },
  robots: { index: true, follow: true },
  icons: {
      icon: [
        { url: '/favicon.ico', type: 'image/x-icon', sizes: '32x32' },
        { url: '/favicon.svg', type: 'image/svg+xml' },
      ],
      apple: [{ url: '/apple-icon.png', sizes: '180x180', type: 'image/png' }],
    },
};

export const viewport: Viewport = {
  themeColor: '#08090A',
  colorScheme: 'dark',
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: site.name,
  email: site.email,
  jobTitle: site.roles.join(' · '),
  address: { '@type': 'PostalAddress', addressCountry: site.location },
  knowsAbout: site.roles,
  url: SITE_URL,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={fontVars}>
      <body className="bg-ink font-sans text-paper antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-paper focus:px-4 focus:py-2 focus:font-mono focus:text-xs focus:text-ink"
        >
          Skip to content
        </a>
        <SiteNav />
        <Cursor />
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
