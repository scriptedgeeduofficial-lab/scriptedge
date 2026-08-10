export default function Hero() {
  return (
    <section className="bg-white px-4 py-14 sm:px-6 sm:py-16 lg:py-24">
      <div className="mx-auto max-w-7xl text-center">

        {/* Trust Badge */}
        <span className="inline-block rounded-full bg-emerald-100 px-3 py-1.5 text-xs font-semibold text-emerald-700 sm:px-4 sm:py-2 sm:text-sm">
          India's Trusted Academic Assistance Platform
        </span>

        {/* Main Heading */}
      <h1 className="mx-auto mt-8 max-w-6xl text-center text-4xl font-extrabold leading-[1.1] tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
  <span className="block">
    Complete Your{" "}
    <span className="text-emerald-600">Assignments</span>,
  </span>

  <span className="block">
    Projects & Practical Files Without Stress
  </span>
</h1>
        {/* Description */}
        <p className="mx-auto mt-7 max-w-3xl text-base leading-7 text-gray-600 sm:text-lg sm:leading-8 lg:text-xl">
          ScriptEdge helps students complete assignments, practical files,
          project reports, presentations and academic work before deadlines.
        </p>

        {/* Buttons */}
        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row sm:gap-4">

          <a
           href="https://wa.me/918252517340"
            target="_blank"
           rel="noopener noreferrer"
           className="w-full rounded-xl bg-emerald-600 px-8 py-3.5 text-center text-base font-semibold text-white transition hover:bg-emerald-700 sm:w-auto sm:py-4 sm:text-lg"
          >
          Order Now
          </a>

          <a
  href="/services"
  className="w-full rounded-xl border border-gray-300 bg-white px-8 py-3.5 text-center text-base font-semibold text-gray-900 transition hover:bg-gray-100 sm:w-auto sm:py-4 sm:text-lg"
>
  View Services
</a>

        </div>

      </div>
    </section>
  );
}