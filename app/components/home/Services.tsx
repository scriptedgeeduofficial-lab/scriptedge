"use client";

import {
  FileText,
  FlaskConical,
  BookOpen,
  Presentation,
  NotebookPen,
  Palette,
  X,
  School,
  GraduationCap,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

type Service = {
  title: string;
  icon: typeof FileText;
  desc: string;
  type: "category" | "direct" | "unavailable";
  href?: string;
  schoolHref?: string;
  collegeHref?: string;
};

const services: Service[] = [
  {
    title: "Assignments",
    icon: FileText,
    desc: "Well-structured assignments prepared as per university guidelines.",
    type: "category",
    schoolHref: "/services/school-services/assignments",
    collegeHref: "/services/college-services/assignments",
  },
  {
    title: "Practical Files",
    icon: FlaskConical,
    desc: "Neat, professional practical records ready for submission.",
    type: "category",
    schoolHref: "/services/school-services/practical-files",
    collegeHref: "/services/college-services/practical-files",
  },
  {
    title: "Project Reports",
    icon: BookOpen,
    desc: "Complete project reports with proper formatting and references.",
    type: "category",
    schoolHref: "/services/school-services/projects",
    collegeHref: "/services/college-services/project-reports",
  },
  {
    title: "Presentations",
    icon: Presentation,
    desc: "Professional PowerPoint presentations for seminars and viva.",
    type: "direct",
    href: "/services/digital-services/powerpoint-presentations",
  },
  {
    title: "Notes",
    icon: NotebookPen,
    desc: "Easy-to-understand handwritten and digital notes.",
    type: "unavailable",
  },
  {
    title: "Cover Pages",
    icon: Palette,
    desc: "Premium customized covers for files and projects.",
    type: "direct",
    href: "/services/digital-services/cover-pages",
  },
];

export default function Services() {
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const closeModal = () => {
    setSelectedService(null);
  };

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

            /* Direct service */
            if (service.type === "direct") {
              return (
                <Link
                  key={service.title}
                  href={service.href!}
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
                </Link>
              );
            }

            /* Category selection / unavailable service */
            return (
              <button
                key={service.title}
                type="button"
                onClick={() => setSelectedService(service)}
                className="group min-w-0 rounded-2xl border border-gray-200 bg-white p-6 text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-lg sm:p-8"
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
              </button>
            );
          })}
        </div>
      </div>

      {/* Category / Unavailable Modal */}
      {selectedService && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-6"
          onClick={closeModal}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="service-modal-title"
            className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl sm:p-8"
            onClick={(event) => event.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={closeModal}
              aria-label="Close"
              title="Close"
              className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full text-gray-500 transition hover:bg-gray-100 hover:text-gray-800"
            >
              <X size={20} />
            </button>

            {/* Modal Content */}
            {selectedService.type === "unavailable" ? (
              <>
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                  <NotebookPen size={28} strokeWidth={1.8} />
                </div>

                <div className="mt-5 text-center">
                  <h3
                    id="service-modal-title"
                    className="text-2xl font-bold text-gray-900"
                  >
                    Notes
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-gray-600 sm:text-base">
                    This service is currently unavailable.
                  </p>

                  <p className="mt-2 text-sm leading-6 text-gray-500">
                    Please check back later. We appreciate your patience.
                  </p>

                  <button
                    type="button"
                    onClick={closeModal}
                    className="mt-6 inline-flex items-center justify-center rounded-xl bg-emerald-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
                  >
                    Close
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="text-center">
                  <h3
                    id="service-modal-title"
                    className="text-2xl font-bold text-gray-900"
                  >
                    {selectedService.title}
                  </h3>

                  <p className="mt-2 text-sm text-gray-600">
                    Please choose your category
                  </p>
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {/* School */}
                  <Link
                    href={selectedService.schoolHref!}
                    onClick={closeModal}
                    className="group rounded-2xl border border-gray-200 bg-gray-50 p-5 text-center transition-all duration-200 hover:border-emerald-300 hover:bg-emerald-50 hover:shadow-md"
                  >
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-white text-emerald-600 shadow-sm transition group-hover:bg-emerald-600 group-hover:text-white">
                      <School size={26} strokeWidth={1.8} />
                    </div>

                    <h4 className="mt-4 text-lg font-semibold text-gray-900">
                      School
                    </h4>

                    <p className="mt-1 text-xs text-gray-500">
                      Class 6 – 12
                    </p>
                  </Link>

                  {/* College */}
                  <Link
                    href={selectedService.collegeHref!}
                    onClick={closeModal}
                    className="group rounded-2xl border border-gray-200 bg-gray-50 p-5 text-center transition-all duration-200 hover:border-emerald-300 hover:bg-emerald-50 hover:shadow-md"
                  >
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-white text-emerald-600 shadow-sm transition group-hover:bg-emerald-600 group-hover:text-white">
                      <GraduationCap size={27} strokeWidth={1.8} />
                    </div>

                    <h4 className="mt-4 text-lg font-semibold text-gray-900">
                      College
                    </h4>

                    <p className="mt-1 text-xs text-gray-500">
                      UG / University
                    </p>
                  </Link>
                </div>

                <button
                  type="button"
                  onClick={closeModal}
                  className="mt-6 w-full rounded-xl border border-gray-200 px-5 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
                >
                  Cancel
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  );
}