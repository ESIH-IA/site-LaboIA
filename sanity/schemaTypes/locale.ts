import { defineField, defineType } from "sanity";

export const localeString = defineType({
  name: "localeString",
  title: "Localized string",
  type: "object",
  fields: [
    defineField({ name: "fr", title: "French", type: "string" }),
    defineField({ name: "en", title: "English", type: "string" }),
  ],
});

export const localeText = defineType({
  name: "localeText",
  title: "Localized text",
  type: "object",
  fields: [
    defineField({ name: "fr", title: "French", type: "text" }),
    defineField({ name: "en", title: "English", type: "text" }),
  ],
});

export const localeBlockContent = defineType({
  name: "localeBlockContent",
  title: "Localized rich text",
  type: "object",
  fields: [
    defineField({ name: "fr", title: "French", type: "array", of: [{ type: "block" }] }),
    defineField({ name: "en", title: "English", type: "array", of: [{ type: "block" }] }),
  ],
});
