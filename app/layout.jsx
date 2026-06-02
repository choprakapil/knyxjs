import "./globals.css";
import { withBasePath } from "@/lib/asset";
import ScrollCleanup from "@/components/layout/ScrollCleanup";
import { SiteSettingsProvider } from "@/components/providers/SiteSettingsProvider";

const cssAssets = [
  "/assets/css/bootstrap.css",
  "/assets/css/swiper-bundle.css",
  "/assets/css/magnific-popup.css",
  "/assets/css/font-awesome-pro.css",
  "/assets/css/spacing.css",
  "/assets/css/main.css",
];

import {
  Inter,
  Space_Grotesk,
  Kanit,
  DM_Sans,
  Poppins,
  Sora,
  Plus_Jakarta_Sans,
  Playfair_Display,
  Teko,
  Familjen_Grotesk,
} from "next/font/google";
import { siteData } from "@/lib/data/site";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-grotesk",
});

const kanit = Kanit({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-kanit",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-sans",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-poppins",
});

const sora = Sora({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sora",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jakarta",
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
});

const teko = Teko({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-teko",
});

const familjenGrotesk = Familjen_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-familjen",
});

const fontVariables = [
  inter.variable,
  spaceGrotesk.variable,
  kanit.variable,
  dmSans.variable,
  poppins.variable,
  sora.variable,
  plusJakartaSans.variable,
  playfairDisplay.variable,
  teko.variable,
  familjenGrotesk.variable,
].join(" ");

export const metadata = {
  title: siteData.seo.title,
  description: siteData.seo.description,
  keywords: siteData.seo.keywords,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`no-js aleric-dark ${fontVariables}`} suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="format-detection" content="telephone=no" />
        <link
          rel="shortcut icon"
          href={withBasePath("/assets/img/logo/favicon.png")}
        />
        {cssAssets.map((href) => (
          <link key={href} rel="stylesheet" href={withBasePath(href)} />
        ))}
      </head>
      <body className={`${inter.className}`} suppressHydrationWarning>
        <SiteSettingsProvider>
          <ScrollCleanup />
          {children}
        </SiteSettingsProvider>
      </body>
    </html>
  );
}

