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
  getAboutAuthor,
} from "@/lib/strapi";

export default async function Home() {
  const [
    products,
    artsThemes,
    telegramPosts,
    directions,
    siteConfig,
    navItems,
    aboutAuthor,
  ] = await Promise.all([
    getProducts(),
    getArtsThemes(),
    getTelegramPosts(),
    getDirections(),
    getSiteConfig(),
    getNavItems(),
    getAboutAuthor(),
  ]);

  return (
    <main className="min-h-screen bg-background-light">
      <Navbar items={navItems} siteName={siteConfig.siteName} />
      <Hero
        title={siteConfig.siteName}
        subTitle={siteConfig.heroSubTitle}
        motto={siteConfig.heroMotto}
        ctaHref={siteConfig.heroCtaHref}
        ctaLabel={siteConfig.heroCtaLabel}
      />
      <AboutSection data={aboutAuthor} />

      <TelegramNewsFeed items={telegramPosts} />
      <StudioSection
        artsItems={artsThemes}
        productsItems={products}
        directions={directions}
      />
      <ProductGallerySection items={products} />

      <Footer />
    </main>
  );
}
