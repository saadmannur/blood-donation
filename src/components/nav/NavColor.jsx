"use client";

import { useEffect, useState } from "react";

// Floating pill wrapper. Scroll korle shadow ta ektu bere jay.
const NavColor = ({ children }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50 px-4 pt-4">
      <div
        className={`mx-auto max-w-6xl rounded-full bg-white/90 backdrop-blur transition-shadow duration-300 ${
          scrolled ? "shadow-xl" : "shadow-lg shadow-black/5"
        }`}
      >
        {children}
      </div>
    </header>
  );
};

export default NavColor;
