"use client";

import { FiMapPin, FiMail, FiPhone, FiCalendar, FiShield } from "react-icons/fi";
import { asArray } from "@/lib/api";
import { useApi } from "@/hooks/useApi";
import { formatDate } from "@/lib/format";
import AsyncView from "@/components/ui/AsyncView";
import EmptyState from "@/components/ui/EmptyState";
import PageHeader from "@/components/ui/PageHeader";
import VerifyButtons from "@/components/admin/VerifyButtons";

const DonorVerificationPage = () => {
    const { data, loading, error, reload } = useApi(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/admin/donors/pending`,
    );
    const donors = asArray(data);

    return (
        <>
            <PageHeader
                title="Donor Verification"
                subtitle="Review pending donor profiles. Only approved donors are used for matching."
            />

            <AsyncView loading={loading} error={error} onRetry={reload}>
                {data &&
                    (donors.length === 0 ? (
                        <EmptyState
                            icon={FiShield}
                            title="Nothing to review"
                            text="All donor profiles have been reviewed. New registrations will appear here."
                        />
                    ) : (
                        <div className="grid gap-5 lg:grid-cols-2">
                            {donors.map((d) => (
                                <article key={d._id} className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                                    <div className="flex items-center gap-4">
                                        <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full rounded-bl-none bg-red-600 text-lg font-bold text-white">
                                            {d.bloodGroup}
                                        </span>
                                        <div className="min-w-0">
                                            <h2 className="truncate font-semibold text-[#1F2937]">{d.name}</h2>
                                            <p className="text-xs text-gray-500">Registered {formatDate(d.createdAt)}</p>
                                        </div>
                                    </div>

                                    <ul className="mt-4 space-y-2 text-sm text-gray-600">
                                        <li className="flex items-center gap-2">
                                            <FiMail className="h-4 w-4 text-red-600" />
                                            <span className="truncate">{d.email}</span>
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <FiPhone className="h-4 w-4 text-red-600" />
                                            {d.phone || "—"}
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <FiMapPin className="h-4 w-4 text-red-600" />
                                            {d.city}
                                            {d.area ? `, ${d.area}` : ""}
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <FiCalendar className="h-4 w-4 text-red-600" />
                                            Last donation: {d.lastDonationDate ? formatDate(d.lastDonationDate) : "Not recorded"}
                                        </li>
                                    </ul>

                                    <div className="mt-5 border-t border-gray-100 pt-4">
                                        <VerifyButtons donor={d} onDone={reload} />
                                    </div>
                                </article>
                            ))}
                        </div>
                    ))}
            </AsyncView>
        </>
    );
};

export default DonorVerificationPage;
