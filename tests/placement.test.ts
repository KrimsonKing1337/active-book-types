import type {
  AnchorPoint, VisualEffectInstance, VisualMask, VisualPlane, VisualPlacement, VisualRegion, VisualVisibility,
} from '@active-book/types';

import { offset, smoke } from './fixtures.js';

const regions: VisualRegion[] = [
  'application', 'story', 'storyViewport', 'narrativeFrame', 'storyViewportFrame', 'toolbar', 'toolbarFrame', 'narrativeViewport', 'narrativeContent',
];
const anchors: AnchorPoint[] = [
  'top-left', 'top', 'top-right', 'left', 'center', 'right', 'bottom-left', 'bottom', 'bottom-right',
];
const surfaces: VisualPlacement[] = regions.map((region) => ({ region }));
const anchored: VisualPlacement[] = anchors.map((anchor) => ({
  region: 'storyViewport', anchor, offset, scale: 0.8, rotate: 30,
}));
const plain: VisualEffectInstance = {
  id: 'plain', definitionId: 'example/plain', params: {},
  placement: { region: 'narrativeContent' }, depth: { plane: 'background' },
};

const circle: VisualMask = { type: 'circle', center: offset, radius: { value: 50, unit: '%' } };
const polygon: VisualMask = { type: 'polygon', points: [offset, offset, offset] };
const visibility: VisualVisibility[] = [{}, { sides: ['left', 'right'] }, { sides: [] }, { mask: circle }, { mask: polygon }];
const controlsPlane: VisualPlane = 'aboveStoryControls';

const invalidPlacement: VisualPlacement = {
  region: 'story',
  // @ts-expect-error Standard anchors are local points, not a second region/coordinate model.
  anchor: { region: 'narrativeFrame', point: 'center' },
};
const invalidVisibility: VisualVisibility = {
  // @ts-expect-error Clipping belongs to the selected real DOM region.
  region: 'storyViewport',
};
const oldPlacement: VisualPlacement = {
  // @ts-expect-error coordinates was removed rather than retained as a legacy alias.
  coordinates: 'story',
};
const invalidSide: VisualVisibility = {
  // @ts-expect-error Only the four actual frame sides are supported.
  sides: ['diagonal'],
};
// @ts-expect-error Arbitrary body targets remain outside the standard contract.
const body: VisualRegion = 'body';
// @ts-expect-error System feedback is runtime-owned.
const feedback: VisualPlane = 'systemFeedback';
// @ts-expect-error The old plane name is not a compatibility alias.
const oldControls: VisualPlane = 'aboveControls';
// @ts-expect-error Renderer resources are not serializable parameters.
const callback: VisualEffectInstance = { ...smoke, params: { callback: () => {} } };
void [surfaces, anchored, plain, visibility, controlsPlane, invalidPlacement, invalidVisibility, oldPlacement, invalidSide, body, feedback, oldControls, callback];

// @ts-expect-error the ambiguous frame alias is not part of the final contract
const removedFrame: VisualRegion = 'frame';
void removedFrame;
