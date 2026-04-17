import type { Metadata } from "next";
import { Inter, Rajdhani } from "next/font/google";
import { Footer } from "./_components/layout/Footer";
import { Header } from "./_components/layout/Header";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const rajdhani = Rajdhani({
  variable: "--font-rajdhani",
  weight: ["500", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NEXUS | Academic & Industry Bridge",
  description:
    "NEXUS is a platform that connects academics and industry professionals to share knowledge and collaborate on projects.",
  verification: {
    google: "hrc6LWzN4KjJJtzsiVIH7PxE3phXxrEr4uWSSjQHM6w",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      data-theme="dark"
      lang="en"
      className={`${inter.variable} ${rajdhani.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
