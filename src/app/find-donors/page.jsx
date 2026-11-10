"use client";

import { useState } from "react";
import Link from "next/link";
import { FiSearch, FiMapPin, FiUsers } from "react-icons/fi";
import PublicHero from "@/components/ui/PublicHero";
import AsyncView from "@/components/ui/AsyncView";
import EmptyState from "@/components/ui/EmptyState";
import StatusBadge from "@/components/ui/StatusBadge";
import { btnPrimary, inputCls } from "@/components/ui/styles";
import { useApi } from "@/hooks/useApi";
import { asArray } from "@/lib/api";
import { BLOOD_GROUPS } from "@/lib/constants";

const empty = { bloodGroup: "", city: "", area: "" };

const FindDonorsPage = () => {
    const [form, setForm] = useState(empty);
    const [applied, setApplied] = useState(empty);

    const qs = new URLSearchParams(Object.entries(applied).filter(([, v]) => v.trim())).toString();
    const { data, loading, error, reload } = useApi(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/donors${qs ? `?${qs}` : ""}`,
    );
    const donors = asArray(data);

    const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

    const onSubmit = (e) => {
        e.preventDefault();
        setApplied({ ...form });
    };

    const onReset = () => {
        setForm(empty);
        setApplied(empty);
    };

    return (
        <>
            <PublicHero
                eyebrow="Find blood donors"
                title="Search verified donors"
                subtitle="Filter by blood group and location. Contact details stay private until a donor responds to your request."
            />

            <section className="mx-auto max-w-6xl px-6 py-10">
                <form
                    onSubmit={onSubmit}
                    className="grid gap-4 rounded-xl border border-gray-200 bg-white p-5 shadow-sm sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_auto]"
                >
                    <div>
                        <label htmlFor="bloodGroup" className="mb-1.5 block text-sm font-medium text-[#1F2937]">
                            Blood group
                        </label>
                        <select id="bloodGroup" name="bloodGroup" value={form.bloodGroup} onChange={onChange} className={inputCls}>
                            <option value="">Any</option>
                            {BLOOD_GROUPS.map((g) => (
                                <option key={g} value={g}>
                                    {g}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="city" className="mb-1.5 block text-sm font-medium text-[#1F2937]">
                            City
                        </label>
                        <input id="city" name="city" value={form.city} onChange={onChange} placeholder="e.g. Chattogram" className={inputCls} />
                    </div>
                    <div>
                        <label htmlFor="area" className="mb-1.5 block text-sm font-medium text-[#1F2937]">
                            Area
                        </label>
                        <input id="area" name="area" value={form.area} onChange={onChange} placeholder="e.g. Agrabad" className={inputCls} />
                    </div>
                    <div className="flex items-end gap-2">
                        <button type="submit" className={btnPrimary}>
                            <FiSearch className="h-4 w-4" />
                            Search
                        </button>
                        <button
                            type="button"
                            onClick={onReset}
                            className="rounded-lg px-3 py-2 text-sm font-medium text-gray-500 hover:text-red-600"
                        >
                            Reset
                        </button>
                    </div>
                </form>

                <div className="mt-8">
                    <AsyncView loading={loading} error={error} onRetry={reload}>
                        {data &&
                            (donors.length === 0 ? (
                                <EmptyState
                                    icon={FiUsers}
                                    title="No donors found"
                                    text="Try a different blood group or a wider location, or post an emergency request and let us notify matching donors."
                                    actionHref="/dashboard/patient/requests/new"
                                    actionLabel="Request blood"
                                />
                            ) : (
                                <>
                                    <p className="mb-4 text-sm text-gray-500">
                                        {donors.length} donor{donors.length === 1 ? "" : "s"} found
                                    </p>
                                    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                                        {donors.map((d) => (
                                            <div
                                                key={d._id}
                                                className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
                                            >
                                                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full rounded-bl-none bg-red-600 text-lg font-bold text-white">
                                                    {d.bloodGroup}
                                                </span>
                                                <div className="min-w-0">
                                                    <p className="flex items-center gap-1.5 text-sm font-semibold text-[#1F2937]">
                                                        <FiMapPin className="h-4 w-4 shrink-0 text-red-600" />
                                                        <span className="truncate">
                                                            {d.city}
                                                            {d.area ? `, ${d.area}` : ""}
                                                        </span>
                                                    </p>
                                                    <div className="mt-2">
                                                        <StatusBadge value={d.availability} />
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <p className="mt-6 text-center text-sm text-gray-500">
                                        Need blood now?{" "}
                                        <Link href="/dashboard/patient/requests/new" className="font-semibold text-red-600 hover:underline">
                                            Post an emergency request
                                        </Link>{" "}
                                        and matching donors will be notified.
                                    </p>
                                </>
                            ))}
                    </AsyncView>
                </div>
            </section>
        </>
    );
};

export default FindDonorsPage;
