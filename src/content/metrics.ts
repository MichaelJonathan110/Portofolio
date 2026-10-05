export interface Metric {
  value: number;
  decimals: number;
  label: string;
  note: string;
}

/**
 * The only four figures on this site. Each one is verifiable from the rest of
 * the page; nothing here is estimated, projected or invented.
 */
export const metrics: Metric[] = [
  { value: 3.72, decimals: 2, label: 'Current GPA', note: 'BINUS University' },
  { value: 5, decimals: 0, label: 'Portfolio Projects', note: 'Three in active development' },
  { value: 3, decimals: 0, label: 'Current Focus Projects', note: 'LangitNusa, Trinity and Rally' },
  { value: 6, decimals: 0, label: 'Programming / Database Languages', note: 'Used across the projects above' },
];
