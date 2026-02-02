import "./globals.css";
import type { ReactNode } from "react";
import type { Metadata } from "next";

// import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Providers from "./providers"; // 👈 add this

export const metadata: Metadata = {
  title: "Life Worth Living",
  description: "A film experience worth living for",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-950 text-white antialiased">
        <Providers>
         
          <main className="min-h-screen">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
