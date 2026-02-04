import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative pt-20 pb-32 overflow-hidden px-6">
      <div className="container mx-auto text-center relative z-10">
        
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 border border-primary/30 text-primary-foreground text-sm font-medium mb-8 backdrop-blur-md">
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-foreground">QuestLog V1.0 is Live</span>
        </div>

        {/* Hero Title with Glow */}
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 text-foreground drop-shadow-2xl text-outline">
          Your Life, <br />
          <span className="text-primary glow-text text-outline">Gamified.</span>
        </h1>
        
        <p className="text-xl text-muted-foreground/90 max-w-2xl mx-auto mb-10 font-medium drop-shadow-sm text-outline">
          Stop writing boring to-do lists. Turn your daily habits into epic quests, earn XP, and level up your real-world character.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link href="/auth?tab=signup">
            <Button size="lg" className="h-12 px-8 text-lg rounded-full shadow-lg shadow-primary/20 hover:scale-105 transition-transform">
              Start Your Adventure
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <Link href="#features">
            <Button variant="outline" size="lg" className="h-12 px-8 text-lg rounded-full bg-background/50 backdrop-blur-sm border-2 hover:bg-background/80">
              View Features
            </Button>
          </Link>
        </div>

      </div>
    </section>
  );
}