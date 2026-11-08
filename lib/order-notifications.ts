
import { eq } from "drizzle-orm";

import { db } from "@/lib/db";
import { orders, user } from "@/lib/db/schema";
import { sendScriptEdgeEmail } from "@/lib/email";

type CustomerNotificationStatus =
  | "IN_PROGRESS"
  | "VERIFIED"
  | "OUT_FOR_DELIVERY"
  | "DELIVERED";

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

const notificationContent: Record<
  CustomerNotificationStatus,
  { subject: (orderNumber: string) => string; heading: string; message: string; closing: string }
> = {
  IN_PROGRESS: {
    subject: (number) => `Your Order Is Now in Progress | ScriptEdge`,
    heading: "Your Order Is Now in Progress",
    message:
      "We're pleased to inform you that your order has been accepted and our team has started working on it. We'll keep you updated as your order progresses.",
    closing: "Thank you for trusting ScriptEdge.",
  },
  VERIFIED: {
    subject: () => "Your Order Has Been Completed and Verified | ScriptEdge",
    heading: "Your Order Has Been Completed and Verified",
    message:
      "Your order has been successfully completed and verified by our team. It is now ready for the next stage of processing and will be picked up for delivery soon.",
    closing: "Thank you for choosing ScriptEdge.",
  },
  OUT_FOR_DELIVERY: {
    subject: (number) => `Your ScriptEdge Order Is Out for Delivery | ${number}`,
    heading: "Your Order Is Out for Delivery",
    message:
      "Good news! Your order has been dispatched and is now out for delivery. Please keep your phone available so our delivery partner can contact you if needed.",
    closing:
      "Thank you for your patience. We hope you enjoy your experience with ScriptEdge.",
  },
  DELIVERED: {
    subject: (number) => `Your Order Has Been Successfully Delivered | ${number}`,
    heading: "Your Order Has Been Successfully Delivered",
    message:
      "We're happy to confirm that your order has been successfully delivered.",
    closing:
      "Thank you for choosing ScriptEdge. We truly appreciate your trust and support. If you need any further assistance, please feel free to contact us.",
  },
};

export async function notifyCustomerOrderStatus(
  orderId: string,
  status: CustomerNotificationStatus,
) {
  const result = await db
    .select({
      orderNumber: orders.orderNumber,
      customerName: user.name,
      customerEmail: user.email,
    })
    .from(orders)
    .innerJoin(user, eq(orders.userId, user.id))
    .where(eq(orders.id, orderId))
    .limit(1);

  const order = result[0];

  if (!order?.customerEmail) {
    console.error("Customer notification skipped: customer not found.", orderId);
    return;
  }

  const content = notificationContent[status];
  const customerName = escapeHtml(order.customerName || "Customer");
  const orderNumber = escapeHtml(order.orderNumber);

  const html = `
    <div style="margin:0;padding:32px 16px;background-color:#f4f6fa;font-family:Arial,Helvetica,sans-serif;color:#1f2937;">
      <div style="max-width:600px;margin:0 auto;background:#ffffff;border:1px solid #e5e7eb;border-radius:12px;overflow:hidden;">
        <div style="padding:24px 32px;background-color:#172554;color:#ffffff;">
          <h1 style="margin:0;font-size:24px;font-weight:700;">ScriptEdge</h1>
          <p style="margin:6px 0 0;font-size:13px;color:#dbeafe;">Academic Work, Made Easy</p>
        </div>

        <div style="padding:32px;">
          <p style="margin:0 0 18px;font-size:15px;">Dear ${customerName},</p>

          <h2 style="margin:0 0 16px;font-size:21px;line-height:1.4;color:#172554;">
            ${content.heading}
          </h2>

          <p style="margin:0 0 20px;font-size:15px;line-height:1.8;color:#4b5563;">
            ${content.message}
          </p>

          <div style="margin:24px 0;padding:16px 20px;background:#f8fafc;border:1px solid #e5e7eb;border-radius:8px;">
            <p style="margin:0;font-size:13px;color:#6b7280;">ORDER NUMBER</p>
            <p style="margin:6px 0 0;font-size:17px;font-weight:700;color:#172554;">
              ${orderNumber}
            </p>
          </div>

          <p style="margin:20px 0 0;font-size:15px;line-height:1.8;color:#4b5563;">
            ${content.closing}
          </p>

          <p style="margin:28px 0 0;font-size:14px;line-height:1.7;color:#374151;">
            Warm regards,<br />
            <strong>Team ScriptEdge</strong>
          </p>
        </div>

        <div style="padding:16px 32px;background:#f8fafc;border-top:1px solid #e5e7eb;text-align:center;">
          <p style="margin:0;font-size:12px;color:#6b7280;">
            This is an automated order update from ScriptEdge.
          </p>
          <p style="margin:6px 0 0;font-size:12px;color:#6b7280;">
            www.scriptedge.co.in
          </p>
        </div>
      </div>
    </div>
  `;

  await sendScriptEdgeEmail(
    order.customerEmail,
    content.subject(order.orderNumber),
    html,
  );
}
