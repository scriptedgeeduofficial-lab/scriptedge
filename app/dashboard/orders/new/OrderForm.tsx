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
  const [paymentMethod, setPaymentMethod] = useState("UPI");

  const [customerPhone, setCustomerPhone] = useState("");
  const [deliveryType, setDeliveryType] = useState("DIGITAL");
  const [deliveryMethod, setDeliveryMethod] = useState("PICKUP");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");

    if (
      !service ||
      !plan ||
      !title.trim() ||
      !details.trim() ||
      !customerPhone.trim()
    ) {
      setError("Please complete all required fields.");
      return;
    }

    if (deliveryType === "PHYSICAL") {
      if (!["PICKUP", "DOOR_DELIVERY"].includes(deliveryMethod)) {
        setError("Please select a delivery method.");
        return;
      }

      if (deliveryMethod === "DOOR_DELIVERY") {
        if (
          !deliveryAddress.trim() ||
          !city.trim() ||
          !state.trim() ||
          !pincode.trim()
        ) {
          setError("Please complete your delivery address.");
          return;
        }

        if (!/^\d{6}$/.test(pincode.trim())) {
          setError("Please enter a valid 6-digit PIN code.");
          return;
        }
      }
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
          customerPhone: customerPhone.trim(),
          deliveryType,
          deliveryMethod:
            deliveryType === "PHYSICAL" ? deliveryMethod : "",
          deliveryAddress:
            deliveryType === "PHYSICAL" &&
            deliveryMethod === "DOOR_DELIVERY"
              ? deliveryAddress.trim()
              : "",
          city:
            deliveryType === "PHYSICAL" &&
            deliveryMethod === "DOOR_DELIVERY"
              ? city.trim()
              : "",
          state:
            deliveryType === "PHYSICAL" &&
            deliveryMethod === "DOOR_DELIVERY"
              ? state.trim()
              : "",
          pincode:
            deliveryType === "PHYSICAL" &&
            deliveryMethod === "DOOR_DELIVERY"
              ? pincode.trim()
              : "",
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
          : "Something went wrong. Please try again.",
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
        <label
          htmlFor="customerPhone"
          className="block text-sm font-semibold text-gray-900"
        >
          Phone / WhatsApp Number
        </label>

        <input
          id="customerPhone"
          type="tel"
          value={customerPhone}
          onChange={(event) => setCustomerPhone(event.target.value)}
          placeholder="e.g. 9876543210"
          inputMode="numeric"
          maxLength={10}
          className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 outline-none placeholder:text-gray-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
        />

        <p className="mt-1 text-xs text-gray-500">
          We may use this number for order updates and delivery coordination.
        </p>
      </div>

      <div>
        <p className="block text-sm font-semibold text-gray-900">
          Delivery Type
        </p>

        <div className="mt-3 space-y-3">
          <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-gray-300 p-4">
            <input
              type="radio"
              name="deliveryType"
              value="DIGITAL"
              checked={deliveryType === "DIGITAL"}
              onChange={(event) => {
                setDeliveryType(event.target.value);
                setPaymentMethod("UPI");
              }}
              className="mt-1"
            />

            <div>
              <p className="font-semibold text-gray-900">
                Digital Delivery
              </p>

              <p className="mt-1 text-sm text-gray-500">
                Receive your completed work digitally through your account,
                email, WhatsApp, or another agreed method.
              </p>
            </div>
          </label>

          <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-gray-300 p-4">
            <input
              type="radio"
              name="deliveryType"
              value="PHYSICAL"
              checked={deliveryType === "PHYSICAL"}
              onChange={(event) => setDeliveryType(event.target.value)}
              className="mt-1"
            />

            <div>
              <p className="font-semibold text-gray-900">
                Physical Delivery
              </p>

              <p className="mt-1 text-sm text-gray-500">
                Receive the completed physical material at your chosen
                delivery method.
              </p>
            </div>
          </label>
        </div>
      </div>

      {deliveryType === "PHYSICAL" && (
        <div className="space-y-5 rounded-2xl border border-gray-200 bg-gray-50 p-5">
          <div>
            <p className="block text-sm font-semibold text-gray-900">
              Delivery Method
            </p>

            <div className="mt-3 space-y-3">
              <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-gray-300 p-4">
                <input
                  type="radio"
                  name="deliveryMethod"
                  value="PICKUP"
                  checked={deliveryMethod === "PICKUP"}
                  onChange={(event) =>
                    setDeliveryMethod(event.target.value)
                  }
                  className="mt-1"
                />

                <div>
                  <p className="font-semibold text-gray-900">
                    Pickup from ScriptEdge
                  </p>

                  <p className="mt-1 text-sm text-gray-500">
                    Collect your completed physical order from ScriptEdge.
                  </p>
                </div>
              </label>

              <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-gray-300 p-4">
                <input
                  type="radio"
                  name="deliveryMethod"
                  value="DOOR_DELIVERY"
                  checked={deliveryMethod === "DOOR_DELIVERY"}
                  onChange={(event) =>
                    setDeliveryMethod(event.target.value)
                  }
                  className="mt-1"
                />

                <div>
                  <p className="font-semibold text-gray-900">
                    Door Delivery
                  </p>

                  <p className="mt-1 text-sm text-gray-500">
                    Get your physical order delivered to your address.
                    Delivery charges may apply depending on location and
                    availability.
                  </p>
                </div>
              </label>
            </div>
          </div>

          {deliveryMethod === "DOOR_DELIVERY" && (
            <div className="space-y-5">
              <div>
                <label
                  htmlFor="deliveryAddress"
                  className="block text-sm font-semibold text-gray-900"
                >
                  Delivery Address
                </label>

                <textarea
                  id="deliveryAddress"
                  value={deliveryAddress}
                  onChange={(event) =>
                    setDeliveryAddress(event.target.value)
                  }
                  rows={3}
                  placeholder="House/Flat, Street, Locality"
                  className="mt-2 w-full resize-none rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none placeholder:text-gray-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                />
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="city"
                    className="block text-sm font-semibold text-gray-900"
                  >
                    City
                  </label>

                  <input
                    id="city"
                    type="text"
                    value={city}
                    onChange={(event) => setCity(event.target.value)}
                    placeholder="e.g. Sasaram"
                    className="mt-2 w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none placeholder:text-gray-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                  />
                </div>

                <div>
                  <label
                    htmlFor="state"
                    className="block text-sm font-semibold text-gray-900"
                  >
                    State
                  </label>

                  <input
                    id="state"
                    type="text"
                    value={state}
                    onChange={(event) => setState(event.target.value)}
                    placeholder="e.g. Bihar"
                    className="mt-2 w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none placeholder:text-gray-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="pincode"
                  className="block text-sm font-semibold text-gray-900"
                >
                  PIN Code
                </label>

                <input
                  id="pincode"
                  type="text"
                  value={pincode}
                  onChange={(event) =>
                    setPincode(
                      event.target.value.replace(/\D/g, "").slice(0, 6),
                    )
                  }
                  placeholder="e.g. 821115"
                  inputMode="numeric"
                  maxLength={6}
                  className="mt-2 w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none placeholder:text-gray-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                />
              </div>
            </div>
          )}
        </div>
      )}

      <div>
        <p className="block text-sm font-semibold text-gray-900">
          Payment Method
        </p>

        <div className="mt-3 space-y-3">
          {deliveryType === "PHYSICAL" && (
            <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-gray-300 p-4">
              <input
                type="radio"
                name="paymentMethod"
                value="COD"
                checked={paymentMethod === "COD"}
                onChange={(event) =>
                  setPaymentMethod(event.target.value)
                }
                className="mt-1"
              />

              <div>
                <p className="font-semibold text-gray-900">
                  Cash on Delivery (COD)
                </p>

                <p className="mt-1 text-sm text-gray-500">
                  Pay when your physical order is delivered.
                </p>
              </div>
            </label>
          )}

          <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-gray-300 p-4">
            <input
              type="radio"
              name="paymentMethod"
              value="UPI"
              checked={paymentMethod === "UPI"}
              onChange={(event) =>
                setPaymentMethod(event.target.value)
              }
              className="mt-1"
            />

            <div>
              <p className="font-semibold text-gray-900">
                UPI / QR Code
              </p>

              <p className="mt-1 text-sm text-gray-500">
                We will send you the UPI QR code through WhatsApp after your
                order is placed.
              </p>
            </div>
          </label>
        </div>

        {deliveryType === "DIGITAL" && (
          <p className="mt-2 text-xs text-gray-500">
            Digital orders require advance payment.
          </p>
        )}
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