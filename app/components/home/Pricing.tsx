import { pricingPlans } from "../../data/pricing";

export default function Pricing() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">

        <div className="text-center">
          <h2 className="text-4xl font-bold text-gray-900">
            Pricing Plans
          </h2>

          <p className="mt-5 text-lg text-gray-600">
            Affordable pricing designed for every student.
          </p>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {pricingPlans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-2xl border-2 ${plan.color} bg-white p-8 shadow-sm transition hover:-translate-y-2 hover:shadow-xl`}
            >
              <h3 className="text-3xl font-bold">
                {plan.name}
              </h3>

              <div className="mt-8 space-y-4">
                {plan.services.map((item) => (
                  <div
                    key={item.service}
                    className="rounded-xl bg-gray-50 p-4"
                  >
                    <h4 className="font-semibold">
                      {item.service}
                    </h4>

                    <p className="mt-2 text-gray-700">
                      Price : <strong>{item.price}</strong>
                    </p>

                    <p className="text-sm text-gray-500">
                      Complete : {item.complete}
                    </p>
                  </div>
                ))}
              </div>

              <button className="mt-8 w-full rounded-xl bg-emerald-600 py-3 font-semibold text-white hover:bg-emerald-700">
                Choose {plan.name}
              </button>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
