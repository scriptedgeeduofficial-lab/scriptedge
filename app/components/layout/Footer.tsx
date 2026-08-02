import Link from "next/link";

const quickLinks = [
  { name: "Home", href: "#" },
  { name: "Services", href: "#" },
  { name: "Pricing", href: "#" },
  { name: "FAQ", href: "#" },
  { name: "Contact", href: "#" },
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
    <footer className="bg-gray-900 text-white">

      <div className="mx-auto max-w-7xl px-6 py-16">

        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">

          {/* Brand */}

          <div>

            <h2 className="text-3xl font-bold text-emerald-400">
              ScriptEdge
            </h2>

            <p className="mt-5 text-gray-300 leading-7">
              Academic Work Made Easy.
              We help school and college students complete
              assignments, projects, practical files and academic work
              before deadlines.
            </p>

          </div>

          {/* Quick Links */}

          <div>

            <h3 className="text-xl font-semibold">
              Quick Links
            </h3>

            <ul className="mt-5 space-y-3">

              {quickLinks.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-gray-300 hover:text-emerald-400 transition"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}

            </ul>

          </div>

          {/* Services */}

          <div>

            <h3 className="text-xl font-semibold">
              Services
            </h3>

            <ul className="mt-5 space-y-3">

              {services.map((service) => (
                <li
                  key={service}
                  className="text-gray-300"
                >
                  {service}
                </li>
              ))}

            </ul>

          </div>

          {/* Contact */}

          <div>

            <h3 className="text-xl font-semibold">
              Contact
            </h3>

            <div className="mt-5 space-y-3 text-gray-300">

              <p>
                📞 +91 YOUR NUMBER
              </p>

              <p>
                📧 scriptedge.eduofficial@gmail.com
              </p>

              <p>
                📍 Sasaram, Bihar
              </p>

              <p>
                📷 @scriptedge_official.in
              </p>

            </div>

          </div>

        </div>

        <div className="mt-14 border-t border-gray-700 pt-8 text-center text-gray-400">

          © {new Date().getFullYear()} ScriptEdge.
          All Rights Reserved.

          <br />

          <span className="text-sm">
            Made with ❤️ for Students
          </span>

        </div>

      </div>

    </footer>
  );
}