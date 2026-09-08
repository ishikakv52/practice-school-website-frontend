import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PushSubscribeBanner from "@/components/PushSubscribeBanner";
import { AuthProvider } from "@/lib/auth-context";

export const metadata: Metadata = {
  title: "Nexa Hub School",
  description:
    "Nexa Hub School — CBSE-aligned education in New Delhi. Admissions open for 2026-27.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,500;0,600;0,700;0,900;1,600&family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <AuthProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <PushSubscribeBanner />
        </AuthProvider>
      </body>
    </html>
  );
}