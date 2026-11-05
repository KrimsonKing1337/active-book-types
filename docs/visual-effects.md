# Visual effects on actual story regions

A definition owns its React renderer and JSON defaults. A registration adds the instance's
region, layer and page/range lifetime. An ordinary renderer fills its surface with CSS;
it does not receive or need a measured table of story geometry.

```ts
const registration: VisualEffectRegistration = {
  effect: {
    id: 'fog',
    definitionId: 'example/fog',
    params: {},
    placement: { region: 'narrativeFrame' },
    depth: { plane: 'aboveNarrative' },
  },
  lifetime: { type: 'range', range: [{ from: 1, to: 2 }, { from: 4, to: 4 }] },
};
```

## Placement and clipping

Regions are `application`, `story`, `storyViewport` (including controls), `narrativeFrame`,
`frame`, `narrativeViewport` and `narrativeContent`. Frame uses the actual NarrativeFrame
and masks its padding bands. Viewport overlays stay fixed; content surfaces scroll with text.

The default is a full-region CSS fill. Optional anchor/origin values use nine standard points:
`top-left`, `top`, `top-right`, `left`, `center`, `right`, `bottom-left`, `bottom`, `bottom-right`.
The origin defaults to the anchor. Offsets and sizes use CSS px or percent values. Optional
`scale` and `rotate` (degrees) use CSS transforms. The surface's position is independent of
the artwork's propagation origin, which belongs to renderer parameters or custom logic.

`visibility` is optional. `sides` selects frame bands; an explicit empty array paints none.
A frame region without sides selects all four. Circle/polygon masks map directly to native
CSS clip-path semantics, including native percentage-radius behavior. The selected real
region and its ancestors provide clipping and rounded corners. There is no independent
visibility region, coordinate resolver or geometric fallback.

Layers are `background`, `belowNarrative`, `aboveNarrative`, `aboveStoryControls`. Integer
`order` defaults to zero; ties are ordered lexically by instance ID. For application,
background is the external underlay and other author layers are the external overlay.
System feedback and editor selection have protected runtime hosts. Editor tools stay outside
the isolated application boundary.

## Renderer lifetime and custom work

`VisualRendererProps` supplies `id`, JSON `params`, permitted `regions` element handles and an
optional React 19 playback ref. `regions` includes all seven region names; `frame` aliases
`narrativeFrame`. Unavailable elements are null. The handles are valid during this activation;
do not retain them after renderer cleanup.

Custom renderers may create CSS, WAAPI, Canvas/WebGL or portals in permitted containers.
They may measure specific elements and use ResizeObserver when required by their artwork.
No global measurement pipeline or animation-state serialization is provided.

`play()` starts/resumes, `pause()` holds and `stop()` cancels/reset playback. Static renderers
may omit playback. Page-only instances unmount at the end of activation. Range instances keep
React, DOM and native Animation identity across active page changes, including disjoint ranges
when an inactive page is not visited. Leaving the active range cancels and unmounts the renderer;
a later activation starts fresh. Destroying the book unmounts its persistent shell and renderers.

BookVisualRendererProps adds the existing BookRuntime capabilities for native library renderers.
Renderer code/resources stay outside serialized registrations. TypeScript constrains JSON shapes;
the host validates finite non-cyclic JSON and the builder validates placement/lifetimes at its boundary.
There are no aliases or migrations for the previous geometry contract.
