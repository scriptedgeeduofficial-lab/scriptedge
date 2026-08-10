import AnnouncementBar from "../components/layout/AnnouncementBar";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

export default function PrivacyPolicyPage() {
  return (
    <>
      <AnnouncementBar />
      <Navbar />

      <main className="bg-white">
        {/* Hero */}
        <section className="bg-emerald-600 py-20 text-white">
          <div className="mx-auto max-w-5xl px-6 text-center">
            <h1 className="text-5xl font-bold">
              Privacy Policy
            </h1>

            <p className="mx-auto mt-5 max-w-3xl text-lg text-emerald-100">
              Your privacy matters to us. This policy explains how
              ScriptEdge handles information when you use our website
              and services.
            </p>
          </div>
        </section>

        {/* Policy Content */}
        <section className="py-16">
          <div className="mx-auto max-w-4xl px-6">

            <div className="space-y-10 text-gray-700 leading-7">

              <section>
                <h2 className="text-2xl font-bold text-gray-900">
                  1. Information We Collect
                </h2>

                <p className="mt-4">
                  When you contact ScriptEdge or place an order, we may
                  receive information such as your name, phone number,
                  email address, academic requirements and other details
                  that you voluntarily provide.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900">
                  2. How We Use Your Information
                </h2>

                <p className="mt-4">
                  We use the information you provide to communicate with
                  you, understand your requirements, process requests,
                  provide academic assistance and improve our services.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900">
                  3. Communication
                </h2>

                <p className="mt-4">
                  You may contact us through WhatsApp, email, Instagram
                  or other communication methods displayed on our
                  website. Information shared through these platforms
                  may also be subject to the privacy policies of those
                  respective services.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900">
                  4. Information Security
                </h2>

                <p className="mt-4">
                  We take reasonable measures to protect information
                  provided to us. However, no method of transmitting or
                  storing information online can be guaranteed to be
                  completely secure.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900">
                  5. Third-Party Services
                </h2>

                <p className="mt-4">
                  Our website may contain links to third-party services
                  such as WhatsApp, Gmail and Instagram. We are not
                  responsible for the privacy practices or content of
                  those third-party platforms.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900">
                  6. Cookies
                </h2>

                <p className="mt-4">
                  ScriptEdge may use basic technologies necessary for
                  website functionality. We do not currently use cookies
                  to collect sensitive personal information for
                  advertising purposes.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900">
                  7. Children's Privacy
                </h2>

                <p className="mt-4">
                  Our services may be used by students of different age
                  groups. We encourage students under the age of 18 to
                  involve a parent or guardian when sharing personal
                  information or placing an order.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900">
                  8. Changes to This Policy
                </h2>

                <p className="mt-4">
                  We may update this Privacy Policy from time to time.
                  Any changes will be reflected on this page.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900">
                  9. Contact Us
                </h2>

                <p className="mt-4">
                  If you have questions about this Privacy Policy, you
                  can contact ScriptEdge through the contact details
                  provided on our website.
                </p>
              </section>

              <div className="border-t pt-8 text-sm text-gray-500">
                Last updated: August 2026
              </div>

            </div>

          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
