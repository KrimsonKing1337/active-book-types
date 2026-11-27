import type { EffectLifetime } from './effect-lifetime.js';

export type AudioCategory = 'bg' | 'music' | 'sfx';

/** Serializable audio description. Compiled books resolve page IDs to positions. */
export type AudioEffect<Page extends string | number = string> = {
  id: string;
  src: string;
  lifetime: EffectLifetime<Page>;
  type?: AudioCategory;
  relativeVolume?: number;
  loop?: boolean;
  playOnLoad?: boolean;
  delay?: number;
  stopBy?: number;
  fadeIn?: boolean;
  fadeOut?: boolean;
  waitTillTheEnd?: boolean;
  screamer?: boolean;
  format?: readonly string[];
};
