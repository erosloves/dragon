import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
// components start

import { ToggleMenuProvider } from "@/contexts/ToggleMenu";

import Header from "@/components/Header/Header";
import { PopupMenu } from "@/components/PopupMenu/PopupMenu";
import Transition from "./template";
// components end

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "the dragon mm",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="container">
          <ToggleMenuProvider>
            <PopupMenu />
            <Header />
            {children}
          </ToggleMenuProvider>
        </div>
      </body>
    </html>
  );
}
