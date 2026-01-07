import { defineField, defineType } from "sanity";

export const orgChartType = defineType({
  name: "orgChart",
  title: "Org Chart",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (rule) => rule.required() }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "rootNode",
      type: "reference",
      to: [{ type: "orgNode" }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "nodes",
      type: "array",
      of: [{ type: "reference", to: [{ type: "orgNode" }] }],
    }),
  ],
  preview: {
    select: { title: "title" },
  },
});

