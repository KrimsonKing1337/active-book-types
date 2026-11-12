/** Authored dimensions are numbers in (0, 100], relative to the story viewport, not the browser window. */
export type BookDialogOptions = {
  /** Defaults to 75. Fullscreen does not overwrite this value. */
  width?: number;
  /** Defaults to 75. Fullscreen does not overwrite this value. */
  height?: number;
  canClose?: boolean;
};

/** Runtime presentation derived from active content; not an author setting. */
export type BookDialogMode = 'default' | 'media';

export type BookDialogObjectFit = 'contain' | 'cover';

/** Reader-wide preferences, stored independently of authored dialog options. */
export type BookDialogPreferences = {
  isFullscreen: boolean;
  objectFit: BookDialogObjectFit;
};
