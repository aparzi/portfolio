export type Lang = 'en' | 'it';

export interface Experience {
  role: string;
  company: string;
  period: string;
  location: string;
  summary: string;
  stack: string[];
  current?: boolean;
}

export interface Project {
  name: string;
  role: string;
  since: string;
  description: string;
  tags: string[];
  url: string;
  highlight?: boolean;
}

export interface Education {
  school: string;
  degree: string;
  period: string;
  note?: string;
}

export interface Mention {
  title: string;
  where: string;
  url: string;
}

export interface Content {
  ui: Record<string, string>;
  headline: string;
  location: string;
  kicker: string;
  heroSub: string;
  about: string[];
  stats: { value: number; suffix: string; label: string }[];
  mentions: Mention[];
  experiences: Experience[];
  projects: Project[];
  skills: { core: string[]; also: string[] };
  education: Education[];
}

/** Language-independent facts. */
export const profile = {
  name: 'Angelo Parziale',
  discordHandle: 'angeloparziale_31206',
  links: {
    linkedin: 'https://www.linkedin.com/in/angelo-parziale/',
    github: 'https://github.com/aparzi',
    discord: 'https://discord.com/users/angeloparziale_31206',
    x: 'https://x.com/AParziale34136',
    pr: 'https://github.com/angular/angular/pull/70527',
    releases: 'https://github.com/angular/angular/releases',
    angularX: 'https://x.com/angular',
  },
};

const skills = {
  core: ['Angular', 'TypeScript', 'JavaScript', 'RxJS', 'Signals', 'Node.js', 'Generative UI'],
  also: ['Java · Spring Boot', 'PHP · Laravel', 'React', 'MongoDB', 'IndexedDB', 'OpenLayers', 'Git', 'CI/CD'],
};

