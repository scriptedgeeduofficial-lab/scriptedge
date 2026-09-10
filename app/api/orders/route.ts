import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { orders } from "@/lib/db/schema";

const servicePricing: Record<string, Record<string, number>> = {
  Assignment: {
    Basic: 99,
    Standard: 119,
    Premium: 139,
  },
  Project: {
    Basic: 99,
    Standard: 129,
    Premium: 169,
  },
  "Practical File": {
    Basic: 249,
    Standard: 279,
    Premium: 299,
  },
  PPT: {
    Basic: 99,
    Standard: 199,
    Premium: 299,
  },
  "Combo Pack": {
    Basic: 1499,
    Standard: 1649,
    Premium: 1799,
  },
};

function generateOrderNumber() {
  const timestamp = Date.now().toString().slice(-8);
  const random = Math.floor(100 + Math.random() * 900);

  return `SE-${timestamp}-${random}`;
}

export async function POST(request: Request) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();

    const service = String(body.service ?? "").trim();
    const plan = String(body.plan ?? "").trim();
    const title = String(body.title ?? "").trim();
    const details = String(body.details ?? "").trim();
    const paymentMethod = String(body.paymentMethod ?? "COD").trim();

    if (!service || !plan || !title || !details) {
      return NextResponse.json(
        {
          success: false,
          message: "Service, plan, title and requirements are required.",
        },
        { status: 400 }
      );
    }

    if (!["COD", "UPI"].includes(paymentMethod)) {
  return NextResponse.json(
    {
      success: false,
      message: "Invalid payment method.",
    },
    { status: 400 }
  );
}
    const amount = servicePricing[service]?.[plan];

    if (amount === undefined) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid service or pricing plan.",
        },
        { status: 400 }
      );
    }

    const order = await db
      .insert(orders)
      .values({
        id: crypto.randomUUID(),
        orderNumber: generateOrderNumber(),
        userId: session.user.id,
        service,
        title,
        details,
        status: "PENDING",
        amount,
        paymentMethod,
        paymentStatus: "PENDING",
      })
      .returning();

    return NextResponse.json({
      success: true,
      order: order[0],
    });
  } catch (error) {
    console.error("Create order error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to create order.",
      },
      { status: 500 }
    );
  }
}