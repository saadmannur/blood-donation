import Link from "next/link";
import NavLinks from "./NavLinks";
import NavSession from "./NavSession";
import NavColor from "./NavColor";

const links = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/how-it-works", label: "How It Works" },
    { href: "/find-donors", label: "Find Donors" },
    { href: "/blood-requests", label: "Blood Requests" },
    { href: "/contact", label: "Contact" },
];

const Navbar = () => {
    return (
        <NavColor>
            <nav className="flex items-center justify-between px-6 py-4">
                {/* Brand */}
                <Link href="/" className="flex items-center gap-2">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full rounded-bl-none bg-red-600">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2.5c-3 4.2-6 7.3-6 11a6 6 0 0012 0c0-3.7-3-6.8-6-11z" />
                        </svg>
                    </span>
                    <span className="text-lg font-bold text-[#1F2937]">BloodLink</span>
                </Link>

                {/* Center links, desktop */}
                <ul className="hidden items-center gap-6 lg:flex">
                    {links.map((l) => (
                        <li key={l.href}>
                            <NavLinks href={l.href}>{l.label}</NavLinks>
                        </li>
                    ))}
                </ul>

                {/* Right side, desktop */}
                <div className="hidden lg:block">
                    <NavSession />
                </div>

                {/* Mobile menu (daisyUI dropdown, pure CSS) */}
                <div className="dropdown dropdown-end lg:hidden">
                    <div tabIndex={0} role="button" aria-label="Open menu" className="btn btn-ghost btn-circle">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#1F2937]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu dropdown-content z-[100] mt-3 w-64 rounded-box bg-white p-4 shadow-lg"
                    >
                        {links.map((l) => (
                            <li key={l.href}>
                                <NavLinks href={l.href}>{l.label}</NavLinks>
                            </li>
                        ))}
                        <li className="mt-2 border-t border-black/10 pt-3">
                            <NavSession variant="mobile" />
                        </li>
                    </ul>
                </div>
            </nav>
        </NavColor>
    );
};

export default Navbar;
