"use client";

import Image from "next/image";
import { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
  onImageClick: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export default function ProductCard({
  product,
  onImageClick,
  onAddToCart,
}: ProductCardProps) {
  return (
    <div className="group">
      <div className="aspect-[4/5] overflow-hidden rounded-2xl mb-6 relative cursor-pointer">
        <Image
          src={product.mainImage}
          alt={product.title}
          width={400}
          height={500}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          onClick={() => onImageClick(product)}
        />
        <button
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart(product);
          }}
          className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm text-stone-900 p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 duration-300 shadow-lg"
          aria-label="В корзину"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
            />
          </svg>
        </button>
      </div>
      <div className="flex justify-between items-start">
        <div>
          <h4 className="text-xl font-serif mb-1">{product.title}</h4>
          <p className="text-xs text-stone-400 uppercase tracking-wide">
            {product.finish}
          </p>
        </div>
        <span className="font-medium">{product.price} ₽</span>
      </div>
    </div>
  );
}
