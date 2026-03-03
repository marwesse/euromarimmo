import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFAB } from "@/components/ui/WhatsAppFAB";
import { ScrollToTop } from "@/components/ui/ScrollToTop";
import { getSettings } from "@/app/actions/settings-actions";
import { ThemeProvider } from "@/components/ThemeProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "EUROMAR IMMO | L'Immobilier d'Exception au Maroc",
  description: "Découvrez l'exception. Vivez l'exclusivité avec EUROMAR IMMO, votre partenaire pour l'immobilier de prestige et de luxe au Maroc (Marrakech, Casablanca, Tanger).",
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
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          <Header logoUrl={settings?.logo_url} />
          <ScrollToTop />
          <main className="flex-grow">
            {children}
          </main>
          <Footer logoUrl={settings?.logo_url} />
          <WhatsAppFAB settings={settings} />
        </ThemeProvider>
      </body>
    </html>
  );
}
