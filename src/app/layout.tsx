import type { Metadata } from "next";
import { Inter, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// Fontes
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const geistSans = Geist({ 
  subsets: ["latin"], 
  variable: "--font-geist-sans", 
  display: "swap" 
});
const geistMono = Geist_Mono({ 
  subsets: ["latin"], 
  variable: "--font-geist-mono", 
  display: "swap" 
});

// Configuração de Metadados
export const metadata: Metadata = {
  title: "Gabriel Krishna | Full-Stack Developer and Data Engineer",
  description: "Full-Stack Developer and Data Engineer porfolio website",
  keywords: "developer, front-end, back-end, full-stack, data engineer, portfolio, react, next.js",
  authors: [{ name: "Gabriel Krishna" }],
  robots: "index, follow",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-icon.png",
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://gabrielkrishna.vercel.app/",
    title: "Gabriel Krishna | Full-Stack Developer and Data Engineer",
    description: "Full-Stack Developer and Data Engineer porfolio website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Gabriel Krishna - Portfolio"
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gabriel Krishna | Full-Stack Developer and Data Engineer",
    description: "Full-Stack Developer and Data Engineer porfolio website",
    images: ["/og-image.jpg"],
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${inter.variable} ${geistSans.variable} ${geistMono.variable} antialiased selection:bg-purple-500/30 selection:text-white`}>
        {children}
      </body>
    </html>
  );
}