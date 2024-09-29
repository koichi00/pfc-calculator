import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import HeaderButton from "./_components/authButton/HeaderButton";
import { AuthContextProvider } from "@/store/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PFC計算機",
  description: "PFC計算機で日々の面倒な計算を簡単に。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${inter.className} bg-gray-50`}>
        <AuthContextProvider>
          <header className="py-2 px-4 bg-white shadow-sm fixed w-full top-0">
            <div className="flex max-w-[1280px] justify-between mx-auto items-center">
              <Link href={"/"}>
                <h1 className="text-2xl font-bold">PFC calculator</h1>
              </Link>
              <HeaderButton />
            </div>
          </header>
          <div className="pt-16">{children}</div>
        </AuthContextProvider>
      </body>
    </html>
  );
}
