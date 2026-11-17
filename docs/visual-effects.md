# Визуальные эффекты на DOM-регионах книги

Определение (`definition`) владеет React-renderer и начальными JSON-параметрами.
Регистрация добавляет экземпляру регион, слой и время жизни страницы/диапазона.
Обычный renderer заполняет поверхность средствами CSS; таблица измеренной геометрии
книги ему не передаётся и не требуется.

```ts
const registration: VisualEffectRegistration = {
  effect: {
    id: 'fog',
    definitionId: 'example/fog',
    params: {},
    placement: { region: 'narrativeFrame' },
    depth: { plane: 'aboveNarrative' },
  },
  lifetime: {
    type: 'range',
    range: [{ from: 1, to: 2 }, { from: 4, to: 4 }],
  },
};
```

## Размещение и clipping

Девять регионов соответствуют реальным прямоугольным контейнерам: `application`,
`story`, `storyViewport`, `storyViewportFrame`, `narrativeFrame`, `narrativeViewport`,
`narrativeContent`, `toolbar`, `toolbarFrame`. `storyViewportFrame` включает весь viewport
с Toolbar; `toolbarFrame` включает layout padding, а `toolbar` — сами элементы управления.
Viewport overlays остаются неподвижными; поверхности содержимого прокручиваются с текстом.
Псевдонима `frame` нет.

По умолчанию поверхность заполняет регион через CSS. Необязательные anchor/origin
используют девять точек: `top-left`, `top`, `top-right`, `left`, `center`, `right`,
`bottom-left`, `bottom`, `bottom-right`. Origin по умолчанию совпадает с anchor.
Смещения и размеры задаются в px или %. `scale` и `rotate` (градусы) используют CSS transforms.
Позиция поверхности независима от художественной точки распространения эффекта:
её задают параметры renderer или его собственная логика.

`visibility` необязателен. `sides` выбирает полосы рамки; пустой массив не рисует ни одной.
Без `sides` любой регион заполняет весь свой прямоугольник, включая имена с окончанием Frame.
`frameWidth?: VisualFrameWidth` принимает одну `VisualLength` для всех сторон либо объект
с независимыми `top`, `right`, `bottom`, `left` в px/%. По умолчанию — 12px на сторону.
Это не меняет отступы текста или Toolbar. Регион, mask, plane и order независимы.
Круглые/полигональные маски следуют native CSS clip-path, включая процентный радиус.
Clipping и скругления задают выбранный DOM-регион и его предки; отдельного visibility region,
общего coordinate resolver или геометрического fallback нет.

Слои: `background`, `belowNarrative`, `aboveNarrative`, `aboveStoryControls`.
Целый `order` по умолчанию равен нулю; равные значения упорядочиваются лексически по ID.
Для application background является внешней подложкой, остальные авторские слои —
внешним overlay. Системные уведомления и выделение редактора имеют защищённые hosts;
инструменты редактора находятся вне изолированной границы приложения.

## Жизненный цикл renderer

`VisualRendererProps` содержит `id`, JSON `params`, разрешённые DOM-элементы `regions`
и необязательный playback ref React 19. В `regions` есть все девять имён, отсутствующие
элементы равны null. Ссылки действительны в текущей активации; не сохраняйте их после cleanup.

Renderer может использовать CSS, WAAPI, Canvas/WebGL и portals в разрешённых контейнерах,
измерять нужные ему элементы и применять ResizeObserver. Общей подсистемы измерений
или сериализации состояния анимации контракт не предоставляет.

`play()` запускает/продолжает, `pause()` удерживает позицию, `stop()` отменяет/сбрасывает
воспроизведение. Статический renderer может не предоставлять playback.
Page-экземпляры размонтируются в конце активации. Range-экземпляры сохраняют React,
DOM и native Animation identity между активными страницами, в том числе разрывными
диапазонами, если не посещена неактивная страница. Выход из диапазона отменяет и
размонтирует renderer; следующая активация начинается заново. Уничтожение книги
размонтирует её постоянную оболочку и renderers.

`BookVisualRendererProps` добавляет возможности BookRuntime для native renderer библиотеки.
Код и ресурсы renderer не сериализуются в регистрации. TypeScript ограничивает форму JSON;
host проверяет конечный нециклический JSON, а builder — placement и lifetimes на своей границе.
Псевдонимы и миграции предыдущего геометрического контракта не предоставляются.
