export interface StackItem {
  name: string;
  /** What it is actually used for. No proficiency percentages anywhere. */
  usage: string[];
  context: string;
}

export const stack: StackItem[] = [
  {
    name: 'Python',
    usage: ['Machine Learning', 'Data Analysis', 'Data Processing'],
    context: 'Cleaning datasets and getting a result out of them.',
  },
  {
    name: 'SQL',
    usage: ['Database Management', 'Querying', 'Data Analysis'],
    context: 'Where most of my questions actually get answered.',
  },
  {
    name: 'TypeScript',
    usage: ['Web Development', 'Full-Stack Development'],
    context: 'The language my current projects are written in.',
  },
  {
    name: 'JavaScript',
    usage: ['Web Development'],
    context: 'The layer underneath, and how I first got into building for the web.',
  },
  {
    name: 'Java',
    usage: ['Object-Oriented Programming', 'Application Development'],
    context: 'Where I learned to structure a program before writing it.',
  },
  {
    name: 'C',
    usage: ['Data Structures', 'Algorithms'],
    context: 'The course that made memory and complexity stop being abstract.',
  },
];
