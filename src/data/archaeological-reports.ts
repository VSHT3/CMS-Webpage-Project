export const REPORT_PAGE_PATH = '/paru-uaxactun-papers';

export type ReportDocument = {
  label: string;
  href: string;
};

export type ArchaeologicalReport = {
  id: string;
  title: string;
  details?: string;
  year: string;
  documents: ReportDocument[];
};

export type ArchaeologicalReportSeries = {
  id: string;
  title: string;
  reports: ArchaeologicalReport[];
};

export const archaeologicalReportSeries: ArchaeologicalReportSeries[] = [
  {
    id: 'uaxactun',
    title: 'Uaxactun',
    reports: [
      {
        id: 'uaxactun-i',
        title: 'Nuevas excavaciones en Uaxactun I.',
        year: '2009',
        documents: [{ label: 'Open PDF', href: '/assets/pdfs/reports/uaxactun/uaxactun-vol-01.pdf' }],
      },
      {
        id: 'uaxactun-ii',
        title: 'Nuevas excavaciones en Uaxactun II.',
        year: '2010',
        documents: [{ label: 'Open PDF', href: '/assets/pdfs/reports/uaxactun/uaxactun-vol-02.pdf' }],
      },
      {
        id: 'uaxactun-iii',
        title: 'Nuevas excavaciones en Uaxactun III.',
        year: '2011',
        documents: [{ label: 'Open PDF', href: '/assets/pdfs/reports/uaxactun/uaxactun-vol-03.pdf' }],
      },
      {
        id: 'uaxactun-iv',
        title: 'Nuevas excavaciones en Uaxactun IV.',
        year: '2012',
        documents: [{ label: 'Open PDF', href: '/assets/pdfs/reports/uaxactun/uaxactun-vol-04.pdf' }],
      },
      {
        id: 'uaxactun-v',
        title: 'Nuevas excavaciones en Uaxactun V.',
        year: '2013',
        documents: [{ label: 'Open PDF', href: '/assets/pdfs/reports/uaxactun/uaxactun-vol-05.pdf' }],
      },
      {
        id: 'uaxactun-vi',
        title: 'Nuevas excavaciones en Uaxactun VI.',
        year: '2014',
        documents: [
          { label: 'Open volume 1', href: '/assets/pdfs/reports/uaxactun/uaxactun-vol-06.pdf' },
          { label: 'Open volume 2', href: '/assets/pdfs/reports/uaxactun/uaxactun-vol-06b.pdf' },
        ],
      },
      {
        id: 'uaxactun-vii',
        title: 'Nuevas excavaciones en Uaxactun VII.',
        year: '2015',
        documents: [{ label: 'Open PDF', href: '/assets/pdfs/reports/uaxactun/uaxactun-vol-07.pdf' }],
      },
      {
        id: 'uaxactun-viii',
        title: 'Nuevas excavaciones en Uaxactun VIII.',
        year: '2016',
        documents: [{ label: 'Open PDF', href: '/assets/pdfs/reports/uaxactun/uaxactun-vol-08.pdf' }],
      },
      {
        id: 'uaxactun-ix',
        title: 'Nuevas excavaciones en Uaxactun IX.',
        year: '2017',
        documents: [{ label: 'Open PDF', href: '/assets/pdfs/reports/uaxactun/uaxactun-vol-09.pdf' }],
      },
      {
        id: 'uaxactun-x',
        title: 'Nuevas excavaciones en Uaxactun X.',
        year: '2020',
        documents: [{ label: 'Open PDF', href: '/assets/pdfs/reports/uaxactun/uaxactun-vol-10.pdf' }],
      },
      {
        id: 'uaxactun-xi',
        title: 'Nuevas excavaciones en Uaxactun XI.',
        year: '2022',
        documents: [{ label: 'Open PDF', href: '/assets/pdfs/reports/uaxactun/uaxactun-vol-11.pdf' }],
      },
    ],
  },
  {
    id: 'peten-noreste',
    title: 'Petén Noreste',
    reports: [
      {
        id: 'peten-noreste-i',
        title: 'Excavaciones en el Petén Noreste I',
        details: "Tz'ibatnah",
        year: '2010',
        documents: [{ label: 'Open PDF', href: '/assets/pdfs/reports/peten/peten-noreste-vol-01.pdf' }],
      },
      {
        id: 'peten-noreste-ii',
        title: 'Excavaciones en el Petén Noreste II',
        details: "Tz'ibatnah & Ch'anal",
        year: '2011 & 2012',
        documents: [{ label: 'Open PDF', href: '/assets/pdfs/reports/peten/peten-noreste-vol-02.pdf' }],
      },
      {
        id: 'peten-noreste-iii',
        title: 'Excavaciones en el Petén Noreste III',
        details: "Ch'anal & Tz'ibatnah",
        year: '2013 & 2014',
        documents: [{ label: 'Open PDF', href: '/assets/pdfs/reports/peten/peten-noreste-vol-03.pdf' }],
      },
      {
        id: 'peten-noreste-iv',
        title: 'Excavaciones en el Petén Noreste IV',
        details: 'El Manantial, Tz\'ibatnah, Petnal and Jimbal',
        year: '2015',
        documents: [{ label: 'Open PDF', href: '/assets/pdfs/reports/peten/peten-noreste-vol-04.pdf' }],
      },
      {
        id: 'peten-noreste-v',
        title: 'Excavaciones en el Petén Noreste V',
        details: "Tz'ibatnah and El Ramonal",
        year: '2022',
        documents: [{ label: 'Open PDF', href: '/assets/pdfs/reports/peten/peten-noreste-vol-05.pdf' }],
      },
      {
        id: 'peten-noreste-vi',
        title: 'Excavaciones en el Petén Noreste VI',
        details: 'Los Abuelos, Santa Luisa y Petnal',
        year: '2024',
        documents: [{ label: 'Open PDF', href: '/assets/pdfs/reports/peten/peten-noreste-vol-06.pdf' }],
      },
      {
        id: 'peten-noreste-vii',
        title: 'Excavaciones en el Petén Noreste VII',
        details: 'Los Abuelos, Petnal y Cambrayal',
        year: '2025',
        documents: [{ label: 'Open PDF', href: '/assets/pdfs/reports/uaxactun/uaxactun-2025.pdf' }],
      },
    ],
  },
];
