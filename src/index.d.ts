import type {
  ComponentType,
  PropsWithChildren,
  CSSProperties,
} from 'react';

import type { JsonObject } from './visual-effects.js';
import type { VisualRendererProps } from './visual-renderers.js';

export type * from './effect-lifetime.js';
export type * from './audio-effects.js';
export type * from './visual-effects.js';
export type * from './visual-renderers.js';
export type * from './content.js';
export type * from './media.js';
export type * from './dialog.js';

// Minimal public view of a registered audio instance.
// The actual implementation belongs to @active-book/core.
export type BookAudioInstance = {
  readonly id: string;
  playing: () => boolean;
  state: () => string;
};

export type BookAudioController = {
  audio: BookAudioInstance | null;
  play: (withFadeIn?: boolean) => Promise<void> | undefined;
  pause: (withFadeOut?: boolean) => Promise<void> | undefined;
  stop: (withFadeOut?: boolean) => Promise<void> | undefined;
  remove: () => void;
};

export type BookBackgroundEffectImage = {
  id: string;
  src: string;
  style?: CSSProperties;
};

export type BookBackgroundEffectVideo = {
  id: string;
  src: string;
  style?: CSSProperties;
  loop?: boolean;
  autoPlay?: boolean;
  muted?: boolean;
  relativeVolume?: number;
};

export type BookBackgroundEffectShadow = {
  show?: boolean;
  style?: CSSProperties;
};

export type BookBackgroundEffectKind =
  | 'background'
  | 'image'
  | 'video'
  | 'shadow'
  | 'component';

export type BookBackgroundEffect = {
  id: string;
  kind: BookBackgroundEffectKind;
  style?: CSSProperties;
  image?: BookBackgroundEffectImage;
  video?: BookBackgroundEffectVideo;
  shadow?: BookBackgroundEffectShadow;
};

type BookRuntimeMode = 'editor' | 'reader';

type BookRuntimeComponents = {
  P: ComponentType<PropsWithChildren>;
  H1: ComponentType<PropsWithChildren>;
  H2: ComponentType<PropsWithChildren>;
};

type BookRuntimeHooks = {
  useAudioController: (id: string) => BookAudioController;
  useBackground: (effect: BookBackgroundEffect) => () => void;
};

export type BookRuntime = {
  mode: BookRuntimeMode;
  components: BookRuntimeComponents;
  hooks: BookRuntimeHooks;
};

export type BookComponentProps = {
  book: BookRuntime;
};

/** Native visual exports from a TGZ receive the same renderer contract and book capabilities. */
export type BookVisualRendererProps<Params extends JsonObject = JsonObject> = VisualRendererProps<Params> & {
  book: BookRuntime;
};
