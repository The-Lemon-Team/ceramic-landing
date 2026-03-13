import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductGallerySection from "@/components/ProductGallerySection";
import { getNavItems, getProducts, getSiteConfig } from "@/lib/cms";

const FILTERS = [
  { key: "tiles", label: "Плитка", href: "/shop/tiles" },
  { key: "plates", label: "Тарелки", href: "/shop/plates" },
  { key: "other", label: "Прочее", href: "/shop/other" },
] as const;

type FilterKey = (typeof FILTERS)[number]["key"];

function normalizeFilter(raw: string | undefined): FilterKey {
  if (raw === "tiles" || raw === "plates" || raw === "other") return raw;
  return "plates";
}

function isTiles(dimensions: string) {
  return /\d+\s*[×x]\s*\d+/i.test(dimensions);
}

function isPlates(dimensions: string) {
  return /диаметр|\bø\b|\u00d8/i.test(dimensions);
}

export default async function ShopFilterPage({
  params,
}: {
  params: Promise<{ filter?: string }>;
}) {
  const { filter } = await params;
  const activeFilter = normalizeFilter(filter);

  const [navItems, siteConfig, products] = await Promise.all([
    getNavItems(),
    getSiteConfig(),
    getProducts(),
  ]);

  const filteredProducts = products.filter((p) => {
    if (activeFilter === "tiles") return isTiles(p.dimensions);
    if (activeFilter === "plates") return isPlates(p.dimensions);
    return !isTiles(p.dimensions) && !isPlates(p.dimensions);
  });

  return (
    <main className="min-h-screen bg-background-light flex flex-col">
      <Navbar items={navItems} siteName={siteConfig.siteName} />

      <div className="max-w-7xl mx-auto w-full px-6 pt-10 md:pt-12">
        <h1 className="text-4xl md:text-5xl font-serif text-stone-800">
          Купить керамику
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-stone-500 max-w-xl">
          Выберите категорию — и мы покажем актуальные изделия. Нажмите на
          карточку, чтобы открыть подробности.
        </p>

        <div className="mt-8 flex flex-wrap gap-2">
          {FILTERS.map((t) => {
            const isActive = t.key === activeFilter;
            return (
              <Link
                key={t.key}
                href={t.href}
                className={
                  isActive
                    ? "px-4 py-2 rounded-full bg-primary text-white text-sm font-medium"
                    : "px-4 py-2 rounded-full border border-stone-200 text-stone-700 text-sm font-medium hover:border-primary hover:text-primary transition-colors"
                }
              >
                {t.label}
              </Link>
            );
          })}
        </div>
      </div>

      <div className="mt-6">
        <ProductGallerySection items={filteredProducts} showHeader={false} />
      </div>

      <div className="mt-auto">
        <Footer />
      </div>
    </main>
  );
}
