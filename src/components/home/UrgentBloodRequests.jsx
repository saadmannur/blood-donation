import Link from "next/link";
import { MapPin, CalendarDays, ArrowUpRight, Droplets } from "lucide-react";

const requests = [
  {
    id: 1,
    bloodGroup: "B+",
    patient: "Emergency Patient",
    hospital: "Chattogram Medical College",
    location: "Chattogram",
    date: "Nov 10, 2026",
    urgency: "Critical",
    bags: 2,
  },
  {
    id: 2,
    bloodGroup: "O+",
    patient: "Emergency Patient",
    hospital: "Parkview Hospital",
    location: "Chattogram",
    date: "Nov 11, 2026",
    urgency: "Urgent",
    bags: 1,
  },
  {
    id: 3,
    bloodGroup: "A-",
    patient: "Emergency Patient",
    hospital: "Evercare Hospital",
    location: "Chattogram",
    date: "Nov 12, 2026",
    urgency: "Urgent",
    bags: 2,
  },
];

const UrgentBloodRequests = () => {
  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-5">
          <div>
            <span className="text-sm font-semibold uppercase tracking-widest text-red-600">
              Emergency Requests
            </span>

            <h2 className="mt-3 text-3xl font-bold text-gray-900 sm:text-4xl">
              People Need Your Help
            </h2>

            <p className="mt-3 text-gray-500">
              Check recent blood requests and help someone in need.
            </p>
          </div>

          <Link
            href="/requests"
            className="flex items-center gap-2 text-sm font-semibold text-emerald-600 hover:text-emerald-700"
          >
            View All Requests <ArrowUpRight size={18} />
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {requests.map((request) => (
            <div
              key={request.id}
              className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex items-center justify-between">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-2xl font-bold text-red-600">
                  {request.bloodGroup}
                </div>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    request.urgency === "Critical"
                      ? "bg-red-50 text-red-600"
                      : "bg-amber-50 text-amber-600"
                  }`}
                >
                  {request.urgency}
                </span>
              </div>

              <h3 className="mt-5 text-lg font-bold text-gray-900">
                {request.patient}
              </h3>

              <p className="mt-2 text-sm text-gray-500">{request.hospital}</p>

              <div className="mt-5 space-y-3 border-t border-gray-100 pt-5 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <MapPin size={17} className="text-emerald-600" />
                  {request.location}
                </div>

                <div className="flex items-center gap-2">
                  <CalendarDays size={17} className="text-emerald-600" />
                  {request.date}
                </div>

                <div className="flex items-center gap-2">
                  <Droplets size={17} className="text-red-600" />
                  {request.bags} Blood Bag(s) Required
                </div>
              </div>

              <Link
                href={`/blood-requests`}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl border border-emerald-600 py-3 text-sm font-semibold text-emerald-600 transition hover:bg-emerald-600 hover:text-white"
              >
                View Request <ArrowUpRight size={17} />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UrgentBloodRequests;