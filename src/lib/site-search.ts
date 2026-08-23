import { siteSearchPages } from '../data/site-search-pages';
import { buildPdfSearchIndex } from './pdf-search';
import { normalizeSearchText } from './search-match';

export type SiteSearchItem = {
  kind: 'page' | 'document';
  title: string;
  href: string;
  pageHref: string;
  description: string;
  context: string;
  search: string;
  filename?: string;
};

export const buildSiteSearchIndex = (): SiteSearchItem[] => {
  const pages: SiteSearchItem[] = siteSearchPages.map((page) => ({
    kind: 'page',
    title: page.title,
    href: page.href,
    pageHref: page.href,
    description: page.description,
    context: page.context,
    search: normalizeSearchText(
      `${page.title} ${page.description} ${page.context} ${page.keywords.join(' ')} ${page.href}`,
    ),
  }));

  const documents: SiteSearchItem[] = buildPdfSearchIndex().map((document) => {
    const pageHref = document.sourceAnchor
      ? `${document.sourcePath || '/'}#${document.sourceAnchor}`
      : document.sourcePath || '/';

    return {
      kind: 'document',
      title: document.title,
      href: document.href,
      pageHref,
      description: `Downloadable PDF from ${document.sourcePage}.`,
      context: document.sourcePage,
      search: normalizeSearchText(
        `${document.search} ${document.title} ${document.filename} ${document.displayFilename} ${document.sourcePage}`,
      ),
      filename: document.displayFilename,
    };
  });

  return [...pages, ...documents];
};
