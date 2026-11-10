import { Suspense } from "react";
import { redirect } from "next/navigation";
import { getSessionUser } from "@/lib/require-role";
import { dashboardPath } from "@/lib/constants";

// Runtime session check
async function DashboardRedirect() {
  const user = await getSessionUser();

  if (!user) {
    redirect("/login");
  }

  redirect(dashboardPath(user.role));
}

export default function DashboardIndex() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[50vh] items-center justify-center">
          <p className="text-sm text-gray-500">
            Redirecting to your dashboard...
          </p>
        </div>
      }
    >
      <DashboardRedirect />
    </Suspense>
  );
}
