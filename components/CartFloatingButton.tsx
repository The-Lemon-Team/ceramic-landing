"use client";

import Link from "next/link";
import { useCart } from "@/components/CartProvider";

export default function CartFloatingButton() {
  const { totalQuantity } = useCart();

  return (
    <div className="hidden md:block fixed inset-x-0 bottom-6 z-[60] pointer-events-none">
      <div className="mx-auto relative px-6 flex justify-end pointer-events-auto">
        <Link
          href="/cart"
          className="relative inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary text-white shadow-xl hover:bg-orange-600 transition-colors"
          aria-label="Корзина"
        >
          <svg
            className="w-6 h-6"
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
          {totalQuantity > 0 && (
            <span className="absolute -top-1 -right-1 min-w-5 h-5 px-1 rounded-full bg-white text-primary text-[11px] leading-5 text-center font-semibold shadow">
              {totalQuantity}
            </span>
          )}
        </Link>
      </div>
    </div>
  );
}
