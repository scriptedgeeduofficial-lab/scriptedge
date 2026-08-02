import { faqs } from "../../data/faq";

export default function FAQ() {
  return (
    <section className="bg-gray-50 py-24">
      <div className="mx-auto max-w-5xl px-6">

        <h2 className="text-center text-4xl font-bold">
          Frequently Asked Questions
        </h2>

        <p className="mt-4 text-center text-gray-600">
          Find answers to the most common questions about ScriptEdge.
        </p>

        <div className="mt-12 space-y-6">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="rounded-xl border bg-white p-6 shadow-sm"
            >
              <h3 className="text-lg font-semibold text-gray-900">
                {faq.question}
              </h3>

              <p className="mt-3 text-gray-600">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}