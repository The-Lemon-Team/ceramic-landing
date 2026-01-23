import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import DiarySection from "@/components/DiarySection";
import AboutSection from "@/components/AboutSection";
import ShopSection from "@/components/ShopSection";
import TelegramNewsFeed from "@/components/TelegramNewsFeed";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-background-light">
      <Navbar />
      <Hero />
      <DiarySection />
      <AboutSection />
      <TelegramNewsFeed />
      <ShopSection />
      <Footer />
    </main>
  );
}
