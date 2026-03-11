import React from "react";
import { NextAdminOptions } from "@premieroctet/next-admin";
import { put } from "@vercel/blob";

export const options: NextAdminOptions = {
  model: {
    Product: {
      list: {
        display: [
          "title",
          "slug",
          "priceKopeks",
          "sortOrder",
          "thumbnail",
          "mainImage",
        ],
      },
      edit: {
        display: [
          "title",
          "slug",
          "priceKopeks",
          "originalPriceKopeks",
          "discountPercent",
          "sortOrder",
          "description",
          "category",
          "finish",
          "dimensions",
          "thumbnail",
          "mainImage",
          "images",
        ],
        fields: {
          images: {
            optionFormatter: (image: any) => {
              const url = image?.url as string | undefined;
              if (!url) return image?.id ?? "";
              return React.createElement(
                "div",
                { className: "flex items-center gap-2" },
                React.createElement("img", {
                  src: url,
                  alt: "",
                  className: "h-8 w-8 rounded object-cover",
                  loading: "lazy",
                }),
                React.createElement(
                  "span",
                  { className: "truncate max-w-[240px]" },
                  url,
                ),
              );
            },
          },
          mainImage: {
            format: "file",
            handler: {
              upload: async (buffer, infos) => {
                const filename = infos?.name ?? "main-image";
                const pathname = `products/main/${filename}`;
                const blob = await put(pathname, buffer, {
                  access: "public",
                  addRandomSuffix: true,
                  contentType: infos?.type ?? undefined,
                });
                return blob.url;
              },
            },
          },
          thumbnail: {
            format: "file",
            handler: {
              upload: async (buffer, infos) => {
                const filename = infos?.name ?? "thumbnail";
                const pathname = `products/thumb/${filename}`;
                const blob = await put(pathname, buffer, {
                  access: "public",
                  addRandomSuffix: true,
                  contentType: infos?.type ?? undefined,
                });
                return blob.url;
              },
            },
          },
        },
      },
    },
    ProductImage: {
      toString: (image: any) => image?.url ?? image?.id ?? "",
      list: {
        display: ["product", "sortOrder", "url"],
        fields: {
          url: {
            formatter: (value: any) => {
              const url = value as string | undefined;
              if (!url) return "";
              return React.createElement(
                "div",
                { className: "flex items-center gap-2" },
                React.createElement("img", {
                  src: url,
                  alt: "",
                  className: "h-10 w-10 rounded object-cover",
                  loading: "lazy",
                }),
                React.createElement(
                  "span",
                  { className: "truncate max-w-[240px]" },
                  url,
                ),
              );
            },
          },
        },
      },
      edit: {
        display: ["product", "sortOrder", "url"],
        fields: {
          url: {
            format: "file",
            handler: {
              upload: async (buffer, infos) => {
                const filename = infos?.name ?? "image";
                const pathname = `products/gallery/${filename}`;
                const blob = await put(pathname, buffer, {
                  access: "public",
                  addRandomSuffix: true,
                  contentType: infos?.type ?? undefined,
                });
                return blob.url;
              },
            },
          },
        },
      },
    },
  },
  pages: {
    "/products/order": {
      title: "Сортировка товаров",
      icon: "Bars3BottomLeftIcon",
    },
  },
};