const en: Content = {
  ui: {
    about: 'About',
    openSource: 'Open source',
    experience: 'Experience',
    skills: 'Skills',
    education: 'Education',
    github: 'GitHub',
    linkedin: 'LinkedIn',
    discord: 'Discord',
    x: 'X',
    hello: 'Hello.',
    osLead: 'Code I contribute to in public, from the framework itself to the libraries built on it.',
    expLead: 'Ten years, four companies, one region. All of it on the web.',
    skillsLead: 'Angular and TypeScript every day; the rest when the job asks for it.',
    core: 'Core',
    also: 'Also fluent in',
    since: 'since',
    builtWith: 'Built with Angular',
    mentionsTitle: 'Mentioned by the Angular team',
    mentionsLead: 'Three times, between release notes and posts on X.',
    menu: 'Toggle menu',
    langSwitch: 'Passa all’italiano',
    scrollTo: 'Scroll to about',
    portrait: 'Illustrated portrait of Angelo Parziale',
  },
  headline: 'Frontend Tech Lead · Angular contributor',
  location: 'Toro, Molise, Italy',
  kicker: 'Building for the web since 2015',
  heroSub:
    'Frontend Tech Lead at KLARO, contributor to the Angular compiler, maintainer of libraries thousands of projects depend on.',
  about: [
    'I lead the frontend at KLARO, a fintech that helps Italian SMEs build a structured credit profile and talk to banks on equal footing. Day to day that means Angular at scale, a Node.js backend, and keeping a growing codebase fast and readable.',
    'Outside work I contribute to the Angular framework itself. My compiler-cli feature strictUnclaimedEventNames shipped in Angular 22.2 and closed an issue open since 2021: misspelled output bindings used to compile silently, now they fail with a dedicated error, NG8030. Run against Google’s internal codebase it surfaced roughly 100k silent bugs with zero false positives.',
    'I also maintain a few libraries the community relies on, and I’m part of the Claude for Open Source program.',
  ],
  stats: [
    { value: 100000, suffix: '+', label: 'silent bugs caught by NG8030 at Google' },
    { value: 10, suffix: '+', label: 'years building for the web' },
    { value: 4, suffix: '', label: 'open source libraries maintained' },
  ],
  mentions: [
    { title: 'strictUnclaimedEventNames · NG8030', where: 'Angular 22.2 release notes', url: profile.links.pr },
    { title: 'Contributor credits', where: 'Angular release notes', url: profile.links.releases },
    { title: 'Community shout-out', where: '@angular on X', url: profile.links.angularX },
  ],
  experiences: [
    {
      role: 'Frontend Tech Lead · Full Stack Developer',
      company: 'KLARO',
      period: 'Jan 2025 — present',
      location: 'Campobasso · hybrid',
      summary:
        'Own the frontend architecture of the KLARO platform: Angular, signals, a design system shared across the product, and the Node.js services behind it. Mentor the team on reviews, testing and performance.',
      stack: ['Angular', 'TypeScript', 'Signals', 'RxJS', 'Node.js'],
      current: true,
    },
    {
      role: 'Full Stack Developer',
      company: 'DEMOCOM Srl',
      period: 'Oct 2019 — Feb 2025',
      location: 'Campobasso',
      summary:
        'Five years shipping web products end to end, from Angular frontends to backend services and deployment. Built and maintained e-commerce and content platforms for clients.',
      stack: ['Angular', 'TypeScript', 'Node.js', 'PHP', 'MongoDB'],
    },
    {
      role: 'Software and Web Developer',
      company: 'Xeos.it',
      period: 'Nov 2017 — Oct 2019',
      location: 'Isernia',
      summary:
        'Full stack work on enterprise applications: Angular and AngularJS on the front, Java 8 with Spring and Spring Boot on the back.',
      stack: ['Angular', 'AngularJS', 'Java', 'Spring Boot'],
    },
    {
      role: 'Software Developer',
      company: 'datasound',
      period: 'Nov 2015 — Nov 2017',
      location: 'Isernia',
      summary:
        'Web applications with Slim PHP and Laravel, jQuery and a stint with React. Led the frontend of a GIS application exposing geographic data for the whole of Italy, from first commit to release.',
      stack: ['PHP', 'Laravel', 'jQuery', 'React', 'Git'],
    },
  ],
  projects: [
    {
      name: 'Angular',
      role: 'Framework contributor',
      since: '2023',
      description:
        'Contributions to angular/angular, including the compiler-cli option strictUnclaimedEventNames (Angular 22.2) that turns misspelled output bindings into the NG8030 compile error.',
      tags: ['compiler-cli', 'TypeScript', 'NG8030'],
      url: profile.links.pr,
      highlight: true,
    },
    {
      name: 'ngx-indexed-db',
      role: 'Maintainer',
      since: '2021',
      description:
        'High-level, reactive wrapper around IndexedDB for Angular. CRUD plus bulk operations, written in TypeScript on top of RxJS and compatible with every Angular version.',
      tags: ['IndexedDB', 'RxJS', 'Angular'],
      url: 'https://github.com/assuncaocharles/ngx-indexed-db',
    },
    {
      name: 'angularx-flatpickr',
      role: 'Maintainer',
      since: '2022',
      description: 'An Angular 14+ wrapper for flatpickr, the lightweight date and time picker.',
      tags: ['Angular', 'date picker'],
      url: 'https://github.com/mattlewis92/angularx-flatpickr',
    },
    {
      name: 'ol-ext',
      role: 'Contributor',
      since: '2023',
      description:
        'Extensions for OpenLayers: animated clusters, CSS popups, Font Awesome symbol renderers, statistical map charts, layer switchers, filters and animations.',
      tags: ['OpenLayers', 'maps', 'JavaScript'],
      url: 'https://github.com/Viglino/ol-ext',
    },
    {
      name: 'MyUnimol',
      role: 'Co-lead',
      since: '2017',
      description:
        'Mobile-first web app pulling data from the University of Molise student portal. Four of us coordinated a distributed team of twelve developers.',
      tags: ['Web app', 'team lead', 'open source'],
      url: 'https://github.com/giograno/myUnimol_webApp',
    },
  ],
  skills,
  education: [
    {
      school: 'Università degli Studi del Molise',
      degree: 'Master’s degree, Software Systems Security',
      period: '2020 — 2023',
    },
    {
      school: 'Università degli Studi del Molise',
      degree: 'Bachelor’s degree, Computer Science',
      period: '2014 — 2020',
      note: 'Final grade 104/110',
    },
  ],
};

