import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { desc, eq } from "drizzle-orm";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { orders } from "@/lib/db/schema";

export default async function WriterOrdersPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  if (session.user.role !== "WRITER") {
    redirect("/dashboard");
  }

  const assignedOrders = await db
    .select({
      id: orders.id,
      orderNumber: orders.orderNumber,
      title: orders.title,
      service: orders.service,
      details: orders.details,
      status: orders.status,
      createdAt: orders.createdAt,
    })
    .from(orders)
    .where(eq(orders.writerId, session.user.id))
    .orderBy(desc(orders.createdAt));

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-12">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/writer"
          className="text-sm font-semibold text-emerald-600 hover:text-emerald-700"
        >
          ← Back to Writer Dashboard
        </Link>

        <div className="mt-6">
          <h1 className="text-3xl font-bold text-gray-900">
            Assigned Orders
          </h1>

          <p className="mt-2 text-gray-600">
            View and manage orders assigned to you.
          </p>
        </div>

        {assignedOrders.length === 0 ? (
          <div className="mt-8 rounded-2xl bg-white p-10 text-center shadow-sm ring-1 ring-gray-200">
            <h2 className="text-xl font-bold text-gray-900">
              No assigned orders
            </h2>

            <p className="mt-2 text-gray-600">
              Orders assigned to you by the admin will appear here.
            </p>
          </div>
        ) : (
          <div className="mt-8 space-y-5">
            {assignedOrders.map((order) => (
              <div
                key={order.id}
                className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200"
              >
                <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-emerald-600">
                      {order.orderNumber}
                    </p>

                    <h2 className="mt-1 text-xl font-bold text-gray-900">
                      {order.title}
                    </h2>

                    <p className="mt-2 text-sm text-gray-600">
                      {order.service}
                    </p>

                    <div className="mt-4">
                      <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                        Requirements
                      </p>

                      <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-gray-600">
                        {order.details || "No additional requirements."}
                      </p>
                    </div>
                  </div>

                  <div className="shrink-0">
                    <span className="inline-flex rounded-full bg-yellow-50 px-3 py-1 text-xs font-semibold text-yellow-700">
                      {order.status}
                    </span>

                    <p className="mt-3 text-xs text-gray-500 sm:text-right">
                      {order.createdAt.toLocaleDateString("en-IN")}
                    </p>
                  </div>
                </div>

                <div className="mt-6 border-t border-gray-100 pt-5">
                  <Link
                    href={`/writer/orders/${order.id}`}
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