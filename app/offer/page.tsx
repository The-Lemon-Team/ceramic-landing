import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getNavItems, getSiteConfig } from "@/lib/cms";

export default async function OfferPage() {
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
          Публичная оферта
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-stone-500">
          Настоящий документ является типовым шаблоном публичной оферты для
          сайта/онлайн-сервиса. Текст приведён в информационных целях.
        </p>

        <div className="mt-10 space-y-8 text-stone-700">
          <section className="space-y-3">
            <h2 className="text-xl font-serif text-stone-800">
              1. Общие положения
            </h2>
            <p className="text-sm leading-relaxed">
              1.1. Настоящая публичная оферта (далее — «Оферта») является
              официальным предложением правообладателя сайта (далее —
              «Исполнитель») заключить договор на условиях, изложенных ниже, с
              любым дееспособным лицом (далее — «Заказчик»).
            </p>
            <p className="text-sm leading-relaxed">
              1.2. Акцептом Оферты считается совершение Заказчиком действий,
              свидетельствующих о принятии условий Оферты: оформление заказа,
              оплата товаров/услуг, отправка заявки, регистрация на сайте и/или
              иные действия, предусмотренные функционалом сайта.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-serif text-stone-800">
              2. Предмет договора
            </h2>
            <p className="text-sm leading-relaxed">
              2.1. Исполнитель обязуется предоставить Заказчику возможность
              приобрести товары, оформить участие в мастер‑классах/мероприятиях
              и/или получить иные услуги, представленные на сайте, а Заказчик
              обязуется оплатить и принять соответствующие товары/услуги на
              условиях настоящей Оферты.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-serif text-stone-800">
              3. Цена и оплата
            </h2>
            <p className="text-sm leading-relaxed">
              3.1. Цена товара/услуги указывается на сайте. Исполнитель вправе
              изменять цены в одностороннем порядке без предварительного
              уведомления, при этом цена уже оплаченного заказа изменению не
              подлежит.
            </p>
            <p className="text-sm leading-relaxed">
              3.2. Оплата осуществляется способами, доступными на сайте.
              Моментом оплаты считается поступление денежных средств на
              расчётный счёт Исполнителя или уполномоченного платёжного
              партнёра.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-serif text-stone-800">
              4. Доставка, оказание услуг и возвраты
            </h2>
            <p className="text-sm leading-relaxed">
              4.1. Условия доставки (сроки, стоимость, способы) указываются на
              сайте и/или согласовываются с Заказчиком при оформлении заказа.
            </p>
            <p className="text-sm leading-relaxed">
              4.2. Возврат товаров надлежащего качества осуществляется в
              порядке, предусмотренном действующим законодательством РФ, с
              учётом особенностей дистанционной торговли.
            </p>
            <p className="text-sm leading-relaxed">
              4.3. В случае отмены мероприятия/мастер‑класса по вине Исполнителя
              Заказчику возвращается оплаченная сумма либо предлагается перенос
              даты (по выбору Заказчика).
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-serif text-stone-800">
              5. Права и обязанности сторон
            </h2>
            <p className="text-sm leading-relaxed">
              5.1. Исполнитель обязуется предоставлять актуальную информацию о
              товарах/услугах, принимать и обрабатывать заказы, а также
              обеспечивать возможность обратной связи.
            </p>
            <p className="text-sm leading-relaxed">
              5.2. Заказчик обязуется предоставлять достоверные данные,
              необходимые для исполнения договора, и соблюдать условия настоящей
              Оферты.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-serif text-stone-800">
              6. Ответственность и ограничения
            </h2>
            <p className="text-sm leading-relaxed">
              6.1. Исполнитель не несёт ответственности за невозможность
              исполнения обязательств вследствие предоставления Заказчиком
              недостоверной информации.
            </p>
            <p className="text-sm leading-relaxed">
              6.2. Сайт может содержать ссылки на сторонние ресурсы. Исполнитель
              не контролирует их содержимое и не несёт ответственности за
              последствия их использования.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-serif text-stone-800">
              7. Заключительные положения
            </h2>
            <p className="text-sm leading-relaxed">
              7.1. Оферта вступает в силу с момента публикации на сайте и
              действует до её отзыва Исполнителем.
            </p>
            <p className="text-sm leading-relaxed">
              7.2. Все споры решаются путём переговоров, а при недостижении
              соглашения — в порядке, установленном законодательством РФ.
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
