import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
// import AuthContext from "@/context/AuthContext";
// import { CartContextProvider } from "@/context/CartContext";
import { Toaster as SonnarToaster } from "@/components/ui/sonner";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import AuthContext from "@/context/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Goshawk, Your one stop shop for anything online",
  description: "Designed, developed and Powered by Procyon",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthContext>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
            <Toaster />
            <SonnarToaster />
            <main className="min-h-screen">{children}</main>
          </ThemeProvider>
        </AuthContext>
      </body>
    </html>
  );
}
