import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import SeasonalEffects from "@/components/SeasonalEffects";
import ThemeCSSVariables from "@/components/ThemeCSSVariables";
import { LanguageProvider } from "@/context/LanguageContext";
import { ThemeProvider } from "@/context/ThemeContext";
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
  metadataBase: new URL('https://rikoprasetya.com'), // Placeholder domain
  title: {
    default: "Arik Riko Prasetya | Full Stack Developer & Designer",
    template: "%s | Arik Riko Prasetya"
  },
  description: "A premium portfolio showcasing high-performance web applications, modern design systems, and strategic engineering solutions.",
  keywords: ["Full Stack Developer", "Software Engineer", "React", "Next.js", "TypeScript", "UI/UX Design", "Indonesia", "Portfolio"],
  authors: [{ name: "Arik Riko Prasetya", url: "https://rikoprasetya.com" }],
  creator: "Arik Riko Prasetya",
  publisher: "Arik Riko Prasetya",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: "/favicon.svg",
    apple: "/apple-touch-icon.png", // Assumed existence or fallback
  },
  openGraph: {
    title: "Arik Riko Prasetya | Full Stack Developer & Designer",
    description: "Creating digital experiences that blend aesthetic excellence with engineering precision.",
    url: "https://rikoprasetya.com",
    siteName: "Arik Riko Portfolio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.png", // Needs to be added to public/
        width: 1200,
        height: 630,
        alt: "Arik Riko Prasetya Portfolio Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Arik Riko Prasetya | Full Stack Developer & Designer",
    description: "Creating digital experiences that blend aesthetic excellence with engineering precision.",
    images: ["/og-image.png"], // Needs to be added to public/
    // creator: "@yourtwitterhandle", // Optional
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://rikoprasetya.com',
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
        <ThemeProvider>
          <ThemeCSSVariables />
          <LanguageProvider>
            <SeasonalEffects />
            <SmoothScroll>{children}</SmoothScroll>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
