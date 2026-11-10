"use client";

import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { asArray } from "@/lib/api";
import { useApi } from "@/hooks/useApi";
import { BLOOD_GROUPS } from "@/lib/constants";
import { formatDate } from "@/lib/format";
import AsyncView from "@/components/ui/AsyncView";
import DataTable from "@/components/ui/DataTable";
import PageHeader from "@/components/ui/PageHeader";
import StatusBadge from "@/components/ui/StatusBadge";
import { inputCls, selectCls } from "@/components/ui/styles";
import VerifyButtons from "@/components/admin/VerifyButtons";

const ManageDonorsPage = () => {
    const [search, setSearch] = useState("");
    const [bloodGroup, setBloodGroup] = useState("");
    const [verification, setVerification] = useState("");
    const { data, loading, error, reload } = useApi(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/admin/donors`,
    );

    const q = search.trim().toLowerCase();
    const rows = asArray(data).filter(
        (d) =>
            (!bloodGroup || d.bloodGroup === bloodGroup) &&
            (!verification || d.verificationStatus === verification) &&
            (!q ||
                d.name?.toLowerCase().includes(q) ||
                d.email?.toLowerCase().includes(q) ||
                d.city?.toLowerCase().includes(q))
    );

    const columns = [
        {
            key: "bloodGroup",
            header: "Blood",
            render: (d) => <span className="font-bold text-red-600">{d.bloodGroup}</span>,
        },
        {
            key: "name",
            header: "Donor",
            render: (d) => (
                <div>
                    <p className="font-semibold">{d.name}</p>
                    <p className="text-xs text-gray-500">{d.email}</p>
                </div>
            ),
        },
        { key: "phone", header: "Phone" },
        { key: "city", header: "Location", render: (d) => `${d.city}${d.area ? `, ${d.area}` : ""}` },
        { key: "lastDonationDate", header: "Last donation", render: (d) => formatDate(d.lastDonationDate) },
        { key: "availability", header: "Availability", render: (d) => <StatusBadge value={d.availability} /> },
        { key: "verificationStatus", header: "Verification", render: (d) => <StatusBadge value={d.verificationStatus} /> },
        { key: "actions", header: "Actions", render: (d) => <VerifyButtons donor={d} onDone={reload} /> },
    ];

    return (
        <>
            <PageHeader title="Manage Donors" subtitle="All donor profiles on the platform." />

            <div className="mb-4 flex flex-wrap gap-3">
                <div className="relative min-w-[220px] flex-1">
                    <FiSearch className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search by name, email or city"
                        aria-label="Search donors"
                        className={`${inputCls} pl-9`}
                    />
                </div>
                <select
                    aria-label="Filter by blood group"
                    value={bloodGroup}
                    onChange={(e) => setBloodGroup(e.target.value)}
                    className={selectCls}
                >
                    <option value="">All blood groups</option>
                    {BLOOD_GROUPS.map((g) => (
                        <option key={g} value={g}>
                            {g}
                        </option>
                    ))}
                </select>
                <select
                    aria-label="Filter by verification"
                    value={verification}
                    onChange={(e) => setVerification(e.target.value)}
                    className={selectCls}
                >
                    <option value="">All verification states</option>
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                </select>
            </div>

            <AsyncView loading={loading} error={error} onRetry={reload}>
                {data && <DataTable columns={columns} rows={rows} empty="No donors found." />}
            </AsyncView>
        </>
    );
};

export default ManageDonorsPage;
