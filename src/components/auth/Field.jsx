// Auth form-er shared helper: label + icon + error message wrapper.
export const inputCls =
    "w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-10 pr-3 text-sm text-[#1F2937] placeholder:text-gray-400 focus:border-red-600 focus:outline-none focus:ring-2 focus:ring-red-600/20";

export const Field = ({ id, label, icon: Icon, error, children }) => (
    <div>
        <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-[#1F2937]">
            {label}
        </label>
        <div className="relative">
            {Icon && (
                <Icon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            )}
            {children}
        </div>
        {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
);
