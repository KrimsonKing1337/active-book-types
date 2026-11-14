import type {
  BookContentDocument,
  BookImageNode,
  BookParagraphNode,
  BookVideoNode,
} from '@active-book/types';

const image: BookImageNode = {
  type: 'image',
  attrs: {
    src: 'assets/portrait.webp',
    alt: 'Portrait',
    width: { value: 60, unit: '%' },
    height: { value: 320, unit: 'px' },
    align: 'center',
    fit: 'cover',
  },
};
const video: BookVideoNode = {
  type: 'video',
  attrs: {
    src: 'assets/movie.webm',
    poster: 'assets/poster.png',
    width: null,
    height: null,
    controls: true,
    autoPlay: false,
    muted: true,
    loop: false,
  },
};
const document: BookContentDocument = {
  type: 'doc',
  content: [
    image,
    video,
    {
      type: 'carousel',
      content: [{ type: 'carouselSlide', content: [image, video] }],
    },
  ],
};
const inline: BookParagraphNode = {
  type: 'paragraph',
  // @ts-expect-error Media is not inline content.
  content: [image],
};
const children: BookImageNode = {
  ...image,
  // @ts-expect-error Media nodes are atomic, including an empty content array.
  content: [],
};
const missingSource: BookVideoNode = {
  type: 'video',
  // @ts-expect-error A stable source path is required.
  attrs: { controls: true },
};
const invalidDimensions: BookImageNode = {
  type: 'image',
  attrs: {
    src: 'assets/image.png',
    // @ts-expect-error Percent height has no definite reference in ordinary block flow.
    height: { value: 50, unit: '%' },
    // @ts-expect-error CSS strings are not the data contract.
    width: '50%',
  },
};
const invalidVideo: BookVideoNode = {
  type: 'video',
  attrs: {
    src: 'assets/movie.webm',
    // @ts-expect-error Video controls must be a boolean.
    controls: 'true',
    // @ts-expect-error Unsupported fit.
    fit: 'fill',
    // @ts-expect-error Unsupported alignment.
    align: 'float',
  },
};

void [
  document,
  inline,
  children,
  missingSource,
  invalidDimensions,
  invalidVideo,
];
