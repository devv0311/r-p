import { site } from "@/content/site";

/** Person structured data (docs/technical-architecture.md C7/B5). */
export function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    alternateName: site.handle,
    jobTitle: site.role,
    description: `Cinematic content creator for luxury real estate — property films, personal branding, and short-form storytelling. ${site.proofLine}.`,
    url: site.url,
    sameAs: site.socials.map((s) => s.href),
    knowsAbout: [
      "Luxury real estate content",
      "Cinematic property films",
      "Real estate videography",
      "Short-form content",
      "Personal branding",
      "Content strategy",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
