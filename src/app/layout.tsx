import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Image from "next/image";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DL News",
  description: "DL News - Markets, DeFi, Regulation and Top Cryptocurrency News",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav className="flex justify-center items-center w-full sticky h-16 bg-white z-50">
          <Link className="text-black" href="/" >DL News</Link>
        </nav>
        {children}
      </body>
    </html>
  );
}
