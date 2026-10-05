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
      'A weather prediction application, and one of the projects I am building right now.',
    description:
      'LangitNusa is a weather prediction application. It is one of the projects I am currently developing and exploring.',
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
        body: 'LangitNusa is a weather prediction application. It is one of the projects I am currently developing and exploring.',
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
      'A fitness application, and the second project I am building right now.',
    description:
      'Trinity is a fitness application. It is the second project I am currently developing and exploring.',
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
        body: 'Trinity is a fitness application. It is the second project I am currently developing and exploring.',
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
    id: 'rally',
    index: '03',
    name: 'Rally',
    category: 'Social Activity Marketplace',
    summary:
      'A social activity marketplace and community platform - find your people and do more together.',
    description:
      'Rally is a full-stack social activity marketplace and community platform. People discover activities and venues, find others to play with, join or host, book venues, split costs and pay, chat, check in, record and verify results, gain activity-specific MMR, climb leaderboards, run tournaments and build reputation. It starts with social sports and expands into games, outdoor, social and creative activities through a config-driven activity engine.',
    technologies: [
      'TypeScript',
      'React',
      'Vite',
      'Tailwind CSS',
      'PWA',
      'FastAPI',
      'Python',
      'PostgreSQL',
      'Redis',
      'SQLAlchemy',
      'WebSockets',
      'Docker',
    ],
    accent: '#FF6F55',
    visual: 'Activities, people, venues and leaderboards.',
    links: [
      {
        label: 'Live demo',
        href: 'https://rally-peach.vercel.app/',
        kind: 'live',
      },
      {
        label: 'GitHub',
        href: 'https://github.com/MichaelJonathan110/Rally',
        kind: 'github',
      },
    ],
    caseStudy: [
      {
        id: 'overview',
        title: 'Overview',
        body: 'Rally is a social activity marketplace and community platform. People discover activities and venues, find others to play with, join or host, book venues, split costs, pay, chat, check in, record and verify results, gain activity-specific MMR, climb leaderboards, run tournaments and build reputation.',
      },
      {
        id: 'core-loop',
        title: 'Core loop',
        body: 'Discover -> Find people -> Join -> Book -> Pay -> Chat -> Check in -> Participate -> Record result -> Verify -> Update MMR -> Leaderboard -> Reputation.',
      },
      {
        id: 'architecture',
        title: 'Architecture',
        body: 'A React and TypeScript PWA talks to a FastAPI backend organised in strict layers - router, service, repository, model - with Pydantic v2 schemas at the boundary. Activity behaviour is config-driven: categories, types and configs are data, not hardcoded logic. PostgreSQL and Redis back the stack, wired together with Docker Compose.',
      },
      {
        id: 'engineering',
        title: 'Engineering',
        body: 'RBAC across seven roles is enforced server-side, so the frontend is never the security boundary. MMR is activity-specific, Elo-style, transactional and kept in immutable history - never accepted from the client. Critical flows are idempotent and audited, and payment, maps and email sit behind provider abstractions with clearly labelled dev providers.',
      },
      {
        id: 'technology',
        title: 'Technology',
        body: 'Frontend: React 18, TypeScript, Vite, TanStack Query, Zustand, Tailwind CSS, PWA. Backend: FastAPI, Pydantic v2, SQLAlchemy 2.0, Alembic, PostgreSQL, Redis, WebSockets. Infrastructure: Docker Compose. Tests: pytest with httpx, and Vitest.',
      },
      {
        id: 'status',
        title: 'Status',
        body: 'An actively developed full-stack build: 264 backend tests passing, 23 API route modules, 26 web pages, and a clean TypeScript build.',
      },
    ],
    placeholder: false,
    todo: ['Problem', 'Solution', 'Research', 'Challenges', 'Screenshots'],
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
  {
    id: 'project-05',
    index: '05',
    name: 'Project 05',
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
