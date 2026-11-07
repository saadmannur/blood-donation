import DashboardShell from "@/components/dashboard/DashboardShell";
import { requireRole } from "@/lib/require-role";

export const metadata = { title: "Patient Dashboard | BloodLink" };

export default async function PatientLayout({ children }) {
    const user = await requireRole("patient");

    return (
        <DashboardShell role="patient" user={{ name: user.name, email: user.email }}>
            {children}
        </DashboardShell>
    );
}
