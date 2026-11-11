/** The supported ProseMirror JSON contract. These declarations contain no editor or runtime implementation. */
export type BookLinkAttributes = {
  href: string;
  target?: string | null;
  rel?: string | null;
  class?: string | null;
};

export type BookTextMarkDefaultTypes =
  | 'bold'
  | 'italic'
  | 'strike'
  | 'underline'
  | 'code';

export type BookTextMark =
  | {
      type: BookTextMarkDefaultTypes;
  }
  | {
      type: 'link';
      attrs: BookLinkAttributes;
  };

export type BookTextNode = {
  type: 'text';
  text: string;
  marks?: BookTextMark[];
};

export type BookHardBreakNode = {
  type: 'hardBreak';
  marks?: BookTextMark[];
};

export type BookInlineNode = BookTextNode | BookHardBreakNode;

export type BookParagraphNode = {
  type: 'paragraph';
  content?: BookInlineNode[];
};

export type BookHeadingNodeAttrs = {
  level: 1 | 2;
}

export type BookHeadingNode = {
  type: 'heading';
  attrs: BookHeadingNodeAttrs;
  content?: BookInlineNode[];
};

export type BookComponentNode = {
  type: 'coreComponent';
  attrs: {
    name: string;
    package?: string | null;
  };
};

/** Ordinary blocks usable in a slide; carousels and segments are deliberately excluded. */
export type BookSlideBlockNode = BookParagraphNode | BookHeadingNode | BookComponentNode;

export type BookCarouselSlideNode = {
  type: 'carouselSlide';
  content: BookSlideBlockNode[];
};

export type BookCarouselNode = {
  type: 'carousel';
  content: BookCarouselSlideNode[];
};

export type BookBlockNode = BookSlideBlockNode | BookCarouselNode;
export type BookContentNode = BookBlockNode | BookInlineNode | BookCarouselSlideNode;

export type BookContentDocument = {
  type: 'doc';
  attrs?: Record<string, unknown>;
  content: BookBlockNode[];
};
