import dns from "node:dns";
dns.setServers(["8.8.8.8", "8.8.4.4"]);

import { Suspense } from "react";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import Navbar from "@/components/navbar/Navbar";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata = {
  title: "Blood",
  description: "Blood for saving life",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      data-theme="light"
      className={`${outfit.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Suspense
          fallback={<div className="h-16 w-full animate-pulse bg-white" />}
        >
          <Navbar />
        </Suspense>

        <main>
          {children}
          <Toaster position="top-right" richColors expand={false} />
        </main>
      </body>
    </html>
  );
}
