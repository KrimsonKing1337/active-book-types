import type {
  BookContentDocument,
  BookContentNode,
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
