import { defineField, defineType } from "sanity";

export const projectType = defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "titleIntl", type: "localeString" }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "slugIntl", type: "localeSlug" }),
    defineField({
      name: "status",
      type: "string",
      initialValue: "draft",
      options: {
        list: [
          { title: "Draft", value: "draft" },
          { title: "Published", value: "published" },
        ],
        layout: "radio",
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "projectType",
      title: "Type",
      type: "string",
      options: {
        list: [
          { title: "Research", value: "research" },
          { title: "Applied", value: "applied" },
          { title: "Hybrid", value: "hybrid" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "startDate", type: "date" }),
    defineField({ name: "endDate", type: "date" }),
    defineField({
      name: "summary",
      type: "text",
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "summaryIntl", type: "localeText" }),
    defineField({ name: "objectives", type: "array", of: [{ type: "block" }] }),
    defineField({ name: "objectivesIntl", type: "localeBlockContent" }),
    defineField({ name: "methods", type: "array", of: [{ type: "block" }] }),
    defineField({ name: "methodsIntl", type: "localeBlockContent" }),
    defineField({ name: "results", type: "array", of: [{ type: "block" }] }),
    defineField({ name: "resultsIntl", type: "localeBlockContent" }),
    defineField({ name: "tags", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "coverImage", type: "image", options: { hotspot: true } }),
    defineField({ name: "featured", type: "boolean", initialValue: false }),
    defineField({
      name: "partners",
      type: "array",
      of: [{ type: "reference", to: [{ type: "partner" }] }],
    }),
    defineField({
      name: "members",
      type: "array",
      of: [{ type: "reference", to: [{ type: "member" }] }],
    }),
    defineField({
      name: "publications",
      type: "array",
      of: [{ type: "reference", to: [{ type: "publication" }] }],
    }),
    defineField({
      name: "events",
      type: "array",
      of: [{ type: "reference", to: [{ type: "event" }] }],
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "projectType" },
  },
});
