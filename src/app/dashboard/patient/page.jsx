"use client";

import Link from "next/link";
import { FiPlusCircle, FiList, FiClock, FiCheckCircle, FiXCircle, FiHeart } from "react-icons/fi";
import { useApi } from "@/hooks/useApi";
import { asArray } from "@/lib/api";
import { FINAL_STATUSES } from "@/lib/constants";
import { formatDate } from "@/lib/format";
import AsyncView from "@/components/ui/AsyncView";
import EmptyState from "@/components/ui/EmptyState";
import PageHeader from "@/components/ui/PageHeader";
import StatCard from "@/components/ui/StatCard";
import StatusBadge from "@/components/ui/StatusBadge";
import { btnOutline, btnPrimary, card } from "@/components/ui/styles";

const PatientOverviewPage = () => {
    const { data, loading, error, reload } = useApi("/api/requests/my");
    const requests = asArray(data);

    const total = requests.length;
    const active = requests.filter((r) => !FINAL_STATUSES.includes(r.status)).length;
    const fulfilled = requests.filter((r) => r.status === "fulfilled").length;
    const cancelled = requests.filter((r) => r.status === "cancelled").length;

    return (
        <>
            <PageHeader title="Patient Overview" subtitle="Track your blood requests in one place.">
                <Link href="/dashboard/patient/requests/new" className={btnPrimary}>
                    <FiPlusCircle className="h-4 w-4" />
                    New request
                </Link>
            </PageHeader>

            <AsyncView loading={loading} error={error} onRetry={reload}>
                {data && (
                    <div className="space-y-6">
                        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                            <StatCard label="Total requests" value={total} icon={FiList} tone="blue" href="/dashboard/patient/requests" />
                            <StatCard label="Active" value={active} icon={FiClock} tone="amber" href="/dashboard/patient/requests" />
                            <StatCard label="Fulfilled" value={fulfilled} icon={FiCheckCircle} tone="green" href="/dashboard/patient/history" />
                            <StatCard label="Cancelled" value={cancelled} icon={FiXCircle} tone="gray" href="/dashboard/patient/history" />
                        </div>

                        <div className={card}>
                            <div className="mb-4 flex items-center justify-between">
                                <h2 className="font-semibold text-[#1F2937]">Recent requests</h2>
                                {total > 0 && (
                                    <Link href="/dashboard/patient/requests" className="text-sm font-semibold text-red-600 hover:underline">
                                        View all
                                    </Link>
                                )}
                            </div>

                            {total === 0 ? (
                                <EmptyState
                                    icon={FiHeart}
                                    title="No requests yet"
                                    text="Need blood urgently? Post a request and matching donors will be notified by email."
                                    actionHref="/dashboard/patient/requests/new"
                                    actionLabel="Create blood request"
                                />
                            ) : (
                                <ul className="divide-y divide-gray-100">
                                    {requests.slice(0, 5).map((r) => (
                                        <li key={r._id} className="flex flex-wrap items-center justify-between gap-3 py-3">
                                            <div className="flex items-center gap-3">
                                                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-red-50 text-sm font-bold text-red-600">
                                                    {r.bloodGroup}
                                                </span>
                                                <div>
                                                    <p className="text-sm font-semibold text-[#1F2937]">{r.patientName}</p>
                                                    <p className="text-xs text-gray-500">
                                                        {r.hospitalName} · needed by {formatDate(r.requiredDate)}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <StatusBadge value={r.status} />
                                                <Link href={`/dashboard/patient/requests/${r._id}`} className={btnOutline}>
                                                    View
                                                </Link>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
                )}
            </AsyncView>
        </>
    );
};

export default PatientOverviewPage;
