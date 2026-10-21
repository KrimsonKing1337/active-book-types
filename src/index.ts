import type { ComponentType, PropsWithChildren } from 'react';

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

export type BookRuntime = {
  mode: 'editor' | 'reader';
  components: {
    P: ComponentType<PropsWithChildren>;
    H1: ComponentType<PropsWithChildren>;
    H2: ComponentType<PropsWithChildren>;
  };
  hooks: {
    useAudioController: (id: string) => BookAudioController;
  };
};

export type BookComponentProps = {
  book: BookRuntime;
};
