import Link from "next/link";
import { btnPrimary } from "./styles";

const EmptyState = ({ icon: Icon, title, text, actionHref, actionLabel }) => (
    <div className="flex flex-col items-center rounded-xl border border-dashed border-gray-300 bg-white px-6 py-12 text-center">
        {Icon && (
            <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-600">
                <Icon className="h-6 w-6" />
            </span>
        )}
        <h3 className="text-base font-semibold text-[#1F2937]">{title}</h3>
        {text && <p className="mt-1 max-w-sm text-sm text-gray-500">{text}</p>}
        {actionHref && (
            <Link href={actionHref} className={`${btnPrimary} mt-5`}>
                {actionLabel}
            </Link>
        )}
    </div>
);

export default EmptyState;
