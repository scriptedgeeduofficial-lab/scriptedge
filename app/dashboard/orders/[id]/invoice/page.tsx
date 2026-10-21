
import Image from "next/image";
import Link from "next/link";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { and, eq } from "drizzle-orm";
import PrintButton from "./PrintButton";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { orders, user } from "@/lib/db/schema";

type InvoicePageProps = {
  params: Promise<{ id: string }>;
};

function formatDate(date: Date) {
  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function formatAmount(amount: number) {
  return `₹${amount.toLocaleString("en-IN")}`;
}

export default async function InvoicePage({
  params,
}: InvoicePageProps) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  const { id } = await params;

  const result = await db
    .select({
      order: orders,
      customerName: user.name,
      customerEmail: user.email,
    })
    .from(orders)
    .innerJoin(user, eq(orders.userId, user.id))
    .where(
      and(
        eq(orders.id, id),
        eq(orders.userId, session.user.id),
      ),
    )
    .limit(1);

  const record = result[0];

  if (!record) {
    notFound();
  }

  const { order, customerName, customerEmail } = record;
  const invoiceNumber = `SE-INV-${order.createdAt.getFullYear()}-${order.id.slice(-6).toUpperCase()}`;

  return (
    <main className="min-h-screen bg-gray-100 px-4 py-8 print:bg-white print:p-0">
      <div className="mx-auto max-w-4xl">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3 print:hidden">
          <Link
            href={`/dashboard/orders/${order.id}`}
            className="text-sm font-semibold text-emerald-700 hover:text-emerald-800"
          >
            ← Back to Order
          </Link>

          <PrintButton />
        </div>

        <article className="overflow-hidden bg-white text-gray-800 shadow-sm ring-1 ring-gray-200 print:shadow-none print:ring-0 print:break-inside-avoid">
          <header className="flex flex-col justify-between gap-5 bg-[#20345B] px-6 py-7 text-white sm:flex-row sm:items-center sm:px-8">
            <div className="flex items-center gap-3">
              <img
  src="/scriptedge-invoice-logo.svg"
  alt="ScriptEdge logo"
  width="180"
  height="100"
  className="h-16 w-auto max-w-[180px] object-contain"
/>

            </div>

            <div className="sm:text-right">
              <h1 className="text-3xl font-bold tracking-wide">
                INVOICE
              </h1>
              <a
                href="https://www.scriptedge.co.in"
                className="text-sm text-gray-200"
              >
                www.scriptedge.co.in
              </a>
              <p className="text-sm text-gray-200">
                @scriptedge_official.in
              </p>
            </div>
          </header>

          <div className="space-y-8 p-6 sm:p-8">
            <section className="grid gap-3 rounded-lg bg-gray-100 p-4 sm:grid-cols-[140px_1fr]">
              <span className="text-sm text-gray-500">Invoice No.</span>
              <strong className="break-all text-sm">{invoiceNumber}</strong>

              <span className="text-sm text-gray-500">Order ID</span>
              <strong className="break-all text-sm">{order.orderNumber}</strong>

              <span className="text-sm text-gray-500">Invoice Date</span>
              <strong className="text-sm">{formatDate(order.createdAt)}</strong>
            </section>

            <section>
              <h2 className="mb-3 text-sm font-bold tracking-wide text-[#20345B]">
                BILL TO
              </h2>
              <p className="text-lg font-bold">{customerName}</p>
              <p className="mt-1 text-sm text-gray-600">{customerEmail}</p>
              {order.customerPhone && (
                <p className="mt-1 text-sm text-gray-600">
                  Phone: +91 {order.customerPhone}
                </p>
              )}
              {order.deliveryType === "PHYSICAL" &&
                order.deliveryAddress && (
                  <p className="mt-2 whitespace-pre-line text-sm text-gray-600">
                    {order.deliveryAddress}
                    {order.city ? `, ${order.city}` : ""}
                    {order.state ? `, ${order.state}` : ""}
                    {order.pincode ? ` - ${order.pincode}` : ""}
                  </p>
                )}
            </section>

            <section>
              <div className="grid grid-cols-[1fr_56px_100px] gap-3 bg-[#20345B] px-4 py-3 text-sm font-semibold text-white sm:grid-cols-[1fr_80px_120px]">
                <span>Service</span>
                <span className="text-center">Qty</span>
                <span className="text-right">Amount</span>
              </div>

              <div className="grid grid-cols-[1fr_56px_100px] gap-3 border-b border-gray-200 px-4 py-4 text-sm sm:grid-cols-[1fr_80px_120px]">
                <div>
                  <p className="font-semibold">{order.title}</p>
                  <p className="mt-1 text-gray-500">
                    {order.service} · {order.plan}
                  </p>
                </div>
                <span className="text-center">1</span>
                <span className="text-right font-semibold">
                  {formatAmount(order.amount)}
                </span>
              </div>

              <div className="ml-auto mt-5 max-w-sm">
                <div className="flex justify-between gap-4 px-4 py-3 text-sm">
                  <span className="text-gray-500">Subtotal</span>
                  <span>{formatAmount(order.amount)}</span>
                </div>
                <div className="flex justify-between gap-4 bg-[#20345B] px-4 py-4 font-bold text-white">
                  <span>TOTAL</span>
                  <span>{formatAmount(order.amount)}</span>
                </div>
                <p className="mt-2 text-xs text-gray-500">
                  Total reflects the amount recorded for this order.
                </p>
              </div>
            </section>

            <section className="grid gap-4 border-y border-gray-200 py-5 text-sm sm:grid-cols-2">
              <div>
                <p className="text-gray-500">Payment Method</p>
                <p className="mt-1 font-semibold">{order.paymentMethod}</p>
              </div>
              <div>
                <p className="text-gray-500">Order Status</p>
                <p className="mt-1 font-semibold">{order.status}</p>
              </div>
              <div>
                <p className="text-gray-500">Payment Status</p>
                <p className="mt-1 font-semibold">{order.paymentStatus}</p>
              </div>
              <div>
                <p className="text-gray-500">Delivery Type</p>
                <p className="mt-1 font-semibold">
                  {order.deliveryType || "Not specified"}
                </p>
              </div>
            </section>

            <footer className="pt-2 text-center">
              <p className="font-bold text-[#20345B]">
                Thank you for choosing ScriptEdge.
              </p>
              <p className="mt-1 text-sm text-gray-500">
                Academic Work Made Easy
              </p>
              <p className="mt-2 text-sm text-gray-500">
                www.scriptedge.co.in | @scriptedge_official.in
              </p>
            </footer>
          </div>
        </article>
      </div>

      
<style>{`
  @page {
    size: A4;
    margin: 8mm;
  }

  @media print {
    html,
    body {
      background: white !important;
      print-color-adjust: exact;
      -webkit-print-color-adjust: exact;
    }

    main {
      min-height: 0 !important;
      padding: 0 !important;
    }

    main > div {
      max-width: none !important;
    }

    article {
      overflow: visible !important;
      box-shadow: none !important;
      ring: none !important;
      break-inside: avoid !important;
      page-break-inside: avoid !important;
    }

    article > header {
      padding-top: 16px !important;
      padding-bottom: 16px !important;
    }

    article > div {
      padding: 20px !important;
      gap: 20px !important;
    }

    article section {
      break-inside: avoid;
      page-break-inside: avoid;
    }

    article footer {
      padding-top: 0 !important;
      break-inside: avoid;
      page-break-inside: avoid;
              }
        }
      `}</style>
    </main>
  );
}
