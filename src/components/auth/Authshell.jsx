import Link from "next/link";
import {
  FaDroplet,
  FaShieldHeart,
  FaBolt,
  FaLocationDot,
} from "react-icons/fa6";

const points = [
  { Icon: FaShieldHeart, text: "Admin-verified donors only" },
  { Icon: FaLocationDot, text: "Matched by blood group and city" },
  { Icon: FaBolt, text: "Instant email alerts in emergencies" },
];

// Split-screen layout: left e red brand panel, right e form.
const AuthShell = ({ heading, sub, children }) => {
  return (
    <div className="grid min-h-[calc(100vh-5rem)] lg:grid-cols-[1fr_1.1fr]">
      {/* Left panel */}
      <aside className="relative hidden overflow-hidden bg-gradient-to-br from-red-600 via-red-700 to-red-900 text-white lg:block">
        {/* decorative drops */}
        <FaDroplet className="absolute -right-10 -top-10 h-64 w-64 rotate-12 text-white/10" />
        <FaDroplet className="absolute -bottom-16 -left-10 h-80 w-80 -rotate-12 text-white/10" />

        <div className="relative flex h-full flex-col justify-between p-12 lg:sticky lg:top-0 lg:h-[calc(100vh-5rem)]">
          <Link href="/" className="flex items-center gap-2 text-lg font-bold">
            <span className="flex h-8 w-8 items-center justify-center rounded-full rounded-bl-none bg-white text-red-600">
              <FaDroplet className="h-4 w-4" />
            </span>
            BloodLink
          </Link>

          <div>
            <h2 className="font-serif text-4xl font-semibold leading-tight">
              Every drop
              <br />
              can save a life.
            </h2>
            <ul className="mt-8 space-y-4">
              {points.map(({ Icon, text }) => (
                <li
                  key={text}
                  className="flex items-center gap-3 text-sm text-white/90"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15">
                    <Icon className="h-4 w-4" />
                  </span>
                  {text}
                </li>
              ))}
            </ul>
          </div>

          <p className="text-xs text-white/60">
            Blood Donation and Emergency Help Network
          </p>
        </div>
      </aside>

      {/* Right: form */}
      <main className="flex items-center justify-center bg-white px-5 py-12">
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-bold text-[#1F2937]">{heading}</h1>
          <p className="mt-2 text-sm text-gray-500">{sub}</p>
          <div className="mt-8">{children}</div>
        </div>
      </main>
    </div>
  );
};

export default AuthShell;
