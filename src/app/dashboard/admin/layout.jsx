import { Suspense } from "react";
import DashboardShell from "@/components/dashboard/DashboardShell";
import { requireRole } from "@/lib/require-role";

export const metadata = {
  title: "Admin Dashboard | BloodLink",
};

async function AdminDashboardContent({ children }) {
  const user = await requireRole("admin");

  return (
    <DashboardShell
      role="admin"
      user={{
        name: user.name,
        email: user.email,
      }}
    >
      {children}
    </DashboardShell>
  );
}

export default function AdminLayout({ children }) {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[50vh] items-center justify-center">
          <p className="text-sm text-gray-500">Loading admin dashboard...</p>
        </div>
      }
    >
      <AdminDashboardContent>{children}</AdminDashboardContent>
    </Suspense>
  );
}
