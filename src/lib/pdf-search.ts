import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';
import { rewriteLegacyAssetUrl } from './legacy-pdf-map';

export type PdfSearchItem = {
  title: string;
  filename: string;
  displayFilename: string;
  href: string;
  sourcePage: string;
  sourcePath: string;
  search: string;
};

const decodeEntities = (value = '') =>
  value
    .replaceAll('&amp;', '&')
    .replaceAll('&quot;', '"')
    .replaceAll('&#39;', "'")
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>')
    .replaceAll('&nbsp;', ' ');

const stripHtml = (value = '') =>
  decodeEntities(value.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim());

const safeDecodeURIComponent = (value: string) => {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
};

export const normalizeForSearch = (value = '') =>
  value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[_./-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

const humanizePdfName = (filename = '') =>
  safeDecodeURIComponent(filename)
    .replace(/\.pdf$/i, '')
    .replace(/[_-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

const getNearestHeading = (html: string, index = 0) => {
  const beforeAnchor = html.slice(Math.max(0, index - 8000), index);
  const headings = Array.from(beforeAnchor.matchAll(/<h[1-4]\b[^>]*>([\s\S]*?)<\/h[1-4]>/gi));
  const heading = headings.at(-1)?.[1] ?? '';
  return stripHtml(heading);
};

const getPdfFilename = (href: string, downloadName = '') => {
  const candidate = downloadName || href.split(/[?#]/)[0].split('/').pop() || href;
  return safeDecodeURIComponent(candidate.trim());
};

const getLegacyHtmlFiles = (root: string) => {
  const files: string[] = [];
  if (!existsSync(root)) return files;
  const walk = (directory: string) => {
    for (const entry of readdirSync(directory, { withFileTypes: true })) {
      const fullPath = join(directory, entry.name);
      if (entry.isDirectory()) {
        walk(fullPath);
        continue;
      }
      if (entry.isFile() && entry.name.endsWith('.html')) {
        files.push(fullPath);
      }
    }
  };
  walk(root);
  return files;
};

export const buildPdfSearchIndex = (): PdfSearchItem[] => {
  const legacyRoot = resolve('.', 'legacy/source-html');
  const pdfs = new Map<string, PdfSearchItem>();

  for (const filePath of getLegacyHtmlFiles(legacyRoot)) {
    const raw = readFileSync(filePath, 'utf-8');
    const pageTitle = stripHtml(raw.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] ?? 'Site page');
    const sourcePath = dirname(relative(legacyRoot, filePath)).replaceAll('\\', '/');
    const sourceRoute = sourcePath === '.' ? '/' : `/${sourcePath}`;

    for (const match of raw.matchAll(/<a\b([^>]*?)>([\s\S]*?)<\/a>/gi)) {
      const attrs = match[1] ?? '';
      const href = rewriteLegacyAssetUrl(
        decodeEntities(attrs.match(/\bhref=["']([^"']*?\.pdf(?:\?[^"']*)?)["']/i)?.[1] ?? '').trim(),
      );
      if (!href) continue;

      const downloadName = decodeEntities(attrs.match(/\bdownload=["']([^"']+)["']/i)?.[1] ?? '').trim();
      const filename = getPdfFilename(href, downloadName);
      const linkText = stripHtml(match[2] ?? '');
      const genericLinkText = /^(download|preview|preivew)\s+pdf(?:\s+\d+)?$/i.test(linkText) || !linkText;
      const title = genericLinkText ? getNearestHeading(raw, match.index) || humanizePdfName(filename) : linkText;

      const existing = pdfs.get(href);
      if (existing) {
        existing.search = normalizeForSearch(
          `${existing.title} ${existing.filename} ${existing.sourcePage} ${pageTitle} ${sourceRoute}`,
        );
        continue;
      }

      pdfs.set(href, {
        title,
        filename,
        displayFilename: humanizePdfName(filename),
        href,
        sourcePage: pageTitle,
        sourcePath: sourceRoute,
        search: normalizeForSearch(`${title} ${filename} ${pageTitle} ${sourceRoute} ${href}`),
      });
    }
  }

  return Array.from(pdfs.values()).sort((first, second) => first.title.localeCompare(second.title));
};
