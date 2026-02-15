import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-white pt-16 pb-8 md:pt-20 md:pb-10 border-t border-stone-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-12 gap-12 mb-12">
          <div className="md:col-span-4">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <Image
                src="/images/logo.png"
                alt="Логотип Ceramic•Loop"
                width={40}
                height={40}
                className="w-10 h-10 object-contain"
              />
              <span className="text-xl font-serif font-bold text-stone-800">Ceramic•Loop</span>
            </Link>
            <p className="font-sans text-sm leading-relaxed text-stone-500 max-w-xs">
              Не просто студия, а пространство, где керамика хранит время и
              остаётся с вами навсегда.
            </p>
          </div>
          <div className="md:col-span-2">
            <h5 className="font-sans text-xs uppercase tracking-[0.2em] font-bold text-stone-600 mb-6">
              Магазин
            </h5>
            <ul className="font-sans text-sm space-y-4 text-stone-500">
              <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  Вазы
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  Тарелки
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  Плитка
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  Прочее
                </Link>
              </li>
            </ul>
          </div>
          <div className="md:col-span-2">
            <h5 className="font-sans text-xs uppercase tracking-[0.2em] font-bold text-stone-600 mb-6">
              Студия
            </h5>
            <ul className="font-sans text-sm space-y-4 text-stone-500">
              <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  О нас
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  Процесс
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  Как нас найти
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  Адрес
                </Link>
              </li>
            </ul>
          </div>
          <div className="md:col-span-4">
            <h5 className="font-sans text-xs uppercase tracking-[0.2em] font-bold text-stone-600 mb-6">
              Социальные сети
            </h5>
            <div className="flex gap-4">
              <Link
                href="#"
                className="w-10 h-10 border border-stone-200 rounded-full flex items-center justify-center text-stone-400 hover:border-primary hover:text-primary transition-all"
                aria-label="Instagram"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"></path>
                </svg>
              </Link>
              <Link
                href="#"
                className="w-10 h-10 border border-stone-200 rounded-full flex items-center justify-center text-stone-400 hover:border-primary hover:text-primary transition-all"
                aria-label="Telegram"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"></path>
                </svg>
              </Link>
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between pt-6 border-t border-stone-100 font-sans text-xs uppercase tracking-[0.2em] text-stone-400">
          <p>© 2026 Ceramic•Loop. Все права защищены.</p>
          <div className="flex gap-8 mt-4 md:mt-0">
            <Link href="#" className="hover:text-stone-900 transition-colors">
              Политика конфиденциальности
            </Link>
            <Link href="#" className="hover:text-stone-900 transition-colors">
              Условия использования
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
