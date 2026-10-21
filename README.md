# @active-book/types

Public **TypeScript-only** contract for custom components loaded by Active Book.
The package contains no runtime JavaScript and does **not** bundle React or Active Book Core.

## Usage

Install next to the custom-component repository (both repos checked out as siblings):

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
`hooks.useAudioController(id)`.

`useAudioController` is an actual hook from Active Book Core. It reads audio instances from
Redux `audioEffectsSelectors.audioInstances` (`state.audioEffects.audioInstances`) and exposes
`audio`, `play`, `pause`, `stop` and `remove`. Follow the Rules of Hooks when calling it.

This is an experimental contract; coordinate changes to this package with
`activeBook-editor` and `activeBook-custom-test`. The package is intentionally private until
the public API has stabilized.
