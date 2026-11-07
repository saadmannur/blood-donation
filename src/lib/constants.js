export const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

export const URGENCY_LEVELS = [
    { value: "normal", label: "Normal" },
    { value: "urgent", label: "Urgent" },
    { value: "critical", label: "Critical" },
];

export const REQUEST_STATUSES = [
    { value: "pending", label: "Pending" },
    { value: "matching", label: "Matching" },
    { value: "donor_contacted", label: "Donor Contacted" },
    { value: "fulfilled", label: "Fulfilled" },
    { value: "cancelled", label: "Cancelled" },
];

export const FINAL_STATUSES = ["fulfilled", "cancelled"];

// Ek donation er pore kmpokkhe koto din gap lagbe
export const DONATION_GAP_DAYS = 90;

export const PHONE_PATTERN = /^(\+?88)?01[3-9]\d{8}$/;

export const dashboardPath = (role) =>
    ["donor", "patient", "admin"].includes(role) ? `/dashboard/${role}` : "/";
