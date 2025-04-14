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
  title: "Gabriel Krishna | Desenvolvedor Full-Stack",
  description: "Portfólio de desenvolvedor front-end especializado em interfaces modernas, minimalistas e funcionais.",
  keywords: "desenvolvedor, front-end, portfolio, react, next.js, ui, ux, design",
  authors: [{ name: "Gabriel Krishna" }],
  robots: "index, follow",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-icon.png",
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://seudominio.com",
    title: "Seu Nome | Desenvolvedor Front-end",
    description: "Portfólio de desenvolvedor front-end especializado em interfaces modernas, minimalistas e funcionais.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Gabriel Krishna - Portfólio"
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Seu Nome | Desenvolvedor Front-end",
    description: "Portfólio de desenvolvedor front-end especializado em interfaces modernas, minimalistas e funcionais.",
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