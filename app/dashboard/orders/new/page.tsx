
import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { orders } from "@/lib/db/schema";
import OrderForm from "./OrderForm";

type NewOrderPageProps = {
  searchParams: Promise<{
    service?: string;
    plan?: string;
  }>;
};

const FIRST_ORDER_OFFER_END = new Date(
  "2026-12-26T23:59:59.999+05:30",
);

export default async function NewOrderPage({
  searchParams,
}: NewOrderPageProps) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  const { service, plan } = await searchParams;

  // Check whether this customer has ever placed an order.
  const previousOrders = await db
    .select({ id: orders.id })
    .from(orders)
    .where(eq(orders.userId, session.user.id))
    .limit(1);

  // This check controls the offer display only.
  // The backend independently verifies eligibility when creating an order.
  const isFirstOrderEligible =
    previousOrders.length === 0 &&
    Date.now() <= FIRST_ORDER_OFFER_END.getTime();

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-12">
      <div className="mx-auto max-w-2xl">
        <div className="mb-6">
          <Link
            href="/dashboard"
            className="text-sm font-semibold text-emerald-600 hover:text-emerald-700"
          >
            ← Back to Dashboard
          </Link>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-sm sm:p-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Create New Order
          </h1>

          <p className="mt-2 text-gray-600">
            Tell us what you need and we&apos;ll take care of the rest.
          </p>

          <OrderForm
            initialService={service ?? ""}
            initialPlan={plan ?? ""}
            isFirstOrderEligible={isFirstOrderEligible}
          />
        </div>
      </div>
    </main>
  );
}
