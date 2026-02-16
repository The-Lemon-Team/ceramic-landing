import Navbar from "@/components/Navbar";
import { NAV_ITEMS } from "@/data/nav";
import { SITE_NAME, HERO_CONFIG } from "@/data/site";
import Hero from "@/components/Hero";
import DiarySection from "@/components/DiarySection";
import AboutSection from "@/components/AboutSection";
import ProductGallerySection from "@/components/ProductGallerySection";
import ArtsSection from "@/components/ArtsSection";
import { TELEGRAM_POSTS } from "@/data/telegram-posts";
import { products } from "@/data/products";
import { artsThemes } from "@/data/artsThemes";
import { DIARY_ARTICLES } from "@/data/diary-articles";
import TelegramNewsFeed from "@/components/TelegramNewsFeed";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-background-light">
      <Navbar items={NAV_ITEMS.map((item) => ({ href: item.href, label: item.label }))} />
            <Hero
        title={SITE_NAME}
        subTitle={HERO_CONFIG.subTitle}
        motto={HERO_CONFIG.motto}
        ctaHref={HERO_CONFIG.ctaHref}
        ctaLabel={HERO_CONFIG.ctaLabel}
      />
      <AboutSection />

      <TelegramNewsFeed items={TELEGRAM_POSTS} />
      <ProductGallerySection items={products} />
      <ArtsSection items={artsThemes} />
      <DiarySection items={DIARY_ARTICLES} />

      {/* Блок с товарами (магазин): <ShopSection /> — для второй версии сайта */}
      <Footer />
    </main>
  );
}
