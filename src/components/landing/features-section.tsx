import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Sparkles, Zap, Trophy } from "lucide-react";
import Image from "next/image";

export default function FeaturesSection() {
  return (
    <section id="features" className="py-20 bg-transparent px-6 relative z-10">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4 text-foreground drop-shadow-md text-outline">How It Works</h2>
        <p className="text-muted-foreground mb-12 drop-shadow-sm font-medium text-outline">Stop tracking, start achieving.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* CARD 1: AI Planner */}
          <Card className="overflow-hidden bg-card/80 backdrop-blur-sm border-primary/10 p-0">
            <div className="relative w-full aspect-video">
              <Image
                src="/feature-ai.webp"
                alt="AI planning"
                fill
                className="object-cover"
              />
            </div>
            {/* Added pb-8 for extra bottom padding */}
            <CardHeader className="flex flex-col items-center text-center p-6 pt-6 pb-8">
              <CardTitle className="text-2xl">Whispers of the Void</CardTitle>
              <CardDescription>
                Cast your ambitions into the Void. It whispers a structured prophecy, a custom roadmap to fulfill your destiny. But careful! the Void speaks in shifting possibilities. Follow its guidance at your own peril.
              </CardDescription>
            </CardHeader>
          </Card>

          {/* CARD 2: Gamification */}
          <Card className="overflow-hidden bg-card/80 backdrop-blur-sm border-primary/10 p-0">
            <div className="relative w-full aspect-video">
              <Image
                src="/grind.webp"
                alt="Gamify tasks"
                fill
                className="object-cover"
              />
            </div>
            {/* Added pb-8 */}
            <CardHeader className="flex flex-col items-center text-center p-6 pt-6 pb-8">
              <CardTitle className="text-2xl">Quest Bound</CardTitle>
              <CardDescription>
                 The tactical map of your domain. Complete tasks to earn XP and treat every task as a strategic directive from your highest self. Greatness is not granted, but earned through consistent execution.
              </CardDescription>
            </CardHeader>
          </Card>

          {/* CARD 3: Leaderboard */}
          <Card className="overflow-hidden bg-card/80 backdrop-blur-sm border-primary/10 p-0">
            <div className="relative w-full aspect-video">
              <Image
                src="/leaderbord.webp" 
                alt="Leaderboard"
                fill
                className="object-cover rounded"
              />
            </div>
            {/* Added pb-8 */}
            <CardHeader className="flex flex-col items-center text-center p-6 pt-6 pb-8">
              <CardTitle className="text-2xl">Hall of Heroes</CardTitle>
              <CardDescription>
               Public discipline is the foundation of character. The leaderboards proves your resolve, measuring the weight of your labor against the collective momentum of the realm. Climb and see where you stand.
              </CardDescription>
            </CardHeader>
          </Card>

        </div>
      </div>
    </section>
  );
}