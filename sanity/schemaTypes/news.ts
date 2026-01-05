import { defineField, defineType } from "sanity";

export const newsType = defineType({
  name: "news",
  title: "News",
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
    defineField({ name: "date", type: "date", validation: (rule) => rule.required() }),
    defineField({
      name: "category",
      type: "string",
      options: {
        list: [
          { title: "Partnership", value: "partnership" },
          { title: "Project", value: "project" },
          { title: "Publication", value: "publication" },
          { title: "Event", value: "event" },
          { title: "General", value: "general" },
        ],
      },
    }),
    defineField({ name: "summary", type: "text", rows: 4 }),
    defineField({ name: "summaryIntl", type: "localeText" }),
    defineField({ name: "content", type: "array", of: [{ type: "block" }] }),
    defineField({ name: "contentIntl", type: "localeBlockContent" }),
    defineField({ name: "sourceUrl", type: "url" }),
    defineField({
      name: "relatedProjects",
      type: "array",
      of: [{ type: "reference", to: [{ type: "project" }] }],
    }),
    defineField({
      name: "relatedEvents",
      type: "array",
      of: [{ type: "reference", to: [{ type: "event" }] }],
    }),
    defineField({
      name: "relatedMembers",
      type: "array",
      of: [{ type: "reference", to: [{ type: "member" }] }],
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "category" },
  },
});
