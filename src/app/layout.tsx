import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DP Barrels & Spirit — Crafted by Nature. Aged by Time.",
  description:
    "Ремесленные деревянные бочки, созданные с вниманием к материалу, деталям и качеству.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
