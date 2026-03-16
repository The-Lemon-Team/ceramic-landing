import { defineField, defineType } from "sanity";

export const siteConfig = defineType({
  name: "siteConfig",
  title: "Site config",
  type: "document",
  fields: [
    defineField({
      name: "siteName",
      title: "Site name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "heroTitleRu",
      title: "Hero title (RU)",
      type: "string",
    }),
    defineField({
      name: "heroTitleEn",
      title: "Hero title (EN)",
      type: "string",
    }),
    defineField({
      name: "heroSubTitle",
      title: "Hero subtitle",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "heroMotto",
      title: "Hero motto",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "heroCtaHref",
      title: "Hero CTA href",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "heroCtaLabel",
      title: "Hero CTA label",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "masterClassesText",
      title: "Master classes text",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "vk",
      title: "vk group:",
      type: "string",
    }),
  ],
});
