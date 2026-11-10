import { Suspense } from "react";
import DashboardShell from "@/components/dashboard/DashboardShell";
import { requireRole } from "@/lib/require-role";

export const metadata = {
  title: "Patient Dashboard | BloodLink",
};

async function PatientDashboardContent({ children }) {
  const user = await requireRole("patient");

  return (
    <DashboardShell
      role="patient"
      user={{
        name: user.name,
        email: user.email,
      }}
    >
      {children}
    </DashboardShell>
  );
}

export default function PatientLayout({ children }) {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[50vh] items-center justify-center">
          <p className="text-sm text-gray-500">Loading patient dashboard...</p>
        </div>
      }
    >
      <PatientDashboardContent>{children}</PatientDashboardContent>
    </Suspense>
  );
}
