import type { Metadata } from "next";
import { Outfit } from "next/font/google";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./globals.css";

import Navbar from "@/components/navbar";
import { AppContextProvider } from "@/context/app-context";
import Footer from "@/components/footer";
import AuthFrom from "@/components/auth";

const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-outfit",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Imagify",
  description: "Generate images from text",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.className} antialiased`}>
        <AppContextProvider>
          <div className="px-4 sm:px-10 md:px-14 lg:px-28 min-h-screen bg-gradient-to-b from-teal-50 to-orange-50">
            <Navbar />
            <AuthFrom />
            {children}
            <ToastContainer />
            <Footer />
          </div>
        </AppContextProvider>
      </body>
    </html>
  );
}
