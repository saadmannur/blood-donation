import Link from "next/link";
import { Search, MapPin, Droplets } from "lucide-react";

const bloodGroups = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];

const FindDonor = () => {
  return (
    <section className="bg-emerald-50/60 px-6 py-20">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
        <div>
          <span className="text-sm font-semibold uppercase tracking-widest text-emerald-600">
            Find a Donor
          </span>

          <h2 className="mt-3 text-3xl font-bold leading-tight text-gray-900 sm:text-4xl">
            Find the Right Blood Donor Near You
          </h2>

          <p className="mt-5 leading-7 text-gray-600">
            Search for available and verified blood donors by selecting the
            required blood group and your city.
          </p>

          <div className="mt-8 flex items-center gap-3 text-sm text-gray-600">
            <Droplets className="text-red-600" size={20} />
            Find compatible blood donors
          </div>

          <div className="mt-3 flex items-center gap-3 text-sm text-gray-600">
            <MapPin className="text-emerald-600" size={20} />
            Search by city and location
          </div>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-7 shadow-lg sm:p-9">
          <h3 className="text-xl font-bold text-gray-900">
            Search Blood Donors
          </h3>

          <p className="mt-2 text-sm text-gray-500">
            Enter your requirements to find suitable donors.
          </p>

          <form action="/find-donors" method="GET" className="mt-7 space-y-5">
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Blood Group
              </label>

              <select
                name="bloodGroup"
                required
                defaultValue=""
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-emerald-500"
              >
                <option value="" disabled>
                  Select Blood Group
                </option>

                {bloodGroups.map((group) => (
                  <option key={group} value={group}>
                    {group}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                City
              </label>

              <input
                type="text"
                name="city"
                required
                placeholder="Enter your city"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-emerald-500"
              />
            </div>

            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 py-3.5 text-sm font-semibold text-white transition hover:bg-emerald-700"
            >
              <Search size={18} />
              Find Donors
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default FindDonor;