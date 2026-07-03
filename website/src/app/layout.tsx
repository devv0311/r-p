import type { Metadata, Viewport } from "next";
import { Fraunces, Geist, Geist_Mono } from "next/font/google";
import { site } from "@/content/site";
import { Analytics } from "@vercel/analytics/next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { JsonLd } from "@/components/seo/JsonLd";
import "./globals.css";

/**
 * Type system — the carrier of the design (three voices):
 *  Fraunces  — editorial display serif (headlines, statements, numerals)
 *  Geist     — quiet humanist sans (body, UI)
 *  Geist Mono — meta voice (kickers, indices, data labels)
 */
const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  variable: "--font-fraunces",
  display: "swap",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const SITE_URL = site.url; // env-driven (NEXT_PUBLIC_SITE_URL)

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${site.name} — ${site.role}`,
    template: `%s — ${site.name}`,
  },
  description: `${site.name} — cinematic content for luxury real estate. Property films, personal branding, and short-form storytelling that builds audiences and drives enquiries. ${site.proofLine}.`,
  applicationName: site.name,
  authors: [{ name: site.name }],
  creator: site.name,
  keywords: [
    "luxury real estate content creator",
    "cinematic property films",
    "real estate videographer",
    "real estate personal branding",
    "luxury real estate marketing",
    "real estate content creator Dubai",
  ],
  openGraph: {
    type: "website",
    title: `${site.name} — ${site.role}`,
    description: `${site.positioning} ${site.proofLine}.`,
    siteName: site.name,
    url: SITE_URL,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.role}`,
    description: `${site.positioning} ${site.proofLine}.`,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      // The pre-paint inline script below adds `.js` before hydration, so
      // React must not compare the server/client class lists.
      suppressHydrationWarning
      className={`${fraunces.variable} ${geistSans.variable} ${geistMono.variable}`}
    >
      <head>
        {/* Mark JS-enabled before paint so reveal hidden-states only apply
            when JS can reveal them (progressive enhancement, no FOUC). */}
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js');",
          }}
        />
      </head>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <div className="grain" aria-hidden="true" />
        <JsonLd />
        <Header />
        <main id="main">{children}</main>
        <Footer />
        {/* Privacy-respecting, cookieless analytics (active when deployed on Vercel) */}
        <Analytics />
      </body>
    </html>
  );
}
