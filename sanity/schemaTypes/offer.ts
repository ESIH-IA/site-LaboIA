import { defineField, defineType } from "sanity";

export const offerType = defineType({
  name: "offer",
  title: "Offer",
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
      name: "offerType",
      title: "Type",
      type: "string",
      options: {
        list: [
          { title: "Internship", value: "internship" },
          { title: "PhD", value: "phd" },
          { title: "Postdoc", value: "postdoc" },
          { title: "Collaboration", value: "collaboration" },
          { title: "Other", value: "other" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "openDate", type: "date" }),
    defineField({ name: "closeDate", type: "date" }),
    defineField({ name: "summary", type: "text", rows: 4 }),
    defineField({ name: "summaryIntl", type: "localeText" }),
    defineField({ name: "profile", type: "array", of: [{ type: "block" }] }),
    defineField({ name: "profileIntl", type: "localeBlockContent" }),
    defineField({ name: "contactEmail", type: "string" }),
    defineField({
      name: "projects",
      type: "array",
      of: [{ type: "reference", to: [{ type: "project" }] }],
    }),
    defineField({
      name: "members",
      type: "array",
      of: [{ type: "reference", to: [{ type: "member" }] }],
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "offerType" },
  },
});
