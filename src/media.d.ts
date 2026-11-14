import type { VisualLength } from './visual-effects.js';

export type BookMediaAlignment = 'left' | 'center' | 'right';
export type BookMediaFit = 'contain' | 'cover';

type BookMediaAttributesHeight = VisualLength & {
  unit: 'px';
};

export type BookMediaAttributes = {
  /** Canonical project file path inside assets/, never a URL or encoded file contents. */
  src: string;
  /** Defaults to 100% of the containing block. Null also selects the default. */
  width?: VisualLength | null;
  /** Pixel height; omission/null preserves the intrinsic aspect ratio. */
  height?: BookMediaAttributesHeight | null;
  align?: BookMediaAlignment;
  /** Author setting, independent of the reader's Dialog preference. Defaults to contain. */
  fit?: BookMediaFit;
};

export type BookImageAttributes = BookMediaAttributes & {
  alt?: string;
};

export type BookVideoAttributes = BookMediaAttributes & {
  poster?: string | null;
  /** Defaults: controls=true, autoPlay=false, muted=true, loop=false. */
  controls?: boolean;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
};

export type BookImageNode = {
  type: 'image';
  attrs: BookImageAttributes;
  content?: never;
};

export type BookVideoNode = {
  type: 'video';
  attrs: BookVideoAttributes;
  content?: never;
};
