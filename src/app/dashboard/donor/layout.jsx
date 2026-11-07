import DashboardShell from "@/components/dashboard/DashboardShell";
import { requireRole } from "@/lib/require-role";

export const metadata = { title: "Donor Dashboard | BloodLink" };

export default async function DonorLayout({ children }) {
    const user = await requireRole("donor");

    return (
        <DashboardShell role="donor" user={{ name: user.name, email: user.email }}>
            {children}
        </DashboardShell>
    );
}
