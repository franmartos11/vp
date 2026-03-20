import { client } from "./client";

export async function sanityFetch<T>({
  query,
  params = {},
  tags = [],
}: {
  query: string;
  params?: Record<string, unknown>;
  tags?: string[];
}): Promise<T> {
  return client.fetch<T>(query, params, {
    next: { revalidate: 3600, tags },
  });
}

// ---- Queries ----

export const allProjectsQuery = `*[_type == "project"] | order(completionYear desc) {
  _id,
  title,
  slug,
  projectType,
  completionYear,
  location,
  featured,
  "coverImage": coverImage { asset, hotspot, crop, alt }
}`;

export const featuredProjectsQuery = `*[_type == "project" && featured == true] | order(completionYear desc)[0...3] {
  _id,
  title,
  slug,
  projectType,
  completionYear,
  location,
  "coverImage": coverImage { asset, hotspot, crop, alt }
}`;

export const projectBySlugQuery = `*[_type == "project" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  projectType,
  completionYear,
  location,
  "coverImage": coverImage { asset, hotspot, crop, alt },
  "gallery": gallery[] { asset, hotspot, crop, alt, caption },
  description,
  technicalSheet,
  seoDescription,
  materials,
  testimonial,
  videoUrl
}`;

export const allProjectSlugsQuery = `*[_type == "project"] { "slug": slug.current }`;

export const allServicesQuery = `*[_type == "service"] | order(order asc) {
  _id,
  title,
  slug,
  icon,
  shortDescription,
  fullDescription,
  "coverImage": coverImage { asset, hotspot, crop, alt },
  keyDeliverables,
  "gallery": gallery[] { asset, hotspot, crop, alt, caption },
  order
}`;

export const serviceBySlugQuery = `*[_type == "service" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  icon,
  shortDescription,
  fullDescription,
  "coverImage": coverImage { asset, hotspot, crop, alt },
  keyDeliverables,
  "gallery": gallery[] { asset, hotspot, crop, alt, caption }
}`;

export const allServiceSlugsQuery = `*[_type == "service"] { "slug": slug.current }`;

export const allTeamMembersQuery = `*[_type == "teamMember"] | order(order asc) {
  _id,
  name,
  role,
  bio,
  "photo": photo { asset, hotspot, crop, alt },
  linkedIn,
  order
}`;

export const siteSettingsQuery = `*[_type == "siteSettings"][0] {
  companyName,
  tagline,
  address,
  phone,
  email,
  socialLinks,
  seoDescription,
  "ogImage": ogImage { asset }
}`;
