# Common visual effect contract

This stage defines types only. It does not implement registration, layout, playback,
range reconciliation, or runtime validation. Existing `BookRuntime` hooks keep their
current signatures. Hosts will implement the requirements below in subsequent stages.

## Instance and definition

`VisualEffectInstance<Params>` has exactly six fields:

| Field | Meaning |
| --- | --- |
| `id` | Instance ID, unique within the book |
| `definitionId` | Lookup key in the host's definition registry |
| `params` | JSON-compatible parameters specific to the definition |
| `placement` | Coordinates, anchor, origin, offset, and surface size |
| `visibility` | Where the surface is visible and its optional shape mask |
| `depth` | Author plane and order within it |

`VisualEffectDefinition<Params>` connects a definition ID and default parameters to a
React renderer. Definitions, controllers, React elements, DOM nodes, and graphics
resources are runtime values. They are not stored in an instance or Redux data.

Parameter types should be object type aliases compatible with `JsonObject`. Imported
JSON still needs validation against the selected definition. A generic type alone
cannot check whether a string `definitionId` exists or matches the supplied parameters.

## Coordinates and visibility

- `book` is the persistent visual root of the player, including its own controls.
  It excludes editor UI and is not `document.body`.
- `page` is the current page's visual area without book controls.
- `frame` uses the frame's outer rectangle for coordinates and selected side bands
  for visibility. An empty side list displays nothing.
- `narrativeViewport` is the stationary visible scroll area.
- `narrativeContent` is the coordinate space moving with the scrolled content.

Coordinates and visibility are independent. In particular, `narrativeContent`
coordinates can use `book`, `page`, `frame`, `narrativeViewport`, or `narrativeContent`
visibility. The editor may default to `narrativeViewport`; this is not a contract
restriction. Words, characters, CSS selectors, and arbitrary DOM anchors are excluded.

`anchor.point` selects a point in `anchor.region`. The host converts that point into
`coordinates`, aligns the surface's `origin` with it, then applies `offset`.
Offset X and width percentages use the coordinate region's width; offset Y and height
percentages use its height. Pixel lengths are CSS pixels.

Circle and polygon masks use the visibility region's local coordinates. A percentage
circle radius uses the smaller dimension of that region. Shape masks intersect the
selected region and do not change text layout. The final book boundary still applies.
The contract deliberately contains no mask-expression graph or animation engine.

## Depth

From back to front, the host places:

1. Base book fill.
2. `scene`: backgrounds, media, and effects behind narrative.
3. Narrative.
4. `aboveNarrative` effects.
5. Book controls.
6. `aboveControls` effects.
7. Host-owned system feedback.

`depth.order` is an integer within the author plane. Equal values are ordered by
instance ID in ascending string order. System feedback is not an author plane.

Stable React identity is required during navigation while a range effect stays
active. Placement and mask updates should normally preserve it. If manual plane
switching cannot preserve identity without substantial machinery, document that
limitation before implementing a workaround.

## Existence and playback

`VisualEffectRegistration` combines one instance with a `VisualEffectLifetime`.
Page context can supply page lifetime without saving the page number twice.
Range lifetime refers to the same instance shape, without copying its visual fields.

`PageRange` retains inclusive numeric positions `{ from, to }` in the current book
order. Inserting, deleting, or reordering pages must not automatically shift, clamp,
or remap authored ranges. The author owns their meaning; the host only validates them.

Required behavior for the future host:

| Event | Behavior |
| --- | --- |
| Enter an active page/range | Create an instance in its initial state |
| Navigate between active pages | Preserve the instance and its state |
| Leave the range | Destroy the instance and release resources |
| Re-enter the range | Create a new instance, starting from the beginning |
| `play` | Start or resume |
| `pause` | Preserve playback position |
| `stop` | Stop and reset playback position |
| `destroy` | Remove the instance and release resources; repeated calls are harmless |
| Hide in the editor | Change preview visibility without implicitly stopping playback |

Only pages actually visited affect activation. A direct jump between two active
pages preserves the instance, including when they belong to separate listed ranges.

Playback is optional. A static renderer can omit playback entirely; destruction is
part of the host's common lifecycle. `VisualRendererProps.ref` is an ordinary React 19
prop for renderers exposing playback. `geometry` contains surface dimensions in CSS
pixels and does not expose application DOM references. Resources are cleaned up by
the renderer on unmount, including pending asynchronous work.

## Validation boundary

TypeScript checks data shapes, JSON-compatible parameter types, known regions,
supported masks, and playback method signatures. Future runtime validation must
check finite lengths, nonnegative sizes/radii, valid polygons, integer layer order,
unique IDs, known definitions, and definition-specific parameters. Page/range data
also requires valid integer page positions, ordered bounds, and the current book's
page limits. Validation reports invalid data without silently editing authored ranges.

These constraints do not introduce shared simulations, synchronization, multipass
rendering, dependency graphs, narrative layout manipulation, or composition editing.

Stage 5 adds `bookViewport`, the inner visible player area containing its page and
controls (inside the persistent `book` root). Built-in backgrounds use it to
preserve the existing image/video fit when the player is narrower than the book
root. `page` still excludes the player's controls.

The author plane order is `background`, `scene`, `aboveNarrative`, `aboveControls`.
A separate host-owned feedback layer remains outside `VisualPlane`, so flashlight
and vibration feedback cannot be covered by an authored effect with a large order.


## Native package visual exports (stage 6)

A TGZ visual export receives `BookVisualRendererProps<Params>`: the ordinary
`VisualRendererProps` plus the host's `book: BookRuntime`. It may expose playback
through the React 19 `ref` prop. Allocate and release instance resources in the
renderer; exports and controllers never enter authored descriptions.

The existing manifest has separate `components` (inline text insertions) and
`visualEffects` (native definitions) sections. A visual entry includes `category`
(`background` or `frame`), `entry`, `export`, `title`, optional `styles`, and JSON
`defaultParams`. JSON instances use `custom.background/<package>/<name>` or
`custom.frame/<package>/<name>`. `params.custom` carries custom data and optional
`params.componentKey` selects nested React identity. Equal data does not update a
registration; a changed key remounts the nested export while preserving its owning
registration. Ordinary CSS backgrounds can still use `book.hooks.useBackground`;
the old ReactNode `Component` parameter has been removed.
