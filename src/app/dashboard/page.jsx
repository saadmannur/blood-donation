import { redirect } from "next/navigation";
import { getSessionUser } from "@/lib/require-role";
import { dashboardPath } from "@/lib/constants";

// /dashboard e gele role onujayi nijer dashboard e pathay
export default async function DashboardIndex() {
    const user = await getSessionUser();
    if (!user) redirect("/login");
    redirect(dashboardPath(user.role));
}
