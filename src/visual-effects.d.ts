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

/** Book excludes the editor; page excludes the book's controls. */
export type VisualRegion =
  | 'book'
  | 'page'
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

/** Percentages use coordinates' width for X/width and height for Y/height. */
export type VisualPlacement = {
  coordinates: VisualRegion;
  anchor: {
    region: VisualRegion;
    point: AnchorPoint;
  };
  origin: AnchorPoint;
  offset: VisualPoint;
  size: VisualSize;
};

/** Shape coordinates use the visibility region; percentage radius uses its smaller dimension. */
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

/** Independent of placement, including when coordinates are narrativeContent. */
export type VisualVisibility =
  | {
      region: Exclude<VisualRegion, 'frame'>;
      mask?: VisualMask;
    }
  | {
      region: 'frame';
      sides: readonly FrameSide[];
      mask?: VisualMask;
    };

/** Author planes, from back to front. System feedback is host-owned and excluded. */
export type VisualPlane =
  | 'scene'
  | 'aboveNarrative'
  | 'aboveControls';

export type VisualDepth = {
  plane: VisualPlane;
  /** Integer order within the plane; equal values are ordered by instance ID. */
  order: number;
};

export type VisualEffectInstance<Params extends JsonObject = JsonObject> = {
  id: string;
  definitionId: string;
  params: Params;
  placement: VisualPlacement;
  visibility: VisualVisibility;
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
