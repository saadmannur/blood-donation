"use client";

import { Suspense } from "react";
import Link from "next/link";
import { FiClock } from "react-icons/fi";
import { asArray } from "@/lib/api";
import { useApi } from "@/hooks/useApi";
import { formatDate } from "@/lib/format";
import AsyncView from "@/components/ui/AsyncView";
import EmptyState from "@/components/ui/EmptyState";
import PageHeader from "@/components/ui/PageHeader";
import StatusBadge from "@/components/ui/StatusBadge";
import StatusTimeline from "@/components/requests/StatusTimeline";
import { authClient } from "@/lib/auth-client";

// Session এবং request data ব্যবহারকারী component
function RequestHistoryContent() {
  const { data: u } = authClient.useSession();

  const user = u?.user;
  const patientId = user?.id;

  const { data, loading, error, reload } = useApi(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/requests/my?patientId=${patientId}`,
  );

  const requests = asArray(data);

  return (
    <>
      <PageHeader
        title="Request History"
        subtitle="Every request you created, with its full status history."
      />

      <AsyncView loading={loading} error={error} onRetry={reload}>
        {data &&
          (requests.length === 0 ? (
            <EmptyState
              icon={FiClock}
              title="No history yet"
              text="Your requests and their status changes will be recorded here."
              actionHref="/dashboard/patient/requests/new"
              actionLabel="Create blood request"
            />
          ) : (
            <div className="space-y-4">
              {requests.map((r) => (
                <details
                  key={r._id}
                  className="group rounded-xl border border-gray-200 bg-white shadow-sm open:shadow-md"
                >
                  <summary className="flex cursor-pointer list-none flex-wrap items-center gap-3 p-4">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-red-50 text-sm font-bold text-red-600">
                      {r.bloodGroup}
                    </span>

                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-[#1F2937]">
                        {r.patientName}
                      </p>
                      <p className="text-xs text-gray-500">
                        {r.hospitalName} · posted {formatDate(r.createdAt)}
                      </p>
                    </div>

                    <StatusBadge value={r.status} />

                    <span className="text-xs font-semibold text-red-600 group-open:hidden">
                      Show history
                    </span>
                    <span className="hidden text-xs font-semibold text-red-600 group-open:inline">
                      Hide
                    </span>
                  </summary>

                  <div className="border-t border-gray-100 p-5">
                    <StatusTimeline history={r.statusHistory} />

                    <Link
                      href={`/dashboard/patient/requests/${r._id}`}
                      className="mt-5 inline-block text-sm font-semibold text-red-600 hover:underline"
                    >
                      Open request details
                    </Link>
                  </div>
                </details>
              ))}
            </div>
          ))}
      </AsyncView>
    </>
  );
}

// Suspense boundary
export default function RequestHistoryPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[40vh] items-center justify-center">
          <p className="text-sm text-gray-500">Loading request history...</p>
        </div>
      }
    >
      <RequestHistoryContent />
    </Suspense>
  );
}
