import type {
  BookContentDocument,
  BookContentNode,
  BookCarouselNode,
  BookCarouselSlideNode,
  BookTextMark,
} from '@active-book/types';

const marks: BookTextMark[] = [
  { type: 'bold' },
  { type: 'underline' },
  {
    type: 'link',
    attrs: {
      href: 'https://example.com',
      target: '_blank',
      rel: null,
    },
  },
];

const document: BookContentDocument = {
  type: 'doc',
  content: [
    {
      type: 'heading',
      attrs: { level: 1 },
      content: [{ type: 'text', text: 'Title', marks }],
    },
    { type: 'paragraph' },
  ],
};

const invalidHeading: BookContentNode = {
  type: 'heading',
  // @ts-expect-error Only heading levels 1 and 2 belong to this contract.
  attrs: { level: 3 },
};

const obsolete: BookContentNode = {
  // @ts-expect-error Historical text node names are not aliases.
  type: 'P',
};

const invalidMark: BookTextMark = {
  // @ts-expect-error Unsupported marks must be diagnosed rather than discarded.
  type: 'textAction',
};

void [document, invalidHeading, obsolete, invalidMark];

const carousel: BookCarouselNode = {
  type: 'carousel',
  content: [{
    type: 'carouselSlide',
    content: [
      { type: 'paragraph', content: [{ type: 'text', text: 'Slide', marks }] },
      { type: 'heading', attrs: { level: 2 } },
      { type: 'coreComponent', attrs: { name: 'Badge', package: 'fixture-parts' } },
    ],
  }],
};

const invalidSlide: BookCarouselSlideNode = {
  type: 'carouselSlide',
  // @ts-expect-error A carousel is not an ordinary slide block.
  content: [carousel],
};

const slideAtRoot: BookContentDocument = {
  type: 'doc',
  // @ts-expect-error Slides must be children of a carousel.
  content: [carousel.content[0]],
};

void [carousel, invalidSlide, slideAtRoot];
