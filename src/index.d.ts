import type { ComponentType, PropsWithChildren, ReactNode, CSSProperties } from 'react';

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

export type BookBackgroundEffect = {
  id: string;
  style?: CSSProperties;
  images?: Array<{ src: string; style?: CSSProperties }>;
  videos?: Array<{
    id: string;
    src: string;
    style?: CSSProperties;
    loop?: boolean;
    autoPlay?: boolean;
    muted?: boolean;
    relativeVolume?: number;
  }>;
  shadow?: { show?: boolean; style?: CSSProperties };
  Component?: ReactNode;
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
