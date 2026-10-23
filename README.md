# @active-book/types

Public **TypeScript-only** contract for custom components loaded by Active Book.
The package consists of `src/index.d.ts` and contains no runtime JavaScript and does **not** bundle React or Active Book Core.

## Usage

Clone next to the custom-component repository (both repos checked out as siblings) and install its development types:\n\n```sh\ncd ../activeBook-types\nnpm install\n```\n\nThen add to the custom-component repository:

```json
{
  "devDependencies": {
    "@active-book/types": "file:../activeBook-types"
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
`activeBook-editor` and `activeBook-custom-test`. The package is intentionally private until
the public API has stabilized.

Background effects are registered through `book.hooks.useBackground({ id, images, videos, shadow, style })`.
The hook manages registration in the host and returns a cleanup callback. Call it at the top level of a
React component; do not invoke it from an event handler. The host keeps the Redux implementation private.
