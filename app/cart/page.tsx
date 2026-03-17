"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/components/CartProvider";

export default function CartPage() {
  const { items, totalPrice, clear, removeItem, setQuantity } = useCart();

  return (
    <main className="min-h-screen bg-background-light dark:bg-background-dark overflow-x-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 min-w-0">
          <div>
            <h1 className="text-3xl md:text-4xl font-serif text-stone-900 dark:text-stone-50">
              Корзина
            </h1>
            <p className="text-sm text-stone-500 dark:text-stone-400 mt-1">
              Проверьте выбранные позиции перед оформлением.
            </p>
          </div>
          <Link
            href="/"
            className="text-sm uppercase tracking-widest font-medium text-stone-600 dark:text-stone-300 hover:text-primary transition-colors self-start sm:self-auto"
          >
            На главную
          </Link>
        </div>

        {items.length === 0 ? (
          <div className="rounded-2xl border border-stone-200 dark:border-white/10 bg-white/70 dark:bg-white/5 p-8">
            <p className="text-stone-700 dark:text-stone-200">Корзина пуста.</p>
            <div className="mt-4">
              <Link
                href="/#ceramics"
                className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg bg-primary text-white font-semibold hover:bg-orange-600 transition-colors"
              >
                Перейти в каталог
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid md:grid-cols-[1fr_320px] gap-8 cart-page">
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="w-full max-w-full min-w-0 overflow-hidden rounded-2xl border border-stone-200 dark:border-white/10 bg-white dark:bg-white/5 p-4 flex gap-4"
                >
                  <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-stone-100 dark:bg-white/10 shrink-0">
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover"
                        sizes="80px"
                        unoptimized
                      />
                    ) : null}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0 flex-1">
                        <p className="text-sm uppercase tracking-widest text-stone-500 dark:text-stone-400">
                          {item.kind === "product" ? "Товар" : "Арт"}
                        </p>
                        <h3 className="font-serif text-lg text-stone-900 dark:text-stone-50 truncate">
                          {item.title}
                        </h3>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        className="text-sm shrink-0 text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-white transition-colors"
                      >
                        Удалить
                      </button>
                    </div>

                    <div className="mt-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div className="inline-flex w-fit self-start sm:self-auto items-center rounded-xl border border-stone-200 dark:border-white/10 overflow-hidden">
                        <button
                          type="button"
                          onClick={() =>
                            setQuantity(item.id, Math.max(1, item.quantity - 1))
                          }
                          className="w-10 h-10 flex items-center justify-center text-stone-700 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-white/10 transition-colors"
                          aria-label="Уменьшить количество"
                        >
                          -
                        </button>
                        <span className="w-10 text-center text-sm font-semibold text-stone-900 dark:text-stone-50">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            setQuantity(item.id, item.quantity + 1)
                          }
                          className="w-10 h-10 flex items-center justify-center text-stone-700 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-white/10 transition-colors"
                          aria-label="Увеличить количество"
                        >
                          +
                        </button>
                      </div>

                      <div className="text-right sm:shrink-0">
                        <p className="text-sm text-stone-500 dark:text-stone-400">
                          {item.price} ₽ × {item.quantity}
                        </p>
                        <p className="text-lg font-semibold text-stone-900 dark:text-stone-50">
                          {item.price * item.quantity} ₽
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <aside className="rounded-2xl border border-stone-200 dark:border-white/10 bg-white dark:bg-white/5 p-5 h-fit">
              <h2 className="text-xl font-serif text-stone-900 dark:text-stone-50">
                Итого
              </h2>
              <div className="mt-4 flex items-center justify-between text-sm text-stone-600 dark:text-stone-300">
                <span>Сумма</span>
                <span className="font-semibold text-stone-900 dark:text-stone-50">
                  {totalPrice} ₽
                </span>
              </div>

              <button
                type="button"
                className="mt-5 w-full px-4 py-3 rounded-xl bg-primary text-white font-semibold hover:bg-orange-600 transition-colors"
              >
                Оформить заказ
              </button>

              <button
                type="button"
                onClick={clear}
                className="mt-3 w-full px-4 py-3 rounded-xl border border-stone-200 dark:border-white/10 text-stone-700 dark:text-stone-200 hover:bg-stone-50 dark:hover:bg-white/10 transition-colors"
              >
                Очистить корзину
              </button>
            </aside>
          </div>
        )}
      </div>
    </main>
  );
}
