import { defineField, defineType } from "sanity";

export const governancePageType = defineType({
  name: "governancePage",
  title: "Governance Page",
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
    defineField({ name: "intro", type: "array", of: [{ type: "block" }] }),
    defineField({ name: "introIntl", type: "localeBlockContent" }),

    defineField({ name: "showOrgChart", type: "boolean", initialValue: true }),
    defineField({
      name: "orgChart",
      type: "reference",
      to: [{ type: "orgChart" }],
    }),
    defineField({ name: "orgChartSectionTitle", type: "string" }),
    defineField({ name: "orgChartSectionIntro", type: "array", of: [{ type: "block" }] }),
    defineField({ name: "orgChartSectionIntroIntl", type: "localeBlockContent" }),

    defineField({ name: "showMembers", type: "boolean", initialValue: true }),
    defineField({ name: "membersSectionTitle", type: "string" }),
    defineField({ name: "membersSectionIntro", type: "array", of: [{ type: "block" }] }),
    defineField({ name: "membersSectionIntroIntl", type: "localeBlockContent" }),
    defineField({
      name: "membersGroupsToShow",
      type: "array",
      of: [{ type: "string" }],
      initialValue: ["direction", "gouvernance", "comite_scientifique"],
      options: {
        list: [
          { title: "Direction", value: "direction" },
          { title: "Gouvernance", value: "gouvernance" },
          { title: "Comité scientifique", value: "comite_scientifique" },
        ],
      },
    }),
    defineField({
      name: "membersOrder",
      type: "string",
      initialValue: "nameAsc",
      options: {
        list: [
          { title: "Name (A → Z)", value: "nameAsc" },
          { title: "Manual order (order asc)", value: "orderAsc" },
        ],
        layout: "radio",
      },
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "status" },
  },
});
