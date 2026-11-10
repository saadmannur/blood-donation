"use client";

import { useState } from "react";
import Link from "next/link";
import { FiList } from "react-icons/fi";
import { useApi } from "@/hooks/useApi";
import { asArray } from "@/lib/api";
import { URGENCY_LEVELS } from "@/lib/constants";
import { formatDate } from "@/lib/format";
import AsyncView from "@/components/ui/AsyncView";
import DataTable from "@/components/ui/DataTable";
import EmptyState from "@/components/ui/EmptyState";
import PageHeader from "@/components/ui/PageHeader";
import StatusBadge from "@/components/ui/StatusBadge";
import { btnOutline, selectCls } from "@/components/ui/styles";

const columns = [
    {
        key: "bloodGroup",
        header: "Blood",
        render: (r) => <span className="font-bold text-red-600">{r.bloodGroup}</span>,
    },
    { key: "patientName", header: "Patient" },
    { key: "hospitalName", header: "Hospital" },
    { key: "city", header: "City" },
    { key: "requiredDate", header: "Needed by", render: (r) => formatDate(r.requiredDate) },
    { key: "urgency", header: "Urgency", render: (r) => <StatusBadge value={r.urgency} /> },
    { key: "status", header: "Status", render: (r) => <StatusBadge value={r.status} /> },
    {
        key: "actions",
        header: "",
        render: (r) => (
            <Link href={`/dashboard/donor/requests/${r._id}`} className={btnOutline}>
                View
            </Link>
        ),
    },
];

const DonorRequestsPage = () => {
    const [urgency, setUrgency] = useState("");
    const { data, loading, error, reload } = useApi(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/requests?matching=1`,
    );

    const rows = asArray(data).filter((r) => !urgency || r.urgency === urgency);

    return (
        <>
            <PageHeader title="Blood Requests" subtitle="Requests that match your blood group and city.">
                <select
                    aria-label="Filter by urgency"
                    value={urgency}
                    onChange={(e) => setUrgency(e.target.value)}
                    className={selectCls}
                >
                    <option value="">All urgency levels</option>
                    {URGENCY_LEVELS.map((u) => (
                        <option key={u.value} value={u.value}>
                            {u.label}
                        </option>
                    ))}
                </select>
            </PageHeader>

            <AsyncView loading={loading} error={error} onRetry={reload}>
                {data &&
                    (asArray(data).length === 0 ? (
                        <EmptyState
                            icon={FiList}
                            title="No matching requests"
                            text="When a patient posts a request that matches your profile, it will appear here and in your email."
                        />
                    ) : (
                        <DataTable columns={columns} rows={rows} empty="No requests match this filter." />
                    ))}
            </AsyncView>
        </>
    );
};

export default DonorRequestsPage;
