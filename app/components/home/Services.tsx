export default function Services() {
  const services = [
    {
      title: "Assignments",
      icon: "📝",
      desc: "Well-structured assignments prepared as per university guidelines.",
    },
    {
      title: "Practical Files",
      icon: "🧪",
      desc: "Neat, professional practical records ready for submission.",
    },
    {
      title: "Project Reports",
      icon: "📚",
      desc: "Complete project reports with proper formatting and references.",
    },
    {
      title: "Presentations",
      icon: "📊",
      desc: "Professional PowerPoint presentations for seminars and viva.",
    },
    {
      title: "Notes",
      icon: "📖",
      desc: "Easy-to-understand handwritten and digital notes.",
    },
    {
      title: "Cover Pages",
      icon: "🎨",
      desc: "Premium customized covers for files and projects.",
    },
  ];

  return (
    <section className="bg-gray-50 py-24">
      <div className="mx-auto max-w-7xl px-6">

        <h2 className="text-center text-4xl font-bold text-gray-900">
          Our Services
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-center text-gray-600">
          Everything you need to complete your academic work professionally.
        </p>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <div
              key={service.title}
              className="rounded-2xl bg-white p-8 shadow-sm transition hover:-translate-y-2 hover:shadow-xl"
            >
              <div className="text-5xl">{service.icon}</div>

              <h3 className="mt-6 text-2xl font-semibold">
                {service.title}
              </h3>

              <p className="mt-4 text-gray-600">
                {service.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}