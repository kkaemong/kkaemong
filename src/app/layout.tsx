import type { Metadata } from "next";
import { Inter, Outfit, Gaegu, Single_Day } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const gaegu = Gaegu({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-gaegu",
  display: "swap",
});

const singleDay = Single_Day({
  weight: ["400"],
  variable: "--font-single-day",
  display: "swap",
});

export const metadata: Metadata = {
  title: "진준영 포트폴리오",
  description: "게임 클라이언트 개발자 진준영의 포트폴리오입니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Gaegu:wght@400;700&family=Single+Day&display=swap" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/raqsonu/galmuri/dist/galmuri.css" />
      </head>
      <body
        className={`${inter.variable} ${outfit.variable} ${gaegu.variable} ${singleDay.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}