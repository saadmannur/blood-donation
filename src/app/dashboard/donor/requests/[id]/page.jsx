"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import { FiArrowLeft, FiCheck, FiX } from "react-icons/fi";
import { api } from "@/lib/api";
import { useApi } from "@/hooks/useApi";
import { FINAL_STATUSES } from "@/lib/constants";
import AsyncView from "@/components/ui/AsyncView";
import PageHeader from "@/components/ui/PageHeader";
import StatusBadge from "@/components/ui/StatusBadge";
import RequestInfo from "@/components/requests/RequestInfo";
import { btnDanger, btnOutline, btnSuccess, card } from "@/components/ui/styles";
import { authClient } from "@/lib/auth-client";

const DonorRequestDetailsPage = () => {
    const { id } = useParams();
    // console.log(id);

    const { data, isPending } = authClient.useSession();
      const user = data?.user;
      const donorEmail = user?.email;
    
      const profile = useApi(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/donors/email/${donorEmail}`,
      );
    //   console.log(profile);
      const donorId = profile?.data?._id;

    const {
      data: r,
      loading,
      error,
      reload,
    } = useApi(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/requests/${id}`);
    const [busy, setBusy] = useState("");

    const respond = async (response) => {
        console.log(response);
        setBusy(response);
        try {
            await api(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/responses`, {
              method: "POST",
              body: { donorId, requestId: id, response },
            });
            toast.success(response === "interested" ? "Thank you! The requester can now contact you." : "Response saved");
            await reload();
        } catch (e) {
            toast.error(e.message);
        } finally {
            setBusy("");
        }
    };

    const closed = r ? FINAL_STATUSES.includes(r.status) : false;

    return (
        <>
            <PageHeader title="Request Details">
                <Link href="/dashboard/donor/requests" className={btnOutline}>
                    <FiArrowLeft className="h-4 w-4" />
                    Back
                </Link>
            </PageHeader>

            <AsyncView loading={loading} error={error} onRetry={reload}>
                {r && (
                    <div className="space-y-6">
                        <RequestInfo
                            request={r}
                            hiddenContactText="Visible after you respond as Interested"
                        />

                        <div className={card}>
                            <h2 className="font-semibold text-[#1F2937]">Your response</h2>

                            {r.myResponse && (
                                <p className="mt-2 flex items-center gap-2 text-sm text-gray-600">
                                    Current response: <StatusBadge value={r.myResponse} />
                                </p>
                            )}

                            {closed ? (
                                <p className="mt-3 text-sm text-gray-500">
                                    This request is closed, so responses are no longer accepted.
                                </p>
                            ) : (
                                <>
                                    <p className="mt-2 text-sm text-gray-600">
                                        Can you help this patient? Choosing Interested shares your contact details with
                                        the requester.
                                    </p>
                                    <div className="mt-4 flex flex-wrap gap-3">
                                        <button
                                            type="button"
                                            disabled={Boolean(busy) || r.myResponse === "interested"}
                                            onClick={() => respond("interested")}
                                            className={btnSuccess}
                                        >
                                            <FiCheck className="h-4 w-4" />
                                            {busy === "interested" ? "Saving..." : "I am interested"}
                                        </button>
                                        <button
                                            type="button"
                                            disabled={Boolean(busy) || r.myResponse === "not_available"}
                                            onClick={() => respond("not_available")}
                                            className={btnDanger}
                                        >
                                            <FiX className="h-4 w-4" />
                                            {busy === "not_available" ? "Saving..." : "Not available"}
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </AsyncView>
        </>
    );
};

export default DonorRequestDetailsPage;
