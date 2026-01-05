import { defineField, defineType } from "sanity";

export const programType = defineType({
  name: "program",
  title: "Program",
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
      name: "programType",
      title: "Type",
      type: "string",
      options: {
        list: [
          { title: "Program", value: "program" },
          { title: "Workshop", value: "workshop" },
          { title: "Training", value: "training" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "startDate", type: "date" }),
    defineField({ name: "endDate", type: "date" }),
    defineField({ name: "summary", type: "text", rows: 3 }),
    defineField({ name: "summaryIntl", type: "localeText" }),
    defineField({ name: "content", type: "array", of: [{ type: "block" }] }),
    defineField({ name: "contentIntl", type: "localeBlockContent" }),
    defineField({
      name: "members",
      type: "array",
      of: [{ type: "reference", to: [{ type: "member" }] }],
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "programType" },
  },
});
