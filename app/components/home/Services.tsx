import {
  FileText,
  FlaskConical,
  BookOpen,
  Presentation,
  NotebookPen,
  Palette,
} from "lucide-react";

const services = [
  {
    title: "Assignments",
    icon: FileText,
    desc: "Well-structured assignments prepared as per university guidelines.",
  },
  {
    title: "Practical Files",
    icon: FlaskConical,
    desc: "Neat, professional practical records ready for submission.",
  },
  {
    title: "Project Reports",
    icon: BookOpen,
    desc: "Complete project reports with proper formatting and references.",
  },
  {
    title: "Presentations",
    icon: Presentation,
    desc: "Professional PowerPoint presentations for seminars and viva.",
  },
  {
    title: "Notes",
    icon: NotebookPen,
    desc: "Easy-to-understand handwritten and digital notes.",
  },
  {
    title: "Cover Pages",
    icon: Palette,
    desc: "Premium customized covers for files and projects.",
  },
];

export default function Services() {
  return (
    <section className="overflow-x-hidden bg-gray-50 py-20 sm:py-24">
  <div className="mx-auto max-w-7xl px-5 sm:px-6">

        {/* Section Heading */}
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Our Services
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-gray-600 sm:text-lg">
            Everything you need to complete your academic work professionally.
          </p>
        </div>

        {/* Service Cards */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3 lg:gap-8">
          {services.map((service) => {
            const Icon = service.icon;

            return (
              <div
                key={service.title}
                className="group min-w-0 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-lg sm:p-8"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 transition-colors duration-300 group-hover:bg-emerald-600 group-hover:text-white">
                  <Icon size={30} strokeWidth={1.8} />
                </div>

                <h3 className="mt-6 text-xl font-semibold text-gray-900 sm:text-2xl">
                  {service.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-gray-600 sm:text-base">
                  {service.desc}
                </p>

                <div className="mt-6 text-sm font-semibold text-emerald-600">
                  Learn More →
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}