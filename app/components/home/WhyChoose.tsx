import {
  PenTool,
  Zap,
  Wallet,
  MessageCircle,
} from "lucide-react";

const features = [
  {
    title: "Expert Writers",
    description:
      "Assignments and practical files prepared with accuracy and proper formatting.",
    icon: PenTool,
  },
  {
    title: "Fast Delivery",
    description:
      "Get your academic work completed before your submission deadline.",
    icon: Zap,
  },
  {
    title: "Affordable Pricing",
    description:
      "Quality academic assistance at student-friendly prices.",
    icon: Wallet,
  },
  {
    title: "24×7 Support",
    description:
      "Quick responses and continuous support whenever you need help.",
    icon: MessageCircle,
  },
];

export default function WhyChoose() {
  return (
    <section className="overflow-x-hidden bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-6">

        {/* Section Heading */}
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Why Choose ScriptEdge?
          </h2>

          <p className="mx-auto mt-4 max-w-3xl text-base leading-7 text-gray-600 sm:text-lg">
            We focus on quality, speed and reliability so students can submit
            their work confidently and on time.
          </p>
        </div>

        {/* Features */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4 lg:gap-8">

          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="group min-w-0 rounded-2xl border border-gray-200 bg-gray-50 p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:bg-white hover:shadow-lg sm:p-8"
              >

                {/* Icon */}
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600 transition-colors duration-300 group-hover:bg-emerald-600 group-hover:text-white">
                  <Icon size={28} strokeWidth={1.8} />
                </div>

                {/* Title */}
                <h3 className="mt-6 text-xl font-semibold text-gray-900">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="mt-3 text-sm leading-6 text-gray-600 sm:text-base">
                  {feature.description}
                </p>

              </div>
            );
          })}

        </div>
      </div>
    </section>
  );
}