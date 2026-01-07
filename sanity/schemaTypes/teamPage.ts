import { defineField, defineType } from "sanity";

export const teamPageType = defineType({
  name: "teamPage",
  title: "Team Page",
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
      name: "intro",
      type: "array",
      of: [{ type: "block" }],
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "introIntl", type: "localeBlockContent" }),

    defineField({
      name: "researchSectionTitle",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "researchSectionTitleIntl", type: "localeString" }),

    defineField({
      name: "associatesSectionTitle",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "associatesSectionTitleIntl", type: "localeString" }),

    defineField({
      name: "readMoreLabel",
      type: "string",
      initialValue: "Read more",
    }),
    defineField({ name: "readMoreLabelIntl", type: "localeString" }),

    defineField({
      name: "associateBadgeLabel",
      type: "string",
      initialValue: "Associate researcher",
    }),
    defineField({ name: "associateBadgeLabelIntl", type: "localeString" }),

    defineField({
      name: "emptyResearchText",
      type: "string",
      initialValue: "The research team is currently being structured.",
    }),
    defineField({ name: "emptyResearchTextIntl", type: "localeString" }),
    defineField({
      name: "emptyAssociatesText",
      type: "string",
      initialValue: "The associate researchers list is currently being structured.",
    }),
    defineField({ name: "emptyAssociatesTextIntl", type: "localeString" }),
  ],
  preview: {
    select: { title: "title", subtitle: "status" },
  },
});
