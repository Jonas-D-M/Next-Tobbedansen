interface PageType {
  title: string;
  href: string;
}

export const pages: PageType[] = [
  { title: 'Home', href: '/' },
  { title: 'Vrijdag', href: 'vrijdag' },
  { title: 'Zaterdag', href: 'zaterdag' },
  { title: 'FAQ', href: 'faq' },
  { title: 'Reglement', href: 'reglement' },
  // { title: 'Sponsors', href: 'sponsors' },
  // { title: 'Inschrijvingen', href: 'inschrijvingen' },
  { title: 'Contact', href: 'contact' },
];
