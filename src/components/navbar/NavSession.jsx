"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Avatar, Dropdown, Label, Button } from "@heroui/react";
import { Person, LayoutHeaderCells, ArrowRightFromSquare } from "@gravity-ui/icons";
import { HiChevronDown } from "react-icons/hi2";
import NavLinks from "./NavLinks";
import { authClient } from "@/lib/auth-client";

// role: donor | patient | admin
const dashboardLinks = {
    donor: "/dashboard/donor",
    patient: "/dashboard/patient",
    admin: "/dashboard/admin",
};

const profileLinks = {
    donor: "/dashboard/donor/profile",
    patient: "/dashboard/patient/profile",
    admin: "/dashboard/admin/profile",
};

const NavSession = ({ variant = "desktop" }) => {
    const router = useRouter();
    const { data, isPending } = authClient.useSession();
    const user = data?.user;
    const role = user?.role || "patient";

    const handleSignOut = async () => {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => router.push("/login"),
            },
        });
    };

    const handleMenuAction = (key) => {
        if (key === "logout") handleSignOut();
    };

    if (isPending) {
        return <span className="loading loading-spinner loading-sm text-red-600"></span>;
    }

    const UserAvatar = () => (
        <Avatar size="sm">
            <Avatar.Image referrerPolicy="no-referrer" alt={user?.name} src={user?.image} />
            <Avatar.Fallback className="bg-red-600 font-semibold text-white">
                {user?.name?.[0]?.toUpperCase()}
            </Avatar.Fallback>
        </Avatar>
    );

    // ---------- Mobile ----------
    if (variant === "mobile") {
        return (
            <div className="flex flex-col gap-3">
                {user && (
                    <div className="flex items-center gap-3 border-b border-black/10 pb-3">
                        <UserAvatar />
                        <div className="min-w-0">
                            <p className="truncate text-sm font-semibold text-[#1F2937]">{user.name}</p>
                            <p className="truncate text-xs text-gray-500">{user.email}</p>
                        </div>
                        <span className="ml-auto rounded-full bg-red-50 px-2.5 py-1 text-[10px] font-semibold uppercase text-red-600">
                            {role}
                        </span>
                    </div>
                )}

                {user ? (
                    <>
                        <NavLinks href={profileLinks[role]}>Profile</NavLinks>
                        <NavLinks href={dashboardLinks[role]}>Dashboard</NavLinks>
                        <button
                            onClick={handleSignOut}
                            className="pt-1 text-left text-sm font-semibold text-red-600"
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <div className="flex items-center gap-3 pt-1">
                        <Link href="/login" className="text-sm font-semibold text-[#1F2937]">
                            Log In
                        </Link>
                        <Link
                            href="/register"
                            className="rounded-full bg-red-600 px-4 py-2 text-sm font-semibold text-white"
                        >
                            Register
                        </Link>
                    </div>
                )}
            </div>
        );
    }

    // ---------- Desktop ----------
    if (!user) {
        return (
            <div className="flex items-center gap-4">
                <Link href="/login" className="text-sm font-medium text-[#1F2937] hover:text-red-600">
                    Log in
                </Link>
                <Link
                    href="/register"
                    className="rounded-full bg-red-600 px-5 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-red-700"
                >
                    Register
                </Link>
            </div>
        );
    }

    return (
        <Dropdown>
            <Button
                type="button"
                aria-label="Account menu"
                className="flex items-center gap-2 rounded-full border border-black/10 bg-white py-1.5 pl-1.5 pr-3 shadow-sm transition-shadow hover:shadow-md"
            >
                <UserAvatar />
                <span className="hidden max-w-[100px] truncate text-sm font-semibold text-[#1F2937] sm:block">
                    {user.name}
                </span>
                <HiChevronDown className="h-4 w-4 text-gray-400" />
            </Button>

            <Dropdown.Popover className="my-2 min-w-[230px] rounded-2xl border border-black/10 bg-white p-2 shadow-2xl">
                <Dropdown.Menu onAction={handleMenuAction}>
                    <Dropdown.Item
                        id="name"
                        textValue={user.name}
                        isDisabled
                        className="flex items-center gap-3 rounded-xl px-3 py-2.5 opacity-100"
                    >
                        <UserAvatar />
                        <div className="min-w-0">
                            <Label className="block truncate text-sm font-semibold text-[#1F2937]">
                                {user.name}
                            </Label>
                            <span className="block truncate text-xs text-gray-500">{user.email}</span>
                        </div>
                    </Dropdown.Item>

                    <Dropdown.Item
                        id="profile"
                        textValue="Profile"
                        href={profileLinks[role]}
                        className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-[#1F2937] transition-colors hover:bg-red-50"
                    >
                        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-50 text-red-600">
                            <Person className="h-4 w-4" />
                        </span>
                        <Label>Profile</Label>
                    </Dropdown.Item>

                    <Dropdown.Item
                        id="dashboard"
                        textValue="Dashboard"
                        href={dashboardLinks[role]}
                        className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-[#1F2937] transition-colors hover:bg-green-50"
                    >
                        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-50 text-green-600">
                            <LayoutHeaderCells className="h-4 w-4" />
                        </span>
                        <Label>Dashboard</Label>
                    </Dropdown.Item>

                    <Dropdown.Item
                        id="logout"
                        textValue="Logout"
                        variant="danger"
                        className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-red-500 transition-colors hover:bg-red-50"
                    >
                        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-50 text-red-500">
                            <ArrowRightFromSquare className="h-4 w-4" />
                        </span>
                        <Label>Logout</Label>
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown.Popover>
        </Dropdown>
    );
};

export default NavSession;
