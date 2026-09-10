import Link from "next/link";
import { desc, eq } from "drizzle-orm";

import { requireWriter } from "@/lib/authorization";
import { db } from "@/lib/db";
import { orders } from "@/lib/db/schema";

export default async function WriterDashboardPage() {
  const session = await requireWriter();

  const assignedOrders = await db
    .select({
      id: orders.id,
      orderNumber: orders.orderNumber,
      service: orders.service,
      title: orders.title,
      details: orders.details,
      status: orders.status,
      amount: orders.amount,
      createdAt: orders.createdAt,
    })
    .from(orders)
    .where(eq(orders.writerId, session.user.id))
    .orderBy(desc(orders.createdAt));

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-12">
      <div className="mx-auto max-w-6xl">
        <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-200">
          <p className="text-sm font-medium text-emerald-600">
            ScriptEdge Writer Portal
          </p>

          <h1 className="mt-2 text-3xl font-bold text-gray-900">
            Writer Dashboard
          </h1>

          <p className="mt-2 text-gray-600">
            Welcome, {session.user.name}.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-xl border border-gray-200 p-5">
              <p className="text-sm text-gray-500">
                Assigned Orders
              </p>

              <p className="mt-2 text-3xl font-bold text-gray-900">
                {assignedOrders.length}
              </p>

              <p className="mt-2 text-sm text-gray-600">
                Orders currently assigned to you.
              </p>
            </div>

            <div className="rounded-xl border border-gray-200 p-5">
              <p className="text-sm text-gray-500">
                Work in Progress
              </p>

              <p className="mt-2 text-3xl font-bold text-gray-900">
                {
                  assignedOrders.filter(
                    (order) =>
                      order.status === "IN_PROGRESS"
                  ).length
                }
              </p>

              <p className="mt-2 text-sm text-gray-600">
                Orders currently being worked on.
              </p>
            </div>

            <div className="rounded-xl border border-gray-200 p-5">
              <p className="text-sm text-gray-500">
                Completed Work
              </p>

              <p className="mt-2 text-3xl font-bold text-gray-900">
                {
                  assignedOrders.filter(
                    (order) =>
                      order.status === "COMPLETED"
                  ).length
                }
              </p>

              <p className="mt-2 text-sm text-gray-600">
                Orders completed by you.
              </p>
            </div>
          </div>

          <div className="mt-8 border-t border-gray-200 pt-8">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  Assigned Orders
                </h2>

                <p className="mt-1 text-sm text-gray-600">
                  Only orders assigned to your writer account are shown here.
                </p>
              </div>
            </div>

            {assignedOrders.length === 0 ? (
              <div className="mt-6 rounded-xl border border-dashed border-gray-300 p-8 text-center">
                <p className="font-medium text-gray-700">
                  No orders assigned yet
                </p>

                <p className="mt-2 text-sm text-gray-500">
                  Orders assigned to you by the ScriptEdge admin will appear here.
                </p>
              </div>
            ) : (
              <div className="mt-6 space-y-4">
                {assignedOrders.map((order) => (
                  <div
                    key={order.id}
                    className="rounded-xl border border-gray-200 p-6"
                  >
                    <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <p className="text-sm font-medium text-emerald-600">
                          {order.orderNumber}
                        </p>

                        <h3 className="mt-1 text-xl font-bold text-gray-900">
                          {order.title}
                        </h3>

                        <p className="mt-2 text-sm text-gray-600">
                          {order.service}
                        </p>

                        <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-gray-600">
                          {order.details || "No additional requirements provided."}
                        </p>
                      </div>

                      <div className="shrink-0 sm:text-right">
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