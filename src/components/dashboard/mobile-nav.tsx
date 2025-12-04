"use client";

import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"; // Added SheetTitle
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { NavLinks } from "@/components/dashboard/nav-links";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      {/* 1. The Hamburger Button (Visible only on mobile) */}
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden mr-2">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>

      {/* 2. The Slide-Out Content */}
      <SheetContent side="left" className="pr-0 bg-sidebar border-r border-sidebar-border w-72">
        {/* Added accessible title for screen readers */}
        <SheetTitle className="sr-only">Mobile Navigation Menu</SheetTitle>
        
        <div className="px-6 pb-6 border-b border-sidebar-border flex items-center h-16">
          <Link href="/" className="flex items-center gap-2 font-semibold text-sidebar-foreground" onClick={() => setOpen(false)}>
            <Image 
              src="/faviconpng.png" 
              alt="LevelUp Life Logo"
              width={24}
              height={24}
              className="h-6 w-6"
            />
            <span className="">LevelUp Life</span>
          </Link>
        </div>
        
        <div className="px-4 py-6">
          {/* We pass setOpen(false) so the menu closes when a link is clicked */}
          <NavLinks onLinkClick={() => setOpen(false)} />
        </div>
      </SheetContent>
    </Sheet>
  );
}