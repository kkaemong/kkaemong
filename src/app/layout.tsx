import type { Metadata } from "next";
import { Inter, Outfit, Noto_Serif_KR, Poor_Story } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const notoSerif = Noto_Serif_KR({
  weight: ["300", "400", "600"],
  subsets: ["latin"],
  variable: "--font-noto-serif",
  display: "swap",
  preload: false,
});

// 심플 이력서를 뺀 나머지 화면에 쓰는, 사람이 손으로 쓴 듯한 글씨체
const hand = Poor_Story({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-hand",
  display: "swap",
  preload: false,
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
    <html lang="ko" className="scroll-smooth" suppressHydrationWarning>
      <head>
        {/* 저장된 나이트 모드 선택을 첫 화면이 그려지기 전에 적용해서 깜빡임을 막는다 */}
        <script
          dangerouslySetInnerHTML={{
            __html: "try{if(localStorage.getItem('theme')==='dark')document.documentElement.classList.add('dark')}catch(e){}",
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${outfit.variable} ${notoSerif.variable} ${hand.variable} antialiased`}
      >
        {/* 나이트 모드 색 변환: 흰색 -> 푸른 회색(#455878), 검정 -> 밝은 회색. 채널마다 out = L - (L - T) * in */}
        <svg aria-hidden width="0" height="0" style={{ position: "absolute" }}>
          <defs>
            <filter id="night" colorInterpolationFilters="sRGB">
              <feColorMatrix type="matrix" values="-0.572 0 0 0 0.96  0 -0.485 0 0 0.96  0 0 -0.35 0 0.97  0 0 0 1 0" />
            </filter>
            <filter id="night-inv" colorInterpolationFilters="sRGB">
              <feColorMatrix type="matrix" values="-1.748 0 0 0 1.678  0 -2.062 0 0 1.979  0 0 -2.857 0 2.771  0 0 0 1 0" />
            </filter>
          </defs>
        </svg>
        {children}
      </body>
    </html>
  );
}