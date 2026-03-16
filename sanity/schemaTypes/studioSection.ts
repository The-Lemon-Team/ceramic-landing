import { defineField, defineType } from "sanity";

export const studioSection = defineType({
  name: "studioSection",
  title: "Studio section",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      initialValue: "Студия",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
    }),
    defineField({
      name: "gallery",
      title: "Gallery",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            {
              name: "alt",
              title: "Alt text",
              type: "string",
            },
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      media: "gallery.0",
    },
    prepare: ({ title, media }) => ({
      title: title || "Studio section",
      media,
    }),
  },
});
