"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import { FiArrowLeft, FiUsers } from "react-icons/fi";
import { api } from "@/lib/api";
import { useApi } from "@/hooks/useApi";
import { FINAL_STATUSES } from "@/lib/constants";
import AsyncView from "@/components/ui/AsyncView";
import PageHeader from "@/components/ui/PageHeader";
import RequestInfo from "@/components/requests/RequestInfo";
import StatusTimeline from "@/components/requests/StatusTimeline";
import { btnDanger, btnOutline, btnPrimary, card } from "@/components/ui/styles";

const PatientRequestDetailsPage = () => {
    const { id } = useParams();
    const {
      data: r,
      loading,
      error,
      reload,
    } = useApi(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/requests/${id}`);

    const cancel = async () => {
        if (!window.confirm("Cancel this request? Donors will no longer be able to respond.")) return;
        try {
            await api(
              `${process.env.NEXT_PUBLIC_SERVER_URL}/api/requests/${id}/cancel`,
              { method: "PATCH" },
            );
            toast.success("Request cancelled");
            reload();
        } catch (e) {
            toast.error(e.message);
        }
    };

    const open = r ? !FINAL_STATUSES.includes(r.status) : false;

    return (
        <>
            <PageHeader title="Request Details">
                <Link href="/dashboard/patient/requests" className={btnOutline}>
                    <FiArrowLeft className="h-4 w-4" />
                    Back
                </Link>
                <Link href={`/dashboard/patient/requests/${id}/matching`} className={btnPrimary}>
                    <FiUsers className="h-4 w-4" />
                    Matching donors
                </Link>
                {open && (
                    <button type="button" onClick={cancel} className={btnDanger}>
                        Cancel request
                    </button>
                )}
            </PageHeader>

            <AsyncView loading={loading} error={error} onRetry={reload}>
                {r && (
                    <div className="space-y-6">
                        <RequestInfo request={r} />
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

export default PatientRequestDetailsPage;
