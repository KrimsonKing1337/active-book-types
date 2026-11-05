import type { VisualEffectInstance, VisualPlacement, VisualPoint } from '@active-book/types';

export type SmokeParams = {
  color: string;
  density: number;
};

export const offset: VisualPoint = {
  x: { value: 0, unit: 'px' },
  y: { value: 0, unit: 'px' },
};

export const placement: VisualPlacement = {
  region: 'narrativeFrame',
  anchor: 'top-right',
  offset,
};

export const smoke: VisualEffectInstance<SmokeParams> = {
  id: 'smoke-1',
  definitionId: 'example/smoke',
  params: { color: '#808080', density: 10 },
  placement,
  depth: { plane: 'aboveNarrative' },
};
