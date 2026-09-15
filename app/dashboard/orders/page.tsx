import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { orders } from "@/lib/db/schema";
import { desc, eq } from "drizzle-orm";

export default async function OrdersPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  const userOrders = await db
    .select()
    .from(orders)
    .where(eq(orders.userId, session.user.id))
    .orderBy(desc(orders.createdAt));

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-12">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/dashboard"
          className="text-sm font-semibold text-emerald-600 hover:text-emerald-700"
        >
          ← Back to Dashboard
        </Link>

        <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              My Orders
            </h1>

            <p className="mt-2 text-gray-600">
              View and track your ScriptEdge orders.
            </p>
          </div>

          <Link
            href="/services"
            className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-5 py-3 font-semibold text-white hover:bg-emerald-700"
          >
            + New Order
          </Link>
        </div>

        {userOrders.length === 0 ? (
          <div className="mt-8 rounded-2xl bg-white p-10 text-center shadow-sm ring-1 ring-gray-200">
            <h2 className="text-xl font-bold text-gray-900">
              No orders yet
            </h2>

            <p className="mt-2 text-gray-600">
              Your orders will appear here once you place one.
            </p>
          </div>
        ) : (
          <div className="mt-8 space-y-4">
           {userOrders.map((order) => (
  <div
    key={order.id}
    className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200"
  >
    <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
      <div>
        <p className="text-sm font-medium text-emerald-600">
          Order ID: Order ID: {order.orderNumber}
        </p>

        <h2 className="mt-1 text-xl font-bold text-gray-900">
          {order.title}
        </h2>

        <p className="mt-2 text-sm text-gray-600">
          {order.service}
        </p>

        <p className="mt-3 text-sm leading-6 text-gray-600">
          {order.details}
        </p>
      </div>

      <div className="text-left sm:text-right">
        <span className="inline-flex rounded-full bg-yellow-50 px-3 py-1 text-xs font-semibold text-yellow-700">
          {order.status}
        </span>

        <p className="mt-3 text-sm font-semibold text-gray-900">
          ₹{order.amount}
        </p>

        <p className="mt-1 text-xs text-gray-500">
          {order.createdAt.toLocaleDateString("en-IN")}
        </p>
      </div>
    </div>

    <div className="mt-6 border-t border-gray-100 pt-5">
      <Link
        href={`/dashboard/orders/${order.id}`}
        className="inline-flex rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
      >
        View Order
      </Link>
    </div>
  </div>
))}
          </div>
        )}
      </div>
    </main>
  );
}