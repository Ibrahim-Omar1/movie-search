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
  metadataBase: new URL("https://your-domain.com"),
  title: {
    template: "%s | Movie Search",
    default: "Movie Search | Find Your Favorite Movies",
  },
  description: "Search and discover movies from the OMDB database. Get detailed information about movies, including plot, cast, ratings, and more.",
  keywords: ["movies", "search", "OMDB", "film database", "movie information"],
  authors: [{ name: "Your Name" }],
  creator: "Your Name",
  publisher: "Your Name",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    siteName: "Movie Search",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    creator: "@yourusername",
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
