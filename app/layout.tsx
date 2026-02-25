import type { Metadata } from "next";
import { SITE_NAME } from "@/data/site";
import {
  Cormorant_Garamond,
  Inter,
  Mrs_Saint_Delafield,
} from "next/font/google";
import "./globals.css";

const cormorantGaramond = Cormorant_Garamond({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-cormorant-garamond",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const mrsSaintDelafield = Mrs_Saint_Delafield({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-mrs-saint-delafield",
});

export const metadata: Metadata = {
  title: SITE_NAME,
  description: "Керамика Санкт-Петербурга — авторские изделия ручной работы",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body
        className={`${cormorantGaramond.variable} ${inter.variable} ${mrsSaintDelafield.variable} font-sans antialiased overflow-x-hidden`}
      >
        {children}
      </body>
    </html>
  );
}
