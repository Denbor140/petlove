import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import Header from "@/components/Layout/Header/Header";
import TanStackProvider from "@/components/Providers/TanStackProvider/TanStackProvider";
import AuthProvider from "@/components/Providers/AuthProvider/AuthProvider";
import { ModalProvider } from "@/components/Providers/ModalProvider/ModalProvider";

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
            <ModalProvider>
              <Header />
              {children}
            </ModalProvider>
          </AuthProvider>
        </TanStackProvider>
      </body>
    </html>
  );
}
