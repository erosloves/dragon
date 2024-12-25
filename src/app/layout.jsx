import "./globals.css";

import { Inter } from "next/font/google";
// components start

import { UserProvider } from "@auth0/nextjs-auth0/client";
import { ToggleMenuProvider } from "@/contexts/ToggleMenu";

import Header from "@/components/Header/Header";
import { PopupMenu } from "@/components/PopupMenu/PopupMenu";
import Footer from "@/components/Footer";

// components end

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "The Dragon MM",
  description: "International model agency The Dragon Model Management",
  keywords: "thedragonmm, model agencies, mother agency",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <UserProvider>
          <ToggleMenuProvider>
            <Header />
            <PopupMenu />
            {children}
            <Footer key={`footer`} />
          </ToggleMenuProvider>
        </UserProvider>
      </body>
    </html>
  );
}
