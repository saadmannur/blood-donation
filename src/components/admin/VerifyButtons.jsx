"use client";

import { useState } from "react";
import { toast } from "sonner";
import { FiCheck, FiX } from "react-icons/fi";
import { api } from "@/lib/api";
import { btnDanger, btnSuccess } from "@/components/ui/styles";

// Donor approve / reject button. Verification ar Donors page dutoi e use hoy.
const VerifyButtons = ({ donor, onDone }) => {
    const [busy, setBusy] = useState("");
    const s = donor.verificationStatus;

    const act = async (status) => {
        setBusy(status);
        try {
            await api(
              `${process.env.NEXT_PUBLIC_SERVER_URL}/api/admin/donors/${donor._id}/verify`,
              { method: "PATCH", body: { status } },
            );
            toast.success(status === "approved" ? "Donor approved" : "Donor rejected");
            onDone?.();
        } catch (e) {
            toast.error(e.message);
        } finally {
            setBusy("");
        }
    };

    return (
        <div className="flex flex-wrap gap-2">
            {s !== "approved" && (
                <button type="button" disabled={Boolean(busy)} onClick={() => act("approved")} className={btnSuccess}>
                    <FiCheck className="h-4 w-4" />
                    {busy === "approved" ? "Approving..." : "Approve"}
                </button>
            )}
            {s !== "rejected" && (
                <button type="button" disabled={Boolean(busy)} onClick={() => act("rejected")} className={btnDanger}>
                    <FiX className="h-4 w-4" />
                    {busy === "rejected" ? "Saving..." : s === "approved" ? "Revoke" : "Reject"}
                </button>
            )}
        </div>
    );
};

export default VerifyButtons;
