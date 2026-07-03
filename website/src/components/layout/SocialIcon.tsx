import type { SocialPlatform } from "@/content/site";

/** Thin-line, minimal, monochrome glyphs (docs/design-system.md §8). */
export function SocialIcon({
  platform,
  className,
}: {
  platform: SocialPlatform;
  className?: string;
}) {
  const common = {
    width: 20,
    height: 20,
    viewBox: "0 0 24 24",
    fill: "none",
    "aria-hidden": true as const,
    className,
  };
  switch (platform) {
    case "linkedin":
      return (
        <svg {...common}>
          <path
            d="M4.75 8.5V18.5M4.75 5.6v.01M9 18.5V12.4c0-1.6 1.1-2.7 2.6-2.7s2.65 1.1 2.65 2.7V18.5M9 18.5v-6.1"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "instagram":
      return (
        <svg {...common}>
          <rect
            x="4"
            y="4"
            width="16"
            height="16"
            rx="4.5"
            stroke="currentColor"
            strokeWidth="1.4"
          />
          <circle cx="12" cy="12" r="3.4" stroke="currentColor" strokeWidth="1.4" />
          <circle cx="16.6" cy="7.4" r="1" fill="currentColor" />
        </svg>
      );
    case "youtube":
      return (
        <svg {...common}>
          <rect
            x="3"
            y="6"
            width="18"
            height="12"
            rx="3.5"
            stroke="currentColor"
            strokeWidth="1.4"
          />
          <path
            d="M10.5 9.5l4 2.5-4 2.5v-5Z"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "email":
      return (
        <svg {...common}>
          <rect
            x="3.5"
            y="5.5"
            width="17"
            height="13"
            rx="2.5"
            stroke="currentColor"
            strokeWidth="1.4"
          />
          <path
            d="M4.5 7.5l7.5 5 7.5-5"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
  }
}
