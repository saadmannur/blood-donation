import Link from "next/link";
import PublicHero from "@/components/ui/PublicHero";
import { DONATION_GAP_DAYS } from "@/lib/constants";

export const metadata = { title: "How It Works | BloodLink" };

const steps = [
    {
        title: "Register and log in",
        text: "Create an account as a donor or as a patient or requester.",
    },
    {
        title: "Donors complete their profile",
        text: "Add blood group, city, area, last donation date and availability. New profiles stay pending until verified.",
    },
    {
        title: "Admin verifies donors",
        text: "An administrator reviews each profile and approves or rejects it. Only approved donors are matched.",
    },
    {
        title: "Patient posts a request",
        text: "Enter the blood group, bags needed, hospital, city, required date and urgency level.",
    },
    {
        title: "Matching and notification",
        text: "The system finds compatible, available and eligible donors in the city and emails them right away.",
    },
    {
        title: "Respond, contact, donate",
        text: "Donors reply Interested or Not Available. The requester contacts an interested donor and confirms the donation, and the request is marked fulfilled.",
    },
];

// recipient -> donors they can receive from (ABO / Rh)
const compatibility = [
    { group: "A+", from: ["A+", "A-", "O+", "O-"] },
    { group: "A-", from: ["A-", "O-"] },
    { group: "B+", from: ["B+", "B-", "O+", "O-"] },
    { group: "B-", from: ["B-", "O-"] },
    { group: "AB+", from: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"] },
    { group: "AB-", from: ["A-", "B-", "AB-", "O-"] },
    { group: "O+", from: ["O+", "O-"] },
    { group: "O-", from: ["O-"] },
];

const rules = [
    "The donor profile is verified by an administrator.",
    "The donor has set their availability to Available.",
    "The donor lives in the same city as the request.",
    `At least ${DONATION_GAP_DAYS} days have passed since the last donation.`,
    "The donor blood group is compatible with the patient blood group.",
];

const HowItWorksPage = () => {
    return (
        <>
            <PublicHero
                eyebrow="How it works"
                title="From request to donor in six steps"
                subtitle="A simple flow that keeps donors verified and patients informed."
            />

            <section className="mx-auto max-w-4xl px-6 py-14">
                <ol className="space-y-6">
                    {steps.map((s, i) => (
                        <li key={s.title} className="flex gap-5 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full rounded-bl-none bg-red-600 text-lg font-bold text-white">
                                {i + 1}
                            </span>
                            <div>
                                <h3 className="font-semibold text-[#1F2937]">{s.title}</h3>
                                <p className="mt-1 text-sm leading-relaxed text-gray-600">{s.text}</p>
                            </div>
                        </li>
                    ))}
                </ol>
            </section>

            <section className="bg-gray-50">
                <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 lg:grid-cols-2">
                    <div>
                        <h2 className="text-2xl font-bold text-[#1F2937]">Who gets notified?</h2>
                        <p className="mt-3 text-sm text-gray-600">A donor is notified only when all of these are true:</p>
                        <ul className="mt-5 space-y-3">
                            {rules.map((r) => (
                                <li key={r} className="flex gap-3 text-sm text-[#1F2937]">
                                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-green-600" />
                                    {r}
                                </li>
                            ))}
                        </ul>
                        <p className="mt-5 text-sm text-gray-600">
                            Donor phone numbers and emails are never shown in public search. A requester sees them only
                            after that donor responds as Interested.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold text-[#1F2937]">Blood group compatibility</h2>
                        <div className="mt-5 overflow-hidden rounded-xl border border-gray-200 bg-white">
                            <table className="w-full text-left text-sm">
                                <thead className="bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
                                    <tr>
                                        <th className="px-4 py-3 font-semibold">Patient needs</th>
                                        <th className="px-4 py-3 font-semibold">Can receive from</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {compatibility.map((c) => (
                                        <tr key={c.group}>
                                            <td className="px-4 py-3 font-bold text-red-600">{c.group}</td>
                                            <td className="px-4 py-3 text-[#1F2937]">{c.from.join(", ")}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>

            <section className="mx-auto max-w-6xl px-6 py-14 text-center">
                <h2 className="text-2xl font-bold text-[#1F2937]">Ready to help?</h2>
                <div className="mt-6 flex flex-wrap justify-center gap-4">
                    <Link
                        href="/register"
                        className="rounded-full bg-red-600 px-6 py-3 text-sm font-semibold text-white shadow-md transition-colors hover:bg-red-700"
                    >
                        Register now
                    </Link>
                    <Link
                        href="/find-donors"
                        className="rounded-full border border-gray-300 px-6 py-3 text-sm font-semibold text-[#1F2937] transition-colors hover:border-red-600 hover:text-red-600"
                    >
                        Find donors
                    </Link>
                </div>
            </section>
        </>
    );
};

export default HowItWorksPage;
