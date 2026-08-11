import type { Metadata } from "next";
import AnnouncementBar from "../components/layout/AnnouncementBar";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

import { Mail, MapPin, Phone, Camera } from "lucide-react";
import { contactInfo } from "../data/contact";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Contact ScriptEdge for academic assistance with assignments, projects, practical files, presentations and other student work.",
};

export default function ContactPage() {
  const whatsappLink = `https://wa.me/${contactInfo.phone}?text=${encodeURIComponent(
    contactInfo.whatsappMessage
  )}`;

  const emailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${contactInfo.email}`;

  const instagramLink = "https://instagram.com/scriptedge_official.in";

  return (
    <>
      <AnnouncementBar />
      <Navbar />

      <main className="bg-gray-50">

        {/* Hero */}
        <section className="bg-gradient-to-r from-emerald-600 to-green-500 py-20 text-white md:py-24">
          <div className="mx-auto max-w-6xl px-6 text-center">

            <p className="text-sm font-semibold uppercase tracking-widest text-emerald-100">
              Get In Touch
            </p>

            <h1 className="mt-3 text-4xl font-bold md:text-5xl lg:text-6xl">
              Contact ScriptEdge
            </h1>

            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-emerald-50 md:text-xl">
              Have a question or need academic assistance?
              We are here to help.
            </p>

          </div>
        </section>

        {/* Contact Information */}
        <section className="py-20 md:py-24">
          <div className="mx-auto max-w-6xl px-6">

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">

              {/* Phone */}
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-2xl border border-gray-200 bg-white p-7 text-center shadow-sm transition duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-lg"
              >
                <Phone className="mx-auto h-10 w-10 text-emerald-600 transition-transform group-hover:scale-110" />

                <h2 className="mt-5 text-xl font-bold text-gray-900">
                  Phone
                </h2>

                <p className="mt-3 text-gray-600">
                  +91 {contactInfo.phone.replace(/^91/, "")}
                </p>

                <p className="mt-2 text-sm font-medium text-emerald-600">
                  Chat on WhatsApp
                </p>
              </a>

              {/* Email */}
              <a
                href={emailLink}
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-2xl border border-gray-200 bg-white p-7 text-center shadow-sm transition duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-lg"
              >
                <Mail className="mx-auto h-10 w-10 text-emerald-600 transition-transform group-hover:scale-110" />

                <h2 className="mt-5 text-xl font-bold text-gray-900">
                  Email
                </h2>

                <p className="mt-3 break-all text-gray-600">
                  {contactInfo.email}
                </p>

                <p className="mt-2 text-sm font-medium text-emerald-600">
                  Send an Email
                </p>
              </a>

              {/* Instagram */}
              <a
                href={instagramLink}
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-2xl border border-gray-200 bg-white p-7 text-center shadow-sm transition duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-lg"
              >
                <Camera className="mx-auto h-10 w-10 text-emerald-600 transition-transform group-hover:scale-110" />

                <h2 className="mt-5 text-xl font-bold text-gray-900">
                  Instagram
                </h2>

                <p className="mt-3 text-gray-600">
                  {contactInfo.instagram}
                </p>

                <p className="mt-2 text-sm font-medium text-emerald-600">
                  Follow ScriptEdge
                </p>
              </a>

              {/* Location */}
              <div className="rounded-2xl border border-gray-200 bg-white p-7 text-center shadow-sm">
                <MapPin className="mx-auto h-10 w-10 text-emerald-600" />

                <h2 className="mt-5 text-xl font-bold text-gray-900">
                  Location
                </h2>

                <p className="mt-3 text-gray-600">
                  {contactInfo.address}
                </p>
              </div>

            </div>

          </div>
        </section>

        {/* WhatsApp CTA */}
        <section className="pb-20 md:pb-24">
          <div className="mx-auto max-w-5xl px-6">

            <div className="rounded-3xl bg-white p-8 text-center shadow-lg md:p-12">

              <p className="text-sm font-semibold uppercase tracking-widest text-emerald-600">
                Need Assistance?
              </p>

              <h2 className="mt-3 text-3xl font-bold text-gray-900 md:text-4xl">
                Need Help With Your Academic Work?
              </h2>

              <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-gray-600">
                Tell us what you need, your deadline, and your requirements.
                We will help you choose the right service.
              </p>

              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-block rounded-xl bg-emerald-600 px-8 py-4 font-semibold text-white transition hover:bg-emerald-700"
              >
                Chat on WhatsApp
              </a>

            </div>

          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}