import Link from "next/link";
import Image from "next/image";
import { getSiteConfig } from "@/lib/cms";

export default async function Footer() {
  const siteConfig = await getSiteConfig();

  const siteNameFull = `${siteConfig.titleEn} | ${siteConfig.titleRu}`;
  const siteNameRu = siteConfig.titleRu;

  const instagramUrl = siteConfig.instagramUrl || "";
  const telegramUrl = siteConfig.telegramUrl || "";
  const vkUrl = siteConfig.vkUrl || "";

  const toSocialHref = (url: string) => (url ? url : "/");
  const isExternal = (url: string) => Boolean(url);

  return (
    <>
      <div className="border-t border-stone-100 dark:border-white/10" />
      <footer className="bg-white dark:bg-[rgb(28_26_24)] pt-12 px-6 pb-8 md:pt-20 md:pb-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-12 gap-8 mb-8">
            <div className="md:col-span-4">
              <Link href="/" className="flex items-center gap-2 mb-6">
                <Image
                  src="/images/logo.png"
                  alt={`Логотип ${siteNameFull}`}
                  width={40}
                  height={40}
                  className="w-10 h-10 object-contain"
                />
                <span className="text-xl font-serif font-bold text-stone-800 dark:text-stone-50">
                  <span className="md:hidden">{siteNameRu}</span>
                  <span className="hidden md:inline">{siteNameFull}</span>
                </span>
              </Link>
              <p className="font-sans text-sm leading-relaxed text-stone-500 dark:text-stone-300 max-w-xs">
                Не просто студия, а пространство, где керамика хранит время и
                остаётся с вами навсегда.
              </p>
            </div>

            <div
              className="md:hidden h-px bg-stone-200/40 dark:bg-white/5"
              aria-hidden
            />

            <div className="md:col-span-2">
              <h5 className="font-sans text-xs uppercase tracking-[0.2em] font-bold text-stone-600 dark:text-stone-300 mb-2.5">
                Магазин
              </h5>
              <ul className="font-sans text-sm space-y-1.5 text-stone-500 dark:text-stone-300">
                <li>
                  <Link
                    href="/shop/tiles"
                    className="hover:text-primary transition-colors"
                  >
                    Плитка
                  </Link>
                </li>
                <li>
                  <Link
                    href="/shop/plates"
                    className="hover:text-primary transition-colors"
                  >
                    Тарелки
                  </Link>
                </li>
                <li>
                  <Link
                    href="/shop/other"
                    className="hover:text-primary transition-colors"
                  >
                    Прочее
                  </Link>
                </li>
              </ul>
            </div>

            <div
              className="md:hidden h-px bg-stone-200/40 dark:bg-white/5"
              aria-hidden
            />

            <div className="md:col-span-2">
              <h5 className="font-sans text-xs uppercase tracking-[0.2em] font-bold text-stone-600 dark:text-stone-300 mb-2.5">
                Студия
              </h5>
              <ul className="font-sans text-sm space-y-1.5 text-stone-500 dark:text-stone-300">
                <li>
                  <Link
                    href="#"
                    className="hover:text-primary transition-colors"
                  >
                    О нас
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-primary transition-colors"
                  >
                    Процесс
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-primary transition-colors"
                  >
                    Как нас найти
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-primary transition-colors"
                  >
                    Адрес
                  </Link>
                </li>
              </ul>
            </div>
            <div className="md:col-span-4">
              <h5 className="font-sans text-xs uppercase tracking-[0.2em] font-bold text-stone-600 dark:text-stone-300 mb-2.5">
                Социальные сети
              </h5>
              <div className="flex gap-4">
                <Link
                  href={toSocialHref(instagramUrl)}
                  target={isExternal(instagramUrl) ? "_blank" : undefined}
                  rel={
                    isExternal(instagramUrl) ? "noopener noreferrer" : undefined
                  }
                  className="w-10 h-10 border border-stone-200 dark:border-white/10 rounded-full flex items-center justify-center text-stone-400 hover:border-primary hover:text-primary transition-all"
                  aria-label="Instagram"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"></path>
                  </svg>
                </Link>
                <Link
                  href={toSocialHref(telegramUrl)}
                  target={isExternal(telegramUrl) ? "_blank" : undefined}
                  rel={
                    isExternal(telegramUrl) ? "noopener noreferrer" : undefined
                  }
                  className="w-10 h-10 border border-stone-200 dark:border-white/10 rounded-full flex items-center justify-center text-stone-400 hover:border-primary hover:text-primary transition-all"
                  aria-label="Telegram"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"></path>
                  </svg>
                </Link>
                <Link
                  href={toSocialHref(vkUrl)}
                  target={isExternal(vkUrl) ? "_blank" : undefined}
                  rel={isExternal(vkUrl) ? "noopener noreferrer" : undefined}
                  className="w-10 h-10 border border-stone-200 dark:border-white/10 rounded-full flex items-center justify-center text-stone-400 hover:border-primary hover:text-primary transition-all"
                  aria-label="ВКонтакте"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12.78 16.23h1.1s.34-.04.52-.23c.16-.16.15-.47.15-.47s-.02-1.44.64-1.66c.65-.22 1.49 1.39 2.38 2 .67.46 1.18.36 1.18.36l2.38-.03s1.25-.08.66-1.06c-.05-.08-.33-.73-1.7-2-1.43-1.33-1.24-1.12.48-3.44 1.05-1.43 1.47-2.3 1.33-2.68-.13-.36-.93-.26-.93-.26l-2.68.02s-.2-.03-.35.06c-.15.1-.25.3-.25.3s-.42 1.12-.98 2.07c-1.17 1.97-1.64 2.08-1.83 1.95-.44-.29-.33-1.17-.33-1.8 0-1.95.3-2.76-.58-2.97-.3-.07-.53-.11-1.3-.12-.99-.01-1.82 0-2.3.23-.32.15-.56.49-.41.51.18.03.58.11.8.4.28.38.27 1.24.27 1.24s.16 2.3-.37 2.58c-.37.2-.88-.21-1.97-1.98-.56-.91-.99-1.92-.99-1.92s-.08-.2-.23-.3c-.18-.12-.42-.16-.42-.16l-2.55.02s-.38.01-.52.17c-.12.14-.01.44-.01.44s2 4.67 4.27 7.03c2.08 2.15 4.46 2.01 4.46 2.01z" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
          <div className="border-t border-primary dark:border-white/10 w-screen relative left-1/2 -translate-x-1/2" />
          <div className="flex flex-col md:flex-row justify-between pt-6 font-sans text-xs uppercase tracking-[0.2em] text-stone-400 dark:text-stone-400">
            <p className="copyright">
              © 2026 <span className="md:hidden">{siteNameRu}</span>
              <span className="hidden md:inline">{siteNameFull}</span>. Все
              права защищены.
            </p>
            <div className="politics-links flex flex-row flex-wrap gap-2 md:gap-8 mt-4 md:mt-0">
              <Link
                href="/policy"
                className="hover:text-stone-900 dark:hover:text-stone-50 text-xs transition-colors whitespace-nowrap"
              >
                Политика конфиденциальности
              </Link>
              <Link
                href="/offer"
                className="hover:text-stone-900 dark:hover:text-stone-50 transition-colors whitespace-nowrap"
              >
                Оферта
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
