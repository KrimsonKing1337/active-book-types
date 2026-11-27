import type {
  PageRange,
  EffectLifetime,
  VisualEffectRegistration,
} from '@active-book/types';

import type { SmokeParams } from './fixtures.js';

import { smoke } from './fixtures.js';

const range: readonly PageRange[] = [
  {
    from: 3,
    to: 5,
  },
  {
    from: 8,
    to: 10,
  },
];

const pageRegistration: VisualEffectRegistration<SmokeParams> = {
  effect: smoke,
  lifetime: {
    type: 'page',
    page: 3,
  },
};

const rangeRegistration: VisualEffectRegistration<SmokeParams> = {
  effect: smoke,
  lifetime: {
    type: 'range',
    range,
  },
};

const invalidRange: PageRange = {
  // @ts-expect-error Ranges address numeric positions, not persistent page IDs.
  from: 'chapter-3',
  to: 5,
};

// @ts-expect-error A range lifetime requires ranges.
const missingRange: EffectLifetime = { type: 'range' };

const copiedParameters: EffectLifetime = {
  type: 'range',
  range,
  // @ts-expect-error Lifetime must not duplicate the instance's visual parameters.
  params: smoke.params,
};
