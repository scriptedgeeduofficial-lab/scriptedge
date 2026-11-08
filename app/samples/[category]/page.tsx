
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, FileSearch } from "lucide-react";
import { notFound } from "next/navigation";
import SiteLayout from "../../components/shared/SiteLayout";
import {
  sampleCategories,
  portfolioSamples,
} from "../../data/samples";

type Props = {
  params: Promise<{ category: string }>;
};

export function generateStaticParams() {
  return sampleCategories.map((category) => ({
    category: category.slug,
  }));
}

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { category: slug } = await params;
  const category = sampleCategories.find(
    (item) => item.slug === slug
  );

  if (!category) {
    return { title: "Samples Not Found" };
  }

  return {
    title: `${category.title} Samples`,
    description: category.description,
  };
}

export default async function SampleCategoryPage({
  params,
}: Props) {
  const { category: slug } = await params;

  const category = sampleCategories.find(
    (item) => item.slug === slug
  );

  if (!category) {
    notFound();
  }

  const samples = portfolioSamples[slug] ?? [];

  return (
    <SiteLayout>
      <section className="bg-gradient-to-br from-emerald-700 to-green-500 px-4 py-16 text-center text-white sm:py-20">
        <div className="mx-auto max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-emerald-100">
            ScriptEdge Portfolio
          </p>

          <h1 className="mt-4 text-4xl font-bold sm:text-5xl">
            {category.title}
          </h1>

          <p className="mt-5 text-base leading-7 text-emerald-50 sm:text-lg">
            {category.description}
          </p>
        </div>
      </section>

      <section className="min-h-[420px] bg-gray-50 px-4 py-14 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <Link
            href="/samples"
            className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 transition hover:text-emerald-800"
          >
            <ArrowLeft size={17} />
            Back to All Categories
          </Link>

          {samples.length === 0 ? (
            <div className="mx-auto mt-12 max-w-xl rounded-2xl border border-gray-200 bg-white px-6 py-12 text-center shadow-sm sm:px-10">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
                <FileSearch size={32} />
              </div>

              <h2 className="mt-6 text-2xl font-bold text-slate-900">
                Samples Coming Soon
              </h2>

              <p className="mt-3 leading-7 text-slate-600">
                We're preparing selected work samples for this
                category. Please check back soon.
              </p>

              <Link
                href="/services"
                className="mt-7 inline-flex rounded-lg bg-emerald-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
              >
                Explore Our Services
              </Link>
            </div>
          ) : (
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {samples.map((sample) => (
                <article
                  key={sample.id}
                  className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"
                >
                  {sample.fileType === "image" ? (
                    <img
                      src={sample.thumbnail || sample.filePath}
                      alt={sample.title}
                      className="h-52 w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-52 items-center justify-center bg-emerald-50 text-emerald-700">
                      <FileSearch size={48} />
                    </div>
                  )}

                  <div className="p-5">
                    <h2 className="text-lg font-bold text-slate-900">
                      {sample.title}
                    </h2>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      {sample.description}
                    </p>
                    <a
                      href={sample.filePath}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-5 inline-flex font-semibold text-emerald-700 hover:text-emerald-800"
                    >
                      View Sample →
                    </a>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </SiteLayout>
  );
}
