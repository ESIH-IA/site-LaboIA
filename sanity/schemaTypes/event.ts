import { defineField, defineType } from "sanity";

export const eventType = defineType({
  name: "event",
  title: "Event",
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
      name: "eventType",
      title: "Type",
      type: "string",
      options: {
        list: [
          { title: "Seminar", value: "seminar" },
          { title: "Workshop", value: "workshop" },
          { title: "Colloquium", value: "colloquium" },
          { title: "Conference", value: "conference" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "visibility",
      type: "string",
      initialValue: "public",
      options: {
        list: [
          { title: "Public", value: "public" },
          { title: "Internal", value: "internal" },
        ],
        layout: "radio",
      },
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "startDate", type: "datetime", validation: (rule) => rule.required() }),
    defineField({ name: "endDate", type: "datetime" }),
    defineField({ name: "location", type: "string" }),
    defineField({ name: "summary", type: "text", rows: 3 }),
    defineField({ name: "summaryIntl", type: "localeText" }),
    defineField({ name: "content", type: "array", of: [{ type: "block" }] }),
    defineField({ name: "contentIntl", type: "localeBlockContent" }),
    defineField({
      name: "speakers",
      type: "array",
      of: [{ type: "reference", to: [{ type: "member" }] }],
    }),
    defineField({
      name: "projects",
      type: "array",
      of: [{ type: "reference", to: [{ type: "project" }] }],
    }),
    defineField({ name: "registrationUrl", type: "url" }),
  ],
  preview: {
    select: { title: "title", subtitle: "eventType" },
  },
});
