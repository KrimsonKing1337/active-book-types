import type {
  VisualEffectInstance,
  VisualMask,
  VisualPlane,
  VisualRegion,
  VisualVisibility,
} from '@active-book/types';

import type { SmokeParams } from './fixtures.js';

import { placement, smoke } from './fixtures.js';

const visibilityRegions: readonly VisualVisibility[] = [
  { region: 'book' },
  { region: 'bookViewport' },
  { region: 'page' },
  { region: 'narrativeViewport' },
  { region: 'narrativeContent' },
  {
    region: 'frame',
    sides: ['top', 'right', 'bottom', 'left'],
  },
];

// Scrolling coordinates do not require clipping to the narrative viewport.
const scrollingEffects: VisualEffectInstance<SmokeParams>[] = visibilityRegions.map((visibility) => {
  return {
    ...smoke,
    placement: {
      ...placement,
      coordinates: 'narrativeContent',
    },
    visibility,
  };
});

const circle: VisualMask = {
  type: 'circle',
  center: placement.offset,
  radius: {
    value: 50,
    unit: '%',
  },
};

const polygon: VisualMask = {
  type: 'polygon',
  points: [placement.offset, placement.offset, placement.offset],
};

const maskedFrame: VisualVisibility = {
  region: 'frame',
  sides: ['left', 'right'],
  mask: circle,
};

const maskedBook: VisualVisibility = {
  region: 'book',
  mask: polygon,
};

const emptyFrame: VisualVisibility = {
  region: 'frame',
  sides: [],
};

// @ts-expect-error Frame visibility must specify its sides.
const missingSides: VisualVisibility = { region: 'frame' };

const invalidSide: VisualVisibility = {
  region: 'frame',
  // @ts-expect-error Only the four frame sides are supported.
  sides: ['diagonal'],
};

// @ts-expect-error Arbitrary DOM targets are outside this contract.
const wordCoordinates: VisualRegion = 'word';

// @ts-expect-error document.body is not the book's visual root.
const bodyCoordinates: VisualRegion = 'body';

// @ts-expect-error System feedback is not an author plane.
const systemPlane: VisualPlane = 'overlay';

const invalidMask: VisualMask = {
  type: 'circle',
  center: placement.offset,
  radius: {
    value: 1,
    // @ts-expect-error Contract lengths use CSS pixels or percentages.
    unit: 'vw',
  },
};

const playerBackground: VisualEffectInstance<SmokeParams> = {
  ...smoke,
  placement: { ...placement, coordinates: 'bookViewport' },
  visibility: { region: 'bookViewport' },
  depth: { plane: 'background', order: 0 },
};
void playerBackground;

// System feedback is a host responsibility and cannot be authored as an effect plane.
// @ts-expect-error system feedback is excluded from VisualPlane
const systemPlane: VisualPlane = 'systemFeedback';
void systemPlane;
