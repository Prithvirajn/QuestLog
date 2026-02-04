import Link from "next/link";
import Image from "next/image";
import { NavLinks } from "@/components/dashboard/nav-links"; // Import new component

export default function Sidebar() {
  return (
    <div className="hidden w-64 flex-col border-r bg-sidebar md:flex">
      <div className="flex h-16 items-center border-b px-6 border-sidebar-border">
        <Link href="/" className="flex items-center gap-2 font-semibold text-sidebar-foreground">
          <Image 
             src="/QuestLog_Logo.png"      
            alt="LevelUp Life Logo"
            width={40}           
            height={40}           
            className="h-10 w-10" 
          />
          <span className="">QuestLog</span>
        </Link>
      </div>

      <nav className="flex-1 p-4">
        {/* Use the reusable links here */}
        <NavLinks />
      </nav>
    </div>
  );
}