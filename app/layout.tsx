import type { Metadata } from "next";
import "./globals.css";

const title = "AQUATERRA.UZ — всё для вашего аквариума";
const description =
  "Аквариумные рыбки, растения, аквариумы и аксессуары в Ташкенте.";
const siteUrl = "https://aquaterra-uz-card.bloodempireprice1.chatgpt.site";
const socialImage = new URL("/og.png", siteUrl).toString();

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    type: "website",
    locale: "ru_RU",
    url: siteUrl,
    images: [
      {
        url: socialImage,
        width: 1536,
        height: 1024,
        alt: "AQUATERRA.UZ — Живой мир воды",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [socialImage],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
