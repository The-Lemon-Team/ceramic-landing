import { defineField, defineType } from "sanity";

export const aboutAuthor = defineType({
  name: "aboutAuthor",
  title: "About author",
  type: "document",
  fields: [
    defineField({
      name: "sectionTitle",
      title: "Section title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "sectionLabel",
      title: "Section label",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "authorName",
      title: "Author name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "bio",
      title: "Bio",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "photo",
      title: "Photo",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "photoAlt",
      title: "Photo alt",
      type: "string",
    }),
    defineField({
      name: "quote",
      title: "Quote",
      type: "string",
    }),
    defineField({
      name: "closingText",
      title: "Closing text",
      type: "string",
    }),
    defineField({
      name: "signature",
      title: "Signature",
      type: "string",
    }),
  ],
  preview: {
    select: {
      title: "authorName",
      media: "photo",
    },
  },
});
