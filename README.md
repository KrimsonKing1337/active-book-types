# @active-book/types

Публичные TypeScript-контракты ActiveBook для содержимого книги, медиа и пользовательских
компонентов. Пакет содержит только декларации `.d.ts`: в нём нет runtime JavaScript,
реализации редактора, React или движка core.

ActiveBook находится **до первого релиза**. Контракты ещё развиваются вместе с ядром
и редактором; пакет пока приватный. На текущем движке ещё нет выпущенных книг.

## Установка для разработки

Нужны Node.js **24 LTS** (24.15+ в ветке 24.x) и npm **11.x**.
`.nvmrc` фиксирует **24.19.0**; проверяемая версия npm — **11.9.0**.

Сначала клонируйте четыре репозитория рядом и установите common:
[полная инструкция](https://github.com/KrimsonKing1337/active-book-common/blob/main/README.md#установка-с-нуля-и-запуск-редактора).
Затем из корня types:

```sh
npm ci
npm run typecheck
npm test
npm run test:bundler
```

Сборка с генерацией JavaScript не нужна. Публичный export указывает непосредственно
на `src/index.d.ts`. Потребитель подключает пакет как обычную локальную devDependency:

```json
{
  "devDependencies": {
    "@active-book/types": "file:../active-book-types"
  }
}
```

React-типы нужны для проверки контракта; runtime React предоставляет приложение-хозяин.
Не добавляйте этот пакет как источник runtime-компонентов.

## Пользовательские компоненты

```tsx
import type { BookComponentProps } from '@active-book/types';

export const CustomTitle = ({ book }: BookComponentProps) => {
  const { P } = book.components;

  return (
    <P>
      Привет!
    </P>
  );
};
```

Хозяин передаёт настоящий объект `book` из [core](https://github.com/KrimsonKing1337/active-book-core/blob/main/README.md).
`BookRuntime` содержит режим `editor`/`reader`, компоненты `P`, `H1`, `H2`,
`hooks.useAudioController(id)` и `hooks.useBackground(effect)`.

`useAudioController` возвращает доступный аудиоэкземпляр и операции `play`, `pause`,
`stop`, `remove`. `useBackground` регистрирует фоновый эффект и возвращает cleanup.
Это React hooks: вызывать их нужно на верхнем уровне компонента с соблюдением Rules of Hooks,
а не из обработчика события. Redux и внутренние контроллеры остаются деталями core.

## Основные контракты

| Файл | Назначение |
| --- | --- |
| `src/index.d.ts` | Точка экспорта, BookRuntime и props пользовательских компонентов |
| `src/content.d.ts` | Поддерживаемая структура документа, текст и узлы содержимого |
| `src/media.d.ts` | Изображения и видео с путями к ресурсам проекта |
| `src/dialog.d.ts` | Контракты отображения медиа в диалогах |
| `src/visual-effects.d.ts` | JSON-описания эффектов, размещение, маски, слои и время жизни |
| `src/visual-renderers.d.ts` | React-renderer, доступные DOM-регионы, необязательный playback API |

`BookVisualRendererProps` добавляет возможности `book` к props визуального renderer
из библиотеки компонентов. Определения/код renderer не сериализуются в данные книги.
Эти типы уже используются текущими core/editor, а не только описывают будущую реализацию.
Они не означают наличие универсального visual registration hook в `BookRuntime`.

Подробнее: [контракт визуальных эффектов](docs/visual-effects.md),
[контракт блочных медиа](docs/media.md). Исполнение, валидация внешних данных и загрузка
библиотек принадлежат core/editor; этот пакет задаёт статическую форму данных.

## Проверки и соглашения

`typecheck` проверяет декларации. `npm test` и `test:unit` проверяют корректные и намеренно
некорректные потребители через NodeNext; `test:bundler` проверяет Bundler resolution.
Тесты не генерируют JavaScript. `exactOptionalPropertyTypes` сохраняет точность optional-полей.
Отдельные ESLint/Stylelint/browser команды для этого declaration-only пакета не настроены.

`tests/` содержит compile-time проверки, `docs/` — описание контрактов.
Общий runner common умеет запускать проверки types вместе с core/editor, включая фильтр `--repo`.
[Соглашения разработки](https://github.com/KrimsonKing1337/active-book-common/blob/main/CODING_CONVENTIONS.md),
[инструкции для агентов](AGENTS.md). При изменении API проверяйте потребителей в обоих соседних репозиториях.

### Декларативное аудио

`AudioEffect` описывает звук в книге. Общий тип `EffectLifetime` используется также
визуальными эффектами. В авторском аудио срок действия на одной странице задан
стабильным ID, а после сборки — её позицией в книге. [Описание полей и примеры](docs/audio-effects.md)
