import Link from "next/link";

import { requireAdmin } from "@/lib/authorization";

export default async function AdminDashboardPage() {
  const session = await requireAdmin();

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-12">
      <div className="mx-auto max-w-6xl">
        <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-200">
          <p className="text-sm font-medium text-emerald-600">
            ScriptEdge Administration
          </p>

          <h1 className="mt-2 text-3xl font-bold text-gray-900">
            Admin Dashboard
          </h1>

          <p className="mt-2 text-gray-600">
            Welcome, {session.user.name}.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Link
              href="/admin/orders"
              className="rounded-xl border border-gray-200 p-5 transition hover:border-emerald-300 hover:bg-emerald-50"
            >
              <h2 className="font-semibold text-gray-900">
                Orders
              </h2>

              <p className="mt-2 text-sm text-gray-600">
                Manage all ScriptEdge orders.
              </p>

              <p className="mt-4 text-sm font-semibold text-emerald-600">
                Manage Orders →
              </p>
            </Link>

            <div className="rounded-xl border border-gray-200 p-5">
              <h2 className="font-semibold text-gray-900">
                Customers
              </h2>

              <p className="mt-2 text-sm text-gray-600">
                Manage customer accounts.
              </p>
            </div>

            <Link
              href="/admin/writers"
              className="rounded-xl border border-gray-200 p-5 transition hover:border-emerald-300 hover:bg-emerald-50"
            >
              <h2 className="font-semibold text-gray-900">
                Writers
              </h2>

              <p className="mt-2 text-sm text-gray-600">
                Manage writers and assignments.
              </p>

              <p className="mt-4 text-sm font-semibold text-emerald-600">
                Manage Writers →
              </p>
            </Link>

            <div className="rounded-xl border border-gray-200 p-5">
              <h2 className="font-semibold text-gray-900">
                Settings
              </h2>

              <p className="mt-2 text-sm text-gray-600">
                Manage ScriptEdge administration.
              </p>
            </div>
          </div>

          <div className="mt-8 border-t border-gray-200 pt-6">
            <p className="text-sm text-gray-500">
              Signed in as{" "}
              <span className="font-medium text-gray-700">
                {session.user.email}
              </span>
            </p>

            <Link
              href="/dashboard"
              className="mt-4 inline-block text-sm font-semibold text-emerald-600 hover:text-emerald-700"
            >
              ← Customer Dashboard
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}