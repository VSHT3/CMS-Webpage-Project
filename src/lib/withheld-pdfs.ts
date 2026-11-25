import nginxConfig from '../../nginx.conf?raw';

// The exact-match 404 locations also control which PDF links Astro renders.
const withheldPaths = new Set(
  Array.from(
    nginxConfig.matchAll(/\blocation\s+=\s+(\/\S+\.pdf)\s*\{\s*add_header Cache-Control "no-store" always;\s*return 404;\s*\}/g),
    ([, path]) => path,
  ),
);

export const isWithheldPdf = (href: string): boolean => {
  const path = href.split(/[?#]/, 1)[0].replace(/^https?:\/\/mesoamerica\.eu(?=\/)/i, '');
  return withheldPaths.has(path);
};
