/** The supported ProseMirror JSON contract. These declarations contain no editor or runtime implementation. */
export type BookLinkAttributes = {
  href: string;
  target?: string | null;
  rel?: string | null;
  class?: string | null;
};

export type BookTextMark =
  | { type: 'bold' | 'italic' | 'strike' | 'underline' | 'code' }
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

export type BookHeadingNode = {
  type: 'heading';
  attrs: { level: 1 | 2 };
  content?: BookInlineNode[];
};

export type BookComponentNode = {
  type: 'coreComponent';
  attrs: {
    name: string;
    package?: string | null;
  };
};

export type BookBlockNode = BookParagraphNode | BookHeadingNode | BookComponentNode;
export type BookContentNode = BookBlockNode | BookInlineNode;

export type BookContentDocument = {
  type: 'doc';
  attrs?: Record<string, unknown>;
  content: BookBlockNode[];
};
