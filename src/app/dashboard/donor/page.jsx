"use client";

import Link from "next/link";
import { FiToggleRight, FiList, FiMessageSquare, FiAward, FiAlertCircle, FiCheckCircle, FiUser } from "react-icons/fi";
import { useApi } from "@/hooks/useApi";
import { asArray } from "@/lib/api";
import { formatDate, isEligibleNow, nextEligibleDate } from "@/lib/format";
import AsyncView from "@/components/ui/AsyncView";
import EmptyState from "@/components/ui/EmptyState";
import PageHeader from "@/components/ui/PageHeader";
import StatCard from "@/components/ui/StatCard";
import StatusBadge from "@/components/ui/StatusBadge";
import { btnOutline, card } from "@/components/ui/styles";
import { authClient } from "@/lib/auth-client";

const DonorOverviewPage = () => {
  const { data, isPending } = authClient.useSession();
  const user = data?.user;
  const donorEmail = user?.email;

  const profile = useApi(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/donors/email/${donorEmail}`);
  // console.log(profile);
  const donorId = profile?.data?._id;

  const requests = useApi(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/requests?matching=1`,
  );
  const responses = useApi(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/responses/my?donorId=${donorId}`,
  );
  const donations = useApi(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/donations/my?donorId=${donorId}`,
  );

  const p = profile.data;
  const matching = asArray(requests.data);

  // Profile ekhono toiri hoyni
  if (profile.status === 404) {
    return (
      <EmptyState
        icon={FiUser}
        title="Complete your donor profile"
        text="Add your blood group and location so you can be matched with patients who need help."
        actionHref="/dashboard/donor/profile/edit"
        actionLabel="Create donor profile"
      />
    );
  }

  const eligible = p ? isEligibleNow(p.lastDonationDate) : false;

  return (
    <>
      <PageHeader
        title="Donor Overview"
        subtitle={p ? `Welcome back, ${p.name}` : "Welcome back"}
      />

      <AsyncView
        loading={profile.loading}
        error={profile.error}
        onRetry={profile.reload}
      >
        {p && (
          <div className="space-y-6">
            {p.verificationStatus === "pending" && (
              <div className="flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
                <FiAlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
                <p>
                  Your profile is waiting for admin verification. You will start
                  receiving matching requests once it is approved.
                </p>
              </div>
            )}
            {p.verificationStatus === "rejected" && (
              <div className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">
                <FiAlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
                <p>
                  Your profile was rejected by an administrator. Please review
                  and update your details, or contact support.
                </p>
              </div>
            )}

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <StatCard
                label="Availability"
                value={<StatusBadge value={p.availability} />}
                icon={FiToggleRight}
                tone="green"
                href="/dashboard/donor/availability"
              />
              <StatCard
                label="Matching requests"
                value={requests.loading ? "…" : matching.length}
                icon={FiList}
                tone="red"
                href="/dashboard/donor/requests"
              />
              <StatCard
                label="My responses"
                value={responses.loading ? "…" : asArray(responses.data).length}
                icon={FiMessageSquare}
                tone="blue"
                href="/dashboard/donor/responses"
              />
              <StatCard
                label="Donations"
                value={donations.loading ? "…" : asArray(donations.data).length}
                icon={FiAward}
                tone="amber"
                href="/dashboard/donor/donations"
              />
            </div>

            <div className="grid gap-6 lg:grid-cols-[1fr_1.4fr]">
              <div className={card}>
                <h2 className="font-semibold text-[#1F2937]">
                  Donation eligibility
                </h2>
                <div className="mt-4 flex items-center gap-3">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full rounded-bl-none bg-red-600 font-bold text-white">
                    {p.bloodGroup}
                  </span>
                  <div>
                    <p className="text-sm text-gray-600">
                      {p.city}
                      {p.area ? `, ${p.area}` : ""}
                    </p>
                    <p
                      className={`mt-1 flex items-center gap-1.5 text-sm font-semibold ${
                        eligible ? "text-green-700" : "text-amber-700"
                      }`}
                    >
                      {eligible ? (
                        <>
                          <FiCheckCircle className="h-4 w-4" />
                          Eligible to donate
                        </>
                      ) : (
                        <>
                          Next eligible on{" "}
                          {formatDate(nextEligibleDate(p.lastDonationDate))}
                        </>
                      )}
                    </p>
                  </div>
                </div>
                <p className="mt-4 text-xs text-gray-500">
                  Last donation:{" "}
                  {p.lastDonationDate
                    ? formatDate(p.lastDonationDate)
                    : "Not recorded"}
                </p>
              </div>

              <div className={card}>
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="font-semibold text-[#1F2937]">
                    Latest matching requests
                  </h2>
                  <Link
                    href="/dashboard/donor/requests"
                    className="text-sm font-semibold text-red-600 hover:underline"
                  >
                    View all
                  </Link>
                </div>
                {matching.length === 0 ? (
                  <p className="text-sm text-gray-500">
                    No matching requests right now.
                  </p>
                ) : (
                  <ul className="divide-y divide-gray-100">
                    {matching.slice(0, 4).map((r) => (
                      <li
                        key={r._id}
                        className="flex flex-wrap items-center justify-between gap-3 py-3"
                      >
                        <div className="flex items-center gap-3">
                          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-red-50 text-sm font-bold text-red-600">
                            {r.bloodGroup}
                          </span>
                          <div>
                            <p className="text-sm font-semibold text-[#1F2937]">
                              {r.hospitalName}
                            </p>
                            <p className="text-xs text-gray-500">
                              {r.city} · needed by {formatDate(r.requiredDate)}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <StatusBadge value={r.urgency} />
                          <Link
                            href={`/dashboard/donor/requests/${r._id}`}
                            className={btnOutline}
                          >
                            View
                          </Link>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        )}
      </AsyncView>
    </>
  );
};

export default DonorOverviewPage;
