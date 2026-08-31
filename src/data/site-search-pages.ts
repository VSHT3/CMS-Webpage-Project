export type SiteSearchPage = {
  title: string;
  href: string;
  description: string;
  context: string;
  keywords: readonly string[];
};

export const siteSearchPages = [
  {
    title: 'Home',
    href: '/',
    description: 'Explore the Center for Mesoamerican Studies, its research, publications, collections, PARU Uaxactun work, education, and databases.',
    context: 'Center for Mesoamerican Studies',
    keywords: ['CMS', 'Comenius University', 'Mesoamerica', 'Maya'],
  },
  {
    title: 'About Us',
    href: '/about-us',
    description: 'History and overview of the Center, including its establishment, research, collections, and academic mission.',
    context: 'About Us',
    keywords: ['CMS', 'Center for Mesoamerican Studies', 'Comenius University', 'Bratislava', 'established 2015'],
  },
  {
    title: 'Members',
    href: '/abouts-us-members',
    description: 'Members of the Center for Mesoamerican Studies at Comenius University Bratislava.',
    context: 'About Us',
    keywords: ['team', 'researchers', 'staff', 'people'],
  },
  {
    title: 'Contacts',
    href: '/about-us-contacts',
    description: 'Contact details for the Center, including its Bratislava address, phone numbers, email, and location map.',
    context: 'About Us',
    keywords: ['contact', 'address', 'phone', 'email', 'Štúrova 9', 'Bratislava', 'map'],
  },
  {
    title: 'Bratislava Maya Meetings — History',
    href: '/bratislava-maya-meetings-history',
    description: 'History of the annual Bratislava Maya Meeting and Autumn Academy of Maya Hieroglyphic Writing, organized since 2009.',
    context: 'Conferences',
    keywords: ['BMM', 'conference', 'workshop', 'Maya hieroglyphs', 'events'],
  },
  {
    title: 'Bratislava Maya Meetings — News',
    href: '/bratislava-maya-meetings-news',
    description: 'News from the annual Bratislava Maya Meeting and Autumn Academy of Maya Hieroglyphic Writing.',
    context: 'Conferences',
    keywords: ['BMM', 'conference', 'updates', 'events', 'Maya hieroglyphs'],
  },
  {
    title: 'Bratislava Maya Meetings — Gallery',
    href: '/bratislava-maya-meetings-gallery',
    description: 'Gallery from the annual Bratislava Maya Meeting and Autumn Academy of Maya Hieroglyphic Writing.',
    context: 'Conferences',
    keywords: ['BMM', 'conference', 'photos', 'images', 'events'],
  },
  {
    title: 'Research',
    href: '/research',
    description: 'Research at the Center, including PARU Uaxactun reports, grants, projects, investigation notes, and galleries.',
    context: 'Research',
    keywords: ['Maya', 'Mesoamerica', 'archaeology', 'fieldwork', 'projects'],
  },
  {
    title: 'Grants',
    href: '/grants-and-investigations-grants',
    description: 'Active research grants, including documentation of rock art in the Kaua Cave in Yucatán.',
    context: 'Research',
    keywords: ['funding', 'Kaua Cave', 'Yucatán', 'rock art', 'LiDAR'],
  },
  {
    title: 'Project Reports',
    href: '/grants-and-investigations',
    description: 'Funded archaeological projects in Uaxactun, Guatemala, with reports and related research databases.',
    context: 'Research',
    keywords: ['grants', 'investigations', 'Uaxactun', 'Guatemala', 'potbelly sculptures', 'Tzolk’in'],
  },
  {
    title: 'Investigation Notes',
    href: '/grants-and-investigations-investigation-notes',
    description: 'Field investigation notes from research projects of the Center for Mesoamerican Studies.',
    context: 'Research',
    keywords: ['fieldwork', 'research notes', 'archaeology', 'investigations'],
  },
  {
    title: 'Research Gallery',
    href: '/grants-and-investigations-gallery',
    description: 'Photo gallery from the Center’s research projects and field investigations.',
    context: 'Research',
    keywords: ['photos', 'images', 'fieldwork', 'archaeology'],
  },
  {
    title: 'Collections Gallery',
    href: '/collections-gallery',
    description: 'Gallery of archaeological objects and project documentation, including restored material from Uaxactun.',
    context: 'Collections',
    keywords: ['photos', 'images', 'artefacts', 'artifacts', 'Uaxactun', 'restoration'],
  },
  {
    title: 'Publications',
    href: '/publications',
    description: 'Books, studies, and catalogues published by the Center for Mesoamerican Studies.',
    context: 'Library & Publications',
    keywords: ['books', 'studies', 'catalogues', 'catalogs', 'PDF', 'authors'],
  },
  {
    title: 'PARU Uaxactun — Archaeological Reports',
    href: '/paru-uaxactun-papers',
    description: 'Published archaeological reports from the Uaxactun and Petén Noreste series, with direct access to PDFs.',
    context: 'PARU Uaxactun',
    keywords: ['papers', 'excavation reports', 'field reports', 'Guatemala', 'Petén Noreste', 'PDF'],
  },
  {
    title: 'PARU Uaxactun — Gallery',
    href: '/paru-uaxactun-gallery',
    description: 'Gallery from the PARU Uaxactun regional archaeological project.',
    context: 'PARU Uaxactun',
    keywords: ['photos', 'images', 'fieldwork', 'Guatemala', 'archaeology'],
  },
  {
    title: '3D Database — Preclassic Maya Potbelly Sculptures',
    href: '/potbelly-sculptures/3d-database',
    description: 'Interactive 3D records for documented sculptures from the Preclassic Maya Potbelly Sculptures project.',
    context: 'Research · Potbelly Sculptures',
    keywords: ['3-D', 'digital models', 'artefact viewer', 'artifact viewer', 'Guatemala', 'Peten', 'Petén'],
  },
  {
    title: 'GIS Database — Preclassic Maya Potbelly Sculptures',
    href: '/potbelly-sculptures/gis-database',
    description: 'Search and map recorded Preclassic Maya potbelly sculpture sites across Mesoamerica.',
    context: 'Research · Potbelly Sculptures',
    keywords: ['geographic information system', 'map', 'sites', 'monuments', 'Mexico', 'Guatemala', 'El Salvador', 'Honduras'],
  },
  {
    title: 'Final Report — Preclassic Maya Potbelly Sculptures',
    href: '/potbelly-sculptures/final-report',
    description: 'Final report for the Preclassic Maya Potbelly Sculptures research project.',
    context: 'Research · Potbelly Sculptures',
    keywords: ['09I03-03-V04-00234', 'Peten', 'Petén', 'Guatemala', 'ancestor cult'],
  },
  {
    title: 'Tzolk’in Almanac Database — MayaCal',
    href: '/mayacal/almanac-database',
    description: 'Read-only reconstructions of almanac sequences from the Dresden, Madrid, and Paris Maya codices.',
    context: 'Research · MayaCal',
    keywords: ['Tzolkin', 'Tzolk’in', 'almanacs', 'Maya codices', 'Dresden Codex', 'Madrid Codex', 'Paris Codex', '09I03-03-V04-00243'],
  },
] satisfies readonly SiteSearchPage[];
