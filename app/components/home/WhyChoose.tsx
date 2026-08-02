export default function WhyChoose() {
  const features = [
    {
      title: "Expert Writers",
      description:
        "Assignments and practical files prepared with accuracy and proper formatting.",
      icon: "📝",
    },
    {
      title: "Fast Delivery",
      description:
        "Get your academic work completed before your submission deadline.",
      icon: "⚡",
    },
    {
      title: "Affordable Pricing",
      description:
        "Quality academic assistance at student-friendly prices.",
      icon: "💰",
    },
    {
      title: "24×7 Support",
      description:
        "Quick responses and continuous support whenever you need help.",
      icon: "💬",
    },
  ];

  return (
    <section className="bg-gray-50 py-24">
      <div className="mx-auto max-w-7xl px-6">

        <div className="text-center">
          <h2 className="text-4xl font-bold text-gray-900">
            Why Choose ScriptEdge?
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-lg text-gray-600">
            We focus on quality, speed and reliability so students can submit
            their work confidently and on time.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">

          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-2xl bg-white p-8 shadow-sm transition hover:-translate-y-2 hover:shadow-xl"
            >
              <div className="text-5xl">{feature.icon}</div>

              <h3 className="mt-6 text-2xl font-semibold">
                {feature.title}
              </h3>

              <p className="mt-4 text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}