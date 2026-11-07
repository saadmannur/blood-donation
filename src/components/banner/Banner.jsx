import Link from "next/link";
import BannerCarousel from "./BannerCarousel";

// Teardrop shape: circle with the bottom-left corner squared off.
const SHAPE = "rounded-[50%_50%_50%_0]";

const Banner = () => {
    return (
        <section className="relative overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-white">
            <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 pb-20 pt-12 lg:grid-cols-2 lg:pt-16">
                {/* Text */}
                <div className="order-2 lg:order-1">
                    <h1 className="font-serif text-4xl font-semibold leading-tight text-[#1F2937] sm:text-5xl lg:text-6xl">
                        Donate blood,
                        <br />
                        save life!
                    </h1>

                    <p className="mt-6 max-w-md text-sm leading-relaxed text-gray-600 sm:text-base">
                        Register as a donor or post an emergency request. We match verified,
                        available donors by blood group and city, and notify them instantly.
                    </p>

                    <div className="mt-8 flex flex-wrap items-center gap-4">
                        <Link
                            href="/register"
                            className="group flex items-center gap-4 rounded-full bg-white py-2 pl-6 pr-2 text-sm font-semibold text-[#1F2937] shadow-md transition-shadow hover:shadow-lg"
                        >
                            Donate Now
                            <span className="flex h-10 w-10 items-center justify-center rounded-full rounded-tr-md bg-green-600 text-white transition-transform group-hover:translate-x-0.5">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
                                </svg>
                            </span>
                        </Link>

                        <Link
                            href="/dashboard/patient/requests/new"
                            className="rounded-full border border-red-600 px-6 py-3 text-sm font-semibold text-red-600 transition-colors hover:bg-red-600 hover:text-white"
                        >
                            Request Blood
                        </Link>
                    </div>
                </div>

                {/* Image */}
                <div className="order-1 flex justify-center lg:order-2 lg:justify-end">
                    <div className="relative h-[320px] w-[320px] sm:h-[400px] sm:w-[400px]">
                        {/* red offset shape behind the photo */}
                        <div className={`absolute inset-0 -translate-x-3 translate-y-3 bg-red-600 ${SHAPE}`} />
                        <div className={`relative h-full w-full overflow-hidden ${SHAPE}`}>
                            <BannerCarousel className="h-full" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Banner;
