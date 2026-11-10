
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { PricingPlan } from "../../data/servicePricing";

type PlanOption = {
  name: PricingPlan;
  description: string;
  regularPrice: number;
  offerPrice: number;
};

type ServicePlanSelectorProps = {
  displayTitle: string;
  pricingService: string;
  audience: string;
  plans: PlanOption[];
};

export default function ServicePlanSelector({
  displayTitle,
  pricingService,
  audience,
  plans,
}: ServicePlanSelectorProps) {
  const router = useRouter();
  const [selectedPlan, setSelectedPlan] =
    useState<PricingPlan | null>(null);

  const selectedPlanDetails = plans.find(
    (plan) => plan.name === selectedPlan
  );

  function handleOrder() {
    if (!selectedPlan) return;

    router.push(
      `/dashboard/orders/new?service=${encodeURIComponent(
        pricingService
      )}&plan=${encodeURIComponent(selectedPlan)}`
    );
  }

  return (
    <>
      {/* Pricing Plans */}
      <section id="pricing" className="bg-gray-50 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-emerald-600">
              Choose Your Plan
            </p>

            <h2 className="mt-2 text-4xl font-bold text-gray-900">
              {displayTitle} Pricing
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-gray-600">
              Choose the plan that best fits your requirements and budget.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {plans.map((plan) => {
              const isSelected = selectedPlan === plan.name;
              const isStandard = plan.name === "Standard";

              return (
                <div
                  key={plan.name}
                  className={`relative rounded-3xl border-2 bg-white p-7 transition-all duration-200 ${
                    isSelected
                      ? "border-emerald-500 shadow-xl ring-2 ring-emerald-100"
                      : isStandard
                        ? "border-emerald-300 shadow-lg md:-translate-y-2"
                        : "border-gray-200 shadow-sm"
                  }`}
                >
                  {isStandard && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-emerald-600 px-4 py-1 text-xs font-bold text-white">
                      Recommended
                    </span>
                  )}

                  {isSelected && (
                    <span className="absolute right-4 top-4 text-sm font-bold text-emerald-600">
                      ✓ Selected
                    </span>
                  )}

                  <h3 className="text-2xl font-bold text-gray-900">
                    {plan.name}
                  </h3>

                  <p className="mt-2 text-sm text-gray-500">
                    {plan.description}
                  </p>

                  <div className="mt-6">
                    <div className="text-sm text-gray-500 line-through">
                      Regular price: ₹
                      {plan.regularPrice.toLocaleString("en-IN")}
                    </div>

                    <div className="mt-1">
                      <span className="text-4xl font-bold text-gray-900">
                        ₹
                        {plan.offerPrice.toLocaleString("en-IN")}
                      </span>

                      <span className="ml-2 text-sm text-gray-500">
                        per item
                      </span>
                    </div>

                    <div className="mt-3 inline-flex flex-col rounded-lg bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-700">
                      <span>50% OFF</span>
                      <span>+ EXTRA 10% OFF</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setSelectedPlan(plan.name)}
                    aria-pressed={isSelected}
                    className={`mt-7 block w-full rounded-xl px-5 py-3 font-semibold transition ${
                      isSelected
                        ? "bg-emerald-600 text-white"
                        : "border border-emerald-600 text-emerald-700 hover:bg-emerald-50"
                    }`}
                  >
                    {isSelected ? "✓ Selected" : `Choose ${plan.name}`}
                  </button>
                </div>
              );
            })}
          </div>

          {selectedPlanDetails && (
            <div className="mx-auto mt-8 max-w-xl rounded-2xl border border-emerald-200 bg-white p-5 text-center shadow-sm">
              <p className="text-sm text-gray-500">
                Your selected plan
              </p>

              <h3 className="mt-1 text-xl font-bold text-gray-900">
                {selectedPlanDetails.name}
              </h3>

              <p className="mt-1 text-2xl font-bold text-emerald-600">
                ₹{selectedPlanDetails.offerPrice.toLocaleString("en-IN")}
                <span className="ml-1 text-sm font-normal text-gray-500">
                  per item
                </span>
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Who Is It For */}
      <section className="py-20">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-4xl font-bold text-gray-900">
            Who Is This Service For?
          </h2>

          <p className="mt-5 text-lg text-gray-600">
            {audience}
          </p>
        </div>
      </section>

      {/* Order CTA */}
      <section className="bg-emerald-600 py-20 text-white">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-4xl font-bold">
            Need This Service?
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg text-emerald-100">
            Share your requirements and deadline with us. We'll help
            you get your academic work completed on time.
          </p>

          {selectedPlan && (
            <p className="mt-5 font-semibold text-white">
              Selected: {selectedPlan} Plan
              {" · "}
              ₹{selectedPlanDetails?.offerPrice.toLocaleString("en-IN")} per item
            </p>
          )}

          {!selectedPlan && (
            <p className="mt-5 text-sm text-emerald-100">
              Please select a plan above to continue.
            </p>
          )}

          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <button
              type="button"
              onClick={handleOrder}
              disabled={!selectedPlan}
              className="rounded-xl bg-white px-8 py-4 font-semibold text-emerald-700 transition hover:-translate-y-1 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 disabled:hover:shadow-none"
            >
              {selectedPlan
                ? `Order This Service – ${selectedPlan}`
                : "Select a Plan to Continue"}
            </button>

            <a
              href="/services"
              className="rounded-xl border border-white px-8 py-4 font-semibold text-white transition hover:bg-white hover:text-emerald-700"
            >
              Back to Services
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
