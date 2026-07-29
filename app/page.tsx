import AnnouncementBar from "./components/layout/AnnouncementBar";
import Navbar from "./components/layout/Navbar";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <AnnouncementBar />
      <Navbar />

      <div className="flex items-center justify-center py-32">
        <div className="max-w-4xl text-center">
          <span className="rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700">
            India's Trusted Academic Assistance Platform
          </span>

          <h1 className="mt-8 text-6xl font-extrabold leading-tight text-gray-900">
            Complete Your
            <span className="text-emerald-600"> Assignments</span>,
            Projects & Practical Files
            <br />
            Without Stress
          </h1>

          <p className="mx-auto mt-8 max-w-2xl text-xl leading-8 text-gray-600">
            ScriptEdge helps students submit high-quality assignments,
            practical files, project reports and presentations before
            deadlines.
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
      </div>
    </main>
  );
}
