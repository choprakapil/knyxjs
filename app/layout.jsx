import "./globals.css";
import { withBasePath } from "@/lib/asset";
import MagicCursor from "@/components/layout/MagicCursor";
import ScrollCleanup from "@/components/layout/ScrollCleanup";

const cssAssets = [
  "/assets/css/bootstrap.css",
  "/assets/css/swiper-bundle.css",
  "/assets/css/magnific-popup.css",
  "/assets/css/font-awesome-pro.css",
  "/assets/css/spacing.css",
  "/assets/css/main.css",
];

import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "KNYX",
  description: "A Next.js port of the KNYX Website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="no-js aleric-dark" suppressHydrationWarning>
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
      <body className={`tp-magic-cursor ${inter.className}`} suppressHydrationWarning>
        <ScrollCleanup />
        <MagicCursor />
        {children}
      </body>
    </html>
  );
}
