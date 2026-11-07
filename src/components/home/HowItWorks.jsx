import Link from "next/link";
import { UserPlus, Search, Mail, Heart } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Register as Donor",
    description:
      "Create your account and provide your blood group, city, and availability.",
    icon: UserPlus,
  },
  {
    number: "02",
    title: "Find Matching Donors",
    description:
      "Search for eligible donors based on blood group and location.",
    icon: Search,
  },
  {
    number: "03",
    title: "Get Notified",
    description:
      "Matching donors receive email notifications about emergency requests.",
    icon: Mail,
  },
  {
    number: "04",
    title: "Save a Life",
    description: "Connect with a suitable donor and help someone in need.",
    icon: Heart,
  },
];

const HowItWorks = () => {
  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-emerald-600">
            Simple Process
          </span>

          <h2 className="mt-3 text-3xl font-bold text-gray-900 sm:text-4xl">
            How It Works
          </h2>

          <p className="mt-4 text-gray-500">
            Finding and connecting with blood donors has never been easier.
            Follow these simple steps.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => {
            const Icon = step.icon;

            return (
              <div
                key={step.number}
                className="group rounded-2xl border border-gray-100 bg-white p-7 transition-all hover:-translate-y-1 hover:border-emerald-200 hover:shadow-lg"
              >
                <div className="mb-6 flex items-center justify-between">
                  <div className="rounded-xl bg-emerald-50 p-4 text-emerald-600 transition-colors group-hover:bg-emerald-600 group-hover:text-white">
                    <Icon size={27} />
                  </div>

                  <span className="text-3xl font-bold text-gray-100">
                    {step.number}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-gray-900">
                  {step.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-gray-500">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;