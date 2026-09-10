import { NextResponse } from "next/server";
import { and, eq } from "drizzle-orm";

import { requireAdmin } from "@/lib/authorization";
import { db } from "@/lib/db";
import { orderStatusHistory, orders } from "@/lib/db/schema";

export async function POST(request: Request) {
  try {
    const adminSession = await requireAdmin();

    const formData = await request.formData();
    const orderId = formData.get("orderId");

    if (!orderId || typeof orderId !== "string") {
      return NextResponse.json(
        { error: "Order ID is required." },
        { status: 400 },
      );
    }

    const result = await db
      .update(orders)
      .set({
        status: "PICKED_UP",
        updatedAt: new Date(),
      })
      .where(
        and(
          eq(orders.id, orderId),
          eq(orders.status, "READY_FOR_DELIVERY"),
        ),
      )
      .returning({
        id: orders.id,
        orderNumber: orders.orderNumber,
        status: orders.status,
      });

    const order = result[0];

    if (!order) {
      return NextResponse.json(
        { error: "Order not found or not ready for delivery." },
        { status: 404 },
      );
    }

    await db.insert(orderStatusHistory).values({
      id: crypto.randomUUID(),
      orderId: order.id,
      status: "PICKED_UP",
      changedBy: adminSession.user.id,
    });

    return NextResponse.redirect(
      new URL("/admin/orders", request.url),
    );
  } catch (error) {
    console.error("Pick up order error:", error);

    return NextResponse.json(
      { error: "Unauthorized or pickup status update failed." },
      { status: 403 },
    );
  }
}