// ---------------------------------------------------------------------------
// Core Strapi 5 response shapes
// ---------------------------------------------------------------------------

export interface StrapiPagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

export interface StrapiMeta {
  pagination: StrapiPagination;
}

/** Single-item response: /api/articles/1 */
export interface StrapiResponse<T> {
  data: T;
  meta: Record<string, unknown>;
}

/** Collection response: /api/articles */
export interface StrapiList<T> {
  data: T[];
  meta: StrapiMeta;
}

// ---------------------------------------------------------------------------
// Media
// ---------------------------------------------------------------------------

export interface StrapiMediaFormat {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  width: number;
  height: number;
  size: number;
  url: string;
  path: string | null;
}

export interface StrapiMedia {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number | null;
  height: number | null;
  formats: Record<string, StrapiMediaFormat> | null;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
}

// ---------------------------------------------------------------------------
// Blocks (Strapi 5 rich-text editor)
// ---------------------------------------------------------------------------

export interface StrapiBlockChild {
  type: "text" | "link" | string;
  text?: string;
  url?: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
  code?: boolean;
  children?: StrapiBlockChild[];
}

export interface StrapiBlock {
  type:
    | "paragraph"
    | "heading"
    | "list"
    | "list-item"
    | "quote"
    | "code"
    | "image"
    | "divider"
    | string;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  format?: "ordered" | "unordered";
  image?: StrapiMedia;
  children: StrapiBlockChild[];
}

// ---------------------------------------------------------------------------
// Domain types — matching the Strapi content-type schemas
// ---------------------------------------------------------------------------

export interface Article {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  content: StrapiBlock[] | null;
  image: StrapiMedia[] | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
}

export interface Page {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  content: StrapiBlock[] | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
}
