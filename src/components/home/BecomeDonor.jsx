import Link from "next/link";
import { Heart, ArrowRight } from "lucide-react";

const BecomeDonor = () => {
  return (
    <section className="px-6 py-20">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl bg-emerald-700 px-8 py-16 text-center sm:px-16">
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10" />
        <div className="absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-white/10" />

        <div className="relative mx-auto max-w-2xl">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white/15 text-white">
            <Heart size={32} />
          </div>

          <h2 className="mt-7 text-3xl font-bold text-white sm:text-4xl">
            Your Blood Can Save a Life
          </h2>

          <p className="mt-5 leading-7 text-emerald-50">
            Become a blood donor today. Your small act of kindness can give
            someone another chance at life.
          </p>

          <Link
            href="/register"
            className="mt-8 inline-flex items-center gap-3 rounded-full bg-white px-7 py-3.5 text-sm font-bold text-emerald-700 transition hover:bg-emerald-50"
          >
            Become a Donor
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BecomeDonor;