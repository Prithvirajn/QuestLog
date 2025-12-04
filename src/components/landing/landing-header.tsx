import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";

export default function LandingHeader() {
  return (
    <header className="p-4 bg-background border-b sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center px-2 md:px-4">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/faviconpng.png" 
            alt="LevelUp Life Logo"
            width={32} 
            height={32} 
            className="h-6 w-6 md:h-8 md:w-8" // Smaller logo on mobile
          />
          <span className="text-lg md:text-2xl font-bold text-primary"> {/* Smaller text on mobile */}
            LevelUp Life
          </span>
        </Link>
        <nav className="flex gap-2 md:gap-4 items-center">
          <Link href="#features" className="hidden md:block text-sm text-muted-foreground hover:text-foreground">
            Features
          </Link>
          <Link href="/auth?tab=signin">
            <Button variant="ghost" size="sm" className="hidden md:inline-flex">Sign In</Button>
            {/* Mobile-only shortened button */}
            <Button variant="ghost" size="sm" className="md:hidden">Log In</Button>
          </Link>
          <Link href="/auth?tab=signup">
            <Button size="sm">Get Started</Button>
          </Link>
          <ModeToggle />
        </nav>
      </div>
    </header>
  );
}