
import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { orders } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { user } from "@/lib/db/schema";
import { sendScriptEdgeEmail } from "@/lib/email";
import {
  getOfferPrice,
  servicePricing,
  type PricedService,
  type PricingPlan,
} from "@/app/data/servicePricing";

function generateOrderNumber() {
  const timestamp = Date.now().toString().slice(-8);
  const random = Math.floor(100 + Math.random() * 900);

  return `SE-${timestamp}-${random}`;
}
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

    if (!session) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        { status: 401 },
      );
    }

    const body = await request.json();

    const service = String(body.service ?? "").trim();
    const plan = String(body.plan ?? "").trim();
    const title = String(body.title ?? "").trim();
    const details = String(body.details ?? "").trim();
    const paymentMethod = String(body.paymentMethod ?? "COD").trim();

    const customerPhone = String(body.customerPhone ?? "").trim();
    const deliveryType = String(body.deliveryType ?? "").trim();
    const deliveryMethod = String(body.deliveryMethod ?? "").trim();
    const deliveryAddress = String(body.deliveryAddress ?? "").trim();
    const city = String(body.city ?? "").trim();
    const state = String(body.state ?? "").trim();
    const pincode = String(body.pincode ?? "").trim();

    if (!service || !plan || !title || !details) {
      return NextResponse.json(
        {
          success: false,
          message: "Service, plan, title and requirements are required.",
        },
        { status: 400 },
      );
    }

    if (!["COD", "UPI"].includes(paymentMethod)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid payment method.",
        },
        { status: 400 },
      );
    }

    if (deliveryType === "DIGITAL" && paymentMethod === "COD") {
      return NextResponse.json(
        {
          success: false,
          message: "Cash on Delivery is not available for digital delivery.",
        },
        { status: 400 },
      );
    }

    if (!customerPhone) {
      return NextResponse.json(
        {
          success: false,
          message: "Phone / WhatsApp number is required.",
        },
        { status: 400 },
      );
    }

    if (!/^\d{10}$/.test(customerPhone)) {
      return NextResponse.json(
        {
          success: false,
          message: "Please enter a valid 10-digit phone number.",
        },
        { status: 400 },
      );
    }

    if (!["DIGITAL", "PHYSICAL"].includes(deliveryType)) {
      return NextResponse.json(
        {
          success: false,
          message: "Please select a valid delivery type.",
        },
        { status: 400 },
      );
    }

    if (deliveryType === "DIGITAL") {
      if (deliveryMethod) {
        return NextResponse.json(
          {
            success: false,
            message: "Delivery method is not applicable to digital orders.",
          },
          { status: 400 },
        );
      }
    }

    if (deliveryType === "PHYSICAL") {
      if (!["PICKUP", "DOOR_DELIVERY"].includes(deliveryMethod)) {
        return NextResponse.json(
          {
            success: false,
            message: "Please select a valid physical delivery method.",
          },
          { status: 400 },
        );
      }

      if (deliveryMethod === "DOOR_DELIVERY") {
        if (!deliveryAddress || !city || !state || !pincode) {
          return NextResponse.json(
            {
              success: false,
              message:
                "Complete delivery address is required for door delivery.",
            },
            { status: 400 },
          );
        }

        if (!/^\d{6}$/.test(pincode)) {
          return NextResponse.json(
            {
              success: false,
              message: "Please enter a valid 6-digit PIN code.",
            },
            { status: 400 },
          );
        }
      }
    }

    const validServices = Object.keys(servicePricing) as PricedService[];

    const validPlans = ["Basic", "Standard", "Premium"] as const;
    if (
      !validServices.includes(service as (typeof validServices)[number]) ||
      !validPlans.includes(plan as (typeof validPlans)[number])
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid service or pricing plan.",
        },
        { status: 400 },
      );
    }

    const amount = getOfferPrice(
      service as PricedService,
      plan as PricingPlan,
    );

    const order = await db
      .insert(orders)
      .values({
        id: crypto.randomUUID(),
        orderNumber: generateOrderNumber(),
        userId: session.user.id,
        service,
        plan,
        title,
        details,
        status: "PENDING",
        amount,
        paymentMethod,
        paymentStatus: "PENDING",
        customerPhone,
        deliveryType,
        deliveryMethod: deliveryType === "PHYSICAL" ? deliveryMethod : null,
        deliveryAddress:
          deliveryType === "PHYSICAL" &&
          deliveryMethod === "DOOR_DELIVERY"
            ? deliveryAddress
            : null,
        city:
          deliveryType === "PHYSICAL" &&
          deliveryMethod === "DOOR_DELIVERY"
            ? city
            : null,
        state:
          deliveryType === "PHYSICAL" &&
          deliveryMethod === "DOOR_DELIVERY"
            ? state
            : null,
        pincode:
          deliveryType === "PHYSICAL" &&
          deliveryMethod === "DOOR_DELIVERY"
            ? pincode
            : null,
      })
      .returning();

      // Notify admins without interrupting successful order creation.
try {
  const admins = await db
    .select({ email: user.email })
    .from(user)
    .where(eq(user.role, "ADMIN"));

  const adminEmails = admins
    .map((admin) => admin.email)
    .filter((email): email is string => Boolean(email));

  if (adminEmails.length > 0) {
    const newOrder = order[0];

    await sendScriptEdgeEmail(
      adminEmails,
      `New Order Received - ${newOrder.orderNumber}`,
      `
        <div style="font-family:Arial,sans-serif;line-height:1.7;">
          <h2>New ScriptEdge Order Received</h2>
          <p>A customer has successfully placed a new order.</p>

          <p><strong>Order:</strong> ${escapeHtml(newOrder.orderNumber)}</p>
          <p><strong>Customer:</strong> ${escapeHtml(session.user.name || "Customer")}</p>
          <p><strong>Email:</strong> ${escapeHtml(session.user.email)}</p>
          <p><strong>Service:</strong> ${escapeHtml(service)}</p>
          <p><strong>Plan:</strong> ${escapeHtml(plan)}</p>
          <p><strong>Title:</strong> ${escapeHtml(title)}</p>
          <p><strong>Amount:</strong> ₹${amount}</p>
          <p><strong>Payment:</strong> ${escapeHtml(paymentMethod)}</p>

          <p>Please visit your ScriptEdge admin dashboard to review this order.</p>
          <p>&mdash; ScriptEdge Team</p>
        </div>
      `,
    );
  }
} catch (notificationError) {
  console.error("Admin new-order notification failed:", notificationError);
}
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
      { status: 500 },
    );
  }
}
