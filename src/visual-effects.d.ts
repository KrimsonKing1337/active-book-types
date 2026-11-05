/** Serializable parameters. Finite numbers and definition-specific values require runtime validation. */
export type JsonValue =
  | null
  | boolean
  | number
  | string
  | readonly JsonValue[]
  | JsonObject;

export type JsonObject = {
  readonly [key: string]: JsonValue;
};

/**
 * Story is the instance container and excludes editor UI.
 * storyViewport includes controls; narrativeFrame excludes them.
 */
export type VisualRegion =
  | 'application'
  | 'story'
  | 'storyViewport'
  | 'narrativeFrame'
  | 'frame'
  | 'narrativeViewport'
  | 'narrativeContent';

export type FrameSide = 'top' | 'right' | 'bottom' | 'left';

export type AnchorPoint =
  | 'top-left'
  | 'top'
  | 'top-right'
  | 'left'
  | 'center'
  | 'right'
  | 'bottom-left'
  | 'bottom'
  | 'bottom-right';

export type VisualLength = {
  value: number;
  unit: 'px' | '%';
};

export type VisualPoint = {
  x: VisualLength;
  y: VisualLength;
};

export type VisualSize = {
  width: VisualLength;
  height: VisualLength;
};

/** Native CSS placement in one real DOM region; omitted options fill that region. */
export type VisualPlacement = {
  region: VisualRegion;
  anchor?: AnchorPoint;
  origin?: AnchorPoint;
  offset?: VisualPoint;
  size?: VisualSize;
  scale?: number;
  rotate?: number;
};

/** Values map directly to native CSS clip-path circle()/polygon() semantics. */
export type VisualMask =
  | {
      type: 'circle';
      center: VisualPoint;
      radius: VisualLength;
    }
  | {
      type: 'polygon';
      points: readonly VisualPoint[];
    };

/** Masks apply to the selected placement region; frame defaults to its four padding bands. */
export type VisualVisibility = {
  sides?: readonly FrameSide[];
  mask?: VisualMask;
};

/** Background precedes belowNarrative; system feedback is host-owned and excluded. */
export type VisualPlane =
  | 'background'
  | 'belowNarrative'
  | 'aboveNarrative'
  | 'aboveStoryControls';

export type VisualDepth = {
  plane: VisualPlane;
  /** Integer order within the plane; equal values are ordered by instance ID. */
  order?: number;
};

export type VisualEffectInstance<Params extends JsonObject = JsonObject> = {
  id: string;
  definitionId: string;
  params: Params;
  placement: VisualPlacement;
  visibility?: VisualVisibility;
  depth: VisualDepth;
};

/** Inclusive page positions in the current book order; never adjusted automatically. */
export type PageRange = {
  from: number;
  to: number;
};

export type VisualEffectLifetime =
  | {
      type: 'page';
      page: number;
    }
  | {
      type: 'range';
      range: readonly PageRange[];
    };

/** Activation input. Lifetime does not duplicate the instance's visual parameters. */
export type VisualEffectRegistration<Params extends JsonObject = JsonObject> = {
  effect: VisualEffectInstance<Params>;
  lifetime: VisualEffectLifetime;
};
