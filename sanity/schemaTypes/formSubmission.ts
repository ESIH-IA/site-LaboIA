import { defineField, defineType } from "sanity";

export const formSubmissionType = defineType({
  name: "formSubmission",
  title: "Form Submission",
  type: "document",
  fields: [
    defineField({
      name: "status",
      type: "string",
      initialValue: "new",
      options: {
        list: [
          { title: "New", value: "new" },
          { title: "In progress", value: "in_progress" },
          { title: "Closed", value: "closed" },
        ],
        layout: "radio",
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "statusHistory",
      title: "Status history",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "status",
              type: "string",
              options: {
                list: [
                  { title: "New", value: "new" },
                  { title: "In progress", value: "in_progress" },
                  { title: "Closed", value: "closed" },
                ],
              },
              validation: (rule) => rule.required(),
            }),
            defineField({ name: "note", type: "string" }),
            defineField({ name: "changedAt", type: "datetime", validation: (rule) => rule.required() }),
          ],
        },
      ],
      initialValue: [],
    }),
    defineField({
      name: "formType",
      title: "Form type",
      type: "string",
      options: {
        list: [
          { title: "Collaborer", value: "collaborer" },
          { title: "Contact", value: "contact" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "fullName", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "email", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "organization", type: "string" }),
    defineField({ name: "subject", type: "string" }),
    defineField({ name: "message", type: "text", rows: 6 }),
    defineField({ name: "consent", type: "boolean", validation: (rule) => rule.required() }),
    defineField({ name: "createdAt", type: "datetime" }),
    defineField({ name: "updatedAt", type: "datetime" }),
  ],
  preview: {
    select: {
      title: "fullName",
      subtitle: "formType",
    },
  },
});
