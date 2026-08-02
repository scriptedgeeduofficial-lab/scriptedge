import { FileText, CreditCard, PenTool, CheckCircle } from "lucide-react";

const steps = [
  {
    icon: <FileText size={40} className="text-emerald-600" />,
    title: "1. Submit Your Requirement",
    desc: "Tell us what you need through WhatsApp or our website.",
  },
  {
    icon: <CreditCard size={40} className="text-emerald-600" />,
    title: "2. Confirm Your Order",
    desc: "Review the details and confirm your order easily.",
  },
  {
    icon: <PenTool size={40} className="text-emerald-600" />,
    title: "3. We Prepare Your Work",
    desc: "Our experts create high-quality academic work before your deadline.",
  },
  {
    icon: <CheckCircle size={40} className="text-emerald-600" />,
    title: "4. Receive & Submit",
    desc: "Download your completed work and submit it confidently.",
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-gray-50 py-24">
      <div className="mx-auto max-w-7xl px-6">

        <h2 className="text-center text-4xl font-bold">
          How It Works
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-center text-gray-600">
          Getting your academic work completed is simple, fast, and hassle-free.
        </p>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">

          {steps.map((step, index) => (
            <div
              key={index}
              className="rounded-2xl bg-white p-8 text-center shadow-sm transition hover:-translate-y-2 hover:shadow-lg"
            >
              <div className="mb-6 flex justify-center">
                {step.icon}
              </div>

              <h3 className="text-xl font-semibold">
                {step.title}
              </h3>

              <p className="mt-4 text-gray-600">
                {step.desc}
              </p>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}