# active-book-types — инструкции для ИИ-агентов

Перед работой обязательно прочитайте:

1. `../active-book-common/AGENTS.md` — общий порядок работы агента.
2. `../active-book-common/CODING_CONVENTIONS.md` — соглашения для разработчиков по коду, структуре каталогов и тестам.
3. Локальные ограничения ниже.

## Особенности пакета

Пакет содержит только декларации типов. Не добавляйте runtime-код.
Проверки: `npm run typecheck`, `npm test`, `npm run test:bundler`.
Сохраняйте тесты контрактов NodeNext и Bundler и точность optional-полей.
