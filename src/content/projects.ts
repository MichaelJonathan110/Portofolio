export interface CaseStudyBlock {
  id: string;
  title: string;
  body: string;
}

export interface ProjectLink {
  label: string;
  href: string;
  kind: 'github' | 'live' | 'other';
}

export interface Project {
  id: string;
  index: string;
  name: string;
  category: string;
  summary: string;
  description: string;
  technologies: string[];
  accent: string;
  visual: string;
  links: ProjectLink[];
  caseStudy: CaseStudyBlock[];
  /** true until real project information replaces the placeholder copy */
  placeholder: boolean;
  /** sections a real case study still needs; shown in the scaffold only */
  todo: string[];
}

export const projects: Project[] = [
  {
    id: 'langitnusa',
    index: '01',
    name: 'LangitNusa',
    category: 'Weather Prediction',
    summary:
      'A weather prediction application, and one of the two projects I am building right now.',
    description:
      'LangitNusa is a weather prediction application. It is one of two projects I am currently developing and exploring.',
    technologies: ['TypeScript'],
    accent: '#4EA8DE',
    visual: 'Atmosphere, cloud cover and weather data.',
    links: [
      {
        label: 'GitHub',
        href: 'https://github.com/MichaelJonathan110/LangitNusa',
        kind: 'github',
      },
    ],
    caseStudy: [
      {
        id: 'overview',
        title: 'Overview',
        body: 'LangitNusa is a weather prediction application. It is one of the two projects I am currently developing and exploring.',
      },
      {
        id: 'technology',
        title: 'Technology',
        body: 'Written in TypeScript. The source is public on GitHub.',
      },
    ],
    placeholder: false,
    todo: [
      'Problem',
      'Solution',
      'Research',
      'Architecture',
      'Development',
      'Challenges',
      'Results',
      'Screenshots',
    ],
  },
  {
    id: 'trinity',
    index: '02',
    name: 'Trinity',
    category: 'Fitness',
    summary:
      'A fitness application, and the second of the two projects I am building right now.',
    description:
      'Trinity is a fitness application. It is the second of two projects I am currently developing and exploring.',
    technologies: ['Python'],
    accent: '#A3E635',
    visual: 'Training data, movement and performance.',
    links: [
      {
        label: 'GitHub',
        href: 'https://github.com/MichaelJonathan110/Trinity',
        kind: 'github',
      },
    ],
    caseStudy: [
      {
        id: 'overview',
        title: 'Overview',
        body: 'Trinity is a fitness application. It is the second of the two projects I am currently developing and exploring.',
      },
      {
        id: 'technology',
        title: 'Technology',
        body: 'Written in Python. The source is public on GitHub.',
      },
    ],
    placeholder: false,
    todo: [
      'Problem',
      'Solution',
      'Research',
      'Architecture',
      'Development',
      'Challenges',
      'Results',
      'Screenshots',
    ],
  },
  {
    id: 'project-03',
    index: '03',
    name: 'Project 03',
    category: 'To be added',
    summary: 'Placeholder. Real project information goes here.',
    description:
      'This entry is a placeholder. Name, description, problem, solution, technologies, screenshots and links can be filled in without touching the UI.',
    technologies: [],
    accent: '#8A8F98',
    visual: 'Visual direction to be decided with the project.',
    links: [],
    caseStudy: [],
    placeholder: true,
    todo: [
      'Name',
      'Category',
      'Description',
      'Problem',
      'Solution',
      'Technologies',
      'Screenshots',
      'Features',
      'GitHub',
      'Live demo',
      'Case study',
    ],
  },
  {
    id: 'project-04',
    index: '04',
    name: 'Project 04',
    category: 'To be added',
    summary: 'Placeholder. Real project information goes here.',
    description:
      'This entry is a placeholder. Name, description, problem, solution, technologies, screenshots and links can be filled in without touching the UI.',
    technologies: [],
    accent: '#8A8F98',
    visual: 'Visual direction to be decided with the project.',
    links: [],
    caseStudy: [],
    placeholder: true,
    todo: [
      'Name',
      'Category',
      'Description',
      'Problem',
      'Solution',
      'Technologies',
      'Screenshots',
      'Features',
      'GitHub',
      'Live demo',
      'Case study',
    ],
  },
];

export function getProject(id: string): Project | undefined {
  return projects.find((project) => project.id === id);
}
