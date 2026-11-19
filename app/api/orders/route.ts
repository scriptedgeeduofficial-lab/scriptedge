
import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { eq } from "drizzle-orm";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { orders, user } from "@/lib/db/schema";
import { sendScriptEdgeEmail } from "@/lib/email";

import {
  getRegularPrice,
  servicePricing,
  type PricedService,
  type PricingPlan,
} from "@/app/data/servicePricing";

const FIRST_ORDER_OFFER_CODE = "FIRST_ORDER_20_10";

const FIRST_ORDER_OFFER_END = new Date(
  "2026-12-26T23:59:59.999+05:30",
);

function generateOrderNumber() {
  const timestamp = Date.now().toString().slice(-8);
  const random = Math.floor(100 + Math.random() * 900);

  return `SE-${timestamp}-${random}`;
}

function isFirstOrderOfferActive() {
  return Date.now() <= FIRST_ORDER_OFFER_END.getTime();
}

function isFirstOrderOfferConflict(error: unknown): boolean {
  let current: unknown = error;

  for (let i = 0; i < 5 && current; i++) {
    if (typeof current !== "object") {
      return false;
    }

    const candidate = current as {
      code?: string;
      constraint?: string;
      cause?: unknown;
    };

    if (
      candidate.code === "23505" &&
      candidate.constraint ===
        "orders_first_order_offer_user_unique"
    ) {
      return true;
    }

    current = candidate.cause;
  }

  return false;
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

    if (deliveryType === "DIGITAL" && deliveryMethod) {
      return NextResponse.json(
        {
          success: false,
          message: "Delivery method is not applicable to digital orders.",
        },
        { status: 400 },
      );
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
      !validServices.includes(service as PricedService) ||
      !validPlans.includes(plan as PricingPlan)
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid service or pricing plan.",
        },
        { status: 400 },
      );
    }

    // Always calculate the reference price on the server.
    const regularAmount = getRegularPrice(
      service as PricedService,
      plan as PricingPlan,
    );

    // Any previous order counts, regardless of its status.
    const previousOrders = await db
      .select({ id: orders.id })
      .from(orders)
      .where(eq(orders.userId, session.user.id))
      .limit(1);

    const isFirstOrder =
      previousOrders.length === 0 && isFirstOrderOfferActive();

    // Apply 20% first, then an additional 10%.
    // Round the final amount UP to the nearest rupee.
    const discountedAmount = isFirstOrder
      ? Math.ceil(regularAmount * 0.8 * 0.9)
      : regularAmount;

    // Keep all order creation fields in one place.
    const createOrder = async (
      amount: number,
      offerApplied: boolean,
    ) => {
      return db
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

          originalAmount: regularAmount,
          discountAmount: regularAmount - amount,
          offerCode: offerApplied
            ? FIRST_ORDER_OFFER_CODE
            : null,

          paymentMethod,
          paymentStatus: "PENDING",
          customerPhone,
          deliveryType,
          deliveryMethod:
            deliveryType === "PHYSICAL" ? deliveryMethod : null,

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
    };

    type CreatedOrder = typeof orders.$inferSelect;

    let order: CreatedOrder[];

    try {
      order = await createOrder(
        discountedAmount,
        isFirstOrder,
      );
    } catch (error) {
      // The database index protects against simultaneous first orders.
      // If another request claimed the offer first, retry at regular price.
      if (
        !isFirstOrder ||
        !isFirstOrderOfferConflict(error)
      ) {
        throw error;
      }

      console.info(
        "First-order offer already claimed. Retrying at regular price.",
      );

      order = await createOrder(regularAmount, false);
    }

    const newOrder = order[0];

    if (!newOrder) {
      throw new Error("Order creation returned no order.");
    }

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
              <p><strong>Regular price:</strong> ₹${regularAmount}</p>
              <p><strong>Discount:</strong> ₹${newOrder.discountAmount ?? 0}</p>
              <p><strong>Final amount:</strong> ₹${newOrder.amount}</p>
              <p><strong>Payment:</strong> ${escapeHtml(paymentMethod)}</p>

              <p>Please visit your ScriptEdge admin dashboard to review this order.</p>
              <p>&mdash; ScriptEdge Team</p>
            </div>
          `,
        );
      }
    } catch (notificationError) {
      console.error(
        "Admin new-order notification failed:",
        notificationError,
      );
    }

    return NextResponse.json({
      success: true,
      order: newOrder,
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
