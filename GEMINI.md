# Правила проекта: Точилка Hub (tochilka.app)

## Что это
Центральный портал экосистемы Точилка — лендинг + авторизация + навигация по приложениям.

## Стек
- **Frontend:** React + Vite + Tailwind + Three.js (3D-элементы) + Framer Motion
- **Backend API:** Node.js (tochilka-api) → https://tochilka.app/api/v2
- **Авторизация:** Cookie-based (httpOnly). PocketBase SDK **НЕ ИСПОЛЬЗУЕТСЯ**.

## Структура
```
src/
├── components/ui/   # Navbar, AuthModal, AppCard, AppGrid
├── pages/           # HubPage, PrivacyPage, TermsPage, ConsentPage
└── utils/
    ├── apiClient.js  # HTTP-клиент (fetch + credentials: include)
    └── cn.js         # clsx + tailwind-merge
```

## КРИТИЧЕСКОЕ ПРАВИЛО
В этом проекте НЕТ PocketBase. Все запросы идут через `src/utils/apiClient.js`.
Не пытайтесь импортировать `pocketbase` или использовать `pb.collection()`.

## Развертывание
GitHub repo: `onlinetochilka/tochilka-hub`. Деплой вручную или через CI/CD.
Статика → `/var/www/tochilka.app` на VPS.
