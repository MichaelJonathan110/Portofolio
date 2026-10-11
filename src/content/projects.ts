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
    id: 'retailflow',
    index: '01',
    name: 'RetailFlow',
    category: 'Data Engineering',
    summary:
      'An enterprise retail data warehouse, ETL automation and analytics platform - source files in, verified business analytics out.',
    description:
      'RetailFlow is a complete, runnable data-engineering platform. It takes retail source files through ingestion, validation, transformation and loading into a PostgreSQL dimensional warehouse, then serves business analytics and operational monitoring over it. CSV sources flow into staging, through data-quality rules, into SCD2 dimensions and fact tables, and out through analytics views, an API and a UI.',
    technologies: [
      'Python',
      'FastAPI',
      'PostgreSQL',
      'SQLAlchemy',
      'Docker',
      'Next.js',
      'TypeScript',
      'Pydantic',
    ],
    accent: '#4EA8DE',
    visual: 'Warehouse schemas, ETL runs and analytics dashboards.',
    links: [
      {
        label: 'Live demo',
        href: 'https://retail-flow-app-omega.vercel.app/',
        kind: 'live',
      },
      {
        label: 'GitHub',
        href: 'https://github.com/MichaelJonathan110/RetailFlow',
        kind: 'github',
      },
    ],
    caseStudy: [
      {
        id: 'overview',
        title: 'Overview',
        body: 'RetailFlow is an enterprise retail data warehouse, ETL automation and analytics platform. Retail source files move through ingestion, validation, transformation and loading into a PostgreSQL dimensional warehouse, and business analytics and operational monitoring are served over it. It is a complete, runnable platform rather than a mockup or a chart gallery.',
      },
      {
        id: 'pipeline',
        title: 'Pipeline',
        body: 'CSV sources -> staging -> data-quality rules -> SCD2 dimensions and fact tables -> analytics views -> API -> UI. Every stage is observable: runs and per-stage timings are logged, rejected records are quarantined with their reason and raw payload, and reconciliation compares fact aggregates with an explicit tolerance.',
      },
      {
        id: 'data-model',
        title: 'Data model',
        body: 'A star schema in PostgreSQL 16 across five schemas: five dimensions, with a slowly changing dimension type 2 on customer, and two fact tables at different grains. The two facts are never joined to each other - revenue is measured from fact_order_items and payments from fact_payments, then compared as aggregates. Analytics views expose one row per order as the correct denominator for average order value.',
      },
      {
        id: 'architecture',
        title: 'Architecture',
        body: 'A FastAPI backend with more than forty endpoints, an OpenAPI surface and a consistent error envelope sits over the warehouse, with services split by concern - ingestion, rules, transform, reconciliation and pipeline orchestration. A Next.js front end with ten pages is wired to the real API, and the whole stack runs from Docker Compose against deterministic, defect-injected synthetic fixtures.',
      },
      {
        id: 'engineering',
        title: 'Engineering',
        body: 'Ingestion is idempotent by SHA-256 and loads are idempotent too, so re-running a pipeline adds nothing. Data-quality rules are data, not code - twelve are seeded - and every rule result, pass rate and rejected row stays inspectable. A pytest suite covers unit, API and database layers plus an end-to-end acceptance test that asserts a second run loads zero additional rows.',
      },
      {
        id: 'technology',
        title: 'Technology',
        body: 'Backend: Python, FastAPI, Pydantic, SQLAlchemy 2.0, PostgreSQL 16, Docker Compose. Front end: Next.js 15, TypeScript, React. Tooling: pytest and GitHub Actions CI. Pentaho .ktr/.kjb artifacts and a Power BI semantic model with DAX measures are authored as design artifacts.',
      },
      {
        id: 'status',
        title: 'Status',
        body: 'A working build: a PostgreSQL 16 warehouse in Docker, a star schema with SCD2, a rule-driven quality engine, idempotent ingestion and loads, reconciliation, a FastAPI backend with more than forty endpoints and a Next.js UI wired to the live API. Limitations are documented honestly - no .pbix binary, Pentaho jobs authored but not executed, and authentication disabled by default.',
      },
    ],
    placeholder: false,
    todo: [],
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
