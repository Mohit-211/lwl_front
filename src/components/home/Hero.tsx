import { Button } from "@/components/ui/button";
import { Play, Download, Users } from "lucide-react";

interface HeroProps {
  onScrollToTrailer: () => void;
  onSelectProduct: (productId: string) => void;
}

export default function Hero({
  onScrollToTrailer,
  onSelectProduct,
}: HeroProps) {
  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden">
      {/* Background Poster */}
      <div
        className="absolute inset-0 z-0 bg-center bg-no-repeat bg-contain"
        style={{
          backgroundImage:
            "url(https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/user_68778f8ad159cd1bbd894ca5/7ec699738_poster_hero.png)",
          backgroundColor: "#020617", // slate-950
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-slate-950/40 to-slate-950/70" />
      </div>

      {/* Spacer for poster visibility */}
      <div className="flex-1" />

      {/* CTA Section */}
      <div className="relative z-10 px-6 pb-32 pt-6">
        <div className="max-w-6xl mx-auto text-center">
          {/* Watch Trailer */}
          <button
            onClick={onScrollToTrailer}
            className="mx-auto mb-8 flex items-center gap-2 text-amber-400 hover:text-amber-300 transition font-medium group"
          >
            <span>Watch Trailer</span>
            <Play className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>

          {/* CTA Buttons */}
          <div className="mx-auto mb-6 flex max-w-3xl flex-col gap-4 sm:flex-row sm:flex-wrap sm:justify-center">
            <Button
              onClick={() => onSelectProduct("stream_pass")}
              className="bg-amber-400 hover:bg-amber-300 text-black font-semibold px-8 py-6 text-base transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.03]"
            >
              <Play className="w-5 h-5 mr-2" />
              72-Hour Stream Pass — $7.99 CAD
            </Button>

            <Button
              onClick={() => onSelectProduct("personal_download")}
              variant="outline"
              className="border-2 border-white/30 bg-transparent hover:bg-white/10 text-white font-semibold px-8 py-6 text-base transition-all duration-300"
            >
              <Download className="w-5 h-5 mr-2" />
              Personal Download — $11.99 CAD
            </Button>

            <Button
              onClick={() => onSelectProduct("group_license")}
              variant="outline"
              className="border-2 border-white/30 bg-transparent hover:bg-white/10 text-white font-semibold px-8 py-6 text-base transition-all duration-300"
            >
              <Users className="w-5 h-5 mr-2" />
              Group License — from $49.99 CAD
            </Button>
          </div>

          <p className="mx-auto max-w-2xl text-xs leading-relaxed text-white/50">
            Stream pass expires 72 hours after purchase. Group License is for
            in-person organizational screenings (12 months).
          </p>
        </div>
      </div>
    </section>
  );
}
