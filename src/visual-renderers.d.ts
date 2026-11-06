import type { ComponentType, Ref } from 'react';

import type { JsonObject, VisualRegion } from './visual-effects.js';

/** Optional renderer capability; play resumes, pause preserves position, stop resets it. */
export type VisualPlayback = {
  play: () => void | Promise<void>;
  pause: () => void;
  stop: () => void;
};

/** Actual permitted rectangular DOM containers; absent regions are null. */
export type VisualRegionElements = Readonly<Record<VisualRegion, HTMLElement | null>>;

export type VisualRendererProps<Params extends JsonObject = JsonObject> = {
  id: string;
  params: Params;
  regions: VisualRegionElements;
  /** React 19 ref prop. Static renderers do not have to expose playback. */
  ref?: Ref<VisualPlayback>;
};

/** Runtime definition; Renderer and its resources are not serialized with instances. */
export type VisualEffectDefinition<Params extends JsonObject = JsonObject> = {
  id: string;
  defaultParams: Params;
  Renderer: ComponentType<VisualRendererProps<Params>>;
};

export type VisualEffectController = {
  /** Host lifecycle operation, independent of playback. Repeated destruction is harmless. */
  destroy: () => void;
  playback?: VisualPlayback;
};
