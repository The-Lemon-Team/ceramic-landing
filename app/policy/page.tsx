import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getNavItems, getSiteConfig } from "@/lib/cms";

export default async function PolicyPage() {
  const [navItems, siteConfig] = await Promise.all([
    getNavItems(),
    getSiteConfig(),
  ]);

  const siteName = siteConfig.titleRu;

  return (
    <main className="min-h-screen bg-background-light flex flex-col">
      <Navbar items={navItems} siteName={siteName} />
      <div className="max-w-4xl mx-auto px-6 py-16 md:py-20">
        <h1 className="text-4xl md:text-5xl font-serif text-stone-800">
          Политика конфиденциальности
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-stone-500">
          Настоящий документ является типовым шаблоном политики
          конфиденциальности. Текст приведён в информационных целях.
        </p>

        <div className="mt-10 space-y-8 text-stone-700">
          <section className="space-y-3">
            <h2 className="text-xl font-serif text-stone-800">
              1. Общие положения
            </h2>
            <p className="text-sm leading-relaxed">
              1.1. Настоящая Политика конфиденциальности определяет порядок
              обработки и защиты персональных данных пользователей сайта (далее
              — «Пользователь»), а также меры по обеспечению безопасности таких
              данных.
            </p>
            <p className="text-sm leading-relaxed">
              1.2. Использование сайта означает согласие Пользователя с
              настоящей Политикой и условиями обработки персональных данных. В
              случае несогласия Пользователь должен прекратить использование
              сайта.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-serif text-stone-800">
              2. Персональные данные
            </h2>
            <p className="text-sm leading-relaxed">
              2.1. Персональные данные — любая информация, относящаяся прямо или
              косвенно к определённому Пользователю.
            </p>
            <p className="text-sm leading-relaxed">
              2.2. Сайт может обрабатывать следующие данные: имя, контактные
              данные (телефон, e‑mail), адрес доставки, а также технические
              данные (IP‑адрес, cookies, параметры устройства и браузера), если
              они собираются используемыми сервисами.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-serif text-stone-800">
              3. Цели обработки
            </h2>
            <p className="text-sm leading-relaxed">
              3.1. Обработка персональных данных осуществляется в целях:
              предоставления услуг и исполнения заказов; связи с Пользователем;
              улучшения работы сайта; соблюдения требований законодательства.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-serif text-stone-800">
              4. Правовые основания обработки
            </h2>
            <p className="text-sm leading-relaxed">
              4.1. Правовым основанием обработки является согласие Пользователя,
              необходимость исполнения договора/заявки, а также иные основания,
              предусмотренные законодательством РФ.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-serif text-stone-800">
              5. Условия обработки и передачи
            </h2>
            <p className="text-sm leading-relaxed">
              5.1. Персональные данные обрабатываются с использованием средств
              автоматизации и/или без таковых.
            </p>
            <p className="text-sm leading-relaxed">
              5.2. Данные могут передаваться третьим лицам только в объёме,
              необходимом для исполнения заказа/оказания услуг (например,
              службам доставки, платёжным провайдерам), либо в случаях,
              предусмотренных законом.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-serif text-stone-800">6. Cookies</h2>
            <p className="text-sm leading-relaxed">
              6.1. Cookies — небольшие файлы, которые сохраняются на устройстве
              Пользователя и помогают улучшать работу сайта.
            </p>
            <p className="text-sm leading-relaxed">
              6.2. Пользователь может ограничить использование cookies в
              настройках браузера, однако это может повлиять на корректность
              работы сайта.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-serif text-stone-800">
              7. Права пользователя
            </h2>
            <p className="text-sm leading-relaxed">
              7.1. Пользователь вправе запрашивать сведения об обработке его
              персональных данных, требовать уточнения, блокирования или
              удаления данных при наличии оснований.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-serif text-stone-800">
              8. Безопасность данных
            </h2>
            <p className="text-sm leading-relaxed">
              8.1. Администрация сайта принимает разумные организационные и
              технические меры для защиты персональных данных от неправомерного
              доступа, утраты, изменения и распространения.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-serif text-stone-800">
              9. Заключительные положения
            </h2>
            <p className="text-sm leading-relaxed">
              9.1. Политика может быть изменена. Новая редакция вступает в силу
              с момента её публикации на сайте, если иное не предусмотрено новой
              редакцией.
            </p>
          </section>
        </div>
      </div>
      <div className="mt-auto">
        <Footer />
      </div>
    </main>
  );
}
