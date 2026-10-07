import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { orders } from "@/lib/db/schema";

const servicePricing: Record<string, Record<string, number>> = {
  Assignment: { Basic: 99, Standard: 119, Premium: 139 },
  Project: { Basic: 99, Standard: 129, Premium: 169 },
  "Practical File": { Basic: 249, Standard: 279, Premium: 299 },
  PPT: { Basic: 99, Standard: 199, Premium: 299 },
  "Combo Pack": { Basic: 1499, Standard: 1649, Premium: 1799 },
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

    if (deliveryType === "PHYSICAL") {
      if (!deliveryAddress || !city || !state || !pincode) {
        return NextResponse.json(
          {
            success: false,
            message: "Complete delivery address is required for physical delivery.",
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

    const amount = servicePricing[service]?.[plan];

    if (amount === undefined) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid service or pricing plan.",
        },
        { status: 400 },
      );
    }

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
        deliveryAddress: deliveryType === "PHYSICAL" ? deliveryAddress : null,
        city: deliveryType === "PHYSICAL" ? city : null,
        state: deliveryType === "PHYSICAL" ? state : null,
        pincode: deliveryType === "PHYSICAL" ? pincode : null,
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
      { status: 500 },
    );
  }
}