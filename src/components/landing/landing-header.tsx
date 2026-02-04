import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function LandingHeader() {
  return (
    // Removed background and border from the header container
    <header className="fixed top-0 left-0 right-0 z-50 p-4">
      <div className="container mx-auto flex justify-between items-center px-2 md:px-4">
        
        {/* Logo & Title with Floating Pill Background */}
        {/* Standardized Size: h-10 px-5 */}
        {/* Background: Specific OKLCH Color */}
        <Link 
          href="/" 
          className="flex items-center gap-2 h-10 px-5 bg-[oklch(28.518%_0.062_21.727)]/90 backdrop-blur-md border border-white/10 rounded-full shadow-lg hover:bg-[oklch(28.518%_0.062_21.727)] transition-all"
        >
          <Image
            src="/logo.png" 
            alt="QuestLog Logo"
            width={24} 
            height={24} 
            className="h-6 w-6 drop-shadow-md" 
          />
          <span className="text-lg font-bold text-white drop-shadow-sm"> 
            QuestLog
          </span>
        </Link>

        <nav className="flex gap-2 md:gap-4 items-center">
          {/* Features Link */}
          {/* Standardized Size: h-10 px-5, flex for centering */}
          <Link 
            href="#features" 
            className="hidden md:flex items-center justify-center h-10 px-5 text-sm font-medium text-gray-200 hover:text-white transition-colors bg-[oklch(28.518%_0.062_21.727)]/90 hover:bg-[oklch(28.518%_0.062_21.727)] backdrop-blur-sm rounded-full border border-white/10"
          >
            Features
          </Link>

          {/* Sign In Buttons */}
          <Link href="/auth?tab=signin">
            <Button 
                variant="ghost" 
                className="hidden md:inline-flex h-10 px-5 bg-[oklch(28.518%_0.062_21.727)]/90 backdrop-blur-md border border-white/10 rounded-full text-white hover:bg-[oklch(28.518%_0.062_21.727)] hover:text-white shadow-md"
            >
                Sign In
            </Button>
            <Button 
                variant="ghost" 
                className="md:hidden h-10 px-5 bg-[oklch(28.518%_0.062_21.727)]/90 backdrop-blur-md border border-white/10 rounded-full text-white hover:bg-[oklch(28.518%_0.062_21.727)] hover:text-white shadow-md"
            >
                Log In
            </Button>
          </Link>

          {/* Get Started - Primary Pill - VIBRANT RED */}
          <Link href="/auth?tab=signup">
            <Button 
                className="h-10 px-5 bg-[#BE3144] hover:bg-[#a02334] text-white rounded-full shadow-lg border border-white/10 transition-colors"
            >
                Get Started
            </Button>
          </Link>
        </nav>
      </div>
    </header>
  );
}