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
  FaArrowRight,
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
  { href: "/blood-requests", label: "Blood Requests" },
  { href: "/contact", label: "Contact Us" },
];

const accountLinks = [
  { href: "/register", label: "Become a Donor" },
  { href: "/dashboard/patient/requests/new", label: "Request Blood" },
  { href: "/login", label: "Log In" },
  { href: "/register", label: "Create Account" },
];

const FooterHeading = ({ children }) => (
  <h3 className="mb-6 text-sm font-bold uppercase tracking-wider text-white">
    {children}
  </h3>
);

const FooterLink = ({ href, children }) => (
  <Link
    href={href}
    className="group flex w-fit items-center gap-2 text-sm text-emerald-100/70 transition-colors duration-200 hover:text-white"
  >
    <span className="h-1 w-1 rounded-full bg-emerald-400 opacity-0 transition-opacity group-hover:opacity-100" />
    {children}
  </Link>
);

const Footer = () => {
  return (
    <footer className="bg-[#064E3B] text-emerald-50">
      <div className="mx-auto max-w-6xl px-6">
        {/* CTA Section */}
        <div className="relative -top-1 flex flex-col items-center justify-between gap-6 rounded-2xl bg-[#ECFDF5] p-7 shadow-xl sm:flex-row sm:p-9">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-100 text-red-600">
              <FaDroplet className="text-xl" />
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
                Someone Needs Blood. Be Their Hero.
              </h2>

              <p className="mt-2 max-w-lg text-sm leading-6 text-gray-600">
                Your one donation can make a life-changing difference. Join our
                donor community today.
              </p>
            </div>
          </div>

          <Link
            href="/register"
            className="inline-flex shrink-0 items-center gap-3 rounded-full bg-red-600 px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-red-700 hover:shadow-lg"
          >
            Become a Donor
            <FaArrowRight />
          </Link>
        </div>

        {/* Footer Columns */}
        <div className="grid gap-12 py-14 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <Link href="/" className="inline-flex items-center gap-2.5">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-600 text-white">
                <FaDroplet className="text-lg" />
              </span>

              <span className="text-2xl font-bold tracking-tight text-white">
                BloodLink
              </span>
            </Link>

            <p className="mt-5 max-w-xs text-sm leading-7 text-emerald-100/70">
              Connecting verified blood donors with people in need. Together, we
              can make every second count and save more lives.
            </p>

            <div className="mt-6 flex items-center gap-3">
              {socialLinks.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-emerald-100 transition-all hover:border-red-500 hover:bg-red-600 hover:text-white"
                >
                  <Icon className="text-sm" />
                </a>
              ))}
            </div>
          </div>

          {/* Explore */}
          <div>
            <FooterHeading>Explore</FooterHeading>

            <ul className="space-y-4">
              {exploreLinks.map((item) => (
                <li key={item.label}>
                  <FooterLink href={item.href}>{item.label}</FooterLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Get Involved */}
          <div>
            <FooterHeading>Get Involved</FooterHeading>

            <ul className="space-y-4">
              {accountLinks.map((item) => (
                <li key={item.label}>
                  <FooterLink href={item.href}>{item.label}</FooterLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <FooterHeading>Get In Touch</FooterHeading>

            <p className="mb-6 text-sm leading-6 text-emerald-100/70">
              Have questions or need assistance? We are here to help.
            </p>

            <ul className="space-y-5">
              <li className="flex items-start gap-3">
                <FaPhone className="mt-1 shrink-0 text-red-400" />
                <span className="text-sm text-emerald-100/80">
                  (+880) 1XXX-XXXXXX
                </span>
              </li>

              <li className="flex items-start gap-3">
                <FaEnvelope className="mt-1 shrink-0 text-red-400" />
                <span className="text-sm text-emerald-100/80">
                  support@bloodlink.com
                </span>
              </li>

              <li className="flex items-start gap-3">
                <FaLocationDot className="mt-1 shrink-0 text-red-400" />
                <span className="text-sm text-emerald-100/80">
                  Chattogram, Bangladesh
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-6 text-center md:flex-row md:text-left">
          <p className="text-xs text-emerald-100/60 sm:text-sm">
            © {new Date().getFullYear()}{" "}
            <span className="font-semibold text-white">BloodLink</span>. Made
            with care to save lives.
          </p>

          <div className="flex items-center gap-5 text-xs text-emerald-100/70 sm:text-sm">
            <Link
              href="/privacy-policy"
              className="transition-colors hover:text-white"
            >
              Privacy Policy
            </Link>

            <Link
              href="/terms-and-conditions"
              className="transition-colors hover:text-white"
            >
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;