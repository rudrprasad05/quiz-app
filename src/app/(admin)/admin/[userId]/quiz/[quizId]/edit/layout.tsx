import { GetCurrentUserOnly } from "@/actions/user";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { redirect } from "next/navigation";
import { QuestionContextProvider } from "@/context/QuesitonContext";

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
    <main className="min-h-screen flex w-full grow">
      <QuestionContextProvider>{children}</QuestionContextProvider>
    </main>
  );
}
