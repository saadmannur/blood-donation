// Shared Tailwind class strings (button, card, input)

export const card = "rounded-xl border border-gray-200 bg-white p-5 shadow-sm";

const btn =
    "inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-60";

export const btnPrimary = `${btn} bg-red-600 text-white hover:bg-red-700`;
export const btnSuccess = `${btn} bg-green-600 text-white hover:bg-green-700`;
export const btnOutline = `${btn} border border-gray-300 bg-white text-[#1F2937] hover:border-red-600 hover:text-red-600`;
export const btnDanger = `${btn} border border-red-200 bg-red-50 text-red-700 hover:bg-red-100`;

export const inputCls =
    "w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-[#1F2937] placeholder:text-gray-400 focus:border-red-600 focus:outline-none focus:ring-2 focus:ring-red-600/20";

export const selectCls =
    "rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-[#1F2937] focus:border-red-600 focus:outline-none focus:ring-2 focus:ring-red-600/20";
