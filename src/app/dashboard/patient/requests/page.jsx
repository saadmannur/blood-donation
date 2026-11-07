"use client";

import { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { FiList, FiPlusCircle } from "react-icons/fi";
import { api, asArray } from "@/lib/api";
import { useApi } from "@/hooks/useApi";
import { FINAL_STATUSES, REQUEST_STATUSES } from "@/lib/constants";
import { formatDate } from "@/lib/format";
import AsyncView from "@/components/ui/AsyncView";
import DataTable from "@/components/ui/DataTable";
import EmptyState from "@/components/ui/EmptyState";
import PageHeader from "@/components/ui/PageHeader";
import StatusBadge from "@/components/ui/StatusBadge";
import { btnDanger, btnOutline, btnPrimary } from "@/components/ui/styles";

const MyRequestsPage = () => {
    const [tab, setTab] = useState("all");
    const { data, loading, error, reload } = useApi("/api/requests/my");
    const all = asArray(data);
    const rows = tab === "all" ? all : all.filter((r) => r.status === tab);

    const cancel = async (id) => {
        if (!window.confirm("Cancel this request? Donors will no longer be able to respond.")) return;
        try {
            await api(`/api/requests/${id}/cancel`, { method: "PATCH" });
            toast.success("Request cancelled");
            reload();
        } catch (e) {
            toast.error(e.message);
        }
    };

    const columns = [
        {
            key: "bloodGroup",
            header: "Blood",
            render: (r) => <span className="font-bold text-red-600">{r.bloodGroup}</span>,
        },
        { key: "patientName", header: "Patient" },
        { key: "hospitalName", header: "Hospital" },
        { key: "requiredDate", header: "Needed by", render: (r) => formatDate(r.requiredDate) },
        { key: "urgency", header: "Urgency", render: (r) => <StatusBadge value={r.urgency} /> },
        { key: "status", header: "Status", render: (r) => <StatusBadge value={r.status} /> },
        {
            key: "actions",
            header: "Actions",
            render: (r) => (
                <div className="flex flex-wrap gap-2">
                    <Link href={`/dashboard/patient/requests/${r._id}`} className={btnOutline}>
                        View
                    </Link>
                    <Link href={`/dashboard/patient/requests/${r._id}/matching`} className={btnOutline}>
                        Donors
                    </Link>
                    {!FINAL_STATUSES.includes(r.status) && (
                        <button type="button" onClick={() => cancel(r._id)} className={btnDanger}>
                            Cancel
                        </button>
                    )}
                </div>
            ),
        },
    ];

    const tabs = [{ value: "all", label: "All" }, ...REQUEST_STATUSES];

    return (
        <>
            <PageHeader title="My Blood Requests" subtitle="All requests you have posted.">
                <Link href="/dashboard/patient/requests/new" className={btnPrimary}>
                    <FiPlusCircle className="h-4 w-4" />
                    New request
                </Link>
            </PageHeader>

            <AsyncView loading={loading} error={error} onRetry={reload}>
                {data &&
                    (all.length === 0 ? (
                        <EmptyState
                            icon={FiList}
                            title="No requests yet"
                            text="Post your first blood request to start matching with donors."
                            actionHref="/dashboard/patient/requests/new"
                            actionLabel="Create blood request"
                        />
                    ) : (
                        <div className="space-y-4">
                            <div className="flex gap-2 overflow-x-auto pb-1">
                                {tabs.map((t) => (
                                    <button
                                        key={t.value}
                                        type="button"
                                        onClick={() => setTab(t.value)}
                                        className={`shrink-0 rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                                            tab === t.value
                                                ? "bg-red-600 text-white"
                                                : "border border-gray-200 bg-white text-gray-600 hover:text-red-600"
                                        }`}
                                    >
                                        {t.label}
                                    </button>
                                ))}
                            </div>
                            <DataTable columns={columns} rows={rows} empty="No requests with this status." />
                        </div>
                    ))}
            </AsyncView>
        </>
    );
};

export default MyRequestsPage;
