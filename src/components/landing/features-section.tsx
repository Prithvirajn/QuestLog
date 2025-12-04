import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Brain, Zap, Trophy } from "lucide-react";
import Image from "next/image";

export default function FeaturesSection() {
  return (
    // FIX: Added 'px-6' to prevent cards from touching the screen edges on mobile
    <section id="features" className="py-20 bg-background px-6">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">How It Works</h2>
        <p className="text-muted-foreground mb-12">Stop tracking, start achieving.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <Card className="overflow-hidden">
          {/*  <div className="relative w-full aspect-video">
              <Image
                src="/feature-ai.jpg"
                alt="AI planning"
                fill
                className="object-cover"
              />
            </div>*/}
            {/* FIX: Force centering with flex-col and items-center */}
            <CardHeader className="flex flex-col items-center text-center">
              <Brain className="w-12 h-12 text-primary mb-4" />
              <CardTitle>AI-Powered Planning</CardTitle>
              <CardDescription>
                Tell us your goal. Our AI will build a custom roadmap with daily tasks and milestones.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="overflow-hidden">
            {/*<div className="relative w-full aspect-video">
              <Image
                src="/feature-gamify.jpg"
                alt="Gamify tasks"
                fill
                className="object-cover"
              />
            </div>*/}
            {/* FIX: Force centering */}
            <CardHeader className="flex flex-col items-center text-center">
              <Zap className="w-12 h-12 text-green-600 mb-4" />
              <CardTitle>Gamify Your Grind</CardTitle>
              <CardDescription>
                Complete tasks to earn XP. Level up and unlock achievements just like in a game.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="overflow-hidden">
           {/* <div className="relative w-full aspect-video">
              <Image
                src="/feature-leaderboard.jpg" 
                alt="Leaderboard"
                fill
                className="object-cover"
              />
            </div>*/}
            {/* FIX: Force centering */}
            <CardHeader className="flex flex-col items-center text-center">
              <Trophy className="w-12 h-12 text-yellow-500 mb-4" />
              <CardTitle>Compete & Conquer</CardTitle>
              <CardDescription>
                Climb the global leaderboards and see how you stack up against other users.
              </CardDescription>
            </CardHeader>
          </Card>

        </div>
      </div>
    </section>
  );
}