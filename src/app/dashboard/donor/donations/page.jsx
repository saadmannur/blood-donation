"use client";

import { FiAward } from "react-icons/fi";
import { useApi } from "@/hooks/useApi";
import { asArray } from "@/lib/api";
import { formatDate } from "@/lib/format";
import AsyncView from "@/components/ui/AsyncView";
import DataTable from "@/components/ui/DataTable";
import EmptyState from "@/components/ui/EmptyState";
import PageHeader from "@/components/ui/PageHeader";
import StatCard from "@/components/ui/StatCard";
import StatusBadge from "@/components/ui/StatusBadge";

const columns = [
    { key: "donationDate", header: "Date", render: (r) => formatDate(r.donationDate) },
    {
        key: "bloodGroup",
        header: "Blood",
        render: (r) => <span className="font-bold text-red-600">{r.bloodGroup}</span>,
    },
    { key: "patientName", header: "Patient" },
    { key: "hospitalName", header: "Hospital" },
    { key: "city", header: "City" },
    { key: "status", header: "Status", render: (r) => <StatusBadge value={r.status} /> },
];

const DonationHistoryPage = () => {
    const { data, loading, error, reload } = useApi("/api/donations/my");
    const rows = asArray(data);

    return (
        <>
            <PageHeader
                title="Donation History"
                subtitle="Donations confirmed by the requester are recorded here."
            />

            <AsyncView loading={loading} error={error} onRetry={reload}>
                {data &&
                    (rows.length === 0 ? (
                        <EmptyState
                            icon={FiAward}
                            title="No donations recorded yet"
                            text="After a requester confirms your donation, it will appear here."
                        />
                    ) : (
                        <div className="space-y-6">
                            <div className="max-w-xs">
                                <StatCard label="Total donations" value={rows.length} icon={FiAward} tone="amber" />
                            </div>
                            <DataTable columns={columns} rows={rows} />
                        </div>
                    ))}
            </AsyncView>
        </>
    );
};

export default DonationHistoryPage;
