const PDF_MAP: Record<string, string> = {
  // Uaxactun excavation series
  'nuevas_excavaciones_en_uaxactun_i.pdf':                       '/assets/pdfs/reports/uaxactun/uaxactun-vol-01.pdf',
  'nuevas_excavaciones_en_uaxactun_ii.pdf':                      '/assets/pdfs/reports/uaxactun/uaxactun-vol-02.pdf',
  'nuevas_excavaciones_en_uaxactun_iii.pdf':                     '/assets/pdfs/reports/uaxactun/uaxactun-vol-03.pdf',
  'nuevas_excavaciones_en_uaxactun_iv.pdf':                      '/assets/pdfs/reports/uaxactun/uaxactun-vol-04.pdf',
  'nuevas_excavaciones_en_uaxactun_v.pdf':                       '/assets/pdfs/reports/uaxactun/uaxactun-vol-05.pdf',
  'INFORME-UAXACTUN-2014_vi.pdf':                                '/assets/pdfs/reports/uaxactun/uaxactun-vol-06.pdf',
  'INFORME-UAXACTUN-2014_vi_2.pdf':                              '/assets/pdfs/reports/uaxactun/uaxactun-vol-06b.pdf',
  'informe_uaxactun_2015_vii.pdf':                               '/assets/pdfs/reports/uaxactun/uaxactun-vol-07.pdf',
  'informe_uaxactun_2016_viii.pdf':                              '/assets/pdfs/reports/uaxactun/uaxactun-vol-08.pdf',
  'INFORME-UAX-2017-PDF_ix.pdf':                                 '/assets/pdfs/reports/uaxactun/uaxactun-vol-09.pdf',
  'NUEVAS-EXCAVACIONES-EN-UAXACTUN-X-PDF-_X.pdf':               '/assets/pdfs/reports/uaxactun/uaxactun-vol-10.pdf',
  'PUBLICACION-UAXACTUN-XI-1.pdf':                               '/assets/pdfs/reports/uaxactun/uaxactun-vol-11.pdf',
  'INFORME_2025.pdf':                                            '/assets/pdfs/reports/uaxactun/uaxactun-2025.pdf',
  // Peten Noreste excavation series
  'excavaciones_en_el_peten_noreste_i.pdf':                      '/assets/pdfs/reports/peten/peten-noreste-vol-01.pdf',
  'excavaciones_en_el_peten_noreste_ii.pdf':                     '/assets/pdfs/reports/peten/peten-noreste-vol-02.pdf',
  'excavaciones_en_el_peten_noreste_iii.pdf':                    '/assets/pdfs/reports/peten/peten-noreste-vol-03.pdf',
  'PETEN-NORESTE-IV-2015.pdf':                                   '/assets/pdfs/reports/peten/peten-noreste-vol-04.pdf',
  'EXCAVACIONES-EN-EL-PETEN-NORESTE-V-B.pdf':                   '/assets/pdfs/reports/peten/peten-noreste-vol-05.pdf',
  'Excavaciones-en-el-Peten-Noreste-VI..pdf':                    '/assets/pdfs/reports/peten/peten-noreste-vol-06.pdf',
  // Publications
  'Slnko_s_trnmi.pdf':                                           '/assets/pdfs/publications/slnko-s-trnmi.pdf',
  'In-the-Shadow-of-Xibalba.-Maya-caves-and-underground-landscapes-2.pdf': '/assets/pdfs/publications/in-the-shadow-of-xibalba.pdf',
  'In_the_realm_Maize_god_final.pdf':                            '/assets/pdfs/publications/in-the-realm-of-the-maize-god.pdf',
  'Mexicon-cetro_vyber-stran.pdf':                               '/assets/pdfs/publications/mexicon-cetro.pdf',
  'Spotak_meso_codices_2023.pdf':                                '/assets/pdfs/publications/spotak-meso-codices-2023.pdf',
  'Spotak_Catalog_ceramics_2023_online.pdf':                     '/assets/pdfs/publications/spotak-catalog-ceramics-2023.pdf',
  'Spotak_Catalog_industria_2023.pdf':                           '/assets/pdfs/publications/spotak-catalog-industria-2023.pdf',
  'Preliminary_catalog_of_rock_art_in_the_Kaua_Cave_-_2025.pdf': '/assets/pdfs/publications/kaua-cave-rock-art-catalog-2025.pdf',
  // Grant reports
  'Report_1_MayaCal.pdf':                                        '/assets/pdfs/grants/mayacal-report-1.pdf',
  'Report_2_MayaCal.pdf':                                        '/assets/pdfs/grants/mayacal-report-2.pdf',
  'Final_report_on_the_CU_grant_2025.pdf':                      '/assets/pdfs/grants/cu-grant-final-report-2025.pdf',
  // Images referenced via old pdfs path
  'cmslogo.png':                                                 '/assets/pdfs/cmslogo.png',
};

const LEGACY_PDFS_ORIGIN = /^https?:\/\/mesoamerica\.eu\/pdfs\/(.+)$/i;

export const rewriteLegacyAssetUrl = (url: string): string => {
  const match = url.match(LEGACY_PDFS_ORIGIN);
  if (!match) return url;
  let filename: string;
  try {
    filename = decodeURIComponent(match[1]);
  } catch {
    filename = match[1];
  }
  return PDF_MAP[filename] ?? url;
};
