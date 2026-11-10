import { Suspense } from "react";
import DashboardShell from "@/components/dashboard/DashboardShell";
import { requireRole } from "@/lib/require-role";

export const metadata = {
  title: "Donor Dashboard | BloodLink",
};

async function DonorDashboardContent({ children }) {
  const user = await requireRole("donor");

  return (
    <DashboardShell
      role="donor"
      user={{
        name: user.name,
        email: user.email,
      }}
    >
      {children}
    </DashboardShell>
  );
}

export default function DonorLayout({ children }) {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[50vh] items-center justify-center">
          <p className="text-sm text-gray-500">Loading donor dashboard...</p>
        </div>
      }
    >
      <DonorDashboardContent>{children}</DonorDashboardContent>
    </Suspense>
  );
}
