"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Target,
  Trophy,
  Settings,
  Users, // Imported Users icon
} from "lucide-react";

// We accept a prop to close the sheet when a link is clicked (mobile only)
export function NavLinks({ onLinkClick }: { onLinkClick?: () => void }) {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;

  return (
    <ul className="space-y-2">
      <li>
        <Link href="/dashboard" onClick={onLinkClick}>
          <Button 
            variant={isActive("/dashboard") ? "secondary" : "ghost"} 
            className="w-full justify-start gap-2"
          >
            <LayoutDashboard className="h-4 w-4" />
            Dashboard
          </Button>
        </Link>
      </li>
      <li>
        <Link href="/dashboard/planner" onClick={onLinkClick}>
          <Button 
            variant={isActive("/dashboard/planner") ? "secondary" : "ghost"} 
            className="w-full justify-start gap-2"
          >
            <Target className="h-4 w-4" />
            AI Planner
          </Button>
        </Link>
      </li>
      <li>
        <Link href="/dashboard/leaderboard" onClick={onLinkClick}>
          <Button 
            variant={isActive("/dashboard/leaderboard") ? "secondary" : "ghost"} 
            className="w-full justify-start gap-2"
          >
            <Trophy className="h-4 w-4" />
            Leaderboard
          </Button>
        </Link>
      </li>
      {/* NEW GUILD LINK */}
      <li>
        <Link href="/dashboard/guild" onClick={onLinkClick}>
          <Button 
            variant={isActive("/dashboard/guild") ? "secondary" : "ghost"} 
            className="w-full justify-start gap-2"
          >
            <Users className="h-4 w-4" />
            The Guild
          </Button>
        </Link>
      </li>
      <li>
        <Link href="/dashboard/settings" onClick={onLinkClick}>
          <Button 
            variant={isActive("/dashboard/settings") ? "secondary" : "ghost"} 
            className="w-full justify-start gap-2"
          >
            <Settings className="h-4 w-4" />
            Settings
          </Button>
        </Link>
      </li>
    </ul>
  );
}