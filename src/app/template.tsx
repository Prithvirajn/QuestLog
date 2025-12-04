"use client";

import { useEffect, useState } from "react";

export default function Template({ children }: { children: React.ReactNode }) {
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    // Use a small timeout to ensure the component mounts with opacity 0 first.
    // This allows the transition to actually play and avoids the "synchronous setState" warning.
    const timer = setTimeout(() => setOpacity(1), 50);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      style={{
        opacity: opacity,
        transition: "opacity 0.5s ease-in-out",
      }}
    >
      {children}
    </div>
  );
}