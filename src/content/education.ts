export interface EducationEntry {
  period: string;
  institution: string;
  programme: string;
  focus?: string[];
  gpa?: string;
  current: boolean;
  note: string;
}

export const education: EducationEntry[] = [
  {
    period: '2024 \u2014 Present',
    institution: 'BINUS University',
    programme: 'Computer Science',
    gpa: '3.72',
    current: true,
    note: 'Currently studying, with most of my interest landing on data and databases.',
  },
  {
    period: '2021 \u2014 2024',
    institution: 'Regina Pacis Senior High School',
    programme: 'Science Major',
    focus: ['Mathematics', 'Chemistry'],
    current: false,
    note: 'Graduated 2024. Mathematics and Chemistry were the subjects I kept choosing.',
  },
];
