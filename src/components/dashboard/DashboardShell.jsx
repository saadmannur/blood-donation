import Sidebar from "./Sidebar";

const DashboardShell = ({ role, user, children }) => (
    <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-6 lg:flex-row lg:px-6">
        <Sidebar role={role} user={user} />
        <main className="min-w-0 flex-1">{children}</main>
    </div>
);

export default DashboardShell;
