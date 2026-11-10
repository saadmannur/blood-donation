"use client";

import { useState } from "react";
import Link from "next/link";
import { FiMapPin, FiCalendar, FiDroplet, FiHeart } from "react-icons/fi";
import PublicHero from "@/components/ui/PublicHero";
import AsyncView from "@/components/ui/AsyncView";
import EmptyState from "@/components/ui/EmptyState";
import StatusBadge from "@/components/ui/StatusBadge";
import { selectCls } from "@/components/ui/styles";
import { useApi } from "@/hooks/useApi";
import { asArray } from "@/lib/api";
import { BLOOD_GROUPS, URGENCY_LEVELS } from "@/lib/constants";
import { formatDate } from "@/lib/format";

const BloodRequestsPage = () => {
    const [bloodGroup, setBloodGroup] = useState("");
    const [urgency, setUrgency] = useState("");

    // public list: contact info chara open request gulo
    const { data, loading, error, reload } = useApi(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/requests?public=1`,
    );

    const requests = asArray(data).filter(
        (r) => (!bloodGroup || r.bloodGroup === bloodGroup) && (!urgency || r.urgency === urgency)
    );

    return (
        <>
            <PublicHero
                eyebrow="Blood requests"
                title="People who need blood right now"
                subtitle="Open requests are listed here. Verified donors can respond from their dashboard to see contact details."
            />

            <section className="mx-auto max-w-6xl px-6 py-10">
                <div className="mb-6 flex flex-wrap items-center gap-3">
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
                        aria-label="Filter by urgency"
                        value={urgency}
                        onChange={(e) => setUrgency(e.target.value)}
                        className={selectCls}
                    >
                        <option value="">All urgency levels</option>
                        {URGENCY_LEVELS.map((u) => (
                            <option key={u.value} value={u.value}>
                                {u.label}
                            </option>
                        ))}
                    </select>
                </div>

                <AsyncView loading={loading} error={error} onRetry={reload}>
                    {data &&
                        (requests.length === 0 ? (
                            <EmptyState
                                icon={FiHeart}
                                title="No open requests"
                                text="There are no open blood requests matching your filters right now."
                            />
                        ) : (
                            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                                {requests.map((r) => (
                                    <article
                                        key={r._id}
                                        className="flex flex-col rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
                                    >
                                        <div className="flex items-start justify-between gap-3">
                                            <span className="flex h-14 w-14 items-center justify-center rounded-full rounded-bl-none bg-red-600 text-lg font-bold text-white">
                                                {r.bloodGroup}
                                            </span>
                                            <StatusBadge value={r.urgency} />
                                        </div>

                                        <h3 className="mt-4 font-semibold text-[#1F2937]">{r.hospitalName}</h3>
                                        <ul className="mt-3 space-y-2 text-sm text-gray-600">
                                            <li className="flex items-center gap-2">
                                                <FiMapPin className="h-4 w-4 text-red-600" />
                                                {r.city}
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <FiDroplet className="h-4 w-4 text-red-600" />
                                                {r.bagsRequired} bag{r.bagsRequired === 1 ? "" : "s"} needed
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <FiCalendar className="h-4 w-4 text-red-600" />
                                                Needed by {formatDate(r.requiredDate)}
                                            </li>
                                        </ul>
                                    </article>
                                ))}
                            </div>
                        ))}
                </AsyncView>

                <p className="mt-10 text-center text-sm text-gray-500">
                    Are you a donor?{" "}
                    <Link href="/dashboard/donor/requests" className="font-semibold text-red-600 hover:underline">
                        Log in to respond to requests
                    </Link>
                </p>
            </section>
        </>
    );
};

export default BloodRequestsPage;
