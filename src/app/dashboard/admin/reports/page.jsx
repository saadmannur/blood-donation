"use client";

import { FiAward } from "react-icons/fi";
import { asArray } from "@/lib/api";
import { useApi } from "@/hooks/useApi";
import { titleCase } from "@/lib/format";
import AsyncView from "@/components/ui/AsyncView";
import BarList from "@/components/ui/BarList";
import PageHeader from "@/components/ui/PageHeader";
import StatCard from "@/components/ui/StatCard";
import { card } from "@/components/ui/styles";

const Panel = ({ title, children }) => (
    <section className={card}>
        <h2 className="mb-5 font-semibold text-[#1F2937]">{title}</h2>
        {children}
    </section>
);

const ReportsPage = () => {
    const {
      data: s,
      loading,
      error,
      reload,
    } = useApi(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/admin/reports`);

    return (
        <>
            <PageHeader title="Reports and Statistics" subtitle="Breakdown of donors, requests and donations." />

            <AsyncView loading={loading} error={error} onRetry={reload}>
                {s && (
                    <div className="space-y-6">
                        <div className="max-w-xs">
                            <StatCard label="Completed donations" value={s.totalDonations} icon={FiAward} tone="amber" />
                        </div>

                        <div className="grid gap-6 lg:grid-cols-2">
                            <Panel title="Donors by blood group">
                                <BarList items={asArray(s.donorsByBloodGroup)} />
                            </Panel>
                            <Panel title="Donors by city">
                                <BarList items={asArray(s.donorsByCity)} />
                            </Panel>
                            <Panel title="Requests by status">
                                <BarList items={asArray(s.requestsByStatus)} format={titleCase} />
                            </Panel>
                            <Panel title="Requests by urgency">
                                <BarList items={asArray(s.requestsByUrgency)} format={titleCase} />
                            </Panel>
                        </div>
                    </div>
                )}
            </AsyncView>
        </>
    );
};

export default ReportsPage;
