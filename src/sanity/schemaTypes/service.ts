import { defineField, defineType } from "sanity";

export const serviceSchema = defineType({
  name: "service",
  title: "Service",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Service Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
    }),
    defineField({
      name: "icon",
      title: "Icon Name (Lucide)",
      type: "string",
      description:
        "Use a Lucide icon name, e.g. 'Building2', 'Home', 'Layers', 'PenTool'",
    }),
    defineField({
      name: "shortDescription",
      title: "Short Description (for cards)",
      type: "text",
      rows: 2,
      validation: (Rule) => Rule.max(200),
    }),
    defineField({
      name: "fullDescription",
      title: "Full Description (rich text)",
      type: "array",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "H3", value: "h3" },
          ],
          marks: {
            decorators: [
              { title: "Strong", value: "strong" },
              { title: "Emphasis", value: "em" },
            ],
          },
        },
      ],
    }),
    defineField({
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      options: { hotspot: true },
      description: "Main image for the individual service page hero and card background.",
    }),
    defineField({
      name: "keyDeliverables",
      title: "Key Deliverables",
      type: "array",
      of: [{ type: "string" }],
      description: "List of exact deliverables (e.g. 'Space Planning', 'Permitting')",
    }),
    defineField({
      name: "gallery",
      title: "Service Gallery",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
      description: "Optional images to show at the bottom of the individual service page.",
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      description: "Lower numbers appear first",
    }),
  ],
  orderings: [
    {
      title: "Display Order",
      name: "order",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "title", subtitle: "shortDescription" },
  },
});
