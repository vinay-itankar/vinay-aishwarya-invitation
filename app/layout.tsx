import type { Metadata } from "next";
import { Cormorant_Garamond, Geist, Geist_Mono, Great_Vibes } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-invitation-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const greatVibes = Great_Vibes({
  variable: "--font-invitation-script",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Vinay & Aishwarya | Wedding Invitation",
  description: "Join Vinay Itankar and Aishwarya Likhitkar for their wedding celebrations on 27, 29, and 30 November 2026.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${cormorant.variable} ${greatVibes.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
