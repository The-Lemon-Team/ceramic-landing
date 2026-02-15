import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import DiarySection from "@/components/DiarySection";
import AboutSection from "@/components/AboutSection";
import ProductGallerySection from "@/components/ProductGallerySection";
import ArtsSection from "@/components/ArtsSection";
import TelegramNewsFeed from "@/components/TelegramNewsFeed";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-background-light">
      <Navbar />
      <Hero />
      <AboutSection />

      <TelegramNewsFeed />
      <ProductGallerySection />
      <ArtsSection />
      <DiarySection />

      {/* Блок с товарами (магазин): <ShopSection /> — для второй версии сайта */}
      <Footer />
    </main>
  );
}
