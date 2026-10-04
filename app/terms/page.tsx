import type { Metadata } from "next";
import AnnouncementBar from "../components/layout/AnnouncementBar";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "Read the ScriptEdge Terms & Conditions governing the use of our website, academic document preparation and related services.",
};

export default function TermsPage() {
  return (
    <>
      <AnnouncementBar />
      <Navbar />

      <main className="bg-white">
        {/* Hero */}
        <section className="bg-emerald-600 py-20 text-white">
          <div className="mx-auto max-w-5xl px-6 text-center">
            <h1 className="text-5xl font-bold">
              Terms & Conditions
            </h1>

            <p className="mx-auto mt-5 max-w-3xl text-lg text-emerald-100">
              Please read these terms before using ScriptEdge services
              or placing an order.
            </p>
          </div>
        </section>

        {/* Terms Content */}
        <section className="py-16">
          <div className="mx-auto max-w-4xl px-6">
            <div className="space-y-10 text-gray-700 leading-7">

              <section>
                <h2 className="text-2xl font-bold text-gray-900">
                  1. About ScriptEdge
                </h2>

                <p className="mt-4">
                  ScriptEdge provides academic document preparation and
                  project-related services, including assignments, projects,
                  practical files, presentations, project reports and
                  related academic materials.
                </p>

                <p className="mt-4">
                  ScriptEdge operates as a service provider and is not a
                  school, college, university, examination authority or
                  academic institution.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900">
                  2. Use of Our Services
                </h2>

                <p className="mt-4">
                  Our services are intended to provide document preparation,
                  formatting, presentation, project-related and other
                  academic support services.
                </p>

                <p className="mt-4">
                  Customers are responsible for using any materials received
                  from ScriptEdge appropriately and in accordance with the
                  rules, policies and academic-integrity requirements of
                  their respective institution.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900">
                  3. Orders and Customer Requirements
                </h2>

                <p className="mt-4">
                  Customers are responsible for providing accurate and
                  complete requirements, instructions, reference materials,
                  contact information and deadlines necessary to process an
                  order.
                </p>

                <p className="mt-4">
                  ScriptEdge may contact the customer for clarification or
                  additional information where necessary. Delays caused by
                  incomplete, inaccurate or late information provided by the
                  customer may affect the delivery timeline.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900">
                  4. Order Acceptance
                </h2>

                <p className="mt-4">
                  Submitting an order does not automatically guarantee
                  acceptance. ScriptEdge may review an order before
                  processing it and may decline or cancel an order where
                  requirements cannot reasonably be fulfilled.
                </p>

                <p className="mt-4">
                  If ScriptEdge declines an order after payment has been
                  received, an appropriate refund may be issued in accordance
                  with our Refund Policy.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900">
                  5. Pricing and Payment
                </h2>

                <p className="mt-4">
                  Prices displayed on the website may vary depending on the
                  selected service, plan, complexity, length, deadline and
                  other requirements.
                </p>

                <p className="mt-4">
                  The applicable price will be shown or communicated before
                  the order is processed. Additional charges may apply where
                  the customer requests substantial changes, additional
                  services, special materials or other work outside the
                  original requirements.
                </p>

                <p className="mt-4">
                  Online payments may be processed through an authorised
                  third-party payment gateway. Payment confirmation may be
                  subject to verification by the payment provider.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900">
                  6. Delivery
                </h2>

                <p className="mt-4">
                  ScriptEdge may provide services through digital delivery,
                  physical delivery, or both, depending on the nature of the
                  order.
                </p>

                <p className="mt-4">
                  Digital work may be delivered through the customer's
                  ScriptEdge account, email, WhatsApp or another agreed
                  digital method.
                </p>

                <p className="mt-4">
                  Physical orders may be delivered through local delivery,
                  courier services or another suitable delivery method.
                  Local delivery within Sasaram is generally provided free
                  of charge.
                </p>

                <p className="mt-4">
                  Delivery charges may apply for locations outside Sasaram
                  depending on the destination, courier availability,
                  package size or weight and applicable delivery rates.
                </p>

                <p className="mt-4">
                  Further information is provided in our Delivery & Service
                  Policy.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900">
                  7. Delivery Timelines
                </h2>

                <p className="mt-4">
                  Delivery timelines depend on the type and complexity of
                  the service, selected plan, customer requirements,
                  materials required, deadline and availability of delivery
                  services.
                </p>

                <p className="mt-4">
                  Any delivery timeframe provided by ScriptEdge is an
                  estimated timeframe unless a specific delivery commitment
                  has been expressly agreed with the customer.
                </p>

                <p className="mt-4">
                  ScriptEdge is not responsible for delays caused by
                  circumstances beyond its reasonable control, including
                  courier delays, transportation disruptions, weather,
                  technical issues or delays in receiving required
                  information from the customer.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900">
                  8. Corrections and Revisions
                </h2>

                <p className="mt-4">
                  Customers should review delivered work and notify
                  ScriptEdge of any reasonable issue or correction required
                  in relation to the original agreed requirements.
                </p>

                <p className="mt-4">
                  Corrections resulting from ScriptEdge's error may be
                  addressed where appropriate. Changes to the original
                  requirements may require additional time or charges.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900">
                  9. Cancellation and Refunds
                </h2>

                <p className="mt-4">
                  Cancellation and refund requests are handled according to
                  the ScriptEdge Refund Policy.
                </p>

                <p className="mt-4">
                  Because many services are prepared specifically for an
                  individual order, refund eligibility may depend on whether
                  work has started, whether materials or printing costs have
                  been incurred, and whether the order has been delivered or
                  dispatched.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900">
                  10. Academic Integrity
                </h2>

                <p className="mt-4">
                  ScriptEdge provides document preparation and academic
                  support services. Customers remain responsible for
                  complying with the academic-integrity rules and policies
                  applicable to their school, college, university or other
                  institution.
                </p>

                <p className="mt-4">
                  Customers should use any material supplied by ScriptEdge
                  only in ways permitted by their institution and applicable
                  rules.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900">
                  11. Intellectual Property
                </h2>

                <p className="mt-4">
                  ScriptEdge retains rights in its original branding, logo,
                  website content, templates, graphics, design elements and
                  other proprietary materials unless otherwise agreed.
                </p>

                <p className="mt-4">
                  Customers may not reproduce, resell, commercially
                  redistribute or misuse ScriptEdge branding or proprietary
                  website materials without prior permission.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900">
                  12. Customer Information
                </h2>

                <p className="mt-4">
                  Customers must provide accurate information necessary to
                  process and deliver their orders. ScriptEdge may use
                  customer information for order processing, communication,
                  payment verification, delivery and related service
                  purposes in accordance with its Privacy Policy.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900">
                  13. Changes to Services and Terms
                </h2>

                <p className="mt-4">
                  ScriptEdge may modify, update, suspend or discontinue
                  services, pricing, website features or these Terms &
                  Conditions when reasonably necessary.
                </p>

                <p className="mt-4">
                  Updated terms will be published on this page with the
                  applicable effective or updated date.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900">
                  14. Contact
                </h2>

                <p className="mt-4">
                  If you have questions regarding these Terms & Conditions,
                  an order or our services, please contact ScriptEdge using
                  the contact details provided on the website.
                </p>

                <p className="mt-4">
                  <strong>ScriptEdge</strong>
                  <br />
                  Sasaram, Bihar – 821115
                  <br />
                  Website: www.scriptedge.co.in
                </p>
              </section>

              <div className="border-t pt-8 text-sm text-gray-500">
                Last updated: 04 October 2026
              </div>

            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}