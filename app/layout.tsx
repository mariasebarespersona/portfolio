import type { Metadata } from "next";
import { Ovo, Jost } from "next/font/google";
import "./globals.css";

const ovo = Ovo({
  weight: "400",
  variable: "--font-heading",
  subsets: ["latin"],
});

const jost = Jost({
  variable: "--font-body",
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
        className={`${ovo.variable} ${jost.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
