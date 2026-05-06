import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
