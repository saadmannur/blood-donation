import { ShieldCheck, Zap, MapPinned, BellRing } from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "Verified Donors",
    description:
      "Donor profiles are reviewed by administrators to improve platform trust.",
  },
  {
    icon: Zap,
    title: "Fast Matching",
    description:
      "Find eligible blood donors based on blood compatibility and location.",
  },
  {
    icon: MapPinned,
    title: "Location Based",
    description:
      "Connect with suitable donors in your city and nearby service areas.",
  },
  {
    icon: BellRing,
    title: "Instant Notifications",
    description:
      "Matching donors receive email alerts about emergency blood requests.",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="bg-gray-50 px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-emerald-600">
            Why Choose Us
          </span>

          <h2 className="mt-3 text-3xl font-bold text-gray-900 sm:text-4xl">
            Making Blood Donation Easier
          </h2>

          <p className="mt-4 text-gray-500">
            We use technology to connect people, simplify donor discovery, and
            support emergency blood requests.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="rounded-2xl border border-gray-100 bg-white p-7 text-center transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
                  <Icon size={30} />
                </div>

                <h3 className="mt-5 font-bold text-gray-900">
                  {feature.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-gray-500">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;