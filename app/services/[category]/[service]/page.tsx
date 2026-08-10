import Link from "next/link";
import AnnouncementBar from "../../../components/layout/AnnouncementBar";
import Navbar from "../../../components/layout/Navbar";
import Footer from "../../../components/layout/Footer";

const serviceDetails: Record<
  string,
  {
    title: string;
    description: string;
    audience: string;
    included: string[];
  }
> = {
  assignments: {
    title: "Assignments",
    description:
      "Well-structured assignments prepared according to your academic requirements, subject guidelines and submission deadline.",
    audience: "School, college and university students",
    included: [
      "Properly structured content",
      "Neat formatting and presentation",
      "Subject-wise organization",
      "Ready for submission",
    ],
  },

  "holiday-homework": {
    title: "Holiday Homework",
    description:
      "Professional holiday homework assistance prepared according to your requirements and submission deadline.",
    audience: "Class 6 to Class 12 students",
    included: [
      "Complete subject-wise work",
      "Neat and clear presentation",
      "Projects, charts and written work",
      "Ready before your deadline",
    ],
  },

  projects: {
    title: "Projects",
    description:
      "Complete academic projects with proper structure, presentation and supporting content.",
    audience: "School and college students",
    included: [
      "Project structure and content",
      "Proper formatting",
      "References and presentation",
      "Submission-ready work",
    ],
  },

  "project-reports": {
    title: "Project Reports",
    description:
      "Professionally prepared project reports with organized content, formatting and references.",
    audience: "College and university students",
    included: [
      "Professional report structure",
      "Proper formatting",
      "References and documentation",
      "Submission-ready report",
    ],
  },

  "practical-files": {
    title: "Practical Files",
    description:
      "Neat and properly organized practical files prepared according to your academic requirements.",
    audience: "School and college students",
    included: [
      "Experiment-wise organization",
      "Neat presentation",
      "Proper formatting",
      "Ready for submission",
    ],
  },

  seminars: {
    title: "Seminars",
    description:
      "Well-organized seminar content prepared for academic presentations and viva sessions.",
    audience: "College and university students",
    included: [
      "Topic research",
      "Structured content",
      "Presentation-ready material",
      "Easy-to-understand format",
    ],
  },

  "research-work": {
    title: "Research Work",
    description:
      "Academic research assistance with organized content and professional documentation.",
    audience: "College and university students",
    included: [
      "Research-based content",
      "Proper organization",
      "Documentation support",
      "Professional formatting",
    ],
  },

  "lab-records": {
    title: "Lab Records",
    description:
      "Neatly organized laboratory records prepared according to academic requirements.",
    audience: "College and university students",
    included: [
      "Experiment-wise records",
      "Proper formatting",
      "Neat presentation",
      "Submission-ready work",
    ],
  },

  "charts-and-models": {
    title: "Charts & Models",
    description:
      "Creative academic charts and models prepared for school projects and presentations.",
    audience: "School students",
    included: [
      "Creative presentation",
      "Project-specific design",
      "Clear and informative content",
      "Suitable for school submission",
    ],
  },

  notebooks: {
    title: "Notebooks",
    description:
      "Neatly prepared academic notebooks with organized and easy-to-understand content.",
    audience: "School students",
    included: [
      "Neat presentation",
      "Organized subject content",
      "Clear formatting",
      "Submission-ready work",
    ],
  },

  "powerpoint-presentations": {
    title: "PowerPoint Presentations",
    description:
      "Professional PowerPoint presentations designed for seminars, projects, viva and academic presentations.",
    audience: "School, college and university students",
    included: [
      "Professional slide design",
      "Well-organized content",
      "Clear visual presentation",
      "Presentation-ready file",
    ],
  },

  "pdf-editing": {
    title: "PDF Editing",
    description:
      "Professional PDF editing and formatting assistance for academic documents.",
    audience: "Students and academic users",
    included: [
      "PDF text editing",
      "Page organization",
      "Formatting corrections",
      "Document-ready output",
    ],
  },

  "typing-work": {
    title: "Typing Work",
    description:
      "Fast and accurate typing assistance for academic documents and student requirements.",
    audience: "School, college and university students",
    included: [
      "Accurate typing",
      "Clean formatting",
      "Document organization",
      "Fast delivery",
    ],
  },

  "document-formatting": {
    title: "Document Formatting",
    description:
      "Professional formatting for academic documents, assignments, reports and projects.",
    audience: "Students and academic users",
    included: [
      "Professional formatting",
      "Headings and spacing",
      "Page organization",
      "Submission-ready document",
    ],
  },

  resume: {
    title: "Resume",
    description:
      "Clean and professional resumes designed to present your academic background effectively.",
    audience: "Students and freshers",
    included: [
      "Professional layout",
      "Academic information",
      "Clean formatting",
      "Ready-to-use resume",
    ],
  },

  "cover-pages": {
    title: "Cover Pages",
    description:
      "Customized and professional cover pages for assignments, projects and practical files.",
    audience: "School and college students",
    included: [
      "Customized design",
      "Academic details",
      "Professional presentation",
      "Print-ready format",
    ],
  },
};

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{
    category: string;
    service: string;
  }>;
}) {
  const { category, service } = await params;

  const serviceInfo = serviceDetails[service];

  const categoryName = category
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  const displayTitle =
    serviceInfo?.title ||
    service
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

  const description =
    serviceInfo?.description ||
    "Professional academic assistance prepared according to your requirements and submission deadline.";

  const audience =
    serviceInfo?.audience ||
    "School, college and university students";

  const included = serviceInfo?.included || [
    "Quality academic work",
    "Professional formatting",
    "On-time delivery",
    "Submission-ready work",
  ];

  return (
    <>
      <AnnouncementBar />
      <Navbar />

 <main className="bg-gray-50">

  {/* Back Button */}
  <div className="border-b bg-white">
    <div className="mx-auto max-w-6xl px-4 py-3 sm:px-6">
      <Link
        href="/services"
        aria-label="Back to Services"
        title="Back to Services"
        className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 bg-white text-xl text-gray-600 shadow-sm transition hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-600"
      >
        ←
      </Link>
    </div>
  </div>

  {/* Hero */}
  <section className="bg-gradient-to-r from-emerald-600 to-green-500 py-20 text-white">
          <div className="mx-auto max-w-6xl px-6 text-center">

            <p className="text-sm font-semibold uppercase tracking-widest text-emerald-100">
              {categoryName}
            </p>

            <h1 className="mt-3 text-5xl font-bold">
              {displayTitle}
            </h1>

            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-emerald-50">
              {description}
            </p>

          </div>
        </section>

        {/* About Service */}

        <section className="py-20">

          <div className="mx-auto max-w-6xl px-6">

            <div className="rounded-3xl bg-white p-8 shadow-lg md:p-12">

              <div className="text-center">

                <p className="text-sm font-semibold uppercase tracking-wider text-emerald-600">
                  About This Service
                </p>

                <h2 className="mt-2 text-4xl font-bold text-gray-900">
                  Professional Academic Assistance
                </h2>

                <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-gray-600">
                  {description}
                </p>

              </div>

              {/* Highlights */}

              <div className="mt-12 grid gap-6 md:grid-cols-3">

                <div className="rounded-2xl bg-emerald-50 p-6">
                  <h3 className="text-xl font-bold text-emerald-700">
                    Quality Work
                  </h3>

                  <p className="mt-3 text-gray-600">
                    Properly prepared and professionally formatted academic
                    work.
                  </p>
                </div>

                <div className="rounded-2xl bg-emerald-50 p-6">
                  <h3 className="text-xl font-bold text-emerald-700">
                    On-Time Delivery
                  </h3>

                  <p className="mt-3 text-gray-600">
                    Work prepared according to your submission deadline.
                  </p>
                </div>

                <div className="rounded-2xl bg-emerald-50 p-6">
                  <h3 className="text-xl font-bold text-emerald-700">
                    Student-Friendly
                  </h3>

                  <p className="mt-3 text-gray-600">
                    Affordable academic assistance designed for students.
                  </p>
                </div>

              </div>

            </div>

          </div>

        </section>

        {/* What's Included */}

        <section className="bg-white py-20">

          <div className="mx-auto max-w-6xl px-6">

            <div className="text-center">

              <h2 className="text-4xl font-bold text-gray-900">
                What&apos;s Included
              </h2>

              <p className="mx-auto mt-4 max-w-2xl text-gray-600">
                Everything you need to get your academic work completed
                professionally.
              </p>

            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">

              {included.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border bg-gray-50 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="text-2xl text-emerald-600">
                    ✓
                  </div>

                  <p className="mt-4 font-semibold text-gray-900">
                    {item}
                  </p>
                </div>
              ))}

            </div>

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

        {/* CTA */}

        <section className="bg-emerald-600 py-20 text-white">

          <div className="mx-auto max-w-4xl px-6 text-center">

            <h2 className="text-4xl font-bold">
              Need This Service?
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-lg text-emerald-100">
              Share your requirements and deadline with us. We&apos;ll help
              you get your academic work completed on time.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">

              <a
                href={`https://wa.me/918252517340?text=${encodeURIComponent(
                  `Hello ScriptEdge, I want to order ${displayTitle}.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl bg-white px-8 py-4 font-semibold text-emerald-700 transition hover:-translate-y-1 hover:shadow-lg"
              >
                Order This Service
              </a>

              <Link
                href="/services"
                className="rounded-xl border border-white px-8 py-4 font-semibold text-white transition hover:bg-white hover:text-emerald-700"
              >
                Back to Services
              </Link>

            </div>

          </div>

        </section>

      </main>

      <Footer />
    </>
  );
}
