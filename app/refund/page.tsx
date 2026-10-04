import type { Metadata } from "next";
import AnnouncementBar from "../components/layout/AnnouncementBar";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

export const metadata: Metadata = {
  title: "Refund Policy",
  description:
    "Read the ScriptEdge Refund Policy covering cancellations, refunds, revisions and order-related issues.",
};

export default function RefundPolicyPage() {
  return (
    <>
      <AnnouncementBar />
      <Navbar />

      <main className="bg-white">
        {/* Hero */}
        <section className="bg-emerald-600 py-20 text-white">
          <div className="mx-auto max-w-5xl px-6 text-center">
            <h1 className="text-5xl font-bold">
              Refund Policy
            </h1>

            <p className="mx-auto mt-5 max-w-3xl text-lg text-emerald-100">
              Please review our refund and cancellation terms before
              placing an order with ScriptEdge.
            </p>
          </div>
        </section>

        {/* Policy Content */}
        <section className="py-16">
          <div className="mx-auto max-w-4xl px-6">
            <div className="space-y-10 text-gray-700 leading-7">

              <section>
                <h2 className="text-2xl font-bold text-gray-900">
                  1. General Refund Policy
                </h2>

                <p className="mt-4">
                  ScriptEdge provides academic document preparation and
                  project-related services, including assignments,
                  projects, practical files, presentations, project
                  reports and related materials.
                </p>

                <p className="mt-4">
                  Because many services are prepared specifically for
                  individual orders, refund eligibility may depend on the
                  stage of the order and the work or costs already incurred.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900">
                  2. Cancellation Before Work Begins
                </h2>

                <p className="mt-4">
                  If a customer requests cancellation before work has
                  started, ScriptEdge may consider a refund based on the
                  circumstances of the order.
                </p>

                <p className="mt-4">
                  Any applicable payment processing charges or costs
                  already incurred may be deducted where permitted.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900">
                  3. Cancellation After Work Has Started
                </h2>

                <p className="mt-4">
                  Once work has started, a full refund will generally not
                  be available because time, effort, materials or other
                  resources may already have been used for the order.
                </p>

                <p className="mt-4">
                  Where appropriate, ScriptEdge may consider a partial
                  refund based on the work completed and costs already
                  incurred.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900">
                  4. Corrections and Revisions
                </h2>

                <p className="mt-4">
                  If the delivered work does not reasonably match the
                  requirements originally provided by the customer,
                  ScriptEdge may provide reasonable corrections or
                  revisions where appropriate.
                </p>

                <p className="mt-4">
                  Corrections do not normally apply to substantial changes
                  or new requirements provided after the work has been
                  prepared. Additional charges may apply in such cases.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900">
                  5. Incorrect or Changed Requirements
                </h2>

                <p className="mt-4">
                  Refunds may not be available where an issue results from
                  incomplete, inaccurate or changed information provided by
                  the customer after work has started.
                </p>

                <p className="mt-4">
                  Customers are responsible for providing accurate
                  requirements, reference materials, contact information
                  and deadlines before work begins.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900">
                  6. Urgent and Deadline-Based Orders
                </h2>

                <p className="mt-4">
                  Customers should provide accurate deadlines when placing
                  an order. Cancellation after work has started for an
                  urgent or deadline-based order may not qualify for a
                  refund.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900">
                  7. Physical Orders
                </h2>

                <p className="mt-4">
                  For physical orders, refund eligibility may depend on
                  whether printing, binding, packaging, preparation or
                  dispatch has already taken place.
                </p>

                <p className="mt-4">
                  Costs already incurred for printing, binding, packaging,
                  delivery or other third-party services may not be
                  refundable.
                </p>

                <p className="mt-4">
                  If a physical order contains an error attributable to
                  ScriptEdge, we may provide a correction, replacement or
                  another reasonable resolution depending on the
                  circumstances.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900">
                  8. Digital Orders
                </h2>

                <p className="mt-4">
                  Once digital work has been delivered, accessed or
                  downloaded, a full refund will generally not be available
                  solely because the customer has reviewed the delivered
                  material.
                </p>

                <p className="mt-4">
                  If a digital file is inaccessible, corrupted or materially
                  inconsistent with the agreed requirements due to an error
                  by ScriptEdge, we may provide a reasonable correction or
                  replacement.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900">
                  9. Non-Delivery or Service Failure
                </h2>

                <p className="mt-4">
                  If ScriptEdge is unable to provide a paid service due to
                  an issue attributable to ScriptEdge, an appropriate full
                  or partial refund may be considered depending on the
                  circumstances and the amount of work already completed.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900">
                  10. Payment Processing Charges
                </h2>

                <p className="mt-4">
                  Where applicable and permitted, payment processing or
                  other non-recoverable transaction charges may be deducted
                  from an approved refund.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900">
                  11. Refund Processing
                </h2>

                <p className="mt-4">
                  Approved refunds will normally be processed using the
                  original payment method where practical.
                </p>

                <p className="mt-4">
                  The time taken for a refund to appear in the customer's
                  account may depend on the payment gateway, bank, card
                  issuer, UPI provider or other financial service involved.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900">
                  12. Duplicate Payments
                </h2>

                <p className="mt-4">
                  If a customer believes that the same order has been paid
                  more than once, they should contact ScriptEdge with the
                  relevant order and transaction details. After verification,
                  a confirmed duplicate payment may be refunded as
                  appropriate.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900">
                  13. How to Request a Refund
                </h2>

                <p className="mt-4">
                  Refund requests should include sufficient information to
                  identify the transaction, such as:
                </p>

                <ul className="mt-4 list-disc space-y-2 pl-6">
                  <li>Order ID</li>
                  <li>Customer name</li>
                  <li>Registered phone number or email</li>
                  <li>Payment or transaction reference, where available</li>
                  <li>Reason for the refund request</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900">
                  14. Contact Us
                </h2>

                <p className="mt-4">
                  For refund or cancellation-related questions, please
                  contact ScriptEdge using the contact details provided
                  on our website.
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