import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import StudioSection from "@/components/StudioSection";
import MasterClassesSection from "@/components/MasterClassesSection";
import TelegramNewsFeed from "@/components/TelegramNewsFeed";
import ProductGallerySection from "@/components/ProductGallerySection";
import ContactsSection from "@/components/ContactsSection";
import Footer from "@/components/Footer";
import {
  getProducts,
  getArtsThemes,
  getTelegramPosts,
  getDirections,
  getSiteConfig,
  getNavItems,
  getAboutAuthor,
} from "@/lib/cms";

export const dynamic = "force-dynamic";

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
      />
      <AboutSection data={aboutAuthor} />
      <StudioSection artsItems={artsThemes} />
      <MasterClassesSection text={siteConfig.masterClassesText} />
      <TelegramNewsFeed items={telegramPosts} />
      <ProductGallerySection items={products} />
      <ContactsSection directions={directions} />
      <Footer />
    </main>
  );
}
