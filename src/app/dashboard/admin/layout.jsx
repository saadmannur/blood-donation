import DashboardShell from "@/components/dashboard/DashboardShell";
import { requireRole } from "@/lib/require-role";

export const metadata = { title: "Admin Dashboard | BloodLink" };

export default async function AdminLayout({ children }) {
    const user = await requireRole("admin");

    return (
        <DashboardShell role="admin" user={{ name: user.name, email: user.email }}>
            {children}
        </DashboardShell>
    );
}
