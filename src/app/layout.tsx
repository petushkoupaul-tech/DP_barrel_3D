import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://dp-barrel-spirits.vercel.app"),
  alternates: {
    canonical: "/",
  },
  title: "DP Barrels & Spirit — Crafted by Nature. Aged by Time.",
  description:
    "Ремесленные деревянные бочки, созданные с вниманием к материалу, деталям и качеству.",
  openGraph: {
    title: "DP Barrels & Spirit — Crafted by Nature. Aged by Time.",
    description:
      "Ремесленные деревянные бочки, созданные с вниманием к материалу, деталям и качеству.",
    images: [
      {
        url: "/media/philosophy/2.webp",
        alt: "Дубовая бочка DP Barrel & Spirit с латунным краном и фирменной эмблемой",
        width: 1109,
        height: 1419,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DP Barrels & Spirit — Crafted by Nature. Aged by Time.",
    description:
      "Ремесленные деревянные бочки, созданные с вниманием к материалу, деталям и качеству.",
    images: ["/media/philosophy/2.webp"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
