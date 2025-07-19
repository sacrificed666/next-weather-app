import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import ReduxProvider from "@/components/providers/ReduxProvider";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Next.js Weather App",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={montserrat.className}>
      <body className="min-h-svh flex flex-col justify-center items-center text-white/90 bg-[url('/bg.jpg')] bg-cover bg-center bg-no-repeat">
        <ReduxProvider>
          <Header />
          <main className="max-w-7xl p-4 md:p-5 flex flex-1 flex-col justify-center items-center gap-1">{children}</main>
          <Footer />
        </ReduxProvider>
      </body>
    </html>
  );
}
