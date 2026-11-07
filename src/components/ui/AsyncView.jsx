import { FiAlertCircle } from "react-icons/fi";
import { btnOutline } from "./styles";

// loading / error state handle kore. data thakle children dekhay.
// Use: <AsyncView ...>{data && (...)}</AsyncView>
const AsyncView = ({ loading, error, onRetry, children }) => {
    if (loading) {
        return (
            <div className="flex justify-center py-16">
                <span className="loading loading-spinner loading-md text-red-600"></span>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center rounded-xl border border-red-200 bg-red-50 px-6 py-10 text-center">
                <FiAlertCircle className="h-8 w-8 text-red-600" />
                <p className="mt-3 text-sm font-medium text-red-800">{error}</p>
                {onRetry && (
                    <button type="button" onClick={onRetry} className={`${btnOutline} mt-4`}>
                        Try again
                    </button>
                )}
            </div>
        );
    }

    return children ?? null;
};

export default AsyncView;
