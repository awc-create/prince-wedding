import type { Metadata } from "next";
import "./globals.css";
import { wedding } from "@/lib/wedding";

export const metadata: Metadata = {
  title: `${wedding.siteName} — October 30, 2026`,
  description: `${wedding.tagline}. Join Jacob & Angelie on October 30, 2026 in Cebu City, Philippines.`
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
