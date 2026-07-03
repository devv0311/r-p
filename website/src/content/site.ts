/**
 * Typed local content model — single source of truth for copy & config.
 * (docs/technical-architecture.md C6/B6). Modular, CMS-migratable later.
 *
 * All metrics and facts are verified (résumé / owner-provided). Do not add
 * numbers without a source. Open: production domain (NEXT_PUBLIC_SITE_URL),
 * email provider key.
 */

export type NavItem = { label: string; href: string };
export type SocialPlatform = "linkedin" | "instagram" | "youtube" | "email";
export type Social = {
  platform: SocialPlatform;
  label: string;
  href: string;
  note?: string;
};
export type Metric = {
  value: string;
  label: string;
  href?: string;
  /** small line under the label (context, e.g. followers / account age) */
  sub?: string;
  /** show only in the Reach section, not the hero ledger */
  reachOnly?: boolean;
};
export type Fact = { label: string; value: string };

export const site = {
  name: "Rahul Jakhar",
  handle: "Realty by Rahul",

  // Domain is env-driven so it swaps with zero refactor.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",

  // Identity — luxury real estate + craft. Location is context, not identity.
  role: "Luxury Real Estate Content Creator",

  // Hero — serif statement, split for the italic accent line.
  hero: {
    line1: "Luxury real estate,",
    line2: "made cinematic.",
    sub: "Property films, personal branding and short-form storytelling, backed by an audience built from zero.",
  },

  // Joined form for metadata/OG.
  positioning: "Luxury real estate, made cinematic.",

  // Metadata proof-line — exact, verified numbers only.
  proofLine: "88K YouTube subscribers • 47.7K Instagram followers",

  // Relocation — surfaced in About/Contact/Footer only. Never the identity.
  availability: {
    short: "Next market: Dubai · open to in-house roles",
    long: "Based in India, with Dubai as my next market. Available for full-time, in-house roles.",
  },

  // About — the story, plus a verified fact ledger (résumé-sourced).
  about: {
    heading: "From real estate floors to the lens.",
    paragraphs: [
      "I started in my family's real estate business, learning what makes a buyer fall for a home long before I picked up a camera.",
      "That instinct drives everything I shoot. Every audience I run, I grew myself, and I turn properties into films people don't scroll past.",
      "Dubai is my next market. I'm relocating to work in-house with a brand that takes its content as seriously as its addresses.",
    ],
    facts: [
      { label: "Base", value: "Gurugram, India" },
      // Sales fluency — a creator who understands what actually sells property.
      // Verified from CV: ₹9Cr+ (Elaris) + ₹12Cr+ (family business).
      { label: "Sales delivered", value: "₹21Cr+ in property" },
      { label: "Next market", value: "Dubai" },
      { label: "Availability", value: "Full-time · in-house" },
      { label: "Kit", value: "Sony α7C II · DJI Osmo Pocket 3 · drone" },
    ] satisfies Fact[],
  },

  // Contact — form submissions delivered here (via the email seam).
  contactEmail: "business.jakhar@gmail.com",

  // Résumé is resolved from the repo-level `resume/` folder — see lib/assets.

  nav: [
    { label: "Work", href: "#work" },
    { label: "Reach", href: "#impact" },
    { label: "Practice", href: "#services" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ] satisfies NavItem[],

  // General socials. LinkedIn is a first-class hiring channel.
  socials: [
    {
      platform: "linkedin",
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/rahul-jakhar-85b637140/",
    },
    {
      platform: "instagram",
      label: "Instagram",
      href: "https://www.instagram.com/rahuljakhar09/",
    },
    {
      platform: "youtube",
      label: "YouTube",
      href: "https://www.youtube.com/@RahulJakharVlogs",
    },
  ] satisfies Social[],

  // Dedicated real estate profile — surfaced in Contact, not as a headline metric.
  realEstateProfile: {
    platform: "instagram",
    label: "Realty by Rahul",
    href: "https://www.instagram.com/realtybyrahul/",
    note: "Dedicated real estate profile",
  } satisfies Social,

  // Audience — verified numbers only. href = one-click verification source.
  metrics: [
    {
      value: "88K",
      label: "YouTube subscribers",
      href: "https://www.youtube.com/@RahulJakharVlogs",
    },
    {
      value: "47.7K",
      label: "Instagram followers",
      href: "https://www.instagram.com/rahuljakhar09/",
    },
    { value: "1M+", label: "Monthly reach" },
    {
      value: "300K+",
      label: "Real estate page reach",
      href: "https://www.instagram.com/realtybyrahul/",
      sub: "916 followers · account started 3 months ago",
      reachOnly: true,
    },
  ] satisfies Metric[],

  cta: {
    primary: { label: "Get in touch", href: "#contact" },
  },

  // Modular, content-gated slots. Empty = section hidden.
  featuredVideo: null as null | { youtubeId: string; title: string; note: string },
  brands: [] as string[],
  testimonials: [] as { quote: string; name: string; role: string }[],
} as const;

export type Site = typeof site;
