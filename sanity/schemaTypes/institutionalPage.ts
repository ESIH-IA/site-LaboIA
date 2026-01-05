import { defineField, defineType } from "sanity";

export const institutionalPageType = defineType({
  name: "institutionalPage",
  title: "Institutional Page",
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
      name: "section",
      type: "string",
      options: {
        list: [
          { title: "Research", value: "research" },
          { title: "Innovation", value: "innovation" },
          { title: "Training", value: "training" },
          { title: "Governance", value: "governance" },
          { title: "About", value: "about" },
        ],
      },
    }),
    defineField({ name: "summary", type: "text", rows: 3 }),
    defineField({ name: "summaryIntl", type: "localeText" }),
    defineField({ name: "content", type: "array", of: [{ type: "block" }] }),
    defineField({ name: "contentIntl", type: "localeBlockContent" }),
  ],
  preview: {
    select: { title: "title", subtitle: "section" },
  },
});
