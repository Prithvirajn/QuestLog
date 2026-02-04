"use client";

import Image from "next/image";
import LandingHeader from "@/components/landing/landing-header";
import HeroSection from "@/components/landing/hero-section";
import FeaturesSection from "@/components/landing/features-section";
import Footer from "@/components/landing/footer";

export default function LandingPage() {
  return (
    <div className="relative min-h-screen flex flex-col">
      
      {/* --- FIXED BACKGROUND LAYER --- */}
      <div className="fixed inset-0 -z-50 h-full w-full">
        {/* 1. The Image */}
        <Image
          src="/hero-bg.jpg" // Make sure this file exists in your /public folder
          alt="QuestLog Background"
          fill
          priority
          className="object-cover" // Blur + Darken for readability
        />
        
        {/* 2. Gradient Overlay (Optional: Helps blend the image into the theme) */}
        <div className="absolute inset-0 bg-linear-to-b from-background/30 via-background/60 to-background/95" />
      </div>
      {/* --- END BACKGROUND --- */}

      {/* Content (Scrolls over the fixed background) */}
      <LandingHeader />
      <main className="flex-1">
        <HeroSection />
        <FeaturesSection />
      </main>
      <Footer />
    </div>
  );
}