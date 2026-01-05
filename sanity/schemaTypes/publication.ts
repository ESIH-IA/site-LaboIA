import { defineField, defineType } from "sanity";

export const publicationType = defineType({
  name: "publication",
  title: "Publication",
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
      name: "publicationType",
      title: "Type",
      type: "string",
      options: {
        list: [
          { title: "Journal", value: "journal" },
          { title: "Conference", value: "conference" },
          { title: "Report", value: "report" },
          { title: "Thesis", value: "thesis" },
          { title: "Preprint", value: "preprint" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "date", type: "date", validation: (rule) => rule.required() }),
    defineField({ name: "summary", type: "text", rows: 4 }),
    defineField({ name: "summaryIntl", type: "localeText" }),
    defineField({ name: "doi", type: "string" }),
    defineField({ name: "url", type: "url" }),
    defineField({ name: "pdf", type: "file" }),
    defineField({ name: "bibtex", type: "text", rows: 6 }),
    defineField({
      name: "authors",
      type: "array",
      of: [{ type: "reference", to: [{ type: "member" }] }],
    }),
    defineField({
      name: "externalAuthors",
      type: "string",
      description: "Use when authors are not members.",
    }),
    defineField({
      name: "projects",
      type: "array",
      of: [{ type: "reference", to: [{ type: "project" }] }],
    }),
    defineField({
      name: "resources",
      type: "array",
      of: [{ type: "reference", to: [{ type: "resource" }] }],
    }),
    defineField({
      name: "axes",
      type: "array",
      of: [{ type: "reference", to: [{ type: "researchAxis" }] }],
    }),
    defineField({ name: "keywords", type: "array", of: [{ type: "string" }] }),
  ],
  preview: {
    select: { title: "title", subtitle: "publicationType" },
  },
});
