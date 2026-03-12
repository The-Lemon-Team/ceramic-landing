import { defineField, defineType } from "sanity";

export const telegramPost = defineType({
  name: "telegramPost",
  title: "Telegram post",
  type: "document",
  fields: [
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "text",
      title: "Text",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "timestamp",
      title: "Timestamp",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "telegramUrl",
      title: "Telegram URL",
      type: "url",
    }),
  ],
  preview: {
    select: {
      title: "category",
      subtitle: "timestamp",
      media: "image",
    },
  },
});
