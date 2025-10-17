import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import QueryProvider from "./components/QueryProvider.jsx";
import ReduxProvider from "./components/ReduxProvider.jsx";
import AuthInitializer from "./components/AuthInitializer.jsx";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Product Manager - BiTechX Assignment",
  description: "A modern product management application built with Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        <ReduxProvider>
          <QueryProvider>
            <AuthInitializer />
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
            <Toaster />
          </QueryProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
