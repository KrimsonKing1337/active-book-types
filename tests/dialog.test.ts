import type {
  BookDialogMode,
  BookDialogOptions,
  BookDialogPreferences,
} from '@active-book/types';

const defaults: BookDialogOptions = {};
const authored: BookDialogOptions = {
  width: 75,
  height: 60.5,
  canClose: false,
};
const presentation: BookDialogMode = 'media';
const preferences: BookDialogPreferences = {
  isFullscreen: true,
  objectFit: 'cover',
};

const cssWidth: BookDialogOptions = {
  // @ts-expect-error CSS units do not belong in authored data.
  width: '75vw',
};
// @ts-expect-error Present options must have a value under exactOptionalPropertyTypes.
const explicitUndefined: BookDialogOptions = {
  width: undefined,
};
const authoredMode: BookDialogOptions = {
  // @ts-expect-error Presentation is inferred, not authored.
  mode: 'media',
};
const invalidPreferences: BookDialogPreferences = {
  isFullscreen: false,
  // @ts-expect-error Only contain and cover are supported.
  objectFit: 'fill',
};

void [defaults, authored, presentation, preferences, cssWidth, explicitUndefined, authoredMode, invalidPreferences];
