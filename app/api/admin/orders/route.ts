
import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { eq } from "drizzle-orm";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { orders, user } from "@/lib/db/schema";
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

export async function POST(request: Request) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        { status: 403 },
      );
    }

    const formData = await request.formData();

    const orderId = String(formData.get("orderId") ?? "").trim();
    const writerId = String(formData.get("writerId") ?? "").trim();

    if (!orderId || !writerId) {
      return NextResponse.json(
        {
          success: false,
          message: "Order ID and writer ID are required.",
        },
        { status: 400 },
      );
    }

    const writerResult = await db
      .select({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      })
      .from(user)
      .where(eq(user.id, writerId))
      .limit(1);

    const writer = writerResult[0];

    if (!writer || writer.role !== "WRITER") {
      return NextResponse.json(
        {
          success: false,
          message: "Selected user is not a valid writer.",
        },
        { status: 400 },
      );
    }

    const updatedOrder = await db
      .update(orders)
      .set({
        writerId: writer.id,
        writerAssignmentStatus: "PENDING",
        updatedAt: new Date(),
      })
      .where(eq(orders.id, orderId))
      .returning({
        id: orders.id,
        orderNumber: orders.orderNumber,
        service: orders.service,
        title: orders.title,
      });

    if (updatedOrder.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Order not found.",
        },
        { status: 404 },
      );
    }

    const assignedOrder = updatedOrder[0];

    // Notify the writer without interrupting successful assignment.
    if (writer.email) {
      try {
        await sendScriptEdgeEmail(
          writer.email,
          `New Order Assigned - ${assignedOrder.orderNumber}`,
          `
            <div style="font-family:Arial,sans-serif;line-height:1.7;">
              <h2>New ScriptEdge Order Assigned</h2>
              <p>Hello ${escapeHtml(writer.name || "Writer")},</p>
              <p>A new order has been assigned to you.</p>
              <p><strong>Order:</strong> ${escapeHtml(assignedOrder.orderNumber)}</p>
              <p><strong>Service:</strong> ${escapeHtml(assignedOrder.service)}</p>
              <p><strong>Title:</strong> ${escapeHtml(assignedOrder.title)}</p>
              <p>Please log in to your ScriptEdge writer dashboard to review and accept or reject this assignment.</p>
              <p>&mdash; ScriptEdge Team</p>
            </div>
          `,
        );
      } catch (notificationError) {
        console.error("Writer assignment notification failed:", notificationError);
      }
    }

    return NextResponse.redirect(
      new URL("/admin/orders", request.url),
    );
  } catch (error) {
    console.error("Assign writer error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to assign writer.",
      },
      { status: 500 },
    );
  }
}
