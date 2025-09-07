import { Metadata } from "next";
import { Montserrat } from "next/font/google";
import ReduxProvider from "@/components/providers/ReduxProvider";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Weather App",
  description: "A modern weather application built with Next.js, Redux Toolkit, and Tailwind CSS.",
  keywords: ["Weather", "Forecast", "Next.js", "Redux Toolkit", "Tailwind CSS"],
  authors: [{ name: "Illia Movchko", url: "https://github.com/sacrificed666" }],
  creator: "Illia Movchko",
  publisher: "Illia Movchko",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={montserrat.className}>
      <body className="min-h-svh center flex-col text-center text-white/90 bg-[url('/ui/bg.webp')] bg-cover bg-center bg-no-repeat">
        <ReduxProvider>
          <Header />
          <main className="max-w-7xl w-full p-4 md:p-5 center flex-1 flex-col gap-1">{children}</main>
          <Footer />
        </ReduxProvider>
      </body>
    </html>
  );
}
