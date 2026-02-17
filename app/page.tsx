import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import ProductGallerySection from "@/components/ProductGallerySection";
import StudioSection from "@/components/StudioSection";
import TelegramNewsFeed from "@/components/TelegramNewsFeed";
import Footer from "@/components/Footer";
import {
  getProducts,
  getArtsThemes,
  getTelegramPosts,
  getDirections,
  getSiteConfig,
  getNavItems,
} from "@/lib/strapi";
import { products as staticProducts } from "@/data/products";
import { artsThemes as staticArtsThemes } from "@/data/artsThemes";
import { TELEGRAM_POSTS } from "@/data/telegram-posts";
import { DIRECTIONS } from "@/data/directions";
import { SITE_NAME, HERO_CONFIG } from "@/data/site";
import { NAV_ITEMS } from "@/data/nav";

export default async function Home() {
  const [
    products,
    artsThemes,
    telegramPosts,
    directions,
    siteConfig,
    navItems,
  ] = await Promise.all([
    getProducts(),
    getArtsThemes(),
    getTelegramPosts(),
    getDirections(),
    getSiteConfig(),
    getNavItems(),
  ]);

  const displayProducts = products.length > 0 ? products : staticProducts;
  const displayArtsThemes =
    artsThemes.length > 0 ? artsThemes : staticArtsThemes;
  const displayTelegramPosts =
    telegramPosts.length > 0 ? telegramPosts : TELEGRAM_POSTS;
  const displayDirections =
    directions.address || directions.mapUrl
      ? directions
      : DIRECTIONS;
  const displaySiteName = siteConfig.siteName || SITE_NAME;
  const displayHeroConfig = {
    subTitle: siteConfig.heroSubTitle || HERO_CONFIG.subTitle,
    motto: siteConfig.heroMotto || HERO_CONFIG.motto,
    ctaHref: siteConfig.heroCtaHref || HERO_CONFIG.ctaHref,
    ctaLabel: siteConfig.heroCtaLabel || HERO_CONFIG.ctaLabel,
  };
  const displayNavItems =
    navItems.length > 0 ? navItems : NAV_ITEMS.map((n) => ({ href: n.href, label: n.label }));

  return (
    <main className="min-h-screen bg-background-light">
      <Navbar items={displayNavItems} siteName={displaySiteName} />
      <Hero
        title={displaySiteName}
        subTitle={displayHeroConfig.subTitle}
        motto={displayHeroConfig.motto}
        ctaHref={displayHeroConfig.ctaHref}
        ctaLabel={displayHeroConfig.ctaLabel}
      />
      <AboutSection />

      <TelegramNewsFeed items={displayTelegramPosts} />
      <StudioSection
        artsItems={displayArtsThemes}
        productsItems={displayProducts}
        directions={displayDirections}
      />
      <ProductGallerySection items={displayProducts} />

      <Footer />
    </main>
  );
}
