import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFAB } from "@/components/ui/WhatsAppFAB";
import { ScrollToTop } from "@/components/ui/ScrollToTop";
import { MarketingScripts } from "@/components/MarketingScripts";
import { getSettings } from "@/app/actions/settings-actions";
import { ThemeProvider } from "@/components/ThemeProvider";
import { CurrencyProvider } from "@/context/CurrencyContext";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "EUROMAR IMMO | Agence Immobilière de Luxe à Casablanca",
    template: "%s | EUROMAR IMMO",
  },
  description: "Découvrez les propriétés les plus exclusives à Casablanca. Villas de luxe, appartements haut standing et penthouses avec EUROMAR IMMO, votre partenaire d'investissement immobilier.",
  keywords: [
    "immobilier luxe casablanca",
    "villa à vendre anfa",
    "appartement haut standing maarif",
    "agence immobilière casablanca",
    "euromar immo",
    "propriété de prestige maroc",
    "investissement immobilier casablanca"
  ],
  openGraph: {
    type: 'website',
    locale: 'fr_MA',
    url: 'https://euromar-immo.vercel.app',
    siteName: 'EUROMAR IMMO',
    title: "EUROMAR IMMO | Propriétés d'Exception à Casablanca",
    description: 'Explorez notre collection privée de villas et appartements de luxe.',
    images: [{ url: '/logo.png', width: 1200, height: 630, alt: 'EUROMAR IMMO Logo' }],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSettings();
  return (
    <html lang="fr" className="scroll-smooth" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${inter.variable} ${playfairDisplay.variable} font-sans bg-white text-gray-900 antialiased flex flex-col min-h-screen dark:bg-[#0f131a] dark:text-gray-100 transition-colors duration-300`}
      >
        <MarketingScripts />
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          <CurrencyProvider>
            <Header logoUrl={settings?.logo_url} />
            <ScrollToTop />
            <main className="flex-grow">
              {children}
            </main>
            <Footer logoUrl={settings?.logo_url} />
            <WhatsAppFAB settings={settings} />
          </CurrencyProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
