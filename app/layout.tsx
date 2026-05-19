import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, EB_Garamond } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  weight: ["300", "400", "500", "600"],
  variable: "--font-heading",
  subsets: ["latin"],
});

const ebGaramond = EB_Garamond({
  weight: ["400", "500"],
  variable: "--font-body",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://tumai.us"),
  title: "MarIA | AI Engineer & Data Scientist",
  description:
    "Portfolio of Maria Sebares — Ex-IBM AI Engineer specializing in Agentic AI systems, RAG, and cloud architecture.",
  openGraph: {
    title: "MarIA | AI Engineer & Data Scientist",
    description:
      "Ex-IBM AI Engineer specializing in Agentic AI systems, RAG, and cloud architecture.",
    url: "https://tumai.us",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MarIA | AI Engineer & Data Scientist",
    description:
      "Ex-IBM AI Engineer specializing in Agentic AI systems, RAG, and cloud architecture.",
  },
  alternates: {
    canonical: "https://tumai.us",
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
        className={`${cormorant.variable} ${ebGaramond.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
