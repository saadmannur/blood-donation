"use client";

import { useState } from "react";
import { toast } from "sonner";
import { FiSearch } from "react-icons/fi";
import { api, asArray } from "@/lib/api";
import { useApi } from "@/hooks/useApi";
import { formatDate } from "@/lib/format";
import AsyncView from "@/components/ui/AsyncView";
import DataTable from "@/components/ui/DataTable";
import PageHeader from "@/components/ui/PageHeader";
import StatusBadge from "@/components/ui/StatusBadge";
import { btnDanger, btnOutline, inputCls, selectCls } from "@/components/ui/styles";

const ManageUsersPage = () => {
    const [search, setSearch] = useState("");
    const [role, setRole] = useState("");
    const { data, loading, error, reload } = useApi(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/admin/users`,
    );

    const q = search.trim().toLowerCase();
    const rows = asArray(data).filter(
        (u) =>
            (!role || u.role === role) &&
            (!q || u.name?.toLowerCase().includes(q) || u.email?.toLowerCase().includes(q))
    );

    const toggle = async (u) => {
        const next = u.status === "active" ? "suspended" : "active";
        if (next === "suspended" && !window.confirm(`Suspend ${u.name}? They will not be able to use the platform.`)) return;
        try {
            await api(
              `${process.env.NEXT_PUBLIC_SERVER_URL}/api/admin/users/${u._id}`,
              { method: "PATCH", body: { status: next } },
            );
            toast.success(next === "suspended" ? "Account suspended" : "Account reactivated");
            reload();
        } catch (e) {
            toast.error(e.message);
        }
    };

    const columns = [
        { key: "name", header: "Name", render: (u) => <span className="font-semibold">{u.name}</span> },
        { key: "email", header: "Email" },
        { key: "phone", header: "Phone" },
        { key: "role", header: "Role", render: (u) => <span className="capitalize">{u.role}</span> },
        {
            key: "status",
            header: "Status",
            render: (u) => <StatusBadge value={u.status || "active"} />,
        },
        { key: "createdAt", header: "Joined", render: (u) => formatDate(u.createdAt) },
        {
            key: "actions",
            header: "",
            render: (u) =>
                u.role === "admin" ? null : (
                    <button
                        type="button"
                        onClick={() => toggle(u)}
                        className={u.status === "active" ? btnOutline : btnDanger}
                    >
                        {u.status === "suspended" ? "Reactivate" : "Suspend"}
                    </button>
                ),
        },
    ];

    return (
        <>
            <PageHeader title="Manage Users" subtitle="All registered accounts." />

            <div className="mb-4 flex flex-wrap gap-3">
                <div className="relative min-w-[220px] flex-1">
                    <FiSearch className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search by name or email"
                        aria-label="Search users"
                        className={`${inputCls} pl-9`}
                    />
                </div>
                <select aria-label="Filter by role" value={role} onChange={(e) => setRole(e.target.value)} className={selectCls}>
                    <option value="">All roles</option>
                    <option value="donor">Donor</option>
                    <option value="patient">Patient</option>
                    <option value="admin">Admin</option>
                </select>
            </div>

            <AsyncView loading={loading} error={error} onRetry={reload}>
                {data && <DataTable columns={columns} rows={rows} empty="No users found." />}
            </AsyncView>
        </>
    );
};

export default ManageUsersPage;
