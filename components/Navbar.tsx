import Link from "next/link";
import Image from "next/image";
import NavLink from "./NavLink";

export interface NavItem {
  href: string;
  label: string;
}

interface NavbarProps {
  items: NavItem[];
  siteName?: string;
}

export default function Navbar({ items, siteName = "Ceramic•Loop" }: NavbarProps) {
  return (
    <nav className="sticky top-0 z-50 bg-background-light/80 backdrop-blur-md border-b border-stone-200">
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
          <span className="text-xl font-serif font-bold tracking-tight">
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
          <button
            className="p-2 hover:bg-stone-100 rounded-full transition-colors"
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
            <button
              className="p-2 hover:bg-stone-100 rounded-full transition-colors"
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
            </button>
            <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full"></span>
          </div>
        </div>
      </div>
    </nav>
  );
}
