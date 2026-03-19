import type { MetadataRoute } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://yourfirm.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/services`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/portfolio`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/contact`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.7 },
  ];

  // Only fetch from Sanity when a real project ID is configured
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  if (!projectId || projectId === "your_project_id") {
    return staticRoutes;
  }

  let projectRoutes: MetadataRoute.Sitemap = [];
  try {
    const { sanityFetch, allProjectSlugsQuery } = await import("@/sanity/lib/queries");
    const slugs = await sanityFetch<Array<{ slug: string }>>({
      query: allProjectSlugsQuery,
      tags: ["project"],
    });
    projectRoutes = slugs.map(({ slug }) => ({
      url: `${SITE_URL}/portfolio/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));
  } catch {
    // CMS not connected — return static routes only
  }

  return [...staticRoutes, ...projectRoutes];
}
