import withheldPdfMap from '../../docker/withheld-pdfs.map?raw';

// Use the same case-insensitive paths as the nginx map, without query strings or fragments.
const withheldPaths = new Set<string>();
for (const [, path] of withheldPdfMap.matchAll(/^[ \t]*(\/\S+\.pdf)[ \t]+1[ \t]*;[ \t]*(?:#.*)?$/gim)) {
  withheldPaths.add(path.toLowerCase());
}

export const isWithheldPdf = (href: string): boolean => {
  const path = href.split(/[?#]/, 1)[0].replace(/^https?:\/\/mesoamerica\.eu(?=\/)/i, '');
  return withheldPaths.has(path.toLowerCase());
};
