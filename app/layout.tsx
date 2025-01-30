import { BackToTop } from "@/components/back-to-top";
import { Navbar } from "@/components/navbar";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  // TODO: change domain to vercel domain
  metadataBase: new URL("http://localhost:3000"),
  title: {
    template: "%s | Movie Search",
    default: "Movie Search | Find Your Favorite Movies",
  },
  description: "Search and discover movies from the OMDB database. Get detailed information about movies, including plot, cast, ratings, and more.",
  alternates: {
    canonical: "../",
  },
  keywords: ["movies", "search", "OMDB", "film database", "movie information"],
  authors: [{ name: "Ibrahim Omar" }],
  creator: "Ibrahim Omar",
  publisher: "Ibrahim Omar",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Movie Search | Popular Movies",
    description: "Search and discover popular movies from OMDB database",
    type: "website",
    siteName: "Movie Search",
    locale: "en_US",
    images: [
      {
        url: "/opengraph.jpg",
        width: 1200,
        height: 630,
        alt: "Movie Search",
      },
    ],
    url: "http://localhost:3000",

  },
  twitter: {
    card: "summary_large_image",
    creator: "ebrahim_omar4",
    title: "Movie Search | Popular Movies",
    description: "Search and discover popular movies from OMDB database",
    images: ["/opengraph.jpg"],
    creatorId: "ebrahim_omar4",
    siteId: "ebrahim_omar4",
    site: "ebrahim_omar4",
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icon', type: 'image/png', sizes: '32x32' },
    ],
    apple: [
      { url: '/apple-icon', type: 'image/png', sizes: '180x180' },
    ],
    other: [
      {
        rel: 'mask-icon',
        url: '/favicon.svg',
        color: '#000000',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        // className={`${geistMono.variable} antialiased`}
        className={cn(
          "antialiased font-geist min-h-screen",
          geistMono.variable,
          geistSans.variable
        )}
      >
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <BackToTop />
      </body>
    </html>
  );
}
