import type { ComponentType, Ref } from 'react';

import type { JsonObject } from './visual-effects.js';

/** Optional renderer capability; play resumes, pause preserves position, stop resets it. */
export type VisualPlayback = {
  play: () => void | Promise<void>;
  pause: () => void;
  stop: () => void;
};

/** Resolved surface dimensions in CSS pixels, without application DOM references. */
export type VisualGeometry = {
  width: number;
  height: number;
};

export type VisualRendererProps<Params extends JsonObject = JsonObject> = {
  id: string;
  params: Params;
  geometry: VisualGeometry;
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
