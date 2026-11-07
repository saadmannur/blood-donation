"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    FiGrid,
    FiUser,
    FiToggleRight,
    FiList,
    FiMessageSquare,
    FiAward,
    FiPlusCircle,
    FiClock,
    FiUsers,
    FiDroplet,
    FiShield,
    FiBarChart2,
} from "react-icons/fi";

const NAV = {
    donor: [
        { href: "/dashboard/donor", label: "Overview", Icon: FiGrid },
        { href: "/dashboard/donor/profile", label: "My Profile", Icon: FiUser },
        { href: "/dashboard/donor/availability", label: "Availability", Icon: FiToggleRight },
        { href: "/dashboard/donor/requests", label: "Blood Requests", Icon: FiList },
        { href: "/dashboard/donor/responses", label: "My Responses", Icon: FiMessageSquare },
        { href: "/dashboard/donor/donations", label: "Donation History", Icon: FiAward },
    ],
    patient: [
        { href: "/dashboard/patient", label: "Overview", Icon: FiGrid },
        { href: "/dashboard/patient/requests/new", label: "Create Request", Icon: FiPlusCircle },
        { href: "/dashboard/patient/requests", label: "My Requests", Icon: FiList },
        { href: "/dashboard/patient/history", label: "Request History", Icon: FiClock },
        { href: "/dashboard/patient/profile", label: "My Account", Icon: FiUser },
    ],
    admin: [
        { href: "/dashboard/admin", label: "Overview", Icon: FiGrid },
        { href: "/dashboard/admin/users", label: "Users", Icon: FiUsers },
        { href: "/dashboard/admin/donors", label: "Donors", Icon: FiDroplet },
        { href: "/dashboard/admin/verification", label: "Verification", Icon: FiShield },
        { href: "/dashboard/admin/requests", label: "Blood Requests", Icon: FiList },
        { href: "/dashboard/admin/donations", label: "Donations", Icon: FiAward },
        { href: "/dashboard/admin/reports", label: "Reports", Icon: FiBarChart2 },
        { href: "/dashboard/admin/profile", label: "My Account", Icon: FiUser },
    ],
};

const Sidebar = ({ role, user }) => {
    const pathname = usePathname();
    const items = NAV[role] ?? [];

    // Shobcheye lomba match kora href ta active (jate /requests/new e "My Requests" highlight na hoy)
    const activeHref = items
        .filter((i) => pathname === i.href || pathname.startsWith(i.href + "/"))
        .sort((a, b) => b.href.length - a.href.length)[0]?.href;

    return (
        <aside className="lg:sticky lg:top-24 lg:w-64 lg:shrink-0 lg:self-start">
            {/* User info, desktop only */}
            <div className="mb-4 hidden items-center gap-3 rounded-xl border border-gray-200 bg-white p-4 lg:flex">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-600 font-semibold text-white">
                    {user?.name?.[0]?.toUpperCase()}
                </span>
                <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-[#1F2937]">{user?.name}</p>
                    <p className="text-xs font-semibold uppercase tracking-wide text-red-600">{role}</p>
                </div>
            </div>

            {/* Mobile: horizontal scroll tabs, Desktop: vertical menu */}
            <nav
                aria-label="Dashboard"
                className="flex gap-2 overflow-x-auto pb-1 lg:flex-col lg:gap-1 lg:overflow-visible lg:rounded-xl lg:border lg:border-gray-200 lg:bg-white lg:p-2 lg:pb-2"
            >
                {items.map(({ href, label, Icon }) => {
                    const active = href === activeHref;
                    return (
                        <Link
                            key={href}
                            href={href}
                            aria-current={active ? "page" : undefined}
                            className={`flex shrink-0 items-center gap-2 whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                                active
                                    ? "bg-red-600 text-white"
                                    : "border border-gray-200 bg-white text-gray-600 hover:bg-red-50 hover:text-red-600 lg:border-0"
                            }`}
                        >
                            <Icon className="h-4 w-4" />
                            {label}
                        </Link>
                    );
                })}
            </nav>
        </aside>
    );
};

export default Sidebar;
