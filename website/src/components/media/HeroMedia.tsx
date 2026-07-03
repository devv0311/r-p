import { cn } from "@/lib/cn";
import { heroVideo, heroPoster } from "@/lib/assets";
import { BackgroundVideo } from "./BackgroundVideo";

/**
 * Hero background — real showreel when present (assets/videos/hero.*), else a
 * graded cinematic placeholder. A bottom scrim keeps the statement legible
 * over any media. Zero JS until a video asset exists.
 */
export function HeroMedia({ className }: { className?: string }) {
  const video = heroVideo();
  const poster = heroPoster();

  return (
    <div className={cn("absolute inset-0 -z-10 overflow-hidden", className)}>
      {video ? (
        // Full presence — the footage is the proof (Director's Cut). The
        // graded scrim below carries legibility instead of dimming the reel.
        <BackgroundVideo src={video} poster={poster} opacity={0.85} />
      ) : (
        <div
          aria-hidden="true"
          className="h-full w-full"
          style={{
            backgroundImage: [
              "radial-gradient(140% 90% at 82% 100%, rgba(201,162,75,0.13), transparent 55%)",
              "radial-gradient(120% 80% at 10% 0%, rgba(38,46,64,0.35), transparent 55%)",
              "linear-gradient(180deg, #0b0b0c 0%, #0c0c0d 50%, #0a0a0a 100%)",
            ].join(","),
            ...(poster
              ? {
                  backgroundImage: `url(${poster})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }
              : {}),
          }}
        />
      )}

      {/* Cinematic grade — lower-third scrim where the title sits, a light
          left vignette for the copy column, and a whisper at the top for the
          header. The center of the frame stays clean for the footage. */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          backgroundImage: [
            "linear-gradient(0deg, rgba(10,10,10,0.94) 0%, rgba(10,10,10,0.55) 30%, rgba(10,10,10,0.12) 55%, rgba(10,10,10,0) 75%, rgba(10,10,10,0.35) 100%)",
            "linear-gradient(100deg, rgba(10,10,10,0.55) 0%, rgba(10,10,10,0.15) 40%, rgba(10,10,10,0) 65%)",
          ].join(","),
        }}
      />
    </div>
  );
}
