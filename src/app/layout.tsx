import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "Next.js Weather App",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-svh flex flex-col justify-center items-center">
        <Header />
        <main className="max-w-7xl p-4 flex flex-1 flex-col justify-center items-center gap-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
