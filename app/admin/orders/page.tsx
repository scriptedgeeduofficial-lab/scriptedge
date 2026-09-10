import Link from "next/link";
import { alias } from "drizzle-orm/pg-core";
import { desc, eq } from "drizzle-orm";

import { requireAdmin } from "@/lib/authorization";
import { db } from "@/lib/db";
import { orderStatusHistory, orders, user } from "@/lib/db/schema";

export default async function AdminOrdersPage() {
  await requireAdmin();

  const writerUser = alias(user, "writer_user");

  const allOrders = await db
    .select({
      id: orders.id,
      orderNumber: orders.orderNumber,
      title: orders.title,
      service: orders.service,
      details: orders.details,
      status: orders.status,
      amount: orders.amount,
paymentMethod: orders.paymentMethod,
paymentStatus: orders.paymentStatus,
createdAt: orders.createdAt,
      writerId: orders.writerId,
     customerName: user.name,
customerEmail: user.email,
writerName: writerUser.name,
writerEmail: writerUser.email,
    })
    .from(orders)
.leftJoin(user, eq(orders.userId, user.id))
.leftJoin(writerUser, eq(orders.writerId, writerUser.id))
.orderBy(desc(orders.createdAt));

  const history = await db
    .select({
      orderId: orderStatusHistory.orderId,
      status: orderStatusHistory.status,
      changedBy: orderStatusHistory.changedBy,
      createdAt: orderStatusHistory.createdAt,
      changedByName: user.name,
      changedByEmail: user.email,
    })
    .from(orderStatusHistory)
    .leftJoin(user, eq(orderStatusHistory.changedBy, user.id))
    .orderBy(desc(orderStatusHistory.createdAt));

  const writers = await db
    .select({
      id: user.id,
      name: user.name,
      email: user.email,
    })
    .from(user)
    .where(eq(user.role, "WRITER"));

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-12">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/admin"
          className="text-sm font-semibold text-emerald-600 hover:text-emerald-700"
        >
          ← Back to Admin Dashboard
        </Link>

        <div className="mt-6 rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-200">
          <p className="text-sm font-medium text-emerald-600">
            ScriptEdge Administration
          </p>

          <h1 className="mt-2 text-3xl font-bold text-gray-900">
            Order Management
          </h1>

          <p className="mt-2 text-gray-600">
            View orders and assign them to ScriptEdge writers.
          </p>

          {allOrders.length === 0 ? (
            <div className="mt-8 rounded-xl border border-dashed border-gray-300 p-8 text-center">
              <p className="font-medium text-gray-700">
                No orders yet
              </p>

              <p className="mt-2 text-sm text-gray-500">
                Customer orders will appear here.
              </p>
            </div>
          ) : (
            <div className="mt-8 space-y-5">
              {allOrders.map((order) => (
                <div
                  key={order.id}
                  className="rounded-xl border border-gray-200 p-6"
                >
                  <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
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

                      <div className="mt-4 rounded-lg bg-gray-50 p-4">
                        <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                          Customer
                        </p>

                        <p className="mt-1 text-sm font-medium text-gray-900">
                          {order.customerName}
                        </p>

                        <p className="text-sm text-gray-600">
                          {order.customerEmail}
                        </p>
                      </div>

                      <div className="mt-4">
                        <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                          Requirements
                        </p>

                        <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-gray-600">
                          {order.details || "No additional requirements."}
                        </p>
                      </div>
                    </div>

                    <div className="shrink-0 lg:text-right">
                      <span className="inline-flex rounded-full bg-yellow-50 px-3 py-1 text-xs font-semibold text-yellow-700">
                        {order.status}
                      </span>

                      <p className="mt-3 text-sm font-semibold text-gray-900">
                        ₹{order.amount}
                      </p>

                      <p className="mt-2 text-sm font-semibold text-gray-900">
  Payment: {order.paymentMethod === "UPI" ? "UPI / QR Code" : "Cash on Delivery"}
</p>

<p className="mt-1 text-xs text-gray-500">
  Payment Status: {order.paymentStatus}
</p>

                      <p className="mt-1 text-xs text-gray-500">
                        {order.createdAt.toLocaleDateString("en-IN")}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 border-t border-gray-100 pt-5">
                    <p className="text-sm font-semibold text-gray-900">
                      Writer Assignment
                    </p>

                   {order.writerId ? (
  <div className="mt-1">
    <p className="text-sm font-semibold text-gray-900">
      Assigned to: {order.writerName}
    </p>

    <p className="text-sm text-gray-500">
      {order.writerEmail}
    </p>
  </div>
) : (
  <p className="mt-1 text-sm text-gray-500">
    No writer assigned yet.
  </p>
)}

                    {writers.length === 0 ? (
                      <div className="mt-4 rounded-lg bg-yellow-50 p-4">
                        <p className="text-sm font-medium text-yellow-800">
                          No writers are available.
                        </p>

                        <Link
                          href="/admin/writers"
                          className="mt-2 inline-block text-sm font-semibold text-yellow-800 underline"
                        >
                          Manage Writers →
                        </Link>
                      </div>
                    ) : (
                      <form
                        action="/api/admin/orders"
                        method="POST"
                        className="mt-4 flex flex-col gap-3 sm:flex-row"
                      >
                        <input
                          type="hidden"
                          name="orderId"
                          value={order.id}
                        />

                        <select
                          name="writerId"
                          defaultValue={order.writerId ?? ""}
                          className="rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                        >
                          <option value="" disabled>
                            Select a writer
                          </option>

                          {writers.map((writer) => (
                            <option key={writer.id} value={writer.id}>
                              {writer.name} — {writer.email}
                            </option>
                          ))}
                        </select>

                        <button
                          type="submit"
                          className="rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
                        >
                          Assign Writer
                        </button>
                      </form>
                    )}
                  </div>
                                    {order.status === "COMPLETED" && (
                    <div className="mt-6 border-t border-gray-100 pt-5">
                      <p className="text-sm font-semibold text-gray-900">
                        Admin Verification
                      </p>

                      <p className="mt-1 text-sm text-gray-500">
                        Writer has marked this order as completed. Verify the
                        completed work after checking the proof received
                        externally.
                      </p>

                      <form
                        action="/api/admin/orders/verify"
                        method="POST"
                        className="mt-4"
                      >
                        <input
                          type="hidden"
                          name="orderId"
                          value={order.id}
                        />

                        <button
                          type="submit"
                          className="rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
                        >
                          Verify Order
                        </button>
                      </form>
                    </div>
                  )}
                  {order.status === "VERIFIED" && (
  <div className="mt-6 border-t border-gray-100 pt-5">
    <p className="text-sm font-semibold text-gray-900">
      Delivery Preparation
    </p>

    <p className="mt-1 text-sm text-gray-500">
      This order has been verified and is ready to be prepared for delivery.
    </p>

    <form
      action="/api/admin/orders/ready-for-delivery"
      method="POST"
      className="mt-4"
    >
      <input
        type="hidden"
        name="orderId"
        value={order.id}
      />

      <button
        type="submit"
        className="rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
      >
        Mark Ready for Delivery
      </button>
    </form>
  </div>
)}

                  {order.status === "READY_FOR_DELIVERY" && (
                    <div className="mt-6 border-t border-gray-100 pt-5">
                      <p className="text-sm font-semibold text-gray-900">
                        Material Pickup
                      </p>

                      <p className="mt-1 text-sm text-gray-500">
                        This order is ready. The completed material can now be
                        picked up from the writer.
                      </p>

                      <form
                        action="/api/admin/orders/picked-up"
                        method="POST"
                        className="mt-4"
                      >
                        <input
                          type="hidden"
                          name="orderId"
                          value={order.id}
                        />

                        <button
                          type="submit"
                          className="rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
                        >
                          Mark as Picked Up
                        </button>
                      </form>
                    </div>
                  )}
                                   {order.status === "PICKED_UP" && (
                    <div className="mt-6 border-t border-gray-100 pt-5">
                      <p className="text-sm font-semibold text-gray-900">
                        Delivery
                      </p>

                      <p className="mt-1 text-sm text-gray-500">
                        The material has been picked up and is ready to be
                        dispatched to the customer.
                      </p>

                      <form
                        action="/api/admin/orders/out-for-delivery"
                        method="POST"
                        className="mt-4"
                      >
                        <input
                          type="hidden"
                          name="orderId"
                          value={order.id}
                        />

                        <button
                          type="submit"
                          className="rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
                        >
                          Mark Out for Delivery
                        </button>
                      </form>
                    </div>
                  )} 

                  {order.status === "OUT_FOR_DELIVERY" && (
  <div className="mt-6 border-t border-gray-100 pt-5">
    <p className="text-sm font-semibold text-gray-900">
      Delivery Confirmation
    </p>

    <p className="mt-1 text-sm text-gray-500">
      This order is currently out for delivery. Confirm once the customer
      has received the material.
    </p>

    <form
      action="/api/admin/orders/delivered"
      method="POST"
      className="mt-4"
    >
      <input
        type="hidden"
        name="orderId"
        value={order.id}
      />

      <button
        type="submit"
        className="rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
      >
        Mark as Delivered
      </button>
    </form>

                      {history.filter((item) => item.orderId === order.id).length > 0 && (
                    <div className="mt-6 border-t border-gray-100 pt-5">
                      <p className="text-sm font-semibold text-gray-900">
                        Order History
                      </p>

                      <div className="mt-4 space-y-4">
                        {history
                          .filter((item) => item.orderId === order.id)
                          .slice()
                          .reverse()
                          .map((item) => (
                            <div
                              key={`${item.orderId}-${item.status}-${item.createdAt.toISOString()}`}
                              className="flex gap-3"
                            >
                              <div className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-emerald-500" />

                              <div>
                                <p className="text-sm font-semibold text-gray-900">
                                  {item.status}
                                </p>

                                <p className="text-xs text-gray-500">
                                  {item.changedByName ||
                                    item.changedByEmail ||
                                    "System"}{" "}
                                  ·{" "}
                                  {item.createdAt.toLocaleString("en-IN")}
                                </p>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  )}
  </div>
)}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}