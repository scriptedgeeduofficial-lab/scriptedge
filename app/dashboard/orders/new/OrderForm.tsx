"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type OrderFormProps = {
  initialService: string;
  initialPlan: string;
};

export default function OrderForm({
  initialService,
  initialPlan,
}: OrderFormProps) {
  const router = useRouter();

  const [service, setService] = useState(initialService);
  const [plan, setPlan] = useState(initialPlan);
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
const [paymentMethod, setPaymentMethod] = useState("COD");
const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");

    if (!service || !plan || !title.trim() || !details.trim()) {
      setError("Please complete all fields.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
body: JSON.stringify({
  service,
  plan,
  title: title.trim(),
  details: details.trim(),
  paymentMethod,
}),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Unable to create order.");
      }

      router.push("/dashboard/orders");
      router.refresh();
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-6">

      <div>
        <label
          htmlFor="service"
          className="block text-sm font-semibold text-gray-900"
        >
          Service
        </label>

        <input
          id="service"
          value={service}
          readOnly
          className="mt-2 w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-gray-700"
        />
      </div>

      <div>
        <label
          htmlFor="plan"
          className="block text-sm font-semibold text-gray-900"
        >
          Selected Plan
        </label>

        <input
          id="plan"
          value={plan}
          readOnly
          className="mt-2 w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-gray-700"
        />
      </div>

      <div>
        <label
          htmlFor="title"
          className="block text-sm font-semibold text-gray-900"
        >
          Order Title
        </label>

        <input
          id="title"
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="e.g. Biology Assignment"
          className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 outline-none placeholder:text-gray-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
        />
      </div>

      <div>
        <label
          htmlFor="details"
          className="block text-sm font-semibold text-gray-900"
        >
          Requirements
        </label>

        <textarea
          id="details"
          value={details}
          onChange={(event) => setDetails(event.target.value)}
          rows={5}
          placeholder="Tell us what you need..."
          className="mt-2 w-full resize-none rounded-xl border border-gray-300 px-4 py-3 text-gray-900 outline-none placeholder:text-gray-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
        />
      </div>

      <div>
  <p className="block text-sm font-semibold text-gray-900">
    Payment Method
  </p>

  <div className="mt-3 space-y-3">
    <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-gray-300 p-4">
      <input
        type="radio"
        name="paymentMethod"
        value="COD"
        checked={paymentMethod === "COD"}
        onChange={(event) => setPaymentMethod(event.target.value)}
        className="mt-1"
      />

      <div>
        <p className="font-semibold text-gray-900">
          Cash on Delivery (COD)
        </p>

        <p className="mt-1 text-sm text-gray-500">
          Pay when your order is delivered.
        </p>
      </div>
    </label>

    <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-gray-300 p-4">
      <input
        type="radio"
        name="paymentMethod"
        value="UPI"
        checked={paymentMethod === "UPI"}
        onChange={(event) => setPaymentMethod(event.target.value)}
        className="mt-1"
      />

      <div>
        <p className="font-semibold text-gray-900">
          UPI / QR Code
        </p>

        <p className="mt-1 text-sm text-gray-500">
          We will send you the UPI QR code through WhatsApp after your order is placed.
        </p>
      </div>
    </label>
  </div>
</div>

      {error && (
        <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-xl bg-emerald-600 px-6 py-3 font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Creating Order..." : "Continue"}
      </button>
    </form>
  );
}