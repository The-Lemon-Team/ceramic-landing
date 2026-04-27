import ProductGrid from "./ProductGrid";
import Link from "next/link";
import Titles from "./Titles";

export default function ShopSection() {
  return (
    <section className="py-20 bg-accent-earth dark:bg-accent-earth-dark">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-6 md:mb-8">
          <Titles
            className="section-label-wrap text-center"
            overline="Магазин"
            title="Прямо из печи"
            overlineClassName="section-label inline-flex items-center justify-center"
            titleClassName="section-title text-center mb-4"
          />
          <p className="section-subtitle max-w-lg mx-auto">
            Ограниченные серии, ручная работа и глазуровка в нашей студии.
          </p>
        </div>
        <ProductGrid />
        <div className="text-center mt-12">
          <Link
            href="#"
            className="text-stone-600 dark:text-stone-300 underline underline-offset-8 hover:text-primary transition-colors"
          >
            Все коллекции
          </Link>
        </div>
      </div>
    </section>
  );
}
