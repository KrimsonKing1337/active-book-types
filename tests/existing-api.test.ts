import type { ReactElement } from 'react';

import type {
  BookAudioController,
  BookBackgroundEffect,
  BookComponentProps,
  BookRuntime,
} from '@active-book/types';

// Existing hosts can still supply the current BookRuntime without implementing new hooks.
const audio: BookAudioController = {
  audio: null,
  play: () => undefined,
  pause: () => undefined,
  stop: () => undefined,
  setRelativeVolume: () => {},
  remove: () => {},
};

const book: BookRuntime = {
  mode: 'editor',
  components: {
    P: () => null,
    H1: () => null,
    H2: () => null,
  },
  hooks: {
    useAudioController: () => audio,
    useBackground: () => () => {},
  },
};

const componentProps: BookComponentProps = { book };

const image: BookBackgroundEffect = {
  id: 'background-image',
  kind: 'image',
  image: {
    id: 'image-1',
    src: 'assets/forest.webp',
  },
};

const video: BookBackgroundEffect = {
  id: 'background-video',
  kind: 'video',
  video: {
    id: 'video-1',
    src: 'assets/rain.webm',
    muted: true,
    loop: true,
  },
};

const destroyImage: () => void = book.hooks.useBackground(image);
const destroyVideo: () => void = book.hooks.useBackground(video);

declare const element: ReactElement;

const component: BookBackgroundEffect = {
  id: 'background-component',
  kind: 'component',
  // @ts-expect-error Visual implementations belong to definitions, not hook parameters.
  Component: element,
};
