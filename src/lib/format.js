import { DONATION_GAP_DAYS } from "@/lib/constants";

export function formatDate(value) {
    if (!value) return "—";
    const d = new Date(value);
    if (isNaN(d)) return "—";
    return d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
}

export function formatDateTime(value) {
    if (!value) return "—";
    const d = new Date(value);
    if (isNaN(d)) return "—";
    return d.toLocaleString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
}

// Last donation er 90 din pore
export function nextEligibleDate(lastDonationDate) {
    if (!lastDonationDate) return null;
    const d = new Date(lastDonationDate);
    if (isNaN(d)) return null;
    d.setDate(d.getDate() + DONATION_GAP_DAYS);
    return d;
}

export function isEligibleNow(lastDonationDate) {
    const next = nextEligibleDate(lastDonationDate);
    return !next || next <= new Date();
}

// <input type="date"> er value format (YYYY-MM-DD)
export const toInputDate = (value) => {
    if (!value) return "";
    const d = new Date(value);
    return isNaN(d) ? "" : d.toISOString().split("T")[0];
};

// Aajker date, local timezone onujayi (min/max attribute er jonno)
export const todayInput = () => {
    const now = new Date();
    return new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().split("T")[0];
};

export const titleCase = (text = "") =>
    String(text)
        .replace(/_/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase());
