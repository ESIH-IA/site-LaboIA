import { defineField, defineType } from "sanity";

export const kpiType = defineType({
  name: "kpi",
  title: "KPI",
  type: "document",
  fields: [
    defineField({ name: "key", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "label", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "value", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "note", type: "string" }),
    defineField({
      name: "status",
      type: "string",
      initialValue: "draft",
      options: {
        list: [
          { title: "Draft", value: "draft" },
          { title: "Confirmed", value: "confirmed" },
        ],
        layout: "radio",
      },
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { title: "label", subtitle: "value" },
  },
});
