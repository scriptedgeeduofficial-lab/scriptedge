import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { orders } from "@/lib/db/schema";

import LogoutButton from "@/app/components/auth/LogoutButton";

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  const customerOrders = await db
  .select()
  .from(orders)
  .where(eq(orders.userId, session.user.id))
  .orderBy(orders.createdAt);

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-12">
      <div className="mx-auto max-w-6xl">
        <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-200">
          <p className="text-sm font-medium text-emerald-600">
            Customer Dashboard
          </p>

          <h1 className="mt-2 text-3xl font-bold text-gray-900">
            Welcome, {session.user.name}
          </h1>

          <p className="mt-2 text-gray-600">
            Manage your ScriptEdge account and orders from here.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

            <div className="mt-8 rounded-2xl border border-gray-200 bg-white">
  <div className="border-b border-gray-200 p-6">
    <h2 className="text-xl font-bold text-gray-900">
      My Orders
    </h2>

    <p className="mt-1 text-sm text-gray-600">
      View and track your ScriptEdge orders.
    </p>
    <Link
  href="/dashboard/orders"
  className="mt-4 inline-block text-sm font-semibold text-emerald-600 hover:text-emerald-700"
>
  View All Orders →
</Link>
  </div>

  {customerOrders.length === 0 ? (
    <div className="p-8 text-center">
      <p className="font-medium text-gray-900">
        No orders yet
      </p>

      <p className="mt-2 text-sm text-gray-600">
        Your orders will appear here once you place one.
      </p>

      <Link
        href="/services"
        className="mt-5 inline-block rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700"
      >
        Explore Services
      </Link>
    </div>
  ) : (
    <div className="divide-y divide-gray-200">
      {customerOrders.map((order) => (
        <div
  key={order.id}
  className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between"
>
          <div>
            <p className="text-sm font-semibold text-emerald-600">
              {order.orderNumber}
            </p>

            <h3 className="mt-1 font-semibold text-gray-900">
              {order.title}
            </h3>

            <p className="mt-1 text-sm text-gray-600">
              {order.service}
            </p>
          </div>

          <div className="text-left sm:text-right">
            <span className="inline-flex rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700">
              {order.status}
            </span>

            <p className="mt-2 font-semibold text-gray-900">
              ₹{order.amount}
            </p>
          </div>
        </div>
      ))}
    </div>
  )}
</div>

            <div className="rounded-xl border border-gray-200 p-5">
              <h2 className="font-semibold text-gray-900">
                Profile
              </h2>

              <p className="mt-2 text-sm text-gray-600">
                Manage your account information.
              </p>
            </div>

            <div className="rounded-xl border border-gray-200 p-5">
              <h2 className="font-semibold text-gray-900">
                Support
              </h2>

              <p className="mt-2 text-sm text-gray-600">
                Get help with your orders or account.
              </p>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-4 border-t border-gray-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-gray-500">
              Signed in as{" "}
              <span className="font-medium text-gray-700">
                {session.user.email}
              </span>
            </p>

            <Link
              href="/"
              className="mt-4 inline-block text-sm font-semibold text-emerald-600 hover:text-emerald-700"
            >
              ← Back to ScriptEdge
            </Link>
          </div>

          <LogoutButton />
        </div>
      </div>
    </main>
  );
}