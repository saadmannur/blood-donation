const green = "bg-green-100 text-green-800";
const red = "bg-red-100 text-red-700";
const amber = "bg-amber-100 text-amber-800";
const blue = "bg-blue-100 text-blue-800";
const indigo = "bg-indigo-100 text-indigo-800";
const orange = "bg-orange-100 text-orange-800";
const gray = "bg-gray-100 text-gray-700";

// value -> [label, color]
const MAP = {
    // request status
    pending: ["Pending", amber],
    matching: ["Matching", blue],
    donor_contacted: ["Donor Contacted", indigo],
    fulfilled: ["Fulfilled", green],
    cancelled: ["Cancelled", gray],
    // urgency
    normal: ["Normal", gray],
    urgent: ["Urgent", orange],
    critical: ["Critical", red],
    // donor verification
    approved: ["Approved", green],
    rejected: ["Rejected", red],
    // donor availability
    available: ["Available", green],
    unavailable: ["Unavailable", gray],
    // donor response
    interested: ["Interested", green],
    not_available: ["Not Available", gray],
    // account
    active: ["Active", green],
    suspended: ["Suspended", red],
    // donation
    completed: ["Completed", green],
};

const StatusBadge = ({ value, className = "" }) => {
    if (!value) return <span className="text-gray-400">—</span>;
    const [label, tone] = MAP[value] ?? [String(value), gray];

    return (
        <span
            className={`inline-flex items-center whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-semibold ${tone} ${className}`}
        >
            {label}
        </span>
    );
};

export default StatusBadge;
