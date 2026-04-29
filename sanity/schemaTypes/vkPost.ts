import { defineField, defineType } from "sanity";

export const vkPostImage = defineType({
  name: "vkPostImage",
  title: "VK post image",
  type: "object",
  fields: [
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "originalUrl",
      title: "Original VK image URL",
      type: "url",
      readOnly: true,
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
      subtitle: "originalUrl",
      media: "image",
    },
  },
});

export const vkPostStats = defineType({
  name: "vkPostStats",
  title: "VK post stats",
  type: "object",
  fields: [
    defineField({ name: "likes", title: "Likes", type: "number" }),
    defineField({ name: "comments", title: "Comments", type: "number" }),
    defineField({ name: "reposts", title: "Reposts", type: "number" }),
    defineField({ name: "views", title: "Views", type: "number" }),
  ],
});

export const vkPost = defineType({
  name: "vkPost",
  title: "VK post",
  type: "document",
  fields: [
    defineField({
      name: "sourceId",
      title: "VK source ID",
      type: "string",
      readOnly: true,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "ownerId",
      title: "VK owner ID",
      type: "string",
      readOnly: true,
    }),
    defineField({
      name: "communityName",
      title: "Community name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "communityAvatar",
      title: "Community avatar",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "communityAvatarUrl",
      title: "Original community avatar URL",
      type: "url",
      readOnly: true,
    }),
    defineField({
      name: "communityUrl",
      title: "Community URL",
      type: "url",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "postUrl",
      title: "Post URL",
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
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "images",
      title: "Images",
      type: "array",
      of: [{ type: "vkPostImage" }],
    }),
    defineField({
      name: "stats",
      title: "Stats",
      type: "vkPostStats",
    }),
    defineField({
      name: "isVisible",
      title: "Visible on site",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "importedAt",
      title: "Imported at",
      type: "datetime",
      readOnly: true,
    }),
    defineField({
      name: "rawJson",
      title: "Raw VK payload",
      type: "text",
      readOnly: true,
    }),
  ],
  preview: {
    select: {
      title: "communityName",
      subtitle: "publishedAt",
      media: "communityAvatar",
    },
    prepare({ title, subtitle, media }) {
      return {
        title,
        subtitle: subtitle ? new Date(subtitle).toLocaleDateString("ru-RU") : "",
        media,
      };
    },
  },
});
