import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { dashboardPath } from "@/lib/constants";

export async function getSessionUser() {
    const session = await auth.api.getSession({ headers: await headers() });
    return session?.user ?? null;
}

// Server-side role guard. Dashboard layout gulo e use hoy.
export async function requireRole(role) {
    const user = await getSessionUser();

    if (!user) redirect("/login");
    if (user.status === "suspended") redirect("/login");
    if (user.role !== role) redirect(dashboardPath(user.role));

    return user;
}
