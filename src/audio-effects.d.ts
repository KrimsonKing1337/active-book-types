import type { EffectLifetime } from './effect-lifetime.js';

export type AudioCategory = 'bg' | 'music' | 'sfx';

/** Serializable audio description. Compiled books resolve page IDs to positions. */
export type AudioEffect<Page extends string | number = string> = {
  id: string;
  src: string;
  lifetime: EffectLifetime<Page>;
  type?: AudioCategory;
  /** Relative volume from 0 to 200 percent. Defaults to 100. */
  relativeVolume?: number;
  loop?: boolean;
  playOnLoad?: boolean;
  delay?: number;
  stopBy?: number;
  fadeIn?: boolean;
  fadeOut?: boolean;
  waitTillTheEnd?: boolean;
  format?: readonly string[];
};
