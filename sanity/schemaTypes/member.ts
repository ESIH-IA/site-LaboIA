import { defineField, defineType } from "sanity";

export const memberType = defineType({
  name: "member",
  title: "Member",
  type: "document",
  fields: [
    defineField({ name: "fullName", type: "string", validation: (rule) => rule.required() }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "fullName", maxLength: 96 },
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
      name: "role",
      type: "string",
      options: {
        list: [
          { title: "Researcher", value: "researcher" },
          { title: "Teacher-Researcher", value: "teacher-researcher" },
          { title: "Doctoral Student", value: "doctoral" },
          { title: "Student", value: "student" },
          { title: "Alumni", value: "alumni" },
          { title: "Staff", value: "staff" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "affiliation", type: "string" }),
    defineField({ name: "bio", type: "text", rows: 4 }),
    defineField({ name: "bioIntl", type: "localeText" }),
    defineField({ name: "photo", type: "image", options: { hotspot: true } }),
    defineField({ name: "expertise", type: "array", of: [{ type: "string" }] }),
    defineField({
      name: "links",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "label", type: "string" },
            { name: "url", type: "url" },
          ],
        },
      ],
    }),
    defineField({
      name: "projects",
      type: "array",
      of: [{ type: "reference", to: [{ type: "project" }] }],
    }),
    defineField({
      name: "publications",
      type: "array",
      of: [{ type: "reference", to: [{ type: "publication" }] }],
    }),
  ],
  preview: {
    select: { title: "fullName", subtitle: "role" },
  },
});
