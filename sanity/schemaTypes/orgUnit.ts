import { defineField, defineType } from "sanity";

export const orgUnitType = defineType({
  name: "orgUnit",
  title: "Org Unit",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (rule) => rule.required() }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "description", type: "text", rows: 3 }),
    defineField({
      name: "colorKey",
      type: "string",
      description: "Theme token used in the UI (not a raw hex value).",
      options: {
        list: [
          { title: "Slate", value: "slate" },
          { title: "Blue", value: "blue" },
          { title: "Teal", value: "teal" },
          { title: "Indigo", value: "indigo" },
          { title: "Violet", value: "violet" },
        ],
      },
    }),
    defineField({ name: "order", type: "number", initialValue: 0 }),
    defineField({
      name: "lead",
      type: "reference",
      to: [{ type: "person" }],
    }),
    defineField({
      name: "members",
      type: "array",
      of: [{ type: "reference", to: [{ type: "person" }] }],
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "description" },
  },
});

