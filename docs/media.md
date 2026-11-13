# Block media

`image` and `video` are atomic content nodes, permitted at document root and in
carouselSlide alongside paragraph/heading/coreComponent. They cannot contain
children or appear inside paragraph/heading. Inline media, floats, captions and
click-to-open galleries are outside this contract.

Both require `attrs.src`: a canonical project file path under `assets/`, with
neither leading slash nor `./`. Runtime validation rejects traversal, backslashes,
empty segments, URLs (including blob/data) and control characters. Paths describe
file names, not already URL-encoded values; the renderer encodes path segments
when creating a reader URL. Files are not embedded in the document.

Dimensions reuse `VisualLength`. Width accepts positive pixels or percentages
(0 < value <= 100 for `%`), defaulting to 100% of the content area. Height accepts
positive pixels; omission/null means automatic intrinsic aspect ratio. Percent
height is deliberately unsupported because normal block flow has no definite
parent height. Width is constrained to the available container by CSS. No image
measurements or viewport units are needed.

`align` is left (default), center or right. `fit` is contain (default) or cover;
it affects the visible content when an explicit height defines a media box.
These are author settings. A media-mode StoryDialog can override presentation
through its existing CSS context without modifying the saved attributes.

Image `alt` defaults to the empty string. Video defaults are controls=true,
autoPlay=false, muted=true, loop=false. Optional `poster` is another project asset
path; omission/null means no authored poster. Video lifecycle and native controls
belong to Core Video, not this declaration package.
