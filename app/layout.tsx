import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/context/AppContext";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Interview Prep AI — Personalized Interview Preparation",
  description:
    "A structured interview preparation system that understands you, builds your personalized prep path, coaches your answers, and tracks your progress.",
  keywords: ["interview preparation", "AI coach", "job interview", "career"],
  openGraph: {
    title: "Interview Prep AI",
    description: "Personalized interview preparation that actually guides you.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`dark ${inter.variable}`} suppressHydrationWarning>
      <body className="min-h-screen bg-background antialiased font-[var(--font-inter)]">
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
