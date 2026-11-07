const PublicHero = ({ eyebrow, title, subtitle }) => (
    <section className="bg-gradient-to-br from-emerald-50 via-white to-white">
        <div className="mx-auto max-w-6xl px-6 py-14 text-center">
            {eyebrow && (
                <span className="text-xs font-bold uppercase tracking-[0.15em] text-red-600">{eyebrow}</span>
            )}
            <h1 className="mt-3 font-serif text-4xl font-semibold text-[#1F2937] sm:text-5xl">{title}</h1>
            {subtitle && <p className="mx-auto mt-4 max-w-2xl text-gray-600">{subtitle}</p>}
        </div>
    </section>
);

export default PublicHero;
