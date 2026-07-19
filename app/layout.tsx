import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header/Header";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";
import AuthProvider from "@/components/AuthProvider/AuthProvider";

const manrope = Manrope({
  variable: "--font-primary",
  subsets: ["cyrillic"],
  weight: ["500", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "PetLove",
  description: "PetLove by Denys Boreiko",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${manrope.variable} `}>
      <body>
        <TanStackProvider>
          <AuthProvider>
            <Header />
            {children}
          </AuthProvider>
        </TanStackProvider>
      </body>
    </html>
  );
}
