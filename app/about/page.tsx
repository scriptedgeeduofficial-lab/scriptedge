import AnnouncementBar from "../components/layout/AnnouncementBar";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

import { about } from "../data/about";

export default function AboutPage() {
  return (
    <>
      <AnnouncementBar />
      <Navbar />

      <main className="bg-white">

        {/* Hero */}
        <section className="bg-gradient-to-r from-emerald-600 to-green-500 py-20 text-white md:py-24">
          <div className="mx-auto max-w-6xl px-6 text-center">

            <p className="text-sm font-semibold uppercase tracking-widest text-emerald-100">
              About ScriptEdge
            </p>

            <h1 className="mt-3 text-4xl font-bold md:text-5xl lg:text-6xl">
              {about.heroTitle}
            </h1>

            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-emerald-50 md:text-xl">
              {about.heroSubtitle}
            </p>

          </div>
        </section>

        {/* Our Story */}
        <section className="py-20 md:py-24">
          <div className="mx-auto max-w-5xl px-6">

            <div className="text-center">
              <p className="text-sm font-semibold uppercase tracking-widest text-emerald-600">
                Who We Are
              </p>

              <h2 className="mt-2 text-4xl font-bold text-gray-900 md:text-5xl">
                Our Story
              </h2>
            </div>

            <div className="mt-8 rounded-3xl bg-gray-50 p-8 shadow-sm md:p-10">
              <p className="text-center text-lg leading-8 text-gray-600">
                {about.story}
              </p>
            </div>

          </div>
        </section>

        {/* Mission & Vision */}
        <section className="bg-gray-50 py-20 md:py-24">
          <div className="mx-auto max-w-6xl px-6">

            <div className="grid gap-8 md:grid-cols-2">

              {/* Mission */}
              <div className="rounded-3xl bg-white p-8 shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl md:p-10">

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 text-2xl">
                  🎯
                </div>

                <h3 className="mt-6 text-3xl font-bold text-emerald-600">
                  Our Mission
                </h3>

                <p className="mt-5 text-lg leading-8 text-gray-600">
                  {about.mission}
                </p>

              </div>

              {/* Vision */}
              <div className="rounded-3xl bg-white p-8 shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl md:p-10">

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 text-2xl">
                  🚀
                </div>

                <h3 className="mt-6 text-3xl font-bold text-emerald-600">
                  Our Vision
                </h3>

                <p className="mt-5 text-lg leading-8 text-gray-600">
                  {about.vision}
                </p>

              </div>

            </div>

          </div>
        </section>

        {/* Why Students Trust ScriptEdge */}
        <section className="py-20 md:py-24">
          <div className="mx-auto max-w-6xl px-6">

            <div className="text-center">

              <p className="text-sm font-semibold uppercase tracking-widest text-emerald-600">
                Why Choose Us
              </p>

              <h2 className="mt-2 text-4xl font-bold text-gray-900 md:text-5xl">
                Why Students Trust ScriptEdge
              </h2>

              <p className="mx-auto mt-5 max-w-2xl text-lg text-gray-600">
                We focus on quality, affordability, timely delivery and
                reliable academic assistance.
              </p>

            </div>

            <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">

              {about.trust.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-lg"
                >
                  <div className="flex items-start gap-4">

                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                      ✓
                    </div>

                    <p className="pt-1 font-semibold text-gray-800">
                      {item}
                    </p>

                  </div>
                </div>
              ))}

            </div>

          </div>
        </section>

        {/* Stats */}
        <section className="bg-emerald-600 py-16 text-white md:py-20">
          <div className="mx-auto max-w-6xl px-6">

            <div className="grid gap-10 text-center sm:grid-cols-2 md:grid-cols-4">

              {about.stats.map((stat) => (
                <div key={stat.title}>

                  <h3 className="text-4xl font-bold md:text-5xl">
                    {stat.number}
                  </h3>

                  <p className="mt-3 text-sm font-medium text-emerald-100 md:text-base">
                    {stat.title}
                  </p>

                </div>
              ))}

            </div>

          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}