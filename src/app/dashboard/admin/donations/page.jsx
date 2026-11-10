"use client";

import { FiAward } from "react-icons/fi";
import { asArray } from "@/lib/api";
import { useApi } from "@/hooks/useApi";
import { formatDate } from "@/lib/format";
import AsyncView from "@/components/ui/AsyncView";
import DataTable from "@/components/ui/DataTable";
import EmptyState from "@/components/ui/EmptyState";
import PageHeader from "@/components/ui/PageHeader";
import StatCard from "@/components/ui/StatCard";
import StatusBadge from "@/components/ui/StatusBadge";

const columns = [
    { key: "donationDate", header: "Date", render: (d) => formatDate(d.donationDate) },
    {
        key: "bloodGroup",
        header: "Blood",
        render: (d) => <span className="font-bold text-red-600">{d.bloodGroup}</span>,
    },
    { key: "donorName", header: "Donor" },
    { key: "patientName", header: "Patient" },
    { key: "hospitalName", header: "Hospital" },
    { key: "status", header: "Status", render: (d) => <StatusBadge value={d.status} /> },
];

const AdminDonationsPage = () => {
    const { data, loading, error, reload } = useApi(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/admin/donations`,
    );
    const rows = asArray(data);

    return (
        <>
            <PageHeader title="Donation History" subtitle="All confirmed donations across the platform." />

            <AsyncView loading={loading} error={error} onRetry={reload}>
                {data &&
                    (rows.length === 0 ? (
                        <EmptyState
                            icon={FiAward}
                            title="No donations yet"
                            text="Donations appear here after a requester confirms them."
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

export default AdminDonationsPage;
