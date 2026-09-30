export type SocialKind = 'github' | 'linkedin' | 'instagram' | 'email';

export interface Social {
  kind: SocialKind;
  label: string;
  handle: string;
  href: string;
}

export const site = {
  name: 'Michael Jonathan Susilo',
  shortName: 'Michael',
  location: 'Indonesia',
  roles: ['Creative Developer', 'Data Analyst', 'Database Enthusiast'],
  tagline: 'Data, databases, and the things I do away from a keyboard.',
  intro:
    'Computer Science at BINUS University. I like the part of the work where a messy dataset turns into something you can actually read, and I spend the rest of my time in the gym or on a court.',
  email: 'mekkjo123@gmail.com',
  contactHeadline: "Let's build something.",
  contactNote:
    'Open to internships, collaboration, and any conversation about data, databases or software.',
} as const;

export const socials: Social[] = [
  {
    kind: 'github',
    label: 'GitHub',
    handle: '@MichaelJonathan110',
    href: 'https://github.com/MichaelJonathan110',
  },
  {
    kind: 'linkedin',
    label: 'LinkedIn',
    handle: 'michael-jonathan',
    href: 'https://www.linkedin.com/in/michael-jonathan-2200b72b0/',
  },
  {
    kind: 'instagram',
    label: 'Instagram',
    handle: '@michaelj0nathan',
    href: 'https://www.instagram.com/michaelj0nathan/',
  },
  {
    kind: 'email',
    label: 'Email',
    handle: 'mekkjo123@gmail.com',
    href: 'mailto:mekkjo123@gmail.com',
  },
];

export interface NavItem {
  id: string;
  label: string;
}

export const navItems: NavItem[] = [
  { id: 'about', label: 'About' },
  { id: 'stack', label: 'Stack' },
  { id: 'work', label: 'Work' },
  { id: 'education', label: 'Education' },
  { id: 'beyond', label: 'Beyond' },
  { id: 'contact', label: 'Contact' },
];
