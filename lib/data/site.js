import { productCategories } from "./products";

export const siteData = {
  logo: {
    light: "/assets/img/logo/logo-white-2.png",
    dark: "/assets/img/logo/logo-black.png",
    alt: "KNYX Logo"
  },
  contact: {
    phone: "+1 (234) 567 890",
    email: "info@knyx.com",
    address: {
      line1: "A16 Adarsh Nagar, New Delhi. Delhi,",
      line2: "India 110088"
    }
  },
  socials: [
    { network: "facebook", url: "/" },
    { network: "twitter", url: "/" },
    { network: "instagram", url: "/" },
    { network: "linkedin", url: "/" }
  ],
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
      { label: "Stockists", href: "/stockists" }
    ]
  }
};
