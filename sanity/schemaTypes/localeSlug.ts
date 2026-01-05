import { defineField, defineType } from "sanity";

export const localeSlug = defineType({
  name: "localeSlug",
  title: "Localized slug",
  type: "object",
  fields: [
    defineField({
      name: "fr",
      title: "French",
      type: "slug",
      options: { source: "title", maxLength: 96 },
    }),
    defineField({
      name: "en",
      title: "English",
      type: "slug",
      options: { source: "title", maxLength: 96 },
    }),
  ],
});
