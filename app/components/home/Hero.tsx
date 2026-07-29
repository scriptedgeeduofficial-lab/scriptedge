export default function Hero() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6 text-center">

        <span className="rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700">
          India's Trusted Academic Assistance Platform
        </span>

        <h1 className="mt-8 text-6xl font-extrabold leading-tight text-gray-900">
          Complete Your
          <span className="text-emerald-600"> Assignments</span>,
          <br />
          Projects & Practical Files
          <br />
          Without Stress
        </h1>

        <p className="mx-auto mt-8 max-w-3xl text-xl leading-8 text-gray-600">
          ScriptEdge helps students complete assignments,
          practical files, project reports, presentations
          and academic work before deadlines.
        </p>

        <div className="mt-10 flex justify-center gap-5">
          <button className="rounded-xl bg-emerald-600 px-8 py-4 text-lg font-semibold text-white hover:bg-emerald-700">
            Order Now
          </button>

          <button className="rounded-xl border border-gray-300 px-8 py-4 text-lg font-semibold hover:bg-gray-100">
            View Services
          </button>
        </div>

      </div>
    </section>
  );
}