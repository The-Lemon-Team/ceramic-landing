"use client";

import Link from "next/link";
import Image from "next/image";
import NavLink from "./NavLink";
import { useCart } from "@/components/CartProvider";
import ThemeToggle from "./ThemeToggle";

export interface NavItem {
  href: string;
  label: string;
}

interface NavbarProps {
  items: NavItem[];
  siteName?: string;
}

export default function Navbar({
  items,
  siteName = "Ceramic•Loop",
}: NavbarProps) {
  const { totalQuantity } = useCart();

  return (
    <nav className="sticky top-0 z-50 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-stone-200 dark:border-stone-800">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/images/logo.png"
            alt={`Логотип ${siteName}`}
            width={40}
            height={40}
            className="w-10 h-10 object-contain"
            priority
          />
          <span className="text-xl font-serif font-bold tracking-tight text-stone-900 dark:text-stone-50">
            {siteName}
          </span>
        </Link>
        <div className="hidden md:flex items-center gap-8">
          {items.map((item) => (
            <NavLink key={item.href} href={item.href}>
              {item.label}
            </NavLink>
          ))}
        </div>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <button
            className="p-2 hover:bg-stone-100 dark:hover:bg-white/10 rounded-full transition-colors text-stone-900 dark:text-stone-50"
            aria-label="Поиск"
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
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
          <div className="relative">
            <Link
              href="/cart"
              className="inline-flex p-2 hover:bg-stone-100 dark:hover:bg-white/10 rounded-full transition-colors text-stone-900 dark:text-stone-50"
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
            </Link>
            {totalQuantity > 0 && (
              <span className="absolute -top-1 -right-1 min-w-5 h-5 px-1 rounded-full bg-primary text-white text-[11px] leading-5 text-center font-semibold">
                {totalQuantity}
              </span>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
