# Ceramic Landing CMS (Strapi v5)

CMS на базе Strapi v5 для лендинга керамической студии.

## Content Types

- **Product** — керамические изделия (тарелки, плитка и т.д.)
- **Arts Theme** — темы галереи «Зарисовки и арты»
- **Telegram Post** — посты из Telegram-канала
- **Directions** — блок «Как добраться» (single type)
- **Site Config** — конфигурация сайта и Hero (single type)
- **Nav Item** — пункты навигации

## Запуск

```bash
cd cms
npm install
npm run develop
```

При первом запуске:
1. Откроется браузер на http://localhost:1337/admin
2. Создайте учётную запись администратора
3. Зайдите в **Settings → Users & Permissions → Roles → Public**
4. Для каждого content type включите права **find** и **findOne**
5. Seed-данные загрузятся автоматически при первом старте (если БД пуста)

## Переменные окружения

- `HOST` — хост (по умолчанию 0.0.0.0)
- `PORT` — порт (по умолчанию 1337)
- `DATABASE_CLIENT` — sqlite (по умолчанию), mysql, postgres
- Для production: настройте `DATABASE_*` для PostgreSQL/MySQL

## API

- Products: `GET /api/products`
- Arts themes: `GET /api/arts-themes`
- Telegram posts: `GET /api/telegram-posts`
- Directions: `GET /api/directions`
- Site config: `GET /api/site-config`
- Nav items: `GET /api/nav-items`
