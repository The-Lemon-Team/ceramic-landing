import ProductGrid from "./ProductGrid";
import Link from "next/link";

export default function ShopSection() {
  return (
    <section className="py-24 bg-accent-earth">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-widest text-primary font-bold mb-4 block">
            Shop
          </span>
          <h2 className="text-5xl font-serif mb-4">Fresh from the Kiln</h2>
          <p className="text-stone-500 max-w-lg mx-auto">
            Limited run pieces, handmade and glazed in our downtown studio.
          </p>
        </div>
        <ProductGrid />
        <div className="text-center mt-16">
          <Link
            href="#"
            className="text-stone-600 underline underline-offset-8 hover:text-primary transition-colors"
          >
            View All Collections
          </Link>
        </div>
      </div>
    </section>
  );
}
