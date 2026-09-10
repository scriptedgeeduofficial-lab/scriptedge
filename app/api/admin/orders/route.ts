import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { eq } from "drizzle-orm";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { orders, user } from "@/lib/db/schema";

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
        updatedAt: new Date(),
      })
      .where(eq(orders.id, orderId))
      .returning();

    if (updatedOrder.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Order not found.",
        },
        { status: 404 },
      );
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