/** Inclusive page positions in the current book order. */
export type PageRange = {
  from: number;
  to: number;
};

/** Use a stable page ID in authored data and a 1-based position for playback. */
export type EffectLifetime<Page extends string | number = number> =
  | {
      type: 'page';
      page: Page;
    }
  | {
      type: 'range';
      range: readonly PageRange[];
    };
