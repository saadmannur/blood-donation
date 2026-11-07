"use client";

import { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { FiCheckCircle, FiXCircle, FiUser } from "react-icons/fi";
import { api } from "@/lib/api";
import { useApi } from "@/hooks/useApi";
import { formatDate, isEligibleNow, nextEligibleDate } from "@/lib/format";
import AsyncView from "@/components/ui/AsyncView";
import EmptyState from "@/components/ui/EmptyState";
import PageHeader from "@/components/ui/PageHeader";
import { card } from "@/components/ui/styles";

const OPTIONS = [
    {
        value: "available",
        title: "Available",
        text: "You can be matched with blood requests and will receive email alerts.",
        Icon: FiCheckCircle,
        active: "border-green-600 bg-green-50",
        icon: "text-green-600",
    },
    {
        value: "unavailable",
        title: "Unavailable",
        text: "You will not be matched or notified until you switch back to available.",
        Icon: FiXCircle,
        active: "border-gray-500 bg-gray-50",
        icon: "text-gray-500",
    },
];

const AvailabilityPage = () => {
    const { data: p, setData, loading, error, status, reload } = useApi("/api/donors/me");
    const [saving, setSaving] = useState("");

    const change = async (value) => {
        if (!p || value === p.availability) return;
        setSaving(value);
        try {
            await api("/api/donors/availability", { method: "PATCH", body: { availability: value } });
            setData({ ...p, availability: value });
            toast.success(`You are now ${value}`);
        } catch (e) {
            toast.error(e.message);
        } finally {
            setSaving("");
        }
    };

    if (status === 404) {
        return (
            <EmptyState
                icon={FiUser}
                title="No donor profile yet"
                text="Create your donor profile before setting availability."
                actionHref="/dashboard/donor/profile/edit"
                actionLabel="Create donor profile"
            />
        );
    }

    return (
        <>
            <PageHeader title="Availability Settings" subtitle="Tell us when you can donate." />

            <AsyncView loading={loading} error={error} onRetry={reload}>
                {p && (
                    <div className="space-y-6">
                        <div className="grid gap-4 sm:grid-cols-2">
                            {OPTIONS.map(({ value, title, text, Icon, active, icon }) => {
                                const selected = p.availability === value;
                                return (
                                    <button
                                        key={value}
                                        type="button"
                                        aria-pressed={selected}
                                        disabled={Boolean(saving)}
                                        onClick={() => change(value)}
                                        className={`rounded-xl border-2 p-5 text-left transition-colors disabled:opacity-70 ${
                                            selected ? active : "border-gray-200 bg-white hover:border-red-300"
                                        }`}
                                    >
                                        <Icon className={`h-7 w-7 ${selected ? icon : "text-gray-400"}`} />
                                        <p className="mt-3 font-semibold text-[#1F2937]">
                                            {title}
                                            {saving === value && <span className="ml-2 text-xs text-gray-500">Saving...</span>}
                                        </p>
                                        <p className="mt-1 text-sm text-gray-600">{text}</p>
                                    </button>
                                );
                            })}
                        </div>

                        <div className={`${card} text-sm text-gray-600`}>
                            <p className="font-semibold text-[#1F2937]">Good to know</p>
                            <ul className="mt-3 list-disc space-y-2 pl-5">
                                <li>Only admin-verified donors are matched with requests.</li>
                                <li>
                                    {isEligibleNow(p.lastDonationDate)
                                        ? "You are currently eligible to donate."
                                        : `You will not be matched until ${formatDate(nextEligibleDate(p.lastDonationDate))}, because of the waiting period after your last donation.`}
                                </li>
                                <li>
                                    Donated recently? Update your last donation date in{" "}
                                    <Link href="/dashboard/donor/profile/edit" className="font-semibold text-red-600 hover:underline">
                                        your profile
                                    </Link>
                                    .
                                </li>
                            </ul>
                        </div>
                    </div>
                )}
            </AsyncView>
        </>
    );
};

export default AvailabilityPage;
