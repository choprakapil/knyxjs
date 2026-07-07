import { productCategories } from "./products";

export const siteData = {
  logo: {
    light: "/assets/img/logo/logo-white-2.png",
    dark: "/assets/img/logo/logo-black.png",
    alt: "KNYX Logo"
  },
  contact: {
    phone: "",
    email: "contact@knyxsports.com",
    address: {
      line1: "",
      line2: ""
    }
  },
  socials: [
    { network: "instagram", url: "https://www.instagram.com/knyxsports/" }
  ],
  ui: {
    searchPlaceholder: "Search...",
    viewProductBtn: "View Product",
    locationHeading: "Location",
    contactHeading: "Contact",
    socialsHeading: "Stalk Us",
    copyrightText: (year) => `Copyright ${year} KNYX. All Rights Reserved.`,
    comingSoonMsg: "Coming soon",
    comingSoonSubText: "A curated space for our elite gear is under construction.",
    accessoriesHeading: "NECK SHIELD PRO",
    sizingHeading: "Helmet Sizing",
    colorsHeading: "Available Colors",
    sizeHeading: "Sizes Available",
    grilleLabel: "Grille : ",
    certLabel: "Certificate : ",
    keyFeaturesHeading: "Key Features",
    viewCertBtn: "View Certificate of Authenticity",
    featureDetailBadge: "Feature Detail",
    certificate: {
      title: "Certificate of Authenticity",
      certifiesText: "This certifies that",
      complianceText: "Has undergone rigorous safety testing and meets or exceeds all international sporting safety compliance standards (ISO 9001, CE, BSI).",
      qaLeadLabel: "Quality Assurance Lead",
      issuanceDateLabel: "Date of Issuance"
    }
  },
  seo: {
    title: "KNYX | Engineered Sports Protection",
    description: "KNYX represents the modern athlete — focused, fearless, and equipped with elite sports protection designed for the spirit of the knight.",
    keywords: "KNYX, sports protection, cricket helmets, tactical faceguard, sports engineering, athlete safety"
  },
  pages: {
    products: {
      title: "Products",
      eyebrow: "Elite Ecosystem",
      description: "Explore the advanced engineering behind our flagship protection modules."
    },
    contact: {
      title: "Contact Us",
      eyebrow: "Get In Touch",
      description: "Connect with us for enquiries, elite sporting partnerships, and brand support."
    }
  },
  menus: {
    main: [
      { label: "Home", href: "/" },
      { label: "Brand Story", href: "/#brand-story" },
      { label: "Technology", href: "/technology" },
      {
        label: "Products",
        href: "javascript:void(0)",
        dropdown: productCategories.map(cat => ({
          label: cat.name,
          href: `/products/${cat.slug}`
        }))
      },
      { label: "Distributors", href: "/distributors" },
      // { label: "Documents", href: "/doc" } // Hidden — re-enable to show
    ]
  }
};
