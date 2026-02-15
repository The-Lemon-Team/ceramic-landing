import ProductGrid from "./ProductGrid";
import Link from "next/link";

export default function ShopSection() {
  return (
    <section className="py-20 bg-accent-earth">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-6 md:mb-8">
          <span className="section-label-wrap text-center">
            <span className="section-label">Магазин</span>
          </span>
          <h2 className="section-title text-center mb-4">Прямо из печи</h2>
          <p className="section-subtitle max-w-lg mx-auto">
            Ограниченные серии, ручная работа и глазуровка в нашей студии.
          </p>
        </div>
        <ProductGrid />
        <div className="text-center mt-12">
          <Link
            href="#"
            className="text-stone-600 underline underline-offset-8 hover:text-primary transition-colors"
          >
            Все коллекции
          </Link>
        </div>
      </div>
    </section>
  );
}
