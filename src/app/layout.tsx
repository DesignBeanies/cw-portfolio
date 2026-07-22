import type { Metadata } from "next";
import Script from "next/script";
import { DM_Sans, Space_Grotesk } from "next/font/google";

import { StyleGuard } from "@/components/StyleGuard";

import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Chaela Watkins · Senior UX & Product Designer",
  description:
    "Portfolio of Chaela Watkins, UX and product designer focused on research-driven, outcomes-first product experiences.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-bg">
      <body
        className={`${spaceGrotesk.variable} ${dmSans.variable} font-body antialiased`}
      >
        <Script id="scroll-to-top-on-load" strategy="beforeInteractive">
          {`if ("scrollRestoration" in history) history.scrollRestoration = "manual";
if (location.hash) history.replaceState(null, "", location.pathname);
window.scrollTo(0, 0);`}
        </Script>
        <StyleGuard />
        {children}
      </body>
    </html>
  );
}
