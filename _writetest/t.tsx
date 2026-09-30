import type { ReactNode } from 'react';
const LABEL = `data-${'x'}`;
export default function T({ name }: { name: string }) {
  return <div className="cell" data-k={LABEL}>{`quotes ' " $var`}<span>{name}</span></div>;
}
