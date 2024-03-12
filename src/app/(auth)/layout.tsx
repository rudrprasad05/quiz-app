import type { Metadata } from "next";
import { Inter } from "next/font/google";

import Footer from "@/components/global/Footer";
import Navbar from "@/components/nav/NavBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Quiz App",
  description: "Designed, developed and Powered by Procyon",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen">
      <Navbar />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </main>
  );
}
