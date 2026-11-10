"use client";

import { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { FiSearch } from "react-icons/fi";
import { api, asArray } from "@/lib/api";
import { useApi } from "@/hooks/useApi";
import { REQUEST_STATUSES, URGENCY_LEVELS } from "@/lib/constants";
import { formatDate } from "@/lib/format";
import AsyncView from "@/components/ui/AsyncView";
import DataTable from "@/components/ui/DataTable";
import PageHeader from "@/components/ui/PageHeader";
import StatusBadge from "@/components/ui/StatusBadge";
import { btnDanger, btnOutline, inputCls, selectCls } from "@/components/ui/styles";

const ManageRequestsPage = () => {
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("");
    const [urgency, setUrgency] = useState("");
    const { data, loading, error, reload } = useApi(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/admin/requests`,
    );

    const q = search.trim().toLowerCase();
    const rows = asArray(data).filter(
        (r) =>
            (!status || r.status === status) &&
            (!urgency || r.urgency === urgency) &&
            (!q ||
                r.patientName?.toLowerCase().includes(q) ||
                r.hospitalName?.toLowerCase().includes(q) ||
                r.city?.toLowerCase().includes(q))
    );

    const changeStatus = async (id, next) => {
        try {
            await api(
              `${process.env.NEXT_PUBLIC_SERVER_URL}/api/admin/requests/${id}/status`,
              { method: "PATCH", body: { status: next } },
            );
            toast.success("Status updated");
            reload();
        } catch (e) {
            toast.error(e.message);
        }
    };

    const remove = async (r) => {
        if (!window.confirm(`Remove the request for ${r.patientName}? This cannot be undone.`)) return;
        try {
            await api(
              `${process.env.NEXT_PUBLIC_SERVER_URL}/api/admin/requests/${r._id}`,
              { method: "DELETE" },
            );
            toast.success("Request removed");
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
        {
            key: "patientName",
            header: "Patient",
            render: (r) => (
                <div>
                    <p className="font-semibold">{r.patientName}</p>
                    <p className="text-xs text-gray-500">by {r.requesterName || "—"}</p>
                </div>
            ),
        },
        {
            key: "hospitalName",
            header: "Hospital",
            render: (r) => (
                <div>
                    <p>{r.hospitalName}</p>
                    <p className="text-xs text-gray-500">{r.city}</p>
                </div>
            ),
        },
        { key: "requiredDate", header: "Needed by", render: (r) => formatDate(r.requiredDate) },
        { key: "urgency", header: "Urgency", render: (r) => <StatusBadge value={r.urgency} /> },
        {
            key: "status",
            header: "Status",
            render: (r) => (
                <select
                    aria-label={`Status for ${r.patientName}`}
                    value={r.status}
                    onChange={(e) => changeStatus(r._id, e.target.value)}
                    className={`${selectCls} !py-1.5 text-xs`}
                >
                    {REQUEST_STATUSES.map((s) => (
                        <option key={s.value} value={s.value}>
                            {s.label}
                        </option>
                    ))}
                </select>
            ),
        },
        {
            key: "actions",
            header: "Actions",
            render: (r) => (
                <div className="flex gap-2">
                    <Link href={`/dashboard/admin/requests/${r._id}`} className={btnOutline}>
                        View
                    </Link>
                    <button type="button" onClick={() => remove(r)} className={btnDanger}>
                        Remove
                    </button>
                </div>
            ),
        },
    ];

    return (
        <>
            <PageHeader title="Manage Blood Requests" subtitle="Review, update or remove requests." />

            <div className="mb-4 flex flex-wrap gap-3">
                <div className="relative min-w-[220px] flex-1">
                    <FiSearch className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search patient, hospital or city"
                        aria-label="Search requests"
                        className={`${inputCls} pl-9`}
                    />
                </div>
                <select aria-label="Filter by status" value={status} onChange={(e) => setStatus(e.target.value)} className={selectCls}>
                    <option value="">All statuses</option>
                    {REQUEST_STATUSES.map((s) => (
                        <option key={s.value} value={s.value}>
                            {s.label}
                        </option>
                    ))}
                </select>
                <select aria-label="Filter by urgency" value={urgency} onChange={(e) => setUrgency(e.target.value)} className={selectCls}>
                    <option value="">All urgency levels</option>
                    {URGENCY_LEVELS.map((u) => (
                        <option key={u.value} value={u.value}>
                            {u.label}
                        </option>
                    ))}
                </select>
            </div>

            <AsyncView loading={loading} error={error} onRetry={reload}>
                {data && <DataTable columns={columns} rows={rows} empty="No requests found." />}
            </AsyncView>
        </>
    );
};

export default ManageRequestsPage;
