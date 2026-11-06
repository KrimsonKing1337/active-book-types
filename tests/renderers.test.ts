import type { ComponentType, Ref } from 'react';

import type {
  BookVisualRendererProps,
  VisualEffectController,
  VisualEffectDefinition,
  VisualPlayback,
  VisualRendererProps,
  VisualRegionElements,
} from '@active-book/types';

import type { SmokeParams } from './fixtures.js';

import { smoke } from './fixtures.js';

declare const Renderer: ComponentType<VisualRendererProps<SmokeParams>>;

const playbackRef: Ref<VisualPlayback> = (controller) => {
  controller?.pause();

  return () => {};
};

const definition: VisualEffectDefinition<SmokeParams> = {
  id: smoke.definitionId,
  defaultParams: smoke.params,
  Renderer,
};

const regions: VisualRegionElements = {
  application: null,
  story: null,
  storyViewport: null,
  narrativeFrame: null,
  storyViewportFrame: null,
  toolbar: null,
  toolbarFrame: null,
  narrativeViewport: null,
  narrativeContent: null,
};

const rendererProps: VisualRendererProps<SmokeParams> = {
  id: smoke.id,
  params: smoke.params,
  regions,
  ref: playbackRef,
};

const staticProps: VisualRendererProps<SmokeParams> = {
  id: smoke.id,
  params: smoke.params,
  regions,
};

const staticController: VisualEffectController = {
  destroy: () => {},
};

const playback: VisualPlayback = {
  play: async () => {},
  pause: () => {},
  stop: () => {},
};

const animatedController: VisualEffectController = {
  destroy: () => {},
  playback,
};

// @ts-expect-error Destruction is required even when playback is unsupported.
const incompleteController: VisualEffectController = {};

// @ts-expect-error A playback capability must implement play, pause and stop.
const incompletePlayback: VisualPlayback = { play: () => {} };

declare const WrongRenderer: ComponentType<VisualRendererProps<{ enabled: boolean }>>;

const mismatchedDefinition: VisualEffectDefinition<SmokeParams> = {
  id: smoke.definitionId,
  defaultParams: smoke.params,
  // @ts-expect-error Renderer and default parameters must share a parameter type.
  Renderer: WrongRenderer,
};


declare const native: BookVisualRendererProps<SmokeParams>;
const nativeParams: SmokeParams = native.params;
const nativeMode: 'editor' | 'reader' = native.book.mode;
const nativeRef: Ref<VisualPlayback> | undefined = native.ref;
// @ts-expect-error Native visual parameters are JSON; callback resources stay in the renderer.
const badNativeParams: SmokeParams = { callback: () => {} };

const narrativeElement: HTMLElement | null = native.regions.narrativeFrame;
// @ts-expect-error Region references are read-only to renderer consumers.
native.regions.story = null;
const oldRendererProps: VisualRendererProps<SmokeParams> = {
  ...rendererProps,
  // @ts-expect-error Ordinary renderers no longer receive mandatory measured dimensions.
  geometry: { width: 800, height: 600 },
};
void [narrativeElement, oldRendererProps];
