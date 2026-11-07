"use client";

import Link from "next/link";
import { FiMessageSquare } from "react-icons/fi";
import { useApi } from "@/hooks/useApi";
import { asArray } from "@/lib/api";
import { formatDateTime } from "@/lib/format";
import AsyncView from "@/components/ui/AsyncView";
import DataTable from "@/components/ui/DataTable";
import EmptyState from "@/components/ui/EmptyState";
import PageHeader from "@/components/ui/PageHeader";
import StatusBadge from "@/components/ui/StatusBadge";
import { btnOutline } from "@/components/ui/styles";

const columns = [
    {
        key: "bloodGroup",
        header: "Blood",
        render: (r) => <span className="font-bold text-red-600">{r.bloodGroup}</span>,
    },
    { key: "patientName", header: "Patient" },
    { key: "hospitalName", header: "Hospital" },
    { key: "city", header: "City" },
    { key: "response", header: "My response", render: (r) => <StatusBadge value={r.response} /> },
    { key: "requestStatus", header: "Request status", render: (r) => <StatusBadge value={r.requestStatus} /> },
    { key: "respondedAt", header: "Responded", render: (r) => formatDateTime(r.respondedAt) },
    {
        key: "actions",
        header: "",
        render: (r) => (
            <Link href={`/dashboard/donor/requests/${r.requestId}`} className={btnOutline}>
                View
            </Link>
        ),
    },
];

const DonorResponsesPage = () => {
    const { data, loading, error, reload } = useApi("/api/responses/my");
    const rows = asArray(data);

    return (
        <>
            <PageHeader title="Request Responses" subtitle="Requests you have responded to." />

            <AsyncView loading={loading} error={error} onRetry={reload}>
                {data &&
                    (rows.length === 0 ? (
                        <EmptyState
                            icon={FiMessageSquare}
                            title="No responses yet"
                            text="When you reply to a blood request, it will be listed here."
                            actionHref="/dashboard/donor/requests"
                            actionLabel="View requests"
                        />
                    ) : (
                        <DataTable columns={columns} rows={rows} />
                    ))}
            </AsyncView>
        </>
    );
};

export default DonorResponsesPage;
