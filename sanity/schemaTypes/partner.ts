import { defineField, defineType } from "sanity";

export const partnerType = defineType({
  name: "partner",
  title: "Partner",
  type: "document",
  fields: [
    defineField({ name: "name", type: "string", validation: (rule) => rule.required() }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "name", maxLength: 96 },
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
      name: "partnerType",
      title: "Type",
      type: "string",
      options: {
        list: [
          { title: "Academic", value: "academic" },
          { title: "Public", value: "public" },
          { title: "Private", value: "private" },
          { title: "NGO", value: "ngo" },
          { title: "Media", value: "media" },
        ],
      },
    }),
    defineField({ name: "shortDescription", type: "text", rows: 3 }),
    defineField({ name: "shortDescriptionIntl", type: "localeText" }),
    defineField({ name: "website", type: "url" }),
    defineField({ name: "logo", type: "image", options: { hotspot: true } }),
    defineField({ name: "tags", type: "array", of: [{ type: "string" }] }),
    defineField({
      name: "projects",
      type: "array",
      of: [{ type: "reference", to: [{ type: "project" }] }],
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "partnerType" },
  },
});
