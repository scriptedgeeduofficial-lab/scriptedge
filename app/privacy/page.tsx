import type { Metadata } from "next";
import AnnouncementBar from "../components/layout/AnnouncementBar";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Read the ScriptEdge Privacy Policy to understand how we collect, use and protect information when you use our website and services.",
};

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
              ScriptEdge collects, uses and protects information when
              you use our website and services.
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
                  When you create an account, contact ScriptEdge, place
                  an order or use our services, we may collect information
                  that you voluntarily provide, including your name, phone
                  number, email address, delivery address, order details,
                  academic requirements, reference materials and other
                  information necessary to provide the requested service.
                </p>

                <p className="mt-4">
                  If you make a payment through an online payment provider,
                  payment-related information such as transaction status,
                  payment reference or transaction ID may be received by
                  ScriptEdge. Sensitive payment credentials such as card
                  numbers, UPI PINs or banking passwords are generally
                  processed directly by the payment provider and are not
                  intended to be stored by ScriptEdge.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900">
                  2. Account Information
                </h2>

                <p className="mt-4">
                  If you create an account on ScriptEdge, we may collect
                  information required to create and maintain your account,
                  authenticate you, manage your orders and provide access
                  to customer features.
                </p>

                <p className="mt-4">
                  You are responsible for keeping your account credentials
                  confidential and for notifying us if you believe your
                  account has been accessed without authorization.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900">
                  3. Order and Service Information
                </h2>

                <p className="mt-4">
                  We may collect and retain information relating to your
                  orders, including selected services or plans, requirements,
                  deadlines, uploaded or submitted materials, delivery
                  information, order status and communication relating to
                  the order.
                </p>

                <p className="mt-4">
                  This information is used to understand your requirements,
                  prepare the requested work, communicate with you and
                  complete delivery or other service-related activities.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900">
                  4. How We Use Your Information
                </h2>

                <p className="mt-4">
                  We may use the information we collect to:
                </p>

                <ul className="mt-4 list-disc space-y-2 pl-6">
                  <li>create and manage customer accounts;</li>
                  <li>process and manage orders;</li>
                  <li>understand and fulfil service requirements;</li>
                  <li>communicate about orders, payments and delivery;</li>
                  <li>process or verify payments and transactions;</li>
                  <li>provide digital or physical delivery;</li>
                  <li>handle corrections, support requests and refunds;</li>
                  <li>maintain website security and functionality; and</li>
                  <li>improve our services and customer experience.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900">
                  5. Payments and Payment Providers
                </h2>

                <p className="mt-4">
                  ScriptEdge may use third-party payment service providers
                  to process online payments. Depending on the payment
                  method available at the time, your payment may be
                  processed through an authorized payment gateway or
                  financial service provider.
                </p>

                <p className="mt-4">
                  Payment providers may collect and process payment
                  information in accordance with their own privacy policies
                  and terms. ScriptEdge may receive information necessary
                  to confirm and manage a transaction, such as payment
                  status, transaction reference, payment ID and related
                  order information.
                </p>

                <p className="mt-4">
                  ScriptEdge does not request or intentionally store
                  sensitive payment credentials such as UPI PINs,
                  card PINs or banking passwords.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900">
                  6. Communication
                </h2>

                <p className="mt-4">
                  We may communicate with you through email, WhatsApp,
                  phone, Instagram, notifications within your ScriptEdge
                  account or other communication methods provided on our
                  website.
                </p>

                <p className="mt-4">
                  Information shared through third-party communication
                  platforms may also be subject to the privacy policies
                  and terms of those respective services.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900">
                  7. Delivery Information
                </h2>

                <p className="mt-4">
                  For physical orders, we may collect information such as
                  the customer's name, phone number and delivery address
                  necessary to arrange local delivery or courier services.
                </p>

                <p className="mt-4">
                  Where a third-party courier or delivery service is used,
                  relevant delivery information may be shared with that
                  provider to complete the delivery.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900">
                  8. Third-Party Services
                </h2>

                <p className="mt-4">
                  ScriptEdge may use third-party services that support
                  website hosting, authentication, database services,
                  email delivery, payment processing, analytics,
                  communication or delivery.
                </p>

                <p className="mt-4">
                  These providers may process information as necessary to
                  provide their services. Their handling of information may
                  also be governed by their respective privacy policies
                  and terms.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900">
                  9. Cookies and Similar Technologies
                </h2>

                <p className="mt-4">
                  ScriptEdge may use cookies or similar technologies that
                  are necessary for website functionality, authentication,
                  security and user preferences.
                </p>

                <p className="mt-4">
                  We do not currently use cookies for the purpose of
                  collecting sensitive personal information for advertising.
                  Some third-party services integrated with our website
                  may use their own cookies or similar technologies.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900">
                  10. Information Security
                </h2>

                <p className="mt-4">
                  We take reasonable technical and organizational measures
                  to protect information against unauthorized access,
                  misuse, loss or disclosure.
                </p>

                <p className="mt-4">
                  However, no method of transmitting or storing information
                  electronically can be guaranteed to be completely secure.
                  Therefore, we cannot guarantee absolute security of
                  information transmitted to or through our website.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900">
                  11. Data Retention
                </h2>

                <p className="mt-4">
                  We may retain account, order, transaction and service
                  information for as long as reasonably necessary to provide
                  services, maintain business and transaction records,
                  resolve disputes, process refunds, comply with applicable
                  legal or accounting requirements and protect our rights.
                </p>

                <p className="mt-4">
                  When information is no longer reasonably required, we may
                  delete, anonymize or otherwise dispose of it in accordance
                  with applicable requirements and our operational practices.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900">
                  12. Children's Privacy
                </h2>

                <p className="mt-4">
                  ScriptEdge may provide services used by students of
                  different age groups. We encourage users under the age
                  of 18 to involve a parent or guardian when sharing
                  personal information or placing an order.
                </p>

                <p className="mt-4">
                  Parents or guardians may contact us if they have concerns
                  regarding personal information provided by a minor.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900">
                  13. Your Requests and Information
                </h2>

                <p className="mt-4">
                  You may contact ScriptEdge to request information about
                  personal information associated with your account or to
                  raise a concern about how your information is being used.
                  We may need to verify your identity before responding to
                  certain requests.
                </p>

                <p className="mt-4">
                  Certain information may need to be retained where required
                  for legal, accounting, security, dispute-resolution or
                  legitimate business purposes.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900">
                  14. Changes to This Privacy Policy
                </h2>

                <p className="mt-4">
                  ScriptEdge may update this Privacy Policy from time to
                  time to reflect changes to our services, technology,
                  payment methods, legal requirements or business practices.
                </p>

                <p className="mt-4">
                  Any updated version will be published on this page with
                  a revised "Last updated" date.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900">
                  15. Contact Us
                </h2>

                <p className="mt-4">
                  If you have questions, concerns or requests regarding
                  this Privacy Policy or the handling of your information,
                  please contact ScriptEdge using the contact details
                  provided on our website.
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