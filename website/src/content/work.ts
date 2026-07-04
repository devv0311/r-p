/**
 * The Work — real luxury real estate campaigns produced for premium
 * developers. Every entry is an actual client project Rahul executed as the
 * visual marketing lead: developer, role, content and outcome are factual and
 * must never be embellished. Each project is designed around its own 9:16
 * vertical reel; when a clip lands at `assets/videos/work/<id>.{mp4,webm,mov}`
 * the existing seam (see lib/assets) activates real playback. NEVER invent
 * statistics, developers, or marketing claims beyond what is recorded here.
 */

export type Ratio = "16:9" | "4:5" | "9:16" | "21:9";

/** A labelled fact rendered as a row inside the project's expanded detail. */
export type WorkDetail = { label: string; value: string };

export type WorkItem = {
  id: string;
  title: string;
  developer: string;
  category: string;
  /** Vertical reel by default — every campaign is designed 9:16. */
  ratio: Ratio;
  /** CSS background (graded mood frame until the real reel lands) */
  poster: string;
  /** Lead summary shown at the top of the expanded entry. */
  description: string;
  /** Developer · Role · Content · Objective · Outcome (outcome optional). */
  details: WorkDetail[];
  /** deferred: real asset src activates playback (seam) */
  videoSrc?: string;
};

/** Graded, premium mood frames — warm/cool variations within the palette. */
const poster = {
  warm: "radial-gradient(120% 90% at 25% 90%, rgba(201,162,75,0.22), transparent 60%), linear-gradient(180deg,#0d0c0b,#0a0a0a)",
  cool: "radial-gradient(120% 90% at 75% 15%, rgba(52,66,92,0.5), transparent 60%), linear-gradient(180deg,#0b0c0e,#0a0a0a)",
  dusk: "linear-gradient(200deg, rgba(201,162,75,0.14), transparent 45%), radial-gradient(90% 80% at 80% 90%, rgba(40,50,70,0.45), transparent 60%), linear-gradient(180deg,#0c0c0d,#0a0a0a)",
  gold: "radial-gradient(130% 100% at 50% 100%, rgba(201,162,75,0.26), transparent 62%), linear-gradient(180deg,#0d0c0a,#0a0a0a)",
} as const;

export const workItems: WorkItem[] = [
  {
    id: "ivory-arches",
    title: "Ivory Arches",
    developer: "Zack Developers",
    category: "Luxury Builder Floors",
    ratio: "9:16",
    poster: poster.cool,
    description:
      "Produced promotional content for Ivory Arches, a premium builder-floor development on Dwarka Expressway. Created cinematic walkthroughs and short-form reels showcasing multiple 3 & 4 BHK configurations, modern architecture, and premium living.",
    details: [
      { label: "Developer", value: "Zack Developers" },
      {
        label: "Role",
        value:
          "Produced the promotional content campaign from shoot through final edit.",
      },
      {
        label: "Content",
        value:
          "Cinematic walkthroughs and short-form reels across multiple 3 & 4 BHK configurations.",
      },
      {
        label: "Objective",
        value:
          "Showcase the modern architecture and premium living on Dwarka Expressway to serious buyers.",
      },
    ],
  },
  {
    id: "jasmine-farms",
    title: "Jasmine Farms",
    developer: "Zack Developers",
    category: "Luxury Farmhouse Township",
    ratio: "9:16",
    poster: poster.dusk,
    description:
      "Created cinematic marketing content for Jasmine Farms, a gated 50-acre township featuring 50 luxury farmhouses. Produced reels and walkthroughs highlighting the scale, premium amenities, and lifestyle.",
    details: [
      { label: "Developer", value: "Zack Developers" },
      {
        label: "Role",
        value:
          "Produced the cinematic marketing content across the gated 50-acre estate.",
      },
      {
        label: "Content",
        value:
          "Short-form reels and property walkthroughs spanning the 50 luxury farmhouses and shared amenities.",
      },
      {
        label: "Objective",
        value:
          "Communicate the scale, premium amenities, and lifestyle to strengthen the project's digital presence.",
      },
    ],
  },
  {
    id: "the-edition",
    title: "The Edition",
    developer: "Smartworld",
    category: "Ultra Luxury Residences",
    ratio: "9:16",
    poster: poster.gold,
    description:
      "Developed premium visual content for The Edition by Smartworld, producing cinematic property films and reels that showcased its luxury 3 BHK, 4 BHK, and penthouse residences.",
    details: [
      { label: "Developer", value: "Smartworld" },
      {
        label: "Role",
        value:
          "Developed the premium visual content for the residences campaign.",
      },
      {
        label: "Content",
        value:
          "Cinematic property films and reels across the 3 BHK, 4 BHK, and penthouse residences.",
      },
      {
        label: "Objective",
        value:
          "Reinforce the project's ultra-luxury positioning and premium market perception.",
      },
    ],
  },
  {
    id: "the-select-premia",
    title: "The Select Premia",
    developer: "Adore Developers",
    category: "Luxury Residential Apartments",
    ratio: "9:16",
    poster: poster.warm,
    description:
      "Produced the visual marketing campaign for The Select Premia, creating cinematic short-form reels showcasing its premium 3 & 4 BHK residences, amenities, and lifestyle. The content became a key part of the project's digital marketing.",
    details: [
      { label: "Developer", value: "Adore Developers" },
      {
        label: "Role",
        value:
          "Led the visual marketing campaign end to end — concept, shoot direction, and final edit.",
      },
      {
        label: "Content",
        value:
          "Cinematic short-form reels showcasing the premium 3 & 4 BHK residences, amenities, and lifestyle.",
      },
      {
        label: "Objective",
        value:
          "Anchor the project's digital marketing and turn premium buyer interest into enquiries.",
      },
      {
        label: "Outcome",
        value:
          "Directly contributed to the sale of 3 residential units.",
      },
    ],
  },
];
