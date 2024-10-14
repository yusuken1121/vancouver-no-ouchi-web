import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Noto_Sans_JP } from "next/font/google";

import "./globals.css";
import { headers } from "next/headers";
import { UAParser } from "ua-parser-js";

const fontNotoSansJP = Noto_Sans_JP({ subsets: ["latin"] });

export async function generateMetadata() {
  const headersList = headers();
  const ua = headersList.get("user-agent");

  const device = new UAParser(ua || "").getDevice();

  const isMobile = device.type === "mobile";

  if (isMobile) {
    return {
      title: "バンクーバーのお家",
      description:
        "詐欺の心配一切なし。バンクーバーの安心安全お部屋探しサービス。語学留学やCoop留学を決めた方。渡航前に住む場所を決めたい方にも。シェアハウスやホームステイ、お問い合わせください！",
      icons: { icon: "/favicon.ico" },
    };
  } else {
    return {
      title: "バンクーバーのお家",
      description:
        "詐欺の心配一切なし。日本からでもバンクーバーのお家が契約できるサービス。語学留学やCoop留学を決めたあなたに、家主と直接交渉をしたシェアハウスやホームステイなど、バンクーバーのお部屋をご紹介します。リモート内見も対応可能で、渡航前に住む場所を決めたい方にもピッタリ！まずはお気軽にご相談ください！",
      icons: { icon: "/favicon.ico" },
    };
  }
}
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={fontNotoSansJP.className}>{children}</body>
    </html>
  );
}
