-- CreateEnum
CREATE TYPE "TelegramPostCategory" AS ENUM ('Update', 'Workshop', 'Process', 'Announcement');

-- CreateEnum
CREATE TYPE "ArtsThemeMediaType" AS ENUM ('image', 'video');

-- CreateTable
CREATE TABLE "AdminUser" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "name" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "AdminUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "priceKopeks" INTEGER NOT NULL,
    "originalPriceKopeks" INTEGER,
    "discountPercent" INTEGER,
    "description" TEXT NOT NULL,
    "category" TEXT NOT NULL DEFAULT 'ГАЛЕРЕЯ',
    "finish" TEXT NOT NULL DEFAULT '—',
    "dimensions" TEXT NOT NULL DEFAULT '—',
    "mainImage" TEXT,
    "thumbnail" TEXT,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductImage" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "url" TEXT NOT NULL,

    CONSTRAINT "ProductImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TelegramPost" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "category" "TelegramPostCategory" NOT NULL,
    "image" TEXT,
    "text" TEXT NOT NULL,
    "timestamp" TEXT NOT NULL,
    "telegramUrl" TEXT,

    CONSTRAINT "TelegramPost_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NavItem" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "href" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "NavItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SiteConfig" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "singletonKey" TEXT NOT NULL DEFAULT 'site-config',
    "siteName" TEXT NOT NULL,
    "heroSubTitle" TEXT NOT NULL,
    "heroMotto" TEXT NOT NULL,
    "heroCtaHref" TEXT NOT NULL,
    "heroCtaLabel" TEXT NOT NULL,

    CONSTRAINT "SiteConfig_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AboutAuthor" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "singletonKey" TEXT NOT NULL DEFAULT 'about-author',
    "sectionTitle" TEXT NOT NULL DEFAULT 'Об авторе',
    "sectionLabel" TEXT NOT NULL DEFAULT 'Мастер',
    "authorName" TEXT NOT NULL,
    "bio" TEXT NOT NULL,
    "photo" TEXT,
    "photoAlt" TEXT,
    "quote" TEXT,
    "closingText" TEXT,
    "signature" TEXT,

    CONSTRAINT "AboutAuthor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Directions" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "singletonKey" TEXT NOT NULL DEFAULT 'directions',
    "title" TEXT NOT NULL DEFAULT 'Как добраться',
    "address" TEXT,
    "mapUrl" TEXT,
    "text" TEXT,

    CONSTRAINT "Directions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ArtsTheme" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "cover" TEXT NOT NULL,

    CONSTRAINT "ArtsTheme_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ArtsThemeMediaItem" (
    "id" TEXT NOT NULL,
    "artsThemeId" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "type" "ArtsThemeMediaType" NOT NULL,
    "src" TEXT NOT NULL,
    "alt" TEXT,
    "poster" TEXT,

    CONSTRAINT "ArtsThemeMediaItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AdminUser_email_key" ON "AdminUser"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Product_slug_key" ON "Product"("slug");

-- CreateIndex
CREATE INDEX "Product_category_idx" ON "Product"("category");

-- CreateIndex
CREATE INDEX "ProductImage_productId_sortOrder_idx" ON "ProductImage"("productId", "sortOrder");

-- CreateIndex
CREATE INDEX "TelegramPost_category_idx" ON "TelegramPost"("category");

-- CreateIndex
CREATE INDEX "NavItem_sortOrder_idx" ON "NavItem"("sortOrder");

-- CreateIndex
CREATE UNIQUE INDEX "SiteConfig_singletonKey_key" ON "SiteConfig"("singletonKey");

-- CreateIndex
CREATE UNIQUE INDEX "AboutAuthor_singletonKey_key" ON "AboutAuthor"("singletonKey");

-- CreateIndex
CREATE UNIQUE INDEX "Directions_singletonKey_key" ON "Directions"("singletonKey");

-- CreateIndex
CREATE UNIQUE INDEX "ArtsTheme_slug_key" ON "ArtsTheme"("slug");

-- CreateIndex
CREATE INDEX "ArtsThemeMediaItem_artsThemeId_sortOrder_idx" ON "ArtsThemeMediaItem"("artsThemeId", "sortOrder");

-- AddForeignKey
ALTER TABLE "ProductImage" ADD CONSTRAINT "ProductImage_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArtsThemeMediaItem" ADD CONSTRAINT "ArtsThemeMediaItem_artsThemeId_fkey" FOREIGN KEY ("artsThemeId") REFERENCES "ArtsTheme"("id") ON DELETE CASCADE ON UPDATE CASCADE;
