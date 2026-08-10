import Link from "next/link";
import {
  Phone,
  Mail,
  Camera,
  MapPin,
} from "lucide-react";

const quickLinks = [
  { name: "Home", href: "/#top" },
  { name: "Services", href: "/services" },
  { name: "Pricing", href: "/pricing" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

const services = [
  "Assignments",
  "Projects",
  "Practical Files",
  "Presentations",
  "Holiday Homework",
];

const policies = [
  "Privacy Policy",
  "Terms & Conditions",
  "Refund Policy",
];

export default function Footer() {
  return (
    <footer className="overflow-x-hidden bg-gray-950 text-white">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-6 sm:py-16">

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12">

          {/* Brand */}
          <div>
            <Link
              href="/#top"
              className="text-3xl font-bold text-emerald-400"
            >
              ScriptEdge
            </Link>

            <p className="mt-5 max-w-sm text-sm leading-7 text-gray-400 sm:text-base">
              Academic Work Made Easy.
              We help school and college students complete
              assignments, projects, practical files and academic work
              before deadlines.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold">
              Quick Links
            </h3>

            <ul className="mt-5 space-y-3">
              {quickLinks.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-gray-400 transition hover:text-emerald-400 sm:text-base"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold">
              Services
            </h3>

            <ul className="mt-5 space-y-3">
              {services.map((service) => (
                <li
                  key={service}
                  className="text-sm text-gray-400 sm:text-base"
                >
                  {service}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold">
              Contact
            </h3>

            <div className="mt-5 space-y-4">

              <a
                href="https://wa.me/918252517340"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm text-gray-400 transition hover:text-emerald-400 sm:text-base"
              >
                <Phone size={18} />
                <span>+91 8252517340</span>
              </a>

              <a
                href="mailto:scriptedge.eduofficial@gmail.com"
                className="flex items-center gap-3 text-sm text-gray-400 transition hover:text-emerald-400 sm:text-base"
              >
                <Mail size={18} />
                <span>scriptedge.eduofficial@gmail.com</span>
              </a>

              <a
                href="https://instagram.com/scriptedge_official.in"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm text-gray-400 transition hover:text-emerald-400 sm:text-base"
              >
                <Camera size={18} />
                <span>@scriptedge_official.in</span>
              </a>

              <div className="flex items-center gap-3 text-sm text-gray-400 sm:text-base">
                <MapPin size={18} />
                <span>Sasaram, Bihar</span>
              </div>

            </div>
          </div>

        </div>

        {/* Policies */}
        <div className="mt-12 border-t border-gray-800 pt-8">

          <div className="flex flex-col items-center justify-between gap-5 text-center sm:flex-row sm:text-left">

            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} ScriptEdge. All Rights Reserved.
            </p>

            <div className="flex flex-wrap justify-center gap-x-5 gap-y-2">
              {policies.map((policy) => {
  const href =
    policy === "Privacy Policy"
      ? "/privacy"
      : policy === "Terms & Conditions"
      ? "/terms"
      : "/refund";

  return (
    <Link
      key={policy}
      href={href}
      className="text-sm text-gray-500 transition hover:text-emerald-400"
    >
      {policy}
    </Link>
  );
})}
            </div>

          </div>

          <p className="mt-5 text-center text-sm text-gray-600">
            Made with ❤️ for Students
          </p>

        </div>

      </div>
    </footer>
  );
}
