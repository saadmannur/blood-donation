"use client";

import Link from "next/link";
import {
    FiUsers,
    FiDroplet,
    FiShield,
    FiList,
    FiClock,
    FiCheckCircle,
    FiXCircle,
    FiActivity,
} from "react-icons/fi";
import { useApi } from "@/hooks/useApi";
import { asArray } from "@/lib/api";
import { formatDateTime } from "@/lib/format";
import AsyncView from "@/components/ui/AsyncView";
import PageHeader from "@/components/ui/PageHeader";
import StatCard from "@/components/ui/StatCard";
import { card } from "@/components/ui/styles";

const AdminOverviewPage = () => {
    const { data: s, loading, error, reload } = useApi("/api/admin/dashboard");
    const activities = asArray(s?.recentActivities);

    return (
        <>
            <PageHeader title="Admin Overview" subtitle="Platform statistics at a glance." />

            <AsyncView loading={loading} error={error} onRetry={reload}>
                {s && (
                    <div className="space-y-6">
                        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                            <StatCard label="Total users" value={s.totalUsers} icon={FiUsers} tone="blue" href="/dashboard/admin/users" />
                            <StatCard label="Verified donors" value={s.verifiedDonors} icon={FiDroplet} tone="green" href="/dashboard/admin/donors" />
                            <StatCard label="Pending donors" value={s.pendingDonors} icon={FiShield} tone="amber" href="/dashboard/admin/verification" />
                            <StatCard label="Total requests" value={s.totalRequests} icon={FiList} tone="red" href="/dashboard/admin/requests" />
                            <StatCard label="Pending requests" value={s.pendingRequests} icon={FiClock} tone="amber" href="/dashboard/admin/requests" />
                            <StatCard label="Completed requests" value={s.completedRequests} icon={FiCheckCircle} tone="green" href="/dashboard/admin/requests" />
                            <StatCard label="Cancelled requests" value={s.cancelledRequests} icon={FiXCircle} tone="gray" href="/dashboard/admin/requests" />
                        </div>

                        <div className={card}>
                            <div className="mb-4 flex items-center justify-between">
                                <h2 className="flex items-center gap-2 font-semibold text-[#1F2937]">
                                    <FiActivity className="h-4 w-4 text-red-600" />
                                    Recent activities
                                </h2>
                                <Link href="/dashboard/admin/reports" className="text-sm font-semibold text-red-600 hover:underline">
                                    Reports
                                </Link>
                            </div>
                            {activities.length === 0 ? (
                                <p className="text-sm text-gray-500">No recent activity.</p>
                            ) : (
                                <ul className="divide-y divide-gray-100">
                                    {activities.map((a, i) => (
                                        <li key={a._id ?? i} className="flex flex-wrap items-center justify-between gap-2 py-3 text-sm">
                                            <span className="text-[#1F2937]">{a.message}</span>
                                            <span className="text-xs text-gray-500">{formatDateTime(a.createdAt)}</span>
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

export default AdminOverviewPage;
