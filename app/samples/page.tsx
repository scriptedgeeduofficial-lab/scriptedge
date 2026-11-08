
import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  FileText,
  FolderOpen,
  FlaskConical,
  Monitor,
} from "lucide-react";
import SiteLayout from "../components/shared/SiteLayout";
import { sampleCategories } from "../data/samples";

export const metadata: Metadata = {
  title: "Our Work Samples",
  description:
    "Explore ScriptEdge work samples across assignments, project reports, practical files and digital works.",
};

const categoryIcons = {
  assignments: FileText,
  "project-reports": FolderOpen,
  "practical-files": FlaskConical,
  "digital-works": Monitor,
};

export default function SamplesPage() {
  return (
    <SiteLayout>
      <section className="bg-gradient-to-br from-emerald-700 to-green-500 px-4 py-20 text-center text-white sm:py-24">
        <div className="mx-auto max-w-4xl">
          <span className="inline-flex rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm font-medium">
            ScriptEdge Portfolio
          </span>

          <h1 className="mt-6 text-4xl font-bold sm:text-5xl">
            A Glimpse of Our Work
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-emerald-50 sm:text-lg">
            Explore our academic and digital work categories.
            Quality presentation, thoughtful organization and
            attention to detail matter in every project.
          </p>
        </div>
      </section>

      <section className="bg-gray-50 px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-emerald-700">
              Explore Categories
            </p>
            <h2 className="mt-3 text-3xl font-bold text-slate-900">
              Our Work Categories
            </h2>
            <p className="mt-3 text-slate-600">
              Choose a category to explore its portfolio.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {sampleCategories.map((category) => {
              const Icon =
                categoryIcons[
                  category.slug as keyof typeof categoryIcons
                ];

              return (
                <Link
                  key={category.slug}
                  href={`/samples/${category.slug}`}
                  className="group rounded-2xl border border-gray-200 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-emerald-300 hover:shadow-lg"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 transition group-hover:bg-emerald-600 group-hover:text-white">
                    <Icon size={27} />
                  </div>

                  <h3 className="mt-6 text-xl font-bold text-slate-900">
                    {category.title}
                  </h3>

                  <p className="mt-3 min-h-16 text-sm leading-6 text-slate-600">
                    {category.shortDescription}
                  </p>

                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-emerald-700">
                    Explore Samples
                    <ArrowRight
                      size={16}
                      className="transition group-hover:translate-x-1"
                    />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
