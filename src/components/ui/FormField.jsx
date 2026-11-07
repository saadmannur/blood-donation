const FormField = ({ id, label, error, hint, className = "", children }) => (
    <div className={className}>
        <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-[#1F2937]">
            {label}
        </label>
        {children}
        {hint && !error && <p className="mt-1 text-xs text-gray-500">{hint}</p>}
        {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
);

export default FormField;
