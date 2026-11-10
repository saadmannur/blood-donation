"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import { FiArrowLeft, FiUsers, FiCheckCircle } from "react-icons/fi";
import { api, asArray } from "@/lib/api";
import { useApi } from "@/hooks/useApi";
import { FINAL_STATUSES } from "@/lib/constants";
import AsyncView from "@/components/ui/AsyncView";
import DataTable from "@/components/ui/DataTable";
import EmptyState from "@/components/ui/EmptyState";
import PageHeader from "@/components/ui/PageHeader";
import StatusBadge from "@/components/ui/StatusBadge";
import { btnOutline, btnSuccess, card } from "@/components/ui/styles";

const MatchingDonorsPage = () => {
    const { id } = useParams();
    const request = useApi(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/requests/${id}`,
    );
    const matching = useApi(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/matching/${id}`,
    );
    const [busyId, setBusyId] = useState("");

    const r = request.data;
    const donors = asArray(matching.data);
    const closed = r ? FINAL_STATUSES.includes(r.status) : true;

    // Requester donation confirm korle donation record toiri hoy ar request fulfilled hoy
    const confirmDonation = async (donorId) => {
        if (!window.confirm("Confirm that this donor has donated blood? The request will be marked as fulfilled.")) return;
        setBusyId(donorId);
        try {
            await api(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/donations`, {
              method: "POST",
              body: { requestId: id, donorId },
            });
            toast.success("Donation confirmed. Thank you!");
            await Promise.all([request.reload(), matching.reload()]);
        } catch (e) {
            toast.error(e.message);
        } finally {
            setBusyId("");
        }
    };

    const columns = [
        {
            key: "bloodGroup",
            header: "Blood",
            render: (d) => <span className="font-bold text-red-600">{d.bloodGroup}</span>,
        },
        { key: "name", header: "Donor" },
        { key: "city", header: "Location", render: (d) => `${d.city}${d.area ? `, ${d.area}` : ""}` },
        {
            key: "response",
            header: "Response",
            render: (d) => (d.response ? <StatusBadge value={d.response} /> : <span className="text-gray-400">No response yet</span>),
        },
        {
            key: "contact",
            header: "Contact",
            render: (d) =>
                d.response === "interested" && (d.phone || d.email) ? (
                    <div className="space-y-0.5 text-xs">
                        {d.phone && (
                            <a href={`tel:${d.phone}`} className="block font-semibold text-red-600 hover:underline">
                                {d.phone}
                            </a>
                        )}
                        {d.email && <span className="block text-gray-600">{d.email}</span>}
                    </div>
                ) : (
                    <span className="text-xs text-gray-400">Hidden until donor is interested</span>
                ),
        },
        {
            key: "actions",
            header: "",
            render: (d) =>
                d.response === "interested" && !closed ? (
                    <button
                        type="button"
                        disabled={busyId === d.donorId}
                        onClick={() => confirmDonation(d.donorId)}
                        className={btnSuccess}
                    >
                        <FiCheckCircle className="h-4 w-4" />
                        {busyId === d.donorId ? "Saving..." : "Confirm donation"}
                    </button>
                ) : null,
        },
    ];

    return (
        <>
            <PageHeader title="Matching Donors" subtitle="Compatible, verified and available donors in your city.">
                <Link href={`/dashboard/patient/requests/${id}`} className={btnOutline}>
                    <FiArrowLeft className="h-4 w-4" />
                    Request details
                </Link>
            </PageHeader>

            {r && (
                <div className={`${card} mb-6 flex flex-wrap items-center gap-4`}>
                    <span className="flex h-12 w-12 items-center justify-center rounded-full rounded-bl-none bg-red-600 font-bold text-white">
                        {r.bloodGroup}
                    </span>
                    <div className="min-w-0 flex-1">
                        <p className="font-semibold text-[#1F2937]">{r.patientName}</p>
                        <p className="text-sm text-gray-500">
                            {r.hospitalName}, {r.city}
                        </p>
                    </div>
                    <StatusBadge value={r.urgency} />
                    <StatusBadge value={r.status} />
                </div>
            )}

            <AsyncView loading={matching.loading} error={matching.error} onRetry={matching.reload}>
                {matching.data &&
                    (donors.length === 0 ? (
                        <EmptyState
                            icon={FiUsers}
                            title="No matching donors yet"
                            text="No verified and available donors with a compatible blood group were found in this city. Check again later."
                        />
                    ) : (
                        <>
                            <p className="mb-3 text-sm text-gray-500">
                                {donors.length} donor{donors.length === 1 ? "" : "s"} matched
                            </p>
                            <DataTable columns={columns} rows={donors} rowKey="donorId" />
                        </>
                    ))}
            </AsyncView>
        </>
    );
};

export default MatchingDonorsPage;
