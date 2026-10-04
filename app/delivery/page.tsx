import type { Metadata } from "next";
import AnnouncementBar from "../components/layout/AnnouncementBar";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

export const metadata: Metadata = {
  title: "Delivery & Service Policy",
  description:
    "Read the ScriptEdge Delivery & Service Policy covering digital delivery, physical delivery, timelines and delivery charges.",
};

export default function DeliveryPolicyPage() {
  return (
    <>
      <AnnouncementBar />
      <Navbar />

      <main className="bg-white">
        {/* Hero */}
        <section className="bg-emerald-600 py-20 text-white">
          <div className="mx-auto max-w-5xl px-6 text-center">
            <h1 className="text-5xl font-bold">
              Delivery & Service Policy
            </h1>

            <p className="mx-auto mt-5 max-w-3xl text-lg text-emerald-100">
              Information about how ScriptEdge provides digital and
              physical services and handles delivery.
            </p>
          </div>
        </section>

        {/* Policy Content */}
        <section className="py-16">
          <div className="mx-auto max-w-4xl px-6">
            <div className="space-y-10 text-gray-700 leading-7">

              <section>
                <h2 className="text-2xl font-bold text-gray-900">
                  1. About Our Services
                </h2>

                <p className="mt-4">
                  ScriptEdge provides academic document preparation and
                  project-related services, including assignments, projects,
                  practical files, presentations, project reports and
                  related academic materials.
                </p>

                <p className="mt-4">
                  Depending on the service selected, an order may be
                  delivered digitally, physically or through a combination
                  of both.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900">
                  2. Digital Delivery
                </h2>

                <p className="mt-4">
                  Digital work may be delivered through the customer's
                  ScriptEdge account, email, WhatsApp or another delivery
                  method agreed with the customer.
                </p>

                <p className="mt-4">
                  Depending on the service, files may be provided in
                  formats such as PDF, DOC, DOCX, PPT, PPTX or another
                  suitable format.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900">
                  3. Physical Delivery
                </h2>

                <p className="mt-4">
                  Physical orders may be delivered through local delivery,
                  courier services or another suitable delivery method.
                </p>

                <p className="mt-4">
                  Delivery within Sasaram is generally provided without an
                  additional delivery charge, subject to service availability
                  and the nature of the order.
                </p>

                <p className="mt-4">
                  Delivery outside Sasaram may involve additional delivery
                  charges depending on the destination, courier availability,
                  package size or weight and applicable delivery rates.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900">
                  4. Delivery Charges
                </h2>

                <p className="mt-4">
                  Any applicable delivery charges will be communicated to
                  the customer before the order is processed or dispatched,
                  where reasonably possible.
                </p>

                <p className="mt-4">
                  Unless specifically stated otherwise, delivery charges
                  are separate from the service price.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900">
                  5. Estimated Delivery Time
                </h2>

                <p className="mt-4">
                  Estimated completion and delivery times may depend on the
                  selected service or plan, complexity of the work, customer
                  requirements, availability of reference materials,
                  printing or binding requirements and the deadline agreed
                  with the customer.
                </p>

                <p className="mt-4">
                  Any delivery estimate provided by ScriptEdge is intended
                  as a reasonable estimate unless a specific deadline has
                  been expressly agreed.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900">
                  6. Customer Responsibility
                </h2>

                <p className="mt-4">
                  Customers are responsible for providing accurate and
                  complete information required to fulfil an order.
                </p>

                <p className="mt-4">
                  For physical delivery, customers must provide a correct
                  name, phone number and delivery address and should remain
                  reasonably available to receive the order.
                </p>

                <p className="mt-4">
                  Delays caused by incorrect, incomplete or changed
                  customer information may affect the delivery timeline.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900">
                  7. Failed or Missed Delivery
                </h2>

                <p className="mt-4">
                  If a physical delivery cannot be completed because the
                  customer is unavailable, the address is incorrect or the
                  delivery cannot reasonably be completed, a re-delivery
                  attempt may be arranged where possible.
                </p>

                <p className="mt-4">
                  Additional delivery or re-delivery charges may apply
                  where such costs are incurred.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900">
                  8. Address Changes
                </h2>

                <p className="mt-4">
                  Customers should provide the correct delivery address
                  before dispatch.
                </p>

                <p className="mt-4">
                  Address changes requested after dispatch may not always
                  be possible and may result in additional delivery charges
                  or delays.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900">
                  9. Digital Delivery Issues
                </h2>

                <p className="mt-4">
                  If a customer cannot access or open a delivered digital
                  file due to a technical issue attributable to ScriptEdge,
                  the customer should contact us as soon as possible.
                </p>

                <p className="mt-4">
                  Where appropriate, ScriptEdge may provide a corrected
                  file or another reasonable solution.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900">
                  10. Delays Outside Our Control
                </h2>

                <p className="mt-4">
                  ScriptEdge may not be responsible for delays caused by
                  circumstances outside our reasonable control, including
                  courier delays, transportation issues, technical failures,
                  internet or communication problems, natural events or
                  other unexpected circumstances.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900">
                  11. Service Completion
                </h2>

                <p className="mt-4">
                  An order may be considered completed when the requested
                  digital work has been delivered or when the physical
                  order has been prepared and delivered or made available
                  for collection, as applicable to the order.
                </p>

                <p className="mt-4">
                  Customers should review delivered work and report any
                  reasonable issue in accordance with the ScriptEdge
                  Refund Policy and Terms & Conditions.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900">
                  12. Contact Us
                </h2>

                <p className="mt-4">
                  If you have questions about delivery, service completion
                  or an order, please contact ScriptEdge using the contact
                  details provided on our website.
                </p>

                <p className="mt-4">
                  <strong>ScriptEdge</strong>
                  <br />
                  Sasaram, Rohtas, Bihar – 821115
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