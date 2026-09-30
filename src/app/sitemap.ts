import type { MetadataRoute } from 'next';
import { projects } from '@/content/projects';

const BASE = 'https://michaeljonathansusilo.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: BASE, lastModified: now, changeFrequency: 'monthly', priority: 1 },
    ...projects.map((project) => ({
      url: `${BASE}/projects/${project.id}`,
      lastModified: now,
      changeFrequency: 'yearly' as const,
      priority: 0.6,
    })),
  ];
}
