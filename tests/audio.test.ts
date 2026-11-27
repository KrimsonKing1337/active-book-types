import type { AudioEffect, EffectLifetime } from '@active-book/types';

const pageAudio = {
  id: 'door',
  src: 'assets/audio/door.wav',
  lifetime: { type: 'page', page: 'entrance' },
  playOnLoad: true,
} satisfies AudioEffect;

const range: EffectLifetime = { type: 'range', range: [{ from: 1, to: 5 }] };

const runtimeAudio: AudioEffect<number> = { ...pageAudio, lifetime: range };

// @ts-expect-error Compiled effects address a page by position.
const unresolved: AudioEffect<number> = pageAudio;

const withCallback: AudioEffect = {
  ...pageAudio,
  // @ts-expect-error Serialized effects do not carry runtime callbacks.
  onPlay: () => {},
};
