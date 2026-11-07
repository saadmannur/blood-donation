"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { FiArrowLeft, FiTrash2 } from "react-icons/fi";
import { api, asArray } from "@/lib/api";
import { useApi } from "@/hooks/useApi";
import { REQUEST_STATUSES } from "@/lib/constants";
import AsyncView from "@/components/ui/AsyncView";
import DataTable from "@/components/ui/DataTable";
import PageHeader from "@/components/ui/PageHeader";
import StatusBadge from "@/components/ui/StatusBadge";
import RequestInfo from "@/components/requests/RequestInfo";
import StatusTimeline from "@/components/requests/StatusTimeline";
import { btnDanger, btnOutline, card, selectCls } from "@/components/ui/styles";

const donorColumns = [
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
        render: (d) => (d.response ? <StatusBadge value={d.response} /> : <span className="text-gray-400">No response</span>),
    },
];

const AdminRequestDetailsPage = () => {
    const { id } = useParams();
    const router = useRouter();
    const request = useApi(`/api/requests/${id}`);
    const matching = useApi(`/api/matching/${id}`);

    const r = request.data;
    const donors = asArray(matching.data);

    const changeStatus = async (next) => {
        try {
            await api(`/api/admin/requests/${id}/status`, { method: "PATCH", body: { status: next } });
            toast.success("Status updated");
            request.reload();
        } catch (e) {
            toast.error(e.message);
        }
    };

    const remove = async () => {
        if (!window.confirm("Remove this request? This cannot be undone.")) return;
        try {
            await api(`/api/admin/requests/${id}`, { method: "DELETE" });
            toast.success("Request removed");
            router.push("/dashboard/admin/requests");
            router.refresh();
        } catch (e) {
            toast.error(e.message);
        }
    };

    return (
        <>
            <PageHeader title="Request Details">
                <Link href="/dashboard/admin/requests" className={btnOutline}>
                    <FiArrowLeft className="h-4 w-4" />
                    Back
                </Link>
                {r && (
                    <>
                        <select
                            aria-label="Update status"
                            value={r.status}
                            onChange={(e) => changeStatus(e.target.value)}
                            className={selectCls}
                        >
                            {REQUEST_STATUSES.map((s) => (
                                <option key={s.value} value={s.value}>
                                    {s.label}
                                </option>
                            ))}
                        </select>
                        <button type="button" onClick={remove} className={btnDanger}>
                            <FiTrash2 className="h-4 w-4" />
                            Remove
                        </button>
                    </>
                )}
            </PageHeader>

            <AsyncView loading={request.loading} error={request.error} onRetry={request.reload}>
                {r && (
                    <div className="space-y-6">
                        <RequestInfo request={r} />

                        <div className={card}>
                            <h2 className="mb-4 font-semibold text-[#1F2937]">Matching donors and responses</h2>
                            <AsyncView loading={matching.loading} error={matching.error} onRetry={matching.reload}>
                                {matching.data && (
                                    <DataTable
                                        columns={donorColumns}
                                        rows={donors}
                                        rowKey="donorId"
                                        empty="No matching donors found."
                                    />
                                )}
                            </AsyncView>
                        </div>

                        <div className={card}>
                            <h2 className="mb-5 font-semibold text-[#1F2937]">Status history</h2>
                            <StatusTimeline history={r.statusHistory} />
                        </div>
                    </div>
                )}
            </AsyncView>
        </>
    );
};

export default AdminRequestDetailsPage;
