import Link from "next/link";
import { FiSearch, FiZap, FiShield, FiUsers, FiActivity, FiClipboard } from "react-icons/fi";
import PublicHero from "@/components/ui/PublicHero";

export const metadata = { title: "About Us | BloodLink" };

const objectives = [
    {
        Icon: FiSearch,
        title: "Easy to find donors",
        text: "Blood donors are discoverable in one place instead of being scattered across social media posts.",
    },
    {
        Icon: FiZap,
        title: "Save critical time",
        text: "Reduce the time it takes to reach a suitable donor during an emergency.",
    },
    {
        Icon: FiUsers,
        title: "Connect nearby",
        text: "Patients are matched with eligible donors in the same city, with nearby donors first.",
    },
    {
        Icon: FiActivity,
        title: "Automated matching",
        text: "Blood group compatibility, availability and eligibility are checked automatically and matching donors are emailed.",
    },
    {
        Icon: FiShield,
        title: "Verified information",
        text: "Every donor profile is reviewed by an administrator before it is used for matching.",
    },
    {
        Icon: FiClipboard,
        title: "Full record keeping",
        text: "Requests, donor responses and completed donations are stored so the history is always available.",
    },
];

const roles = [
    {
        title: "Donors",
        text: "Register with your blood group and location, keep your availability up to date, and respond when a matching request needs you.",
    },
    {
        title: "Patients and families",
        text: "Post an emergency request with the hospital and urgency, see which donors responded, and track the request until it is fulfilled.",
    },
    {
        title: "Administrators",
        text: "Verify donors, remove fake requests and monitor requests and donations across the whole platform.",
    },
];

const AboutPage = () => {
    return (
        <>
            <PublicHero
                eyebrow="About us"
                title="Connecting donors with patients, fast"
                subtitle="Blood Donation and Emergency Help Network is a web platform that replaces scattered social media appeals with a verified, searchable network of blood donors."
            />

            <section className="mx-auto max-w-6xl px-6 py-14">
                <div className="grid items-center gap-10 lg:grid-cols-2">
                    <div>
                        <h2 className="text-2xl font-bold text-[#1F2937]">Why we exist</h2>
                        <p className="mt-4 leading-relaxed text-gray-600">
                            Finding a suitable blood donor during an emergency is difficult and time consuming. Families
                            often depend on social media posts, personal contacts and manual searching while the clock
                            is running.
                        </p>
                        <p className="mt-4 leading-relaxed text-gray-600">
                            BloodLink brings donor registration, blood requests, donor matching and email notifications
                            into one centralized system, so the right donors hear about a request within moments.
                        </p>
                    </div>
                    <div className="rounded-2xl bg-gradient-to-br from-red-600 to-red-800 p-8 text-white shadow-lg">
                        <p className="font-serif text-2xl leading-snug">
                            A request is posted. Eligible donors nearby are notified. A life moves closer to safety.
                        </p>
                    </div>
                </div>
            </section>

            <section className="bg-gray-50">
                <div className="mx-auto max-w-6xl px-6 py-14">
                    <h2 className="text-center text-2xl font-bold text-[#1F2937]">What we aim to do</h2>
                    <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {objectives.map(({ Icon, title, text }) => (
                            <div key={title} className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                                <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-red-50 text-red-600">
                                    <Icon className="h-5 w-5" />
                                </span>
                                <h3 className="mt-4 font-semibold text-[#1F2937]">{title}</h3>
                                <p className="mt-2 text-sm leading-relaxed text-gray-600">{text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="mx-auto max-w-6xl px-6 py-14">
                <h2 className="text-center text-2xl font-bold text-[#1F2937]">Who it is for</h2>
                <div className="mt-10 grid gap-6 md:grid-cols-3">
                    {roles.map((r) => (
                        <div key={r.title} className="rounded-xl border-t-4 border-red-600 bg-white p-6 shadow-sm ring-1 ring-gray-200">
                            <h3 className="text-lg font-semibold text-[#1F2937]">{r.title}</h3>
                            <p className="mt-2 text-sm leading-relaxed text-gray-600">{r.text}</p>
                        </div>
                    ))}
                </div>

                <div className="mt-12 flex flex-wrap justify-center gap-4">
                    <Link
                        href="/register"
                        className="rounded-full bg-red-600 px-6 py-3 text-sm font-semibold text-white shadow-md transition-colors hover:bg-red-700"
                    >
                        Join as a donor
                    </Link>
                    <Link
                        href="/how-it-works"
                        className="rounded-full border border-gray-300 px-6 py-3 text-sm font-semibold text-[#1F2937] transition-colors hover:border-red-600 hover:text-red-600"
                    >
                        See how it works
                    </Link>
                </div>
            </section>
        </>
    );
};

export default AboutPage;
