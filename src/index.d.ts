import type { JsonObject } from './visual-effects.js';
import type { VisualRendererProps } from './visual-renderers.js';

import type { ComponentType, PropsWithChildren, CSSProperties } from 'react';

export type {
  JsonValue,
  JsonObject,
  VisualRegion,
  FrameSide,
  AnchorPoint,
  VisualLength,
  VisualPoint,
  VisualSize,
  VisualPlacement,
  VisualMask,
  VisualVisibility,
  VisualPlane,
  VisualDepth,
  VisualEffectInstance,
  PageRange,
  VisualEffectLifetime,
  VisualEffectRegistration,
} from './visual-effects.js';

export type {
  VisualPlayback,
  VisualGeometry,
  VisualRendererProps,
  VisualEffectDefinition,
  VisualEffectController,
} from './visual-renderers.js';

// Minimal public view of a registered audio instance.
// The actual implementation belongs to activeBook-core.
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

export type BookRuntime = {
  mode: 'editor' | 'reader';
  components: {
    P: ComponentType<PropsWithChildren>;
    H1: ComponentType<PropsWithChildren>;
    H2: ComponentType<PropsWithChildren>;
  };
  hooks: {
    useAudioController: (id: string) => BookAudioController;
    useBackground: (effect: BookBackgroundEffect) => () => void;
  };
};

export type BookComponentProps = {
  book: BookRuntime;
};

/** Native visual exports from a TGZ receive the same renderer contract and book capabilities. */
export type BookVisualRendererProps<Params extends JsonObject = JsonObject> = VisualRendererProps<Params> & {
  book: BookRuntime;
};
