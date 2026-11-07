import StatusBadge from "@/components/ui/StatusBadge";
import { formatDate } from "@/lib/format";

const Item = ({ label, wide, children }) => (
    <div className={wide ? "sm:col-span-2" : ""}>
        <dt className="text-xs font-semibold uppercase tracking-wide text-gray-500">{label}</dt>
        <dd className="mt-1 text-sm text-[#1F2937]">{children || "—"}</dd>
    </div>
);

// Blood request er details card. contactNumber server theke na ashle hiddenContactText dekhay.
const RequestInfo = ({ request: r, hiddenContactText }) => (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
        <div className="mb-5 flex flex-wrap items-center gap-4">
            <span className="flex h-14 w-14 items-center justify-center rounded-full rounded-bl-none bg-red-600 text-lg font-bold text-white">
                {r.bloodGroup}
            </span>
            <div>
                <p className="text-lg font-semibold text-[#1F2937]">{r.patientName}</p>
                <div className="mt-1 flex flex-wrap gap-2">
                    <StatusBadge value={r.urgency} />
                    <StatusBadge value={r.status} />
                </div>
            </div>
        </div>

        <dl className="grid gap-5 sm:grid-cols-2">
            <Item label="Blood bags">{r.bagsRequired}</Item>
            <Item label="Required date">{formatDate(r.requiredDate)}</Item>
            <Item label="Hospital">{r.hospitalName}</Item>
            <Item label="City">{r.city}</Item>
            <Item label="Hospital address" wide>
                {r.hospitalAddress}
            </Item>
            <Item label="Contact person">{r.contactPerson}</Item>
            <Item label="Contact number">
                {r.contactNumber ? (
                    <a href={`tel:${r.contactNumber}`} className="font-semibold text-red-600 hover:underline">
                        {r.contactNumber}
                    </a>
                ) : (
                    <span className="text-gray-500">{hiddenContactText || "—"}</span>
                )}
            </Item>
            <Item label="Additional information" wide>
                {r.additionalInformation}
            </Item>
            <Item label="Posted on">{formatDate(r.createdAt)}</Item>
        </dl>
    </div>
);

export default RequestInfo;
