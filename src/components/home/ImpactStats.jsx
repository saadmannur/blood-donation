import { Users, HeartHandshake, Droplets, MapPin } from "lucide-react";

const stats = [
  {
    label: "Registered Donors",
    value: "1,250+",
    icon: Users,
    color: "bg-emerald-50 text-emerald-600",
  },
  {
    label: "Blood Requests",
    value: "850+",
    icon: Droplets,
    color: "bg-red-50 text-red-600",
  },
  {
    label: "Lives Supported",
    value: "620+",
    icon: HeartHandshake,
    color: "bg-blue-50 text-blue-600",
  },
  {
    label: "Cities Covered",
    value: "25+",
    icon: MapPin,
    color: "bg-amber-50 text-amber-600",
  },
];

const ImpactStats = () => {
  return (
    <section className="relative z-10 mx-auto -mt-8 max-w-6xl px-6">
      <div className="grid grid-cols-2 gap-4 rounded-2xl border border-gray-100 bg-white p-6 shadow-lg md:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div key={stat.label} className="flex items-center gap-4">
              <div className={`rounded-xl p-3 ${stat.color}`}>
                <Icon size={24} />
              </div>

              <div>
                <h3 className="text-2xl font-bold text-gray-900">
                  {stat.value}
                </h3>
                <p className="text-xs text-gray-500 sm:text-sm">{stat.label}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ImpactStats;