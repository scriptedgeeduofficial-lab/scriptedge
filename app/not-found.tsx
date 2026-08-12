import Link from "next/link";
import AnnouncementBar from "./components/layout/AnnouncementBar";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

export default function NotFound() {
  return (
    <>
      <AnnouncementBar />
      <Navbar />

      <main className="flex min-h-[70vh] items-center justify-center bg-gray-50 px-6 py-20">
        <div className="mx-auto max-w-2xl text-center">

          <p className="text-7xl font-bold text-emerald-600">
            404
          </p>

          <h1 className="mt-6 text-3xl font-bold text-gray-900 sm:text-4xl">
            Page Not Found
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-lg leading-8 text-gray-600">
            Sorry, the page you are looking for doesn't exist or may have
            been moved. Let's get you back to ScriptEdge.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/"
              className="rounded-xl bg-emerald-600 px-6 py-3 font-semibold text-white transition hover:bg-emerald-700"
            >
              Back to Home
            </Link>

            <Link
              href="/services"
              className="rounded-xl border border-gray-300 bg-white px-6 py-3 font-semibold text-gray-700 transition hover:border-emerald-300 hover:text-emerald-700"
            >
              View Services
            </Link>
          </div>

        </div>
      </main>

      <Footer />
    </>
  );
}
