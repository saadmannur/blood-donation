import Link from "next/link";

const tones = {
    red: "bg-red-50 text-red-600",
    green: "bg-green-50 text-green-600",
    amber: "bg-amber-50 text-amber-600",
    blue: "bg-blue-50 text-blue-600",
    gray: "bg-gray-100 text-gray-600",
};

const StatCard = ({ label, value, icon: Icon, tone = "red", href }) => {
    const body = (
        <div className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
            {Icon && (
                <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${tones[tone]}`}>
                    <Icon className="h-6 w-6" />
                </span>
            )}
            <div className="min-w-0">
                <div className="text-2xl font-bold text-[#1F2937]">{value ?? "—"}</div>
                <p className="truncate text-sm text-gray-500">{label}</p>
            </div>
        </div>
    );

    return href ? <Link href={href}>{body}</Link> : body;
};

export default StatCard;
