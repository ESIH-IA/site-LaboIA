import { defineField, defineType } from "sanity";

export const orgNodeType = defineType({
  name: "orgNode",
  title: "Org Node",
  type: "document",
  fields: [
    defineField({ name: "label", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "subtitle", type: "string" }),
    defineField({
      name: "person",
      type: "reference",
      to: [{ type: "person" }],
      validation: (rule) =>
        rule.custom((value, context) => {
          const document = context.document as { orgUnit?: unknown } | undefined;
          const hasPerson = Boolean(value);
          const hasOrgUnit = Boolean(document?.orgUnit);
          if (!hasPerson && !hasOrgUnit) return "Select either a person or an org unit.";
          if (hasPerson && hasOrgUnit) return "Choose either person or org unit (not both).";
          return true;
        }),
    }),
    defineField({
      name: "orgUnit",
      type: "reference",
      to: [{ type: "orgUnit" }],
      validation: (rule) =>
        rule.custom((value, context) => {
          const document = context.document as { person?: unknown } | undefined;
          const hasOrgUnit = Boolean(value);
          const hasPerson = Boolean(document?.person);
          if (!hasPerson && !hasOrgUnit) return "Select either a person or an org unit.";
          if (hasPerson && hasOrgUnit) return "Choose either person or org unit (not both).";
          return true;
        }),
    }),
    defineField({ name: "theme", type: "string" }),
    defineField({
      name: "children",
      type: "array",
      of: [{ type: "reference", to: [{ type: "orgNode" }] }],
    }),
    defineField({ name: "order", type: "number", initialValue: 0 }),
  ],
  preview: {
    select: { title: "label", subtitle: "subtitle" },
  },
});

