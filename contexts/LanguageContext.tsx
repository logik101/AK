import React, { createContext, useState, useContext, ReactNode } from 'react';

type Language = 'en' | 'fr' | 'ht';
type Translations = { [key: string]: { [lang in Language]: string } };

const translations: Translations = {
  // NavBar
  Home: { en: 'Home', fr: 'Accueil', ht: 'Akèy' },
  navArtists: { en: 'Artists', fr: 'Artistes', ht: 'Atis' },
  navAlbums: { en: 'Albums', fr: 'Albums', ht: 'Albòm' },
  navYears: { en: 'Years', fr: 'Années', ht: 'Ane' },
  navAbout: { en: 'About Us', fr: 'À Propos', ht: 'A Pwopo' },
  navContact: { en: 'Contact', fr: 'Contact', ht: 'Kontak' },
  navHost: { en: 'Hosts', fr: 'Animateurs', ht: 'Animatè' },
  hostPageSubtitle: { en: 'Meet the personalities who bring Konpa music to the world.', fr: 'Rencontrez les personnalités qui font rayonner la musique Konpa dans le monde.', ht: 'Rankontre pèsonalite ki pote mizik Konpa bay lemonn.' },
  supportUs: { en: 'Support Us', fr: 'Soutenez-nous', ht: 'Sipòte Nou' },
  searchPlaceholder: { en: 'Search artist, album, track...', fr: 'Rechercher artiste, album, piste...', ht: 'Chèche atis, albòm, mizik...' },
  // Hero
  heroHeading: { en: 'Explore the world of Konpa with this', fr: 'Explorez le monde du Konpa avec cette', ht: 'Eksplore mond Konpa a avèk' },
  heroHeadingSpan: { en: 'Discography !', fr: 'Discographie !', ht: 'Diskografi sa a !' },
  heroSubtitle: { en: 'Discover legendary albums, hidden gems, and the stories that shaped generations of our uniqueness. A curated archive of sound that is accessible, timeless, and inspiring.', fr: 'Découvrez des albums légendaires, des trésors cachés et les histoires qui ont façonné des générations de notre unicité. Une archive sonore organisée, accessible, intemporelle et inspirante.', ht: 'Dekouvri albòm lejandè, trezò kache, ak istwa ki fòme jenerasyon inik nou an. Yon achiv odyo òganize ki aksesib, entanporèl, ak enspiran.' },
  heroCtaTimeline: { en: 'Browse Albums', fr: 'Parcourir les Albums', ht: 'Gade Albòm Yo' },
  heroCtaArtists: { en: 'Browse Artists', fr: 'Parcourir les Artistes', ht: 'Gade Atis Yo' },
  // Album Spotlight Section (formerly From the Timeline)
  albumSpotlightTitle: { en: "Album Spotlight", fr: "Album en Vedette", ht: "Albòm An Vedèt" },
  albumSpotlightSubtitle: { en: "A curated selection of historic and influential albums.", fr: "Une sélection organisée d'albums historiques et influents.", ht: "Yon seleksyon albòm istorik ak enfliyan." },
  // Artist Spotlight Section
  artistSpotlightTitle: { en: "Artist Spotlight", fr: "Artiste en Vedette", ht: "Atis An Vedèt" },
  artistSpotlightSubtitle: { en: "Discover the legends behind Konpa.", fr: "Découvrez les légendes derrière le Konpa.", ht: "Dekouvri lejand ki dèyè Konpa a." },
  // Artist Profile Card
  profileOverview: { en: "Overview", fr: "Aperçu", ht: "Apèsi" },
  profilePopularSongs: { en: "Popular Songs", fr: "Chansons Populaires", ht: "Mizik Popilè" },
  profileFollowing: { en: "Following", fr: "Abonnements", ht: "Abonman" },
  profileLinks: { en: "Links", fr: "Liens", ht: "Lyen" },
  generateAIProfile: { en: 'Generate AI Profile', fr: 'Générer un Profil IA', ht: 'Jenere Pwofil IA' },
  generating: { en: 'Generating...', fr: 'Génération...', ht: 'Ap Jenere...' },
  // Timeline Section
  timelineTitle: { en: 'The Legacy of Sound', fr: 'L\'Héritage du Son', ht: 'Eritaj Son an' },
  // Filters
  filterByArtist: { en: 'Filter by Artist', fr: 'Filtrer par Artiste', ht: 'Filtre pa Atis' },
  filterByYear: { en: 'Select Year Range', fr: 'Sélectionner une plage d\'années', ht: 'Chwazi ane' },
  filterByLabel: { en: 'Filter by Label', fr: 'Filtrer par Label', ht: 'Filtre pa Labèl' },
  allLabels: { en: 'All Labels', fr: 'Tous les Labels', ht: 'Tout Labèl yo' },
  resetFilters: { en: 'Reset', fr: 'Réinitialiser', ht: 'Reyinisyalize' },
  filters: { en: 'Filters', fr: 'Filtres', ht: 'Filtè' },
  // General
  loading: { en: 'Loading...', fr: 'Chargement...', ht: 'Ap Chaje...' },
  noResults: { en: 'No results found.', fr: 'Aucun résultat trouvé.', ht: 'Pa gen rezilta.' },
  tracks: { en: 'Tracks', fr: 'Pistes', ht: 'Mizik' },
  // Admin
  adminLogin: { en: 'Admin Access', fr: 'Accès Admin', ht: 'Aksè Admin' },
  password: { en: 'Password', fr: 'Mot de passe', ht: 'Modpas' },
  enterPassword: { en: 'Please enter the password to add data.', fr: 'Veuillez entrer le mot de passe pour ajouter des données.', ht: 'Tanpri antre modpas la pou ajoute done.' },
  submit: { en: 'Submit', fr: 'Soumettre', ht: 'Soumèt' },
  invalidPassword: { en: 'Invalid Password', fr: 'Mot de passe incorrect', ht: 'Modpas pa kòrèk' },
  addData: { en: 'Add Data', fr: 'Ajouter des Données', ht: 'Ajoute Done' },
  addDataInstruction: { en: 'Paste new CSV data here. It will be appended to the existing discography and saved locally.', fr: 'Collez les nouvelles données CSV ici. Elles seront ajoutées à la discographie existante et sauvegardées localement.', ht: 'Kole nouvo done CSV isit la. Y ap ajoute yo nan diskografi a epi sove lokalman.' },
  appendData: { en: 'Append Data', fr: 'Ajouter les Données', ht: 'Ajoute Done' },
  close: { en: 'Close', fr: 'Fermer', ht: 'Fèmen' },
  // Pages
  browseByYear: { en: 'Browse by Year', fr: 'Parcourir par Année', ht: 'Gade pa Ane' },
  artistsPageTitle: { en: 'Artists & Bands', fr: 'Artistes & Groupes', ht: 'Atis & Gwoup' },
  // About Page
  aboutTitle: { en: "Sa'k Pase ?", fr: "Sa'k Pase ?", ht: "Sa'k Pase ?" },
  aboutIntroCombined1: {
    en: "This archive is built to celebrate and safeguard the rich history of Haitian Konpa. First shaped in the 1950s by Nemours Jean-Baptiste, Konpa grew from local dance halls into an international movement, blending Haitian rhythms with jazz, African, and Latin currents.",
    fr: "Cette archive a été créée pour célébrer et préserver la riche histoire du Konpa haïtien. D'abord façonné dans les années 1950 par Nemours Jean-Baptiste, le Konpa est passé des salles de danse locales à un mouvement international, mêlant les rythmes haïtiens au jazz et aux courants africains et latins.",
    ht: "Achiv sa a bati pou selebre ak pwoteje istwa rich Konpa ayisyen an. Premye fòme nan ane 1950 yo pa Nemours Jean-Baptiste, Konpa te grandi soti nan sal dans lokal pou rive yon mouvman entènasyonal, melanje ritm ayisyen ak djaz, ak kouran afriken ak laten."
  },
  aboutIntroCombined2: {
    en: "For decades, it has carried generations through joy, struggle, and celebration, becoming a living soundtrack of Haitian identity. Our mission is not only to archive this legacy but to make it accessible to anyone who wants to learn, study, or simply listen.",
    fr: "Pendant des décennies, il a accompagné des générations à travers la joie, les épreuves et la célébration, devenant une bande sonore vivante de l'identité haïtienne. Notre mission n'est pas seulement d'archiver cet héritage, mais de le rendre accessible à tous ceux qui souhaitent apprendre, étudier ou simplement écouter.",
    ht: "Pandan plizyè deseni, li pote jenerasyon atravè lajwa, difikilte, ak selebrasyon, li vin tounen yon band son vivan idantite ayisyen an. Misyon nou se pa sèlman achive eritaj sa a, men rann li aksesib pou nenpòt moun ki vle aprann, etidye, oswa senpleman koute."
  },
  aboutHereYouWillFind: {
    en: "Here you will find:",
    fr: "Vous y trouverez :",
    ht: "Isit la w ap jwenn :"
  },
  aboutListItem1Title: { en: "Artist Pages:", fr: "Pages d'Artistes :", ht: "Paj Atis :" },
  aboutListItem1Text: {
    en: "dedicated profiles that highlight the musicians, bands, and composers who defined and reinvented Konpa.",
    fr: "des profils dédiés qui mettent en lumière les musiciens, groupes et compositeurs qui ont défini et réinventé le Konpa.",
    ht: "pwofil dedye ki mete aksan sou mizisyen, gwoup, ak konpozitè ki te defini ak reenvante Konpa."
  },
  aboutListItem2Title: { en: "Album Pages:", fr: "Pages d'Albums :", ht: "Paj Albòm :" },
  aboutListItem2Text: {
    en: "cataloged releases with covers, track lists, and details that bring the discography to life.",
    fr: "des publications cataloguées avec pochettes, listes de pistes et détails qui donnent vie à la discographie.",
    ht: "piblikasyon ki katalòge avèk kouvèti, lis mizik, ak detay ki bay diskografi a lavi."
  },
  aboutListItem3Title: { en: "Yearly Displays:", fr: "Affichages Annuels :", ht: "Ekspozisyon Anyèl :" },
  aboutListItem3Text: {
    en: "a timeline view that lets you explore Konpa’s evolution decade by decade, seeing how the sound shifted with history.",
    fr: "une vue chronologique qui vous permet d'explorer l'évolution du Konpa décennie par décennie, en observant comment le son a changé avec l'histoire.",
    ht: "yon vi kwonolojik ki pèmèt ou eksplore evolisyon Konpa a deseni pa deseni, wè kijan son an te chanje avèk listwa."
  },
  aboutGoalCombined1: {
    en: "Konpa is more than entertainment; it is cultural memory. By gathering these works in one place, we ensure the contributions of past and present artists are preserved for future generations.",
    fr: "Le Konpa est plus qu'un divertissement ; c'est une mémoire culturelle. En rassemblant ces œuvres en un seul endroit, nous nous assurons que les contributions des artistes passés et présents sont préservées pour les générations futures.",
    ht: "Konpa se plis pase divètisman; se memwa kiltirèl. Lè nou rasanble zèv sa yo yon sèl kote, nou asire ke kontribisyon atis pase ak prezan yo konsève pou jenerasyon kap vini yo."
  },
  aboutGoalCombined2: {
    en: "This is a grassroots effort, driven by a passion to research, document, and expand this collection. We are committed to ensuring Konpa’s story remains visible and celebrated worldwide.",
    fr: "Il s'agit d'un effort communautaire, animé par la passion de rechercher, documenter et enrichir cette collection. Nous nous engageons à faire en sorte que l'histoire du Konpa reste visible et célébrée dans le monde entier.",
    ht: "Sa a se yon efò de baz, ki pouse pa yon pasyon pou fè rechèch, dokimante, ak elaji koleksyon sa a. Nou angaje nou pou asire istwa Konpa a rete vizib epi selebre atravè lemond."
  },
  aboutThanks: {
    en: "Thank you for helping us honor the legacy of Konpa.",
    fr: "Merci de nous aider à honorer l'héritage du Konpa.",
    ht: "Mèsi paske w ede nou onore eritaj Konpa a."
  },
  // Support Modal
  supportModalTitle: { en: 'Support This Archive', fr: 'Soutenez Cette Archive', ht: 'Sipòte Achiv Sa a' },
  supportModalSubtitle: { en: 'Your contribution helps us preserve Konpa music.', fr: 'Votre contribution nous aide à préserver la musique Konpa.', ht: 'Kontribisyon w ede nou prezève mizik Konpa.' },
  supportModalStripeInfo: { en: 'Click the button to make a secure payment with Stripe.', fr: 'Cliquez sur le bouton pour effectuer un paiement sécurisé avec Stripe.', ht: 'Klike sou bouton an pou fè yon peman sekirize avèk Stripe.' },
  supportOr: { en: 'Or', fr: 'Ou', ht: 'Oubyen' },
  supportScanToDonate: { en: 'Scan to Donate', fr: 'Scannez pour Donner', ht: 'Skane pou Fè Don' },
  // Pagination
  prevPage: { en: 'Previous', fr: 'Précédent', ht: 'Anvan' },
  nextPage: { en: 'Next', fr: 'Suivant', ht: 'Apre' },
  pageOf: { en: 'Page {currentPage} of {pageCount}', fr: 'Page {currentPage} sur {pageCount}', ht: 'Paj {currentPage} sou {pageCount}' },
  loadMore: { en: 'Load More', fr: 'Charger Plus', ht: 'Chaje Plis' },
  // Contact Page & Form
  contactPageTitle: { en: 'Contact Us', fr: 'Contactez-nous', ht: 'Kontakte Nou' },
  contactPageSubtitle: { en: 'Have a question or a suggestion? Drop us a line.', fr: 'Vous avez une question ou une suggestion ? Écrivez-nous.', ht: 'Ou gen yon kesyon oswa yon sijesyon? Voye yon mesaj pou nou.' },
  contactName: { en: 'Name', fr: 'Nom', ht: 'Non' },
  contactEmail: { en: 'Email', fr: 'Email', ht: 'Imèl' },
  contactMessage: { en: 'Message', fr: 'Message', ht: 'Mesaj' },
  contactSend: { en: 'Send Message', fr: 'Envoyer le Message', ht: 'Voye Mesaj' },
  contactSubject: { en: 'Contact Form Submission', fr: 'Soumission du Formulaire de Contact', ht: 'Soumisyon Fòm Kontak' },
  // Footer
  connectTitle: { en: 'Stay Connected', fr: 'Restez Connecté', ht: 'Rete Konekte' },
  connectSubtitle: { en: 'Follow us for updates, musical stories, and behind-the-scenes content from Ayiti Konpa.', fr: 'Suivez-nous pour des mises à jour, des histoires musicales et du contenu des coulisses de Ayiti Konpa.', ht: 'Swiv nou pou mizajou, istwa mizikal, ak kontni dèyè sèn Ayiti Konpa.' },
  footerCopyright: { en: '© {year} Ayiti Konpa. All rights reserved.', fr: '© {year} Ayiti Konpa. Tous droits réservés.', ht: '© {year} Ayiti Konpa. Tout dwa rezève.' },
  footerAdmin: { en: 'Admin: Add Data', fr: 'Admin : Ajouter des Données', ht: 'Admin : Ajoute Done' },
  footerTerms: { en: 'Terms of Use', fr: 'Conditions d\'utilisation', ht: 'Kondisyon Itilizasyon' },
  footerContact: { en: 'Contact Us', fr: 'Contactez-nous', ht: 'Kontakte Nou' },
  // Terms Page
  termsTitle: { en: 'Terms of Use', fr: 'Conditions d\'utilisation', ht: 'Kondisyon Itilizasyon' },
  terms1Title: { en: '1. Purpose of the Website', fr: '1. Objet du Site Web', ht: '1. Objektif Sit wèb la' },
  terms1Text: { en: 'This website provides a curated discography of Konpa music, including information about artists, albums, and related materials. The content is made available for informational, educational, and personal use only. Commercial use of any material from this site is not permitted without prior written consent.', fr: 'Ce site web fournit une discographie organisée de la musique Konpa, incluant des informations sur les artistes, les albums et les documents connexes. Le contenu est mis à disposition à des fins d\'information, d\'éducation et d\'usage personnel uniquement. L\'utilisation commerciale de tout matériel de ce site n\'est pas autorisée sans consentement écrit préalable.', ht: 'Sit wèb sa a bay yon diskografi òganize mizik Konpa, ki gen ladan enfòmasyon sou atis, albòm, ak materyèl ki gen rapò. Kontni an disponib pou enfòmasyon, edikasyon, ak itilizasyon pèsonèl sèlman. Itilizasyon komèsyal nenpòt materyèl sou sit sa a pa pèmèt san konsantman alekri alavans.' },
  terms2Title: { en: '2. Accuracy of Information', fr: '2. Exactitude des Informations', ht: '2. Presizyon Enfòmasyon yo' },
  terms2Text: { en: 'The information published on this website is collected from publicly available sources, community contributions, and independent research. While we aim to maintain accuracy, some details may be incomplete, outdated, or incorrect. We do not warrant the accuracy, reliability, or completeness of the content provided. Users are encouraged to submit corrections or suggestions to improve the archive.', fr: 'Les informations publiées sur ce site web sont collectées à partir de sources publiques, de contributions communautaires et de recherches indépendantes. Bien que nous visions à maintenir l\'exactitude, certains détails peuvent être incomplets, obsolètes ou incorrects. Nous ne garantissons pas l\'exactitude, la fiabilité ou l\'exhaustivité du contenu fourni. Les utilisateurs sont encouragés à soumettre des corrections ou des suggestions pour améliorer l\'archive.', ht: 'Enfòmasyon ki pibliye sou sit wèb sa a kolekte nan sous piblik, kontribisyon kominote a, ak rechèch endepandan. Pandan ke nou fè efò pou kenbe presizyon, gen kèk detay ki ka enkonplè, demode, oswa kòrèk. Nou pa garanti presizyon, fyabilite, oswa entegralite kontni yo bay la. Itilizatè yo ankouraje pou soumèt koreksyon oswa sijesyon pou amelyore achiv la.' },
  terms3Title: { en: '3. Ownership of Content', fr: '3. Propriété du Contenu', ht: '3. Pwopriyete Kontni' },
  terms3Text: { en: 'We do not claim ownership of the music, images, or other artistic works featured on this site. All copyrights remain with their respective owners. The purpose of this website is to document and celebrate Konpa music history, not to distribute or profit from copyrighted works.', fr: 'Nous ne revendiquons pas la propriété de la musique, des images ou des autres œuvres artistiques présentées sur ce site. Tous les droits d\'auteur restent la propriété de leurs détenteurs respectifs. Le but de ce site est de documenter et de célébrer l\'histoire de la musique Konpa, et non de distribuer ou de tirer profit des œuvres protégées par le droit d\'auteur.', ht: 'Nou pa reklame pwopriyete mizik, imaj, oswa lòt zèv atistik ki prezante sou sit sa a. Tout dwa otè rete ak pwopriyetè respektif yo. Objektif sit wèb sa a se dokimante ak selebre istwa mizik Konpa, pa distribye oswa pwofite de zèv ki gen dwa otè.' },
  terms4Title: { en: '4. Privacy and Data Collection', fr: '4. Confidentialité et Collecte de Données', ht: '4. Konfidansyalite ak Koleksyon Done' },
  terms4Text: { en: 'We do not sell, rent, or share user data with third parties. The site does not collect personal data unless explicitly provided by the user (for example, when submitting feedback or contacting us directly). Any information voluntarily shared will be used solely for the purpose of maintaining and improving the website.', fr: 'Nous ne vendons, ne louons, ni ne partageons les données des utilisateurs avec des tiers. Le site ne collecte pas de données personnelles à moins qu\'elles ne soient explicitement fournies par l\'utilisateur (par exemple, lors de la soumission de commentaires ou en nous contactant directement). Toute information partagée volontairement sera utilisée uniquement dans le but de maintenir et d\'améliorer le site web.', ht: 'Nou pa vann, lwe, oswa pataje done itilizatè yo ak twazyèm pati. Sit la pa kolekte done pèsonèl sof si itilizatè a bay li klèman (pa egzanp, lè li soumèt kòmantè oswa kontakte nou dirèkteman). Nenpòt enfòmasyon pataje volontèman pral itilize sèlman nan bi pou kenbe ak amelyore sit wèb la.' },
  terms5Title: { en: '5. Disclaimer of Liability', fr: '5. Déni de Responsabilité', ht: '5. Limit Responsablite' },
  terms5Text: { en: 'The information on this website is provided “as is” for reference purposes. While we work to ensure accuracy, some details about artists, albums, or releases may be incorrect, incomplete, or outdated. We make no guarantees regarding the completeness or reliability of the content. If you notice any errors or missing information, we welcome and encourage your suggestions to help improve the archive. Use of this website is at your own discretion and risk.', fr: 'Les informations sur ce site web sont fournies « telles quelles » à des fins de référence. Bien que nous nous efforçons d\'assurer l\'exactitude, certains détails sur les artistes, les albums ou les sorties peuvent être incorrects, incomplets ou obsolètes. Nous ne garantissons pas l\'exhaustivité ou la fiabilité du contenu. Si vous remarquez des erreurs ou des informations manquantes, nous accueillons et encourageons vos suggestions pour aider à améliorer l\'archive. L\'utilisation de ce site se fait à votre propre discrétion et à vos propres risques.', ht: 'Enfòmasyon sou sit wèb sa a bay "jan li ye a" pou rezon referans. Pandan ke nou travay pou asire presizyon, gen kèk detay sou atis, albòm, oswa piblikasyon ki ka kòrèk, enkonplè, oswa demode. Nou pa bay okenn garanti konsènan entegralite oswa fyabilite kontni an. Si ou remake nenpòt erè oswa enfòmasyon ki manke, nou akeyi ak ankouraje sijesyon ou yo pou ede amelyore achiv la. Itilizasyon sit wèb sa a se sou pwòp diskresyon ak risk ou.' },
  terms6Title: { en: '6. Support and Contributions', fr: '6. Soutien et Contributions', ht: '6. Sipò ak Kontribisyon' },
  terms6Text: { en: 'This website is free to access and use. Visitors who wish to support the initiative may do so by clicking the Support Us button. Contributions are voluntary and help sustain the continued growth and maintenance of the archive. As contributions are applied directly to ongoing upkeep and development, we regret that they are not refundable.', fr: 'L\'accès et l\'utilisation de ce site web sont gratuits. Les visiteurs qui souhaitent soutenir l\'initiative peuvent le faire en cliquant sur le bouton « Soutenez-nous ». Les contributions sont volontaires et aident à soutenir la croissance et la maintenance continues de l\'archive. Étant donné que les contributions sont directement affectées à l\'entretien et au développement continus, nous regrettons qu\'elles ne soient pas remboursables.', ht: 'Sit wèb sa a gratis pou jwenn aksè ak itilize. Vizitè ki vle sipòte inisyativ la ka fè sa lè yo klike sou bouton Sipòte Nou an. Kontribisyon yo se volontè epi yo ede soutni kwasans ak antretyen kontinyèl achiv la. Kòm kontribisyon yo aplike dirèkteman nan antretyen ak devlopman kontinyèl, nou regrèt ke yo pa ranbousab.' },
  terms7Title: { en: '7. Changes to Terms', fr: '7. Modifications des Conditions', ht: '7. Chanjman nan Kondisyon yo' },
  terms7Text: { en: 'We reserve the right to update or revise these terms at any time. Continued use of the website after changes are posted constitutes acceptance of the new terms.', fr: 'Nous nous réservons le droit de mettre à jour ou de réviser ces conditions à tout moment. L\'utilisation continue du site web après la publication des modifications constitue une acceptation des nouvelles conditions.', ht: 'Nou rezève dwa pou mete ajou oswa revize kondisyon sa yo nenpòt ki lè. Itilizasyon kontinyèl sit wèb la apre chanjman yo fin pibliye konstitye akseptasyon nouvo kondisyon yo.' },
  // Cookie Consent
  cookieConsentMessage: { en: 'By using this website, you agree with the', fr: 'En utilisant ce site, vous acceptez les', ht: 'Lè w itilize sit wèb sa a, ou dakò ak' },
  cookieConsentLink: { en: 'Terms of Use', fr: 'Conditions d\'utilisation', ht: 'Kondisyon Itilizasyon yo' },
  cookieConsentAccept: { en: 'OK', fr: 'OK', ht: 'OK' },
  // Spotify
  findOnSpotify: { en: 'Find on Spotify', fr: 'Trouver sur Spotify', ht: 'Jwenn sou Spotify' },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, replacements?: { [key: string]: string | number }) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string, replacements?: { [key: string]: string | number }): string => {
    let translation = translations[key]?.[language] || key;
    if (replacements) {
        Object.keys(replacements).forEach(rKey => {
            const regex = new RegExp(`\\{${rKey}\\}`, 'g');
            translation = translation.replace(regex, String(replacements[rKey]));
        });
    }
    return translation;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};