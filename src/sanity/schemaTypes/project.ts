import { defineField, defineType } from "sanity";

export const projectSchema = defineType({
  name: "project",
  title: "Portfolio Project",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Project Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "featured",
      title: "Featured on Homepage",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "projectType",
      title: "Project Type",
      type: "string",
      options: {
        list: [
          { title: "Residential", value: "residential" },
          { title: "Commercial", value: "commercial" },
          { title: "Renovation", value: "renovation" },
          { title: "Interior Design", value: "interior" },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "completionYear",
      title: "Completion Year",
      type: "number",
      validation: (Rule) =>
        Rule.min(1900).max(new Date().getFullYear() + 5),
    }),
    defineField({
      name: "location",
      title: "Location (City, State)",
      type: "string",
      placeholder: "e.g. Miami, FL",
    }),
    defineField({
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          type: "string",
          title: "Alternative text",
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "gallery",
      title: "Project Gallery",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              type: "string",
              title: "Alternative text",
            }),
            defineField({
              name: "caption",
              type: "string",
              title: "Caption",
            }),
          ],
        },
      ],
    }),
    defineField({
      name: "description",
      title: "Project Description",
      type: "array",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "H2", value: "h2" },
            { title: "H3", value: "h3" },
            { title: "Quote", value: "blockquote" },
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
      name: "technicalSheet",
      title: "Technical Sheet",
      type: "object",
      fields: [
        defineField({
          name: "squareFootage",
          title: "Square Footage",
          type: "number",
        }),
        defineField({
          name: "budget",
          title: "Budget Range",
          type: "string",
          placeholder: "e.g. $2M - $5M",
        }),
        defineField({
          name: "duration",
          title: "Construction Duration",
          type: "string",
          placeholder: "e.g. 18 months",
        }),
        defineField({
          name: "client",
          title: "Client (optional, anonymized)",
          type: "string",
          placeholder: "e.g. Private Residence",
        }),
        defineField({
          name: "architect",
          title: "Architect / Lead",
          type: "string",
        }),
        defineField({
          name: "awards",
          title: "Awards / Recognition",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "seoDescription",
      title: "SEO Meta Description",
      type: "text",
      rows: 3,
      description: "Max 160 characters for Google",
      validation: (Rule) => Rule.max(160),
    }),
    defineField({
      name: "materials",
      title: "Key Materials Used",
      type: "array",
      of: [{ type: "string" }],
      description: "List of key luxury materials (e.g. Carrara Marble, Custom White Oak)",
    }),
    defineField({
      name: "testimonial",
      title: "Client / Architect Testimonial",
      type: "object",
      fields: [
        defineField({
          name: "quote",
          title: "Quote",
          type: "text",
          rows: 4,
        }),
        defineField({
          name: "author",
          title: "Author Name & Title",
          type: "string",
          placeholder: "e.g. Sarah J., Homeowner",
        }),
      ],
    }),
    defineField({
      name: "videoUrl",
      title: "Video Walkthrough URL",
      description: "YouTube or Vimeo video URL for a cinematic project tour",
      type: "url",
    }),
  ],
  orderings: [
    {
      title: "Completion Year (Newest First)",
      name: "completionYearDesc",
      by: [{ field: "completionYear", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "location",
      media: "coverImage",
    },
  },
});
