import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Bricolage_Grotesque } from "next/font/google";
import "./globals.css";

/* One place decides the canonical home. Everything else reads it. */
export const SITE = "https://mariasebares.com";

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
  metadataBase: new URL(SITE),
  title: "María Sebares - AI Engineer and Founder",
  description:
    "Portfolio of María Sebares. AI Engineer, founder of Tumai, ex-IBM, with a neuroscience background.",
  openGraph: {
    title: "María Sebares - AI Engineer and Founder",
    description:
      "AI Engineer, founder of Tumai, ex-IBM, with a neuroscience background.",
    url: SITE,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "María Sebares - AI Engineer and Founder",
    description:
      "AI Engineer, founder of Tumai, ex-IBM, with a neuroscience background.",
  },
  alternates: {
    canonical: SITE,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${sans.variable} ${mono.variable} ${display.variable} antialiased`}>
        {/* Tells a search engine that this page IS this person, and links the
            identities it already trusts. It is the single biggest lever for
            someone searching her name. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "María Sebares",
              alternateName: "Maria Sebares",
              url: SITE,
              jobTitle: "AI Engineer and Founder",
              description:
                "AI Engineer and founder of Tumai, a B2B startup with paying customers in the US and Spain. Previously AI Engineer at IBM. MSci Neuroscience, UCL.",
              nationality: ["Spanish", "British"],
              knowsLanguage: ["en", "es", "fr"],
              alumniOf: {
                "@type": "CollegeOrUniversity",
                name: "University College London",
              },
              worksFor: { "@type": "Organization", name: "Tumai", url: "https://tumai.tech" },
              sameAs: [
                "https://www.linkedin.com/in/maria-sebares9",
                "https://github.com/mariasebarespersona",
                "https://tumai.tech",
                "https://neurpop.space",
              ],
            }),
          }}
        />
        {children}
      </body>
    </html>
  );
}
