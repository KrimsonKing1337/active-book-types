import type { ReactElement } from 'react';

import type { JsonObject, JsonValue, VisualEffectInstance } from '@active-book/types';

import type { SmokeParams } from './fixtures.js';

import { smoke } from './fixtures.js';

type Assert<Condition extends true> = Condition;

type InstanceKeys = 'id' | 'definitionId' | 'params' | 'placement' | 'visibility' | 'depth';
type ActualKeys = keyof VisualEffectInstance;

type NoExtraFields = Assert<ActualKeys extends InstanceKeys ? true : false>;
type NoMissingFields = Assert<InstanceKeys extends ActualKeys ? true : false>;

const parameters: JsonObject = {
  palette: ['#000000', '#808080'],
  enabled: true,
  optionalTexture: null,
  nested: {
    density: 10,
  },
};

const serialized: JsonValue = parameters;

const invalidParameters: VisualEffectInstance<SmokeParams> = {
  ...smoke,
  params: {
    color: '#000000',
    // @ts-expect-error Definition parameters retain their concrete types.
    density: 'high',
  },
};

const callbackParameters: JsonObject = {
  // @ts-expect-error Runtime callbacks cannot be saved as parameters.
  onPlay: () => {},
};

const undefinedParameters: JsonObject = {
  // @ts-expect-error Undefined is not a JSON value.
  density: undefined,
};

declare const canvas: HTMLCanvasElement;

const resourceParameters: JsonObject = {
  // @ts-expect-error DOM resources belong to runtime, not instance parameters.
  surface: canvas,
};

declare const element: ReactElement;

const componentParameters: JsonObject = {
  // @ts-expect-error React elements are runtime values, not instance parameters.
  element,
};

// @ts-expect-error Parameter types cannot contain runtime functions.
type CallbackInstance = VisualEffectInstance<{ onPlay: () => void }>;

const instanceWithLifetime: VisualEffectInstance<SmokeParams> = {
  ...smoke,
  // @ts-expect-error Lifetime is registered separately from the visual instance.
  lifetime: { type: 'page', page: 1 },
};
