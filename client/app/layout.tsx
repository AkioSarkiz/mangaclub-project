import type { Metadata } from "next";
import { Inter } from "next/font/google";
import React from "react";
import Container from "../components/Container";
import Drawer from "../components/Drawer";
import Navbar from "../components/Navbar";
import { ClerkProvider } from "@clerk/nextjs";
import { GoogleAnalytics } from "@next/third-parties/google";

import "./main.css";

export const metadata: Metadata = {
  title: "Mangaclub",
  description: "Mangaclub is a manga reading website",
};

const inter = Inter({ subsets: ["latin"] });

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const ANALYTICS_TRACKING_ID =
    process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_TRACKING_ID || "";

  return (
    <html lang="en">
      <head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>

      <body className={inter.className}>
        <ClerkProvider>
          <Container>
            <Drawer />
            <Navbar />

            {children}
          </Container>
        </ClerkProvider>
      </body>

      <GoogleAnalytics gaId={ANALYTICS_TRACKING_ID} />
    </html>
  );
};

export default RootLayout;
