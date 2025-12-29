import type { Metadata } from "next";
import localfont from "next/font/local";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const lato = localfont({
  src: [
    {
      path: "./fonts/Lato-Black.ttf",
      weight: "900",
      style: "normal",
    },
    {
      path: "./fonts/Lato-BlackItalic.ttf",
      weight: "900",
      style: "italic",
    },
    {
      path: "./fonts/Lato-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/Lato-BoldItalic.ttf",
      weight: "700",
      style: "italic",
    },
    {
      path: "./fonts/Lato-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/Lato-Italic.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "./fonts/Lato-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "./fonts/Lato-LightItalic.ttf",
      weight: "300",
      style: "italic",
    },
    {
      path: "./fonts/Lato-Thin.ttf",
      weight: "100",
      style: "normal",
    },
    {
      path: "./fonts/Lato-ThinItalic.ttf",
      weight: "100",
      style: "italic",
    },
  ],
  variable: "--font-lato",
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
        className={`${lato.variable} ${lato.variable} antialiased`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
