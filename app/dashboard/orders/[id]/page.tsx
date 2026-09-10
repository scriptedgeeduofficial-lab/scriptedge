import Link from "next/link";
import { headers } from "next/headers";
import { redirect, notFound } from "next/navigation";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { orderStatusHistory, orders } from "@/lib/db/schema";
import { and, eq } from "drizzle-orm";

type OrderDetailsPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function OrderDetailsPage({
  params,
}: OrderDetailsPageProps) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  const { id } = await params;

  const result = await db
    .select()
    .from(orders)
    .where(
      and(
        eq(orders.id, id),
        eq(orders.userId, session.user.id)
      )
    )
    .limit(1);

  const order = result[0];

  if (!order) {
    notFound();
  }

  const history = await db
    .select({
      status: orderStatusHistory.status,
      createdAt: orderStatusHistory.createdAt,
    })
    .from(orderStatusHistory)
    .where(eq(orderStatusHistory.orderId, order.id))
    .orderBy(orderStatusHistory.createdAt);

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-12">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/dashboard/orders"
          className="text-sm font-semibold text-emerald-600 hover:text-emerald-700"
        >
          ← Back to My Orders
        </Link>

        <div className="mt-6 rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-200">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-sm font-medium text-emerald-600">
                {order.orderNumber}
              </p>

              <h1 className="mt-2 text-3xl font-bold text-gray-900">
                {order.title}
              </h1>

              <p className="mt-2 text-gray-600">
                {order.service}
              </p>
            </div>

            <span className="inline-flex w-fit rounded-full bg-yellow-50 px-3 py-1 text-xs font-semibold text-yellow-700">
              {order.status}
            </span>
          </div>

                    <div className="mt-8 border-t border-gray-200 pt-6">
            <h2 className="text-lg font-bold text-gray-900">
              Order Tracking
            </h2>

            <div className="mt-5 space-y-5">
              {history.length === 0 ? (
                <p className="text-sm text-gray-500">
                  Order tracking will appear here once your order starts processing.
                </p>
              ) : (
                history
                  .slice()
                  .reverse()
                  .map((item, index) => (
                    <div
                      key={`${item.status}-${item.createdAt.toISOString()}`}
                      className="flex gap-4"
                    >
                      <div className="flex flex-col items-center">
                        <div className="mt-1 h-3 w-3 rounded-full bg-emerald-500" />

                        {index < history.length - 1 && (
                          <div className="mt-2 h-full w-px bg-gray-200" />
                        )}
                      </div>

                      <div className="pb-2">
                        <p className="font-semibold text-gray-900">
                          {item.status}
                        </p>

                        <p className="mt-1 text-sm text-gray-500">
                          {item.createdAt.toLocaleString("en-IN")}
                        </p>
                      </div>
                    </div>
                  ))
              )}
            </div>
          </div>

          <div className="mt-8 border-t border-gray-200 pt-6">
            <h2 className="text-lg font-bold text-gray-900">
              Requirements
            </h2>

            <p className="mt-3 whitespace-pre-wrap leading-7 text-gray-600">
              {order.details || "No additional requirements provided."}
            </p>
          </div>

          <div className="mt-8 grid gap-4 border-t border-gray-200 pt-6 sm:grid-cols-2">
            <div>
              <p className="text-sm text-gray-500">
                Order Amount
              </p>

              <p className="mt-1 text-lg font-semibold text-gray-900">
                ₹{order.amount}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Order Date
              </p>

              <p className="mt-1 text-lg font-semibold text-gray-900">
                {order.createdAt.toLocaleDateString("en-IN")}
              </p>
            </div>
          </div>

          <div className="mt-8 border-t border-gray-200 pt-6">
            <p className="text-sm text-gray-500">
              Need help with this order?
            </p>

            <a
              href="https://wa.me/918252517340"
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-block rounded-xl bg-emerald-600 px-5 py-3 font-semibold text-white transition hover:bg-emerald-700"
            >
              Contact ScriptEdge
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}