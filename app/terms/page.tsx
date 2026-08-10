import AnnouncementBar from "../components/layout/AnnouncementBar";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

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
                  ScriptEdge provides academic assistance and
                  documentation-related services including assignments,
                  projects, practical files, presentations and related
                  academic work.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900">
                  2. Use of Our Services
                </h2>

                <p className="mt-4">
                  Our services are intended to provide academic
                  assistance, guidance, formatting, documentation and
                  related support. Customers are responsible for using
                  completed work appropriately and in accordance with
                  their institution's academic policies.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900">
                  3. Orders and Requirements
                </h2>

                <p className="mt-4">
                  Customers are responsible for providing accurate
                  requirements, instructions, reference material and
                  deadlines. Delays or inaccuracies in customer-provided
                  information may affect delivery time or the final
                  result.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900">
                  4. Pricing and Payment
                </h2>

                <p className="mt-4">
                  Prices displayed on the website may vary depending on
                  the complexity, length, deadline and requirements of
                  an individual order. The final price will be confirmed
                  before an order is processed.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900">
                  5. Delivery
                </h2>

                <p className="mt-4">
                  Delivery timelines depend on the type and complexity
                  of the work and the deadline agreed upon with the
                  customer. Customers should provide sufficient time for
                  completion whenever possible.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900">
                  6. Customer Responsibility
                </h2>

                <p className="mt-4">
                  Customers are responsible for reviewing the provided
                  work and informing ScriptEdge of any reasonable
                  corrections or changes required within an appropriate
                  period after delivery.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900">
                  7. Academic Integrity
                </h2>

                <p className="mt-4">
                  ScriptEdge provides academic assistance and
                  documentation services. Customers remain responsible
                  for complying with the rules, policies and academic
                  integrity requirements of their school, college or
                  university.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900">
                  8. Intellectual Property
                </h2>

                <p className="mt-4">
                  Unless otherwise agreed, ScriptEdge retains rights to
                  its original branding, website content, logos,
                  templates and other proprietary materials. Customers
                  should not reproduce or commercially redistribute
                  ScriptEdge branding or website materials without
                  permission.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900">
                  9. Changes to Services
                </h2>

                <p className="mt-4">
                  ScriptEdge reserves the right to modify, update or
                  discontinue services, pricing or website features when
                  necessary.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900">
                  10. Contact
                </h2>

                <p className="mt-4">
                  If you have questions about these Terms & Conditions,
                  please contact ScriptEdge using the contact details
                  provided on the website.
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