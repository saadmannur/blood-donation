"use client";

import Link from "next/link";
import { FiEdit2, FiUser } from "react-icons/fi";
import { useApi } from "@/hooks/useApi";
import { formatDate, isEligibleNow, nextEligibleDate } from "@/lib/format";
import AsyncView from "@/components/ui/AsyncView";
import EmptyState from "@/components/ui/EmptyState";
import PageHeader from "@/components/ui/PageHeader";
import StatusBadge from "@/components/ui/StatusBadge";
import { btnPrimary, card } from "@/components/ui/styles";

const Row = ({ label, children }) => (
    <div>
        <dt className="text-xs font-semibold uppercase tracking-wide text-gray-500">{label}</dt>
        <dd className="mt-1 text-sm text-[#1F2937]">{children || "—"}</dd>
    </div>
);

const DonorProfilePage = () => {
    const { data: p, loading, error, status, reload } = useApi("/api/donors/me");

    if (status === 404) {
        return (
            <EmptyState
                icon={FiUser}
                title="No donor profile yet"
                text="Create your donor profile to start receiving matching requests."
                actionHref="/dashboard/donor/profile/edit"
                actionLabel="Create donor profile"
            />
        );
    }

    return (
        <>
            <PageHeader title="My Profile" subtitle="Your personal and donor information.">
                <Link href="/dashboard/donor/profile/edit" className={btnPrimary}>
                    <FiEdit2 className="h-4 w-4" />
                    Edit profile
                </Link>
            </PageHeader>

            <AsyncView loading={loading} error={error} onRetry={reload}>
                {p && (
                    <div className="space-y-6">
                        <div className={card}>
                            <div className="mb-6 flex flex-wrap items-center gap-4">
                                <span className="flex h-16 w-16 items-center justify-center rounded-full rounded-bl-none bg-red-600 text-xl font-bold text-white">
                                    {p.bloodGroup}
                                </span>
                                <div>
                                    <p className="text-lg font-semibold text-[#1F2937]">{p.name}</p>
                                    <div className="mt-1 flex flex-wrap gap-2">
                                        <StatusBadge value={p.verificationStatus} />
                                        <StatusBadge value={p.availability} />
                                    </div>
                                </div>
                            </div>

                            <dl className="grid gap-5 sm:grid-cols-2">
                                <Row label="Email">{p.email}</Row>
                                <Row label="Phone">{p.phone}</Row>
                                <Row label="City">{p.city}</Row>
                                <Row label="Area">{p.area}</Row>
                                <Row label="Last donation">{p.lastDonationDate ? formatDate(p.lastDonationDate) : "Not recorded"}</Row>
                                <Row label="Donation eligibility">
                                    {isEligibleNow(p.lastDonationDate)
                                        ? "Eligible to donate"
                                        : `Next eligible on ${formatDate(nextEligibleDate(p.lastDonationDate))}`}
                                </Row>
                            </dl>
                        </div>

                        <p className="text-xs text-gray-500">
                            Your phone number and email are shown to a requester only after you respond Interested to
                            their request.
                        </p>
                    </div>
                )}
            </AsyncView>
        </>
    );
};

export default DonorProfilePage;
