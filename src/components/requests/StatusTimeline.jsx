import StatusBadge from "@/components/ui/StatusBadge";
import { formatDateTime } from "@/lib/format";

// history: [{ status, at, note? }]
const StatusTimeline = ({ history = [] }) => {
    if (!history.length) {
        return <p className="text-sm text-gray-500">No status changes recorded yet.</p>;
    }

    return (
        <ol className="relative space-y-5 border-l-2 border-red-100 pl-6">
            {history.map((h, i) => (
                <li key={h._id ?? i} className="relative">
                    <span className="absolute -left-[31px] top-1 h-3 w-3 rounded-full bg-red-600 ring-4 ring-white" />
                    <div className="flex flex-wrap items-center gap-2">
                        <StatusBadge value={h.status} />
                        <span className="text-xs text-gray-500">{formatDateTime(h.at ?? h.changedAt)}</span>
                    </div>
                    {h.note && <p className="mt-1 text-sm text-gray-600">{h.note}</p>}
                </li>
            ))}
        </ol>
    );
};

export default StatusTimeline;
