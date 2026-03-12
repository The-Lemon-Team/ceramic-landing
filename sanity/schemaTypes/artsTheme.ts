import { defineField, defineType } from "sanity";

export const artsThemeImage = defineType({
  name: "artsThemeImage",
  title: "Arts theme image",
  type: "object",
  fields: [
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "alt",
      title: "Alt text",
      type: "string",
    }),
  ],
  preview: {
    select: {
      title: "alt",
      media: "image",
    },
    prepare: ({ title, media }) => ({
      title: title || "Image",
      media,
    }),
  },
});

export const artsThemeVideo = defineType({
  name: "artsThemeVideo",
  title: "Arts theme video",
  type: "object",
  fields: [
    defineField({
      name: "video",
      title: "Video",
      type: "file",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "poster",
      title: "Poster",
      type: "image",
      options: { hotspot: true },
    }),
  ],
  preview: {
    select: {
      media: "poster",
    },
    prepare: ({ media }) => ({
      title: "Video",
      media,
    }),
  },
});

export const artsTheme = defineType({
  name: "artsTheme",
  title: "Arts theme",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "cover",
      title: "Cover",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "media",
      title: "Media",
      type: "array",
      of: [{ type: "artsThemeImage" }, { type: "artsThemeVideo" }],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    select: {
      title: "title",
      media: "cover",
    },
  },
});
