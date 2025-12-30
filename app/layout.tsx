import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const urbanist = localFont({
  src: "/fonts/Urbanist-VariableFont_wght.ttf",
  variable: "--font-urbanist",
});

export const metadata: Metadata = {
  title: "20-dollar club",
  description: "A community for creating wealth together.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={urbanist.variable}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
