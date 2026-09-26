import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Bricolage_Grotesque } from "next/font/google";
import "./globals.css";

const sans = Geist({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--app-sans",
});
const mono = Geist_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--app-mono",
});
/** A display face with an actual voice, for the greeting and the headings. */
const display = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--app-display",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "light",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://tumai.us"),
  title: "MarIA | AI Engineer & Data Scientist",
  description:
    "Portfolio of María Sebares. AI Engineer, founder of Tumai, ex-IBM, with a neuroscience background.",
  openGraph: {
    title: "MarIA | AI Engineer & Data Scientist",
    description:
      "AI Engineer, founder of Tumai, ex-IBM, with a neuroscience background.",
    url: "https://tumai.us",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MarIA | AI Engineer & Data Scientist",
    description:
      "AI Engineer, founder of Tumai, ex-IBM, with a neuroscience background.",
  },
  alternates: {
    canonical: "https://tumai.us",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${sans.variable} ${mono.variable} ${display.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
