# @active-book/types

Public **TypeScript-only** contract for custom components loaded by Active Book.
The package exports declarations from `src/index.d.ts`, contains no runtime JavaScript,
and does **not** bundle React or Active Book Core.

## Usage

Clone next to the custom-component repository (both repos checked out as siblings)
and install its development types:

```sh
cd ../active-book-types
npm ci
```

Then add to the custom-component repository:

```json
{
  "devDependencies": {
    "@active-book/types": "file:../active-book-types"
  }
}
```

Then import **only types**:

```tsx
import type { BookComponentProps } from '@active-book/types';

export const CustomTitle = ({ book }: BookComponentProps) => {
  const { P } = book.components;

  return <P>Привет!</P>;
};
```

The host passes the real `book` object to every custom component when rendering the book's JSON.
The `BookRuntime` interface currently includes `P`, `H1`, `H2`, `mode` and
`hooks.useAudioController(id)` and `hooks.useBackground(effect)`.

`useAudioController` is an actual hook from Active Book Core. It reads audio instances from
Redux `audioEffectsSelectors.audioInstances` (`state.audioEffects.audioInstances`) and exposes
`audio`, `play`, `pause`, `stop` and `remove`. Follow the Rules of Hooks when calling it.

This is an experimental contract; coordinate changes to this package with
`active-book-editor` and `active-book-custom-test`. The package is intentionally private until
the public API has stabilized.

Background effects are registered through `book.hooks.useBackground({ id, kind, image, video, shadow, style })`.
The hook manages registration in the host and returns a cleanup callback. Call it at the top level of a
React component; do not invoke it from an event handler. The host keeps the Redux implementation private.

## Common visual effect contract

The package also exports `VisualEffectInstance`, placement, visibility, masks, depth,
page/range lifetimes, and React renderer types. See [the contract](docs/visual-effects.md)
for the data model and lifecycle requirements.

These are declarations for the next implementation stages. They do not add a visual
registration hook to `BookRuntime` or change the current Background/Frame runtime.

## Checks

```sh
npm ci
npm run typecheck
npm test
npm run test:bundler
```

The tests compile valid and intentionally invalid consumers of the public package
exports. They emit no JavaScript. Both NodeNext and Bundler resolution are checked.
