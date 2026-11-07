"use client";

import { authClient } from "@/lib/auth-client";
import AsyncView from "@/components/ui/AsyncView";
import PageHeader from "@/components/ui/PageHeader";
import StatusBadge from "@/components/ui/StatusBadge";
import { card } from "@/components/ui/styles";
import { formatDate } from "@/lib/format";

const Row = ({ label, children }) => (
    <div>
        <dt className="text-xs font-semibold uppercase tracking-wide text-gray-500">{label}</dt>
        <dd className="mt-1 text-sm text-[#1F2937]">{children || "—"}</dd>
    </div>
);

// Patient ar admin er jonno shared read-only account page
const AccountProfile = () => {
    const { data, isPending } = authClient.useSession();
    const u = data?.user;

    return (
        <>
            <PageHeader title="My Account" subtitle="Your account details." />
            <AsyncView loading={isPending}>
                {u && (
                    <div className={card}>
                        <div className="mb-6 flex items-center gap-4">
                            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-red-600 text-xl font-bold text-white">
                                {u.name?.[0]?.toUpperCase()}
                            </span>
                            <div>
                                <p className="text-lg font-semibold text-[#1F2937]">{u.name}</p>
                                <p className="text-sm text-gray-500">{u.email}</p>
                            </div>
                        </div>
                        <dl className="grid gap-5 sm:grid-cols-2">
                            <Row label="Phone">{u.phone}</Row>
                            <Row label="Role">
                                <span className="font-semibold capitalize">{u.role}</span>
                            </Row>
                            <Row label="Account status">
                                <StatusBadge value={u.accountStatus || "active"} />
                            </Row>
                            <Row label="Member since">{formatDate(u.createdAt)}</Row>
                        </dl>
                    </div>
                )}
            </AsyncView>
        </>
    );
};

export default AccountProfile;
