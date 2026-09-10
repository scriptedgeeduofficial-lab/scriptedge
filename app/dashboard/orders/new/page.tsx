import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import OrderForm from "./OrderForm";

type NewOrderPageProps = {
  searchParams: Promise<{
    service?: string;
    plan?: string;
  }>;
};

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
          />
        </div>
      </div>
    </main>
  );
}