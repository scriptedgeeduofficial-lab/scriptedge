
import Link from "next/link";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { and, eq } from "drizzle-orm";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { notifyCustomerOrderStatus } from "@/lib/order-notifications";
import {
  orderStatusHistory,
  orders,
  user,
} from "@/lib/db/schema";
import { sendScriptEdgeEmail } from "@/lib/email";

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (char) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };

    return entities[char];
  });
}

async function notifyAdmins(
  decision: "ACCEPTED" | "REJECTED",
  orderNumber: string,
  writerName: string,
  writerEmail: string,
) {
  const admins = await db
    .select({
      email: user.email,
    })
    .from(user)
    .where(eq(user.role, "ADMIN"));

  const adminEmails = admins
    .map((admin) => admin.email)
    .filter((email): email is string => Boolean(email));

  if (adminEmails.length === 0) return;

  const accepted = decision === "ACCEPTED";

  await sendScriptEdgeEmail(
    adminEmails,
    `Writer ${decision}: ${orderNumber}`,
    `
      <div style="font-family:Arial,sans-serif;line-height:1.7;">
        <h2>Writer Assignment ${accepted ? "Accepted" : "Rejected"}</h2>
        <p><strong>Order:</strong> ${escapeHtml(orderNumber)}</p>
        <p><strong>Writer:</strong> ${escapeHtml(writerName)}</p>
        <p><strong>Writer Email:</strong> ${escapeHtml(writerEmail)}</p>
        <p><strong>Decision:</strong> ${decision}</p>
        ${
          accepted
            ? "<p>The writer has accepted the assignment.</p>"
            : "<p>The writer has rejected the assignment. The order is now unassigned and can be reassigned from the admin dashboard.</p>"
        }
        <p>&mdash; ScriptEdge Team</p>
      </div>
    `,
  );
}

type WriterOrderPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function WriterOrderDetailPage({
  params,
}: WriterOrderPageProps) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  if (session.user.role !== "WRITER") {
    redirect("/dashboard");
  }

  const { id } = await params;

  const result = await db
    .select({
      id: orders.id,
      orderNumber: orders.orderNumber,
      service: orders.service,
      title: orders.title,
      details: orders.details,
      status: orders.status,
      writerAssignmentStatus: orders.writerAssignmentStatus,
      createdAt: orders.createdAt,
    })
    .from(orders)
    .where(
      and(
        eq(orders.id, id),
        eq(orders.writerId, session.user.id),
      ),
    )
    .limit(1);

  const order = result[0];

  if (!order) {
    notFound();
  }

  async function acceptAssignment() {
    "use server";

    const currentSession = await auth.api.getSession({
      headers: await headers(),
    });

    if (!currentSession) {
      redirect("/login");
    }

    if (currentSession.user.role !== "WRITER") {
      redirect("/dashboard");
    }

    const updated = await db
      .update(orders)
      .set({
        writerAssignmentStatus: "ACCEPTED",
        updatedAt: new Date(),
      })
      .where(
        and(
          eq(orders.id, id),
          eq(orders.writerId, currentSession.user.id),
          eq(orders.writerAssignmentStatus, "PENDING"),
        ),
      )
      .returning({
        orderNumber: orders.orderNumber,
      });

    if (updated.length === 0) {
      redirect(`/writer/orders/${id}`);
    }

    try {
      await notifyAdmins(
        "ACCEPTED",
        updated[0].orderNumber,
        currentSession.user.name || "Writer",
        currentSession.user.email,
      );
    } catch (error) {
      console.error("Admin acceptance notification failed:", error);
    }

    redirect(`/writer/orders/${id}`);
  }

  async function rejectAssignment() {
    "use server";

    const currentSession = await auth.api.getSession({
      headers: await headers(),
    });

    if (!currentSession) {
      redirect("/login");
    }

    if (currentSession.user.role !== "WRITER") {
      redirect("/dashboard");
    }

    const updated = await db
      .update(orders)
      .set({
        writerAssignmentStatus: "REJECTED",
        writerId: null,
        updatedAt: new Date(),
      })
      .where(
        and(
          eq(orders.id, id),
          eq(orders.writerId, currentSession.user.id),
          eq(orders.writerAssignmentStatus, "PENDING"),
        ),
      )
      .returning({
        orderNumber: orders.orderNumber,
      });

    if (updated.length === 0) {
      redirect(`/writer/orders/${id}`);
    }

    try {
      await notifyAdmins(
        "REJECTED",
        updated[0].orderNumber,
        currentSession.user.name || "Writer",
        currentSession.user.email,
      );
    } catch (error) {
      console.error("Admin rejection notification failed:", error);
    }

    redirect("/writer/orders");
  }

  async function startWorking() {
    "use server";

    const currentSession = await auth.api.getSession({
      headers: await headers(),
    });
    try {
  await notifyCustomerOrderStatus(id, "IN_PROGRESS");
} catch (notificationError) {
  console.error(
    "Customer IN_PROGRESS notification failed:",
    notificationError,
  );
}

    if (!currentSession) {
  return redirect("/login");
}

if (currentSession.user.role !== "WRITER") {
  return redirect("/dashboard");
}

    const result = await db
      .update(orders)
      .set({
        status: "IN_PROGRESS",
        updatedAt: new Date(),
      })
      .where(
        and(
          eq(orders.id, id),
          eq(orders.writerId, currentSession.user.id),
          eq(orders.writerAssignmentStatus, "ACCEPTED"),
          eq(orders.status, "PENDING"),
        ),
      )
      .returning({
        id: orders.id,
      });

    if (result.length === 0) {
      redirect(`/writer/orders/${id}`);
    }

    await db.insert(orderStatusHistory).values({
      id: crypto.randomUUID(),
      orderId: id,
      status: "IN_PROGRESS",
      changedBy: currentSession.user.id,
    });

    redirect(`/writer/orders/${id}`);
  }

  async function markCompleted() {
    "use server";

    const currentSession = await auth.api.getSession({
      headers: await headers(),
    });

    if (!currentSession) {
      redirect("/login");
    }

    if (currentSession.user.role !== "WRITER") {
      redirect("/dashboard");
    }

    const result = await db
      .update(orders)
      .set({
        status: "COMPLETED",
        updatedAt: new Date(),
      })
      .where(
        and(
          eq(orders.id, id),
          eq(orders.writerId, currentSession.user.id),
          eq(orders.writerAssignmentStatus, "ACCEPTED"),
          eq(orders.status, "IN_PROGRESS"),
        ),
      )
      .returning({
        id: orders.id,
      });

    if (result.length === 0) {
      redirect(`/writer/orders/${id}`);
    }

    await db.insert(orderStatusHistory).values({
      id: crypto.randomUUID(),
      orderId: id,
      status: "COMPLETED",
      changedBy: currentSession.user.id,
    });

    redirect(`/writer/orders/${id}`);
  }

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-12">
      <div className="mx-auto max-w-4xl">
        <Link
          href="/writer/orders"
          className="text-sm font-semibold text-emerald-600 hover:text-emerald-700"
        >
          ← Back to Assigned Orders
        </Link>

        <div className="mt-6 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200 sm:p-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-emerald-600">
                {order.orderNumber}
              </p>

              <h1 className="mt-2 text-3xl font-bold text-gray-900">
                {order.title}
              </h1>

              <p className="mt-2 text-gray-600">
                {order.service}
              </p>
            </div>

            <div className="flex flex-col items-start gap-2">
              <span className="inline-flex w-fit rounded-full bg-yellow-50 px-3 py-1 text-xs font-semibold text-yellow-700">
                Order: {order.status}
              </span>

              <span className="inline-flex w-fit rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                Assignment: {order.writerAssignmentStatus}
              </span>
            </div>
          </div>

          <div className="mt-8 border-t border-gray-100 pt-6">
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
              Requirements
            </p>

            <p className="mt-3 whitespace-pre-wrap text-sm leading-7 text-gray-700">
              {order.details || "No additional requirements."}
            </p>
          </div>

          <div className="mt-8 border-t border-gray-100 pt-6">
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
              Order Date
            </p>

            <p className="mt-2 text-sm text-gray-700">
              {order.createdAt.toLocaleDateString("en-IN")}
            </p>
          </div>

          {order.writerAssignmentStatus === "PENDING" && (
            <div className="mt-8 flex flex-wrap gap-3 border-t border-gray-100 pt-6">
              <form action={acceptAssignment}>
                <button
                  type="submit"
                  className="inline-flex rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
                >
                  Accept Assignment
                </button>
              </form>

              <form action={rejectAssignment}>
                <button
                  type="submit"
                  className="inline-flex rounded-xl bg-red-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-700"
                >
                  Reject Assignment
                </button>
              </form>
            </div>
          )}

          {order.writerAssignmentStatus === "ACCEPTED" &&
            order.status === "PENDING" && (
              <div className="mt-8 border-t border-gray-100 pt-6">
                <form action={startWorking}>
                  <button
                    type="submit"
                    className="inline-flex rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
                  >
                    Start Working
                  </button>
                </form>
              </div>
            )}

          {order.writerAssignmentStatus === "ACCEPTED" &&
            order.status === "IN_PROGRESS" && (
              <div className="mt-8 border-t border-gray-100 pt-6">
                <form action={markCompleted}>
                  <button
                    type="submit"
                    className="inline-flex rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
                  >
                    Mark as Completed
                  </button>
                </form>
              </div>
            )}
        </div>
      </div>
    </main>
  );
}
