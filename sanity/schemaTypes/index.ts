import { type SchemaTypeDefinition } from "sanity";

import { product } from "@/sanity/schemaTypes/product";
import {
  artsTheme,
  artsThemeImage,
  artsThemeVideo,
} from "@/sanity/schemaTypes/artsTheme";
import { telegramPost } from "@/sanity/schemaTypes/telegramPost";
import {
  vkPost,
  vkPostImage,
  vkPostStats,
} from "@/sanity/schemaTypes/vkPost";
import { navItem } from "@/sanity/schemaTypes/navItem";
import { siteConfig } from "@/sanity/schemaTypes/siteConfig";
import { aboutAuthor } from "@/sanity/schemaTypes/aboutAuthor";
import { directions } from "@/sanity/schemaTypes/directions";
import { studioSection } from "@/sanity/schemaTypes/studioSection";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    product,
    artsThemeImage,
    artsThemeVideo,
    artsTheme,
    telegramPost,
    vkPostImage,
    vkPostStats,
    vkPost,
    navItem,
    siteConfig,
    aboutAuthor,
    directions,
    studioSection,
  ],
};
