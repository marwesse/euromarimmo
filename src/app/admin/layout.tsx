import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "../globals.css";
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
    title: "Admin | EUROMAR IMMO",
    description: "Espace d'administration EUROMAR IMMO",
};

export default function AdminRootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="fr" className="scroll-smooth" suppressHydrationWarning>
            <body
                suppressHydrationWarning
                className={`${inter.variable} ${playfairDisplay.variable} font-sans bg-white text-gray-900 antialiased flex flex-col min-h-screen dark:bg-[#0f131a] dark:text-gray-100 transition-colors duration-300`}
            >
                <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
                    {children}
                </ThemeProvider>
            </body>
        </html>
    );
}
