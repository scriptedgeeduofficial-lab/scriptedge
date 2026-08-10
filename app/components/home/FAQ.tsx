import { faqs } from "../../data/faq";

export default function FAQ() {
  return (
    <section className="bg-gray-50 py-20 sm:py-24">
      <div className="mx-auto max-w-5xl px-5 sm:px-6">

        {/* Section Heading */}
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Frequently Asked Questions
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-gray-600 sm:text-lg">
            Find answers to the most common questions about ScriptEdge.
          </p>
        </div>

        {/* FAQ List */}
        <div className="mt-10 space-y-4 sm:mt-12 sm:space-y-5">
          {faqs.map((faq) => (
            <div
              key={faq.question}
              className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-300 hover:border-emerald-200 hover:shadow-md sm:p-6"
            >
              <h3 className="text-base font-semibold leading-6 text-gray-900 sm:text-lg">
                {faq.question}
              </h3>

              <p className="mt-3 text-sm leading-6 text-gray-600 sm:text-base">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}