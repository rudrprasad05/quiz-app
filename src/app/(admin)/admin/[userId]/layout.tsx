import { GetCurrentUserOnly } from "@/actions/user";
import Footer from "@/components/global/Footer";
import Navbar from "@/components/nav/NavBar";
import SideNav from "@/components/nav/SideNav";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { redirect } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Quiz App Admin",
  description: "Designed, developed and Powered by Procyon",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await GetCurrentUserOnly();
  if (!user) return redirect("/");
  return (
    <main className="min-h-screen flex">
      <SideNav user={user} />
      <div className="p-12 grow">{children}</div>
    </main>
  );
}
