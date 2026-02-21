import { Cormorant_Garamond, Jost } from "next/font/google";
import "./globals.css";
import { weddingData } from "@/lib/data";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const jost = Jost({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500"],
  variable: "--font-jost",
  display: "swap",
});

export const metadata = {
  title: weddingData.meta.title,
  description: weddingData.meta.description,
  metadataBase: new URL(weddingData.meta.siteUrl),
  openGraph: {
    title: weddingData.meta.title,
    description: weddingData.meta.description,
    url: weddingData.meta.siteUrl,
    siteName: `Pernikahan ${weddingData.groom.firstName} & ${weddingData.bride.firstName}`,
    images: [
      {
        url: weddingData.meta.ogImage,
        width: 1200,
        height: 630,
        alt: weddingData.meta.title,
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: weddingData.meta.title,
    description: weddingData.meta.description,
    images: [weddingData.meta.ogImage],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" className={`${cormorant.variable} ${jost.variable}`}>
      <body className="bg-ivory text-charcoal antialiased">{children}</body>
    </html>
  );
}
