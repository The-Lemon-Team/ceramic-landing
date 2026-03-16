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
  getStudioSection,
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
    studioSection,
  ] = await Promise.all([
    getProducts(),
    getArtsThemes(),
    getTelegramPosts(),
    getDirections(),
    getSiteConfig(),
    getNavItems(),
    getAboutAuthor(),
    getStudioSection(),
  ]);

  const siteName = siteConfig.titleRu;

  return (
    <main className="min-h-screen bg-background-light dark:bg-background-dark">
      <Navbar items={navItems} siteName={siteName} />
      <Hero
        titleRu={siteConfig.titleRu}
        titleEn={siteConfig.titleEn}
        subTitle={siteConfig.heroSubTitle}
        motto={siteConfig.heroMotto}
      />
      <div className="hidden dark:block h-px bg-white/10" aria-hidden />
      <AboutSection data={aboutAuthor} />
      <div className="hidden dark:block h-px bg-white/10" aria-hidden />
      <StudioSection photos={studioSection?.gallery} />
      <div className="hidden dark:block h-px bg-white/10" aria-hidden />
      <MasterClassesSection text={siteConfig.masterClassesText} />
      <div className="h-px bg-primary/60 dark:bg-white/10" aria-hidden />
      <TelegramNewsFeed items={telegramPosts} />
      <div className="h-px bg-primary/60 dark:bg-white/10" aria-hidden />
      <ProductGallerySection items={products} />
      <div className="h-px bg-primary/60 dark:bg-white/10" aria-hidden />
      <ContactsSection directions={directions} />
      <div className="h-px bg-primary/60 dark:bg-white/10" aria-hidden />
      <Footer />
    </main>
  );
}