const it: Content = {
  ui: {
    about: 'Chi sono',
    openSource: 'Open source',
    experience: 'Esperienza',
    skills: 'Competenze',
    education: 'Formazione',
    github: 'GitHub',
    linkedin: 'LinkedIn',
    discord: 'Discord',
    x: 'X',
    hello: 'Ciao.',
    osLead: 'Il codice a cui contribuisco in pubblico, dal framework alle librerie costruite sopra.',
    expLead: 'Dieci anni, quattro aziende, una regione. Sempre sul web.',
    skillsLead: 'Angular e TypeScript tutti i giorni; il resto quando il lavoro lo richiede.',
    core: 'Core',
    also: 'Conosco bene anche',
    since: 'dal',
    builtWith: 'Fatto con Angular',
    mentionsTitle: 'Citato dal team Angular',
    mentionsLead: 'Tre volte, tra note di rilascio e post su X.',
    menu: 'Apri il menu',
    langSwitch: 'Switch to English',
    scrollTo: 'Vai a chi sono',
    portrait: 'Ritratto illustrato di Angelo Parziale',
  },
  headline: 'Frontend Tech Lead · Angular contributor',
  location: 'Toro, Molise, Italia',
  kicker: 'Sviluppo per il web dal 2015',
  heroSub:
    'Frontend Tech Lead in KLARO, contributor del compilatore Angular, maintainer di librerie usate da migliaia di progetti.',
  about: [
    'Guido il frontend di KLARO, una fintech che aiuta le PMI italiane a costruire un profilo creditizio strutturato e a dialogare con le banche ad armi pari. Nel quotidiano vuol dire Angular su larga scala, un backend Node.js e una codebase in crescita da tenere veloce e leggibile.',
    'Fuori dal lavoro contribuisco al framework Angular. La mia feature per il compiler-cli, strictUnclaimedEventNames, è uscita con Angular 22.2 e ha chiuso un issue aperto dal 2021: gli output binding con errori di battitura compilavano in silenzio, ora falliscono con un errore dedicato, NG8030. Eseguita sulla codebase interna di Google ha fatto emergere circa 100k bug silenziosi, senza falsi positivi.',
    'Mantengo anche alcune librerie su cui la community fa affidamento e faccio parte del programma Claude for Open Source.',
  ],
  stats: [
    { value: 100000, suffix: '+', label: 'bug silenziosi trovati da NG8030 in Google' },
    { value: 10, suffix: '+', label: 'anni di sviluppo web' },
    { value: 4, suffix: '', label: 'librerie open source mantenute' },
  ],
  mentions: [
    { title: 'strictUnclaimedEventNames · NG8030', where: 'Note di rilascio Angular 22.2', url: profile.links.pr },
    { title: 'Crediti ai contributor', where: 'Note di rilascio Angular', url: profile.links.releases },
    { title: 'Menzione della community', where: '@angular su X', url: profile.links.angularX },
  ],
  experiences: [
    {
      role: 'Frontend Tech Lead · Full Stack Developer',
      company: 'KLARO',
      period: 'gen 2025 — oggi',
      location: 'Campobasso · ibrido',
      summary:
        'Responsabile dell’architettura frontend della piattaforma KLARO: Angular, signals, un design system condiviso in tutto il prodotto e i servizi Node.js dietro. Affianco il team su review, test e performance.',
      stack: ['Angular', 'TypeScript', 'Signals', 'RxJS', 'Node.js'],
      current: true,
    },
    {
      role: 'Full Stack Developer',
      company: 'DEMOCOM Srl',
      period: 'ott 2019 — feb 2025',
      location: 'Campobasso',
      summary:
        'Cinque anni di prodotti web realizzati da cima a fondo, dai frontend Angular ai servizi backend e al deploy. Piattaforme e-commerce e di contenuti per i clienti.',
      stack: ['Angular', 'TypeScript', 'Node.js', 'PHP', 'MongoDB'],
    },
    {
      role: 'Software and Web Developer',
      company: 'Xeos.it',
      period: 'nov 2017 — ott 2019',
      location: 'Isernia',
      summary:
        'Full stack su applicazioni enterprise: Angular e AngularJS sul frontend, Java 8 con Spring e Spring Boot sul backend.',
      stack: ['Angular', 'AngularJS', 'Java', 'Spring Boot'],
    },
    {
      role: 'Software Developer',
      company: 'datasound',
      period: 'nov 2015 — nov 2017',
      location: 'Isernia',
      summary:
        'Applicazioni web con Slim PHP e Laravel, jQuery e una parentesi con React. Responsabile del frontend di un’applicazione GIS con tutte le informazioni geografiche del territorio italiano, dal primo commit al rilascio.',
      stack: ['PHP', 'Laravel', 'jQuery', 'React', 'Git'],
    },
  ],
  projects: [
    {
      name: 'Angular',
      role: 'Contributor del framework',
      since: '2023',
      description:
        'Contributi ad angular/angular, tra cui l’opzione compiler-cli strictUnclaimedEventNames (Angular 22.2) che trasforma gli output binding scritti male nell’errore di compilazione NG8030.',
      tags: ['compiler-cli', 'TypeScript', 'NG8030'],
      url: profile.links.pr,
      highlight: true,
    },
    {
      name: 'ngx-indexed-db',
      role: 'Maintainer',
      since: '2021',
      description:
        'Wrapper reattivo ad alto livello su IndexedDB per Angular. CRUD e operazioni bulk, scritto in TypeScript su RxJS e compatibile con ogni versione di Angular.',
      tags: ['IndexedDB', 'RxJS', 'Angular'],
      url: 'https://github.com/assuncaocharles/ngx-indexed-db',
    },
    {
      name: 'angularx-flatpickr',
      role: 'Maintainer',
      since: '2022',
      description: 'Wrapper Angular 14+ per flatpickr, il date e time picker leggero.',
      tags: ['Angular', 'date picker'],
      url: 'https://github.com/mattlewis92/angularx-flatpickr',
    },
    {
      name: 'ol-ext',
      role: 'Contributor',
      since: '2023',
      description:
        'Estensioni per OpenLayers: cluster animati, popup CSS, renderer di simboli Font Awesome, grafici per mappe statistiche, selettore di livelli, filtri e animazioni.',
      tags: ['OpenLayers', 'mappe', 'JavaScript'],
      url: 'https://github.com/Viglino/ol-ext',
    },
    {
      name: 'MyUnimol',
      role: 'Co-lead',
      since: '2017',
      description:
        'Web app mobile-first che legge i dati dal portale studenti dell’Università del Molise. In quattro abbiamo coordinato un team distribuito di dodici sviluppatori.',
      tags: ['Web app', 'team lead', 'open source'],
      url: 'https://github.com/giograno/myUnimol_webApp',
    },
  ],
  skills,
  education: [
    {
      school: 'Università degli Studi del Molise',
      degree: 'Laurea magistrale in Sicurezza dei Sistemi Software',
      period: '2020 — 2023',
    },
    {
      school: 'Università degli Studi del Molise',
      degree: 'Laurea triennale in Scienze e Tecnologie Informatiche',
      period: '2014 — 2020',
      note: 'Votazione 104/110',
    },
  ],
};

export const content: Record<Lang, Content> = { en, it };
