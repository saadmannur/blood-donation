"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NavLinks = ({ href, children }) => {
  const pathname = usePathname();
  const isActive = href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <Link
      href={href}
      aria-current={isActive ? "page" : undefined}
      className={`border-b-2 pb-1 text-sm font-medium transition-colors ${
        isActive
          ? "border-green-600 text-[#1F2937]"
          : "border-transparent text-[#1F2937] hover:border-green-600/50 hover:text-red-600"
      }`}
    >
      {children}
    </Link>
  );
};

export default NavLinks;
