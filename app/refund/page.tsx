import type { Metadata } from "next";
import AnnouncementBar from "../components/layout/AnnouncementBar";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

export const metadata: Metadata = {
  title: "Refund Policy",
  description:
    "Read the ScriptEdge Refund Policy to understand the terms and conditions related to refunds for our academic assistance services.",
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
              Please review our refund terms before placing an order
              with ScriptEdge.
            </p>
          </div>
        </section>

        {/* Refund Content */}
        <section className="py-16">
          <div className="mx-auto max-w-4xl px-6">

            <div className="space-y-10 text-gray-700 leading-7">

              <section>
                <h2 className="text-2xl font-bold text-gray-900">
                  1. General Refund Policy
                </h2>

                <p className="mt-4">
                  ScriptEdge aims to provide quality academic assistance
                  according to the requirements agreed with the customer.
                  Because many services are prepared specifically for an
                  individual order, refunds may be limited once work has
                  started.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900">
                  2. Before Work Begins
                </h2>

                <p className="mt-4">
                  If a customer requests cancellation before work has
                  started, a refund may be considered depending on the
                  circumstances of the order and any applicable payment
                  processing charges.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900">
                  3. After Work Has Started
                </h2>

                <p className="mt-4">
                  Once work has started, a full refund will generally
                  not be available because time and resources may
                  already have been invested in preparing the requested
                  work.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900">
                  4. Corrections and Revisions
                </h2>

                <p className="mt-4">
                  If the delivered work does not reasonably match the
                  requirements originally provided by the customer,
                  ScriptEdge may offer reasonable corrections or
                  revisions where appropriate.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900">
                  5. Incorrect Customer Information
                </h2>

                <p className="mt-4">
                  Refunds may not be available when an issue results
                  from incomplete, incorrect or changed requirements
                  provided by the customer after the work has already
                  been prepared.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900">
                  6. Deadline and Urgent Orders
                </h2>

                <p className="mt-4">
                  Customers should provide accurate deadlines before
                  placing an order. For urgent or deadline-based work,
                  cancellation after work has started may not qualify
                  for a refund.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900">
                  7. Refund Processing
                </h2>

                <p className="mt-4">
                  Where a refund is approved, the amount and method of
                  refund will be communicated to the customer. Processing
                  time may depend on the payment method or financial
                  service used.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900">
                  8. Contact Us
                </h2>

                <p className="mt-4">
                  If you believe you are eligible for a refund or have
                  an issue with an order, please contact ScriptEdge as
                  soon as possible with your order details and the reason
                  for your request.
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