import type { StructureResolver } from "sanity/structure";

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Site config")
        .child(S.document().schemaType("siteConfig").documentId("siteConfig")),
      S.listItem()
        .title("About author")
        .child(
          S.document().schemaType("aboutAuthor").documentId("aboutAuthor"),
        ),
      S.listItem()
        .title("Studio section")
        .child(
          S.document().schemaType("studioSection").documentId("studioSection"),
        ),
      S.listItem()
        .title("Directions")
        .child(S.document().schemaType("directions").documentId("directions")),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) =>
          ![
            "siteConfig",
            "aboutAuthor",
            "studioSection",
            "directions",
            "vkPostImage",
            "vkPostStats",
          ].includes((item.getId() || "").toString()),
      ),
    ]);
