import { defineField, defineType } from "sanity";

export const directions = defineType({
  name: "directions",
  title: "Directions",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "address",
      title: "Address",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "mapUrl",
      title: "Map URL",
      type: "url",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "text",
      title: "Text",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "hint",
      title: "Hint",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "parking",
      title: "Parking",
      type: "string",
    }),
    defineField({
      name: "yandexMapsUrl",
      title: "Yandex maps URL",
      type: "url",
    }),
    defineField({
      name: "googleMapsUrl",
      title: "Google maps URL",
      type: "url",
    }),
  ],
});
