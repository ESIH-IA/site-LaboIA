import { defineField, defineType } from "sanity";

export const researchAxisType = defineType({
  name: "researchAxis",
  title: "Research Axis",
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
    defineField({ name: "summary", type: "text", rows: 3 }),
    defineField({ name: "summaryIntl", type: "localeText" }),
    defineField({ name: "content", type: "array", of: [{ type: "block" }] }),
    defineField({ name: "contentIntl", type: "localeBlockContent" }),
    defineField({
      name: "projects",
      type: "array",
      of: [{ type: "reference", to: [{ type: "project" }] }],
    }),
    defineField({
      name: "publications",
      type: "array",
      of: [{ type: "reference", to: [{ type: "publication" }] }],
    }),
  ],
  preview: {
    select: { title: "title" },
  },
});
