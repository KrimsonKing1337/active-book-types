import type { VisualEffectInstance, VisualPlacement } from '@active-book/types';

export type SmokeParams = {
  color: string;
  density: number;
};

export const placement: VisualPlacement = {
  coordinates: 'page',
  anchor: {
    region: 'frame',
    point: 'top-right',
  },
  origin: 'top-right',
  offset: {
    x: {
      value: 0,
      unit: 'px',
    },
    y: {
      value: 0,
      unit: 'px',
    },
  },
  size: {
    width: {
      value: 100,
      unit: '%',
    },
    height: {
      value: 100,
      unit: '%',
    },
  },
};

export const smoke: VisualEffectInstance<SmokeParams> = {
  id: 'smoke-1',
  definitionId: 'example/smoke',
  params: {
    color: '#808080',
    density: 10,
  },
  placement,
  visibility: {
    region: 'book',
  },
  depth: {
    plane: 'aboveNarrative',
    order: 1,
  },
};
