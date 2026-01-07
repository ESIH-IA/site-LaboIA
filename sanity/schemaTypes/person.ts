import { defineField, defineType } from "sanity";

export const personType = defineType({
  name: "person",
  title: "Person",
  type: "document",
  fields: [
    defineField({ name: "name", type: "string", validation: (rule) => rule.required() }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "name", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "photo",
      type: "image",
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "roleTitle", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "roleCategory", type: "string" }),
    defineField({ name: "shortBio", type: "text", rows: 4 }),
    defineField({
      name: "longBio",
      type: "text",
      rows: 10,
      description: "Up to 3000 characters.",
      validation: (rule) => rule.required().max(3000),
    }),
    defineField({ name: "affiliation", type: "string" }),
    defineField({
      name: "teamGroup",
      type: "string",
      title: "Team Group",
      description: "Used for the /equipe page only.",
      options: {
        list: [
          { title: "Research team", value: "research" },
          { title: "Associate researchers & contributors", value: "associate" },
        ],
        layout: "radio",
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "governanceGroup",
      type: "string",
      title: "Governance Group",
      description: "Used to filter the /gouvernance members section.",
      options: {
        list: [
          { title: "Direction", value: "direction" },
          { title: "Gouvernance", value: "gouvernance" },
          { title: "Comité scientifique", value: "comite_scientifique" },
        ],
        layout: "radio",
      },
    }),
    defineField({
      name: "expertise",
      type: "array",
      of: [{ type: "string" }],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: "links",
      type: "object",
      fields: [
        defineField({ name: "linkedin", type: "url" }),
        defineField({ name: "scholar", type: "url" }),
        defineField({ name: "orcid", type: "url" }),
        defineField({ name: "website", type: "url" }),
      ],
    }),
    defineField({ name: "order", type: "number" }),
  ],
  preview: {
    select: { title: "name", subtitle: "roleTitle", media: "photo" },
  },
});
