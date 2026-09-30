import { Archivo, Inter, JetBrains_Mono, Silkscreen } from 'next/font/google';

/** Heavy industrial grotesque. Carries the display voice: firm, wide, unsoft. */
export const display = Archivo({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

/** Neutral workhorse for body copy only. */
export const sans = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

/** Technical labels, numbers, tickers. */
export const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
  weight: ['400', '500', '700'],
});

/** True pixel face, reserved for tiny accent labels. */
export const pixel = Silkscreen({
  subsets: ['latin'],
  variable: '--font-pixel',
  display: 'swap',
  weight: ['400', '700'],
});

export const fontVars = `${display.variable} ${sans.variable} ${mono.variable} ${pixel.variable}`;
