import {
  FileText,
  CreditCard,
  PenTool,
  CheckCircle,
} from "lucide-react";

const steps = [
  {
    icon: FileText,
    title: "1. Submit Your Requirement",
    desc: "Tell us what you need through WhatsApp or our website.",
  },
  {
    icon: CreditCard,
    title: "2. Confirm Your Order",
    desc: "Review the details and confirm your order easily.",
  },
  {
    icon: PenTool,
    title: "3. We Prepare Your Work",
    desc: "Our experts create high-quality academic work before your deadline.",
  },
  {
    icon: CheckCircle,
    title: "4. Receive & Submit",
    desc: "Download your completed work and submit it confidently.",
  },
];

export default function HowItWorks() {
  return (
    <section className="overflow-x-hidden bg-gray-50 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-6">

        {/* Section Heading */}
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            How It Works
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-gray-600 sm:text-lg">
            Getting your academic work completed is simple, fast, and
            hassle-free.
          </p>
        </div>

        {/* Steps */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4 lg:gap-8">

          {steps.map((step) => {
            const Icon = step.icon;

            return (
              <div
                key={step.title}
                className="group min-w-0 rounded-2xl border border-gray-200 bg-white p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-lg sm:p-8"
              >

                {/* Icon */}
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600 transition-colors duration-300 group-hover:bg-emerald-600 group-hover:text-white">
                  <Icon size={28} strokeWidth={1.8} />
                </div>

                {/* Title */}
                <h3 className="mt-6 text-xl font-semibold text-gray-900">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="mt-3 text-sm leading-6 text-gray-600 sm:text-base">
                  {step.desc}
                </p>

              </div>
            );
          })}

        </div>
      </div>
    </section>
  );
}