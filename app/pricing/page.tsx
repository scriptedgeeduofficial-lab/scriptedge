"use client";

import { useState } from "react";
import { CheckCircle, ArrowRight } from "lucide-react";
import { pricingPlans } from "../data/pricing";

export default function PricingPage() {
  const [selectedPlan, setSelectedPlan] = useState("Standard");

  const activePlan = pricingPlans.find(
    (plan) => plan.name === selectedPlan
  );

  return (
    <main>

      {/* Hero */}
      <section className="bg-gradient-to-br from-emerald-600 to-green-500 py-20 text-white sm:py-24">
        <div className="mx-auto max-w-6xl px-5 text-center sm:px-6">

          <p className="text-sm font-semibold uppercase tracking-wider text-emerald-100">
            Simple & Student-Friendly
          </p>

          <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
            Pricing Plans
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-emerald-50 sm:text-lg">
            Choose the plan that best fits your academic needs.
            Get quality work at affordable student-friendly prices.
          </p>

        </div>
      </section>

      {/* Plans */}
      <section className="bg-gray-50 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-5 sm:px-6">

          <div className="grid gap-6 md:grid-cols-3">

            {pricingPlans.map((plan) => {
              const isSelected = selectedPlan === plan.name;
              const isStandard = plan.name === "Standard";

              return (
                <button
                  key={plan.name}
                  onClick={() => setSelectedPlan(plan.name)}
                  className={`relative rounded-2xl border-2 bg-white p-6 text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg sm:p-8 ${
                    isSelected
                      ? `${plan.color} shadow-lg`
                      : "border-gray-200"
                  }`}
                >

                  {/* Recommended */}
                  {isStandard && (
                    <span className="absolute right-5 top-5 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                      Recommended
                    </span>
                  )}

                  <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                    {plan.name}
                  </h2>

                  <p className="mt-3 max-w-xs text-sm leading-6 text-gray-600">
                    View {plan.name} plan details and available services.
                  </p>

                  <div
                    className={`mt-6 inline-flex rounded-lg px-4 py-2 text-sm font-semibold ${
                      isSelected
                        ? "bg-emerald-600 text-white"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {isSelected ? "Selected" : "View Plan"}
                  </div>

                </button>
              );
            })}

          </div>

          {/* Selected Plan */}
          {activePlan && (
            <div className="mt-10 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:mt-12 sm:p-8">

              <div className="text-center">

                <p className="text-sm font-semibold uppercase tracking-wider text-emerald-600">
                  Selected Plan
                </p>

                <h2 className="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl">
                  {activePlan.name}
                </h2>

                <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-gray-600 sm:text-base">
                  Services and pricing available under this plan.
                </p>

              </div>

              {/* Services */}
              <div className="mt-8 grid gap-4 sm:mt-10 md:grid-cols-2">

                {activePlan.services.map((item) => (
                  <div
                    key={item.service}
                    className="rounded-2xl border border-gray-200 bg-gray-50 p-5 sm:p-6"
                  >

                    <div className="flex items-start gap-3">

                      <CheckCircle
                        size={20}
                        className="mt-1 shrink-0 text-emerald-600"
                      />

                      <div>
                        <h3 className="text-lg font-bold text-gray-900 sm:text-xl">
                          {item.service}
                        </h3>

                        <p className="mt-2 text-sm text-gray-600">
                          Per Unit:{" "}
                          <strong className="text-gray-900">
                            {item.price}
                          </strong>
                        </p>

                        <p className="mt-1 text-sm text-gray-500">
                          Complete Work: {item.complete}
                        </p>
                      </div>

                    </div>

                  </div>
                ))}

              </div>

              {/* CTA */}
              <div className="mt-8 text-center sm:mt-10">

                <a
                  href={`https://wa.me/918252517340?text=${encodeURIComponent(
                    `Hi ScriptEdge, I want to choose the ${activePlan.name} Plan.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-7 py-3.5 font-semibold text-white transition hover:bg-emerald-700 sm:px-8 sm:py-4"
                >
                  Choose {activePlan.name} Plan
                  <ArrowRight size={18} />
                </a>

              </div>

            </div>
          )}

        </div>
      </section>

    </main>
  );
}