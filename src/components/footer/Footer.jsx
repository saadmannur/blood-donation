import Link from "next/link";
import {
  FaFacebookF,
  FaInstagram,
  FaWhatsapp,
  FaXTwitter,
  FaPhone,
  FaEnvelope,
  FaLocationDot,
  FaDroplet,
} from "react-icons/fa6";

const socialLinks = [
  { href: "https://facebook.com", label: "Facebook", Icon: FaFacebookF },
  { href: "https://x.com", label: "X", Icon: FaXTwitter },
  { href: "https://instagram.com", label: "Instagram", Icon: FaInstagram },
  { href: "https://wa.me", label: "WhatsApp", Icon: FaWhatsapp },
];

const exploreLinks = [
  { href: "/about", label: "About Us" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/find-donors", label: "Find Donors" },
  { href: "/contact", label: "Contact" },
];

const accountLinks = [
  { href: "/register", label: "Become a Donor" },
  { href: "/dashboard/patient/requests/new", label: "Request Blood" },
  { href: "/login", label: "Log In" },
  { href: "/register", label: "Sign Up" },
];

const ColumnTitle = ({ children }) => (
  <h3 className="mb-5 text-sm font-semibold uppercase tracking-wider text-white">
    {children}
  </h3>
);

const FooterLink = ({ href, children }) => (
  <Link
    href={href}
    className="text-sm text-gray-400 transition-colors hover:text-red-400"
  >
    {children}
  </Link>
);

const Footer = () => {
  return (
    <footer className="bg-[#111827] text-gray-300">
      <div className="mx-auto max-w-6xl px-6 pt-16">
        {/* CTA strip */}
        <div className="flex flex-col items-start justify-between gap-5 rounded-2xl bg-gradient-to-r from-red-600 to-red-700 p-6 sm:flex-row sm:items-center sm:p-8">
          <div>
            <h2 className="text-xl font-bold text-white sm:text-2xl">
              Need blood urgently?
            </h2>
            <p className="mt-1 text-sm text-white/80">
              Post a request and matching donors are notified right away.
            </p>
          </div>
          <Link
            href="/dashboard/patient/requests/new"
            className="shrink-0 rounded-full bg-white px-6 py-3 text-sm font-semibold text-red-600 shadow-md transition-transform hover:scale-[1.03]"
          >
            Request Blood
          </Link>
        </div>

        {/* Columns */}
        <div className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-full rounded-bl-none bg-red-600 text-white">
                <FaDroplet className="h-4 w-4" />
              </span>
              <span className="text-lg font-bold text-white">BloodLink</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-gray-400">
              A network that connects verified blood donors with patients in
              emergencies, faster than social media posts.
            </p>
            <div className="mt-5 flex items-center gap-2.5">
              {socialLinks.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-gray-300 transition-colors hover:border-red-600 hover:bg-red-600 hover:text-white"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Explore */}
          <div>
            <ColumnTitle>Explore</ColumnTitle>
            <ul className="space-y-3">
              {exploreLinks.map((l) => (
                <li key={l.label}>
                  <FooterLink href={l.href}>{l.label}</FooterLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Get involved */}
          <div>
            <ColumnTitle>Get Involved</ColumnTitle>
            <ul className="space-y-3">
              {accountLinks.map((l) => (
                <li key={l.label}>
                  <FooterLink href={l.href}>{l.label}</FooterLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <ColumnTitle>Contact</ColumnTitle>
            <ul className="space-y-4 text-sm text-gray-400">
              <li className="flex items-center gap-3">
                <FaPhone className="h-4 w-4 text-red-500" />
                (+880) 1XXX-XXXXXX
              </li>
              <li className="flex items-center gap-3">
                <FaEnvelope className="h-4 w-4 text-red-500" />
                support@bloodlink.com
              </li>
              <li className="flex items-center gap-3">
                <FaLocationDot className="h-4 w-4 text-red-500" />
                Chattogram, Bangladesh
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 py-5 text-sm text-gray-500 md:flex-row">
          <p>
            © {new Date().getFullYear()}{" "}
            <span className="font-semibold text-gray-300">BloodLink</span>. All
            rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/privacy-policy" className="hover:text-red-400">
              Privacy Policy
            </Link>
            <span className="text-white/20">|</span>
            <Link href="/terms-and-conditions" className="hover:text-red-400">
              Terms &amp; Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;