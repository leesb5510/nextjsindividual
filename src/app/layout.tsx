import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "포켓몬 도감 만들기",
  description: "마지막 개인 과제",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="pokemon-list">
          <header className="rounded p-5 flex flex-col items-center justify-center bg-[#333333] text-white text-center">
            <h1 className="text-2xl">나만의 포켓몬 도감</h1>
          </header>
          {children}
        </div>
      </body>
    </html>
  );
}
