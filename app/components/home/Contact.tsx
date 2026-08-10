import { MessageCircle, Mail, Camera } from "lucide-react";

export default function Contact() {
  return (
    <section className="bg-gray-50 py-20 sm:py-24">
      <div className="mx-auto max-w-5xl px-5 text-center sm:px-6">

        {/* Heading */}
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Need Help With Your Academic Work?
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-gray-600 sm:text-lg">
          Tell us what you need and we will help you get your academic work
          completed before your deadline.
        </p>

        {/* Contact Options */}
        <div className="mt-10 grid gap-4 sm:grid-cols-3">

          <a
            href="https://wa.me/918252517340"
            target="_blank"
            rel="noopener noreferrer"
            className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-lg"
          >
            <MessageCircle
              className="mx-auto text-emerald-600 transition-transform group-hover:scale-110"
              size={30}
            />

            <h3 className="mt-4 font-semibold text-gray-900">
              WhatsApp
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              Chat with us
            </p>
          </a>

          <a
             href="https://mail.google.com/mail/?view=cm&fs=1&to=scriptedge.eduofficial@gmail.com"
  target="_blank"
  rel="noopener noreferrer"
            className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-lg"
          >
            <Mail
              className="mx-auto text-emerald-600 transition-transform group-hover:scale-110"
              size={30}
            />

            <h3 className="mt-4 font-semibold text-gray-900">
              Email
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              Send us an email
            </p>
          </a>

          <a
            href="https://instagram.com/scriptedge_official.in"
            target="_blank"
            rel="noopener noreferrer"
            className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-lg"
          >
            <Camera
              className="mx-auto text-emerald-600 transition-transform group-hover:scale-110"
              size={30}
            />

            <h3 className="mt-4 font-semibold text-gray-900">
              Instagram
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              Follow ScriptEdge
            </p>
          </a>

        </div>

        {/* Main CTA */}
        <div className="mt-8">
          <a
            href="/contact"
            className="inline-flex rounded-xl bg-emerald-600 px-8 py-3.5 text-base font-semibold text-white transition hover:bg-emerald-700 sm:text-lg"
          >
            Contact Us
          </a>
        </div>

      </div>
    </section>
  );
}