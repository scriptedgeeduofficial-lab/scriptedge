"use client";

import Link from "next/link";
import {
  ArrowLeft,
  Mail,
  Shield,
  User,
  ShoppingBag,
  Settings,
} from "lucide-react";

import { authClient } from "@/lib/auth-client";

export default function SettingsPage() {
  const { data: session, isPending } = authClient.useSession();

  const user = session?.user;
  const role =
    (user as { role?: string } | undefined)?.role || "CUSTOMER";

  const displayName = user?.name || "User";

  if (isPending) {
    return (
      <main className="min-h-screen bg-gray-50 px-4 py-10">
        <div className="mx-auto max-w-3xl">
          <div className="rounded-2xl border bg-white p-8 shadow-sm">
            <p className="text-gray-600">Loading account settings...</p>
          </div>
        </div>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="min-h-screen bg-gray-50 px-4 py-10">
        <div className="mx-auto max-w-3xl">
          <div className="rounded-2xl border bg-white p-8 text-center shadow-sm">
            <h1 className="text-2xl font-bold text-gray-900">
              Sign in required
            </h1>

            <p className="mt-2 text-gray-600">
              Please sign in to view your account settings.
            </p>

            <Link
              href="/login"
              className="mt-6 inline-flex rounded-lg bg-emerald-600 px-5 py-2.5 font-semibold text-white transition hover:bg-emerald-700"
            >
              Sign In
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="mx-auto max-w-3xl">
        {/* Back */}
        <Link
          href="/dashboard"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition hover:text-emerald-600"
        >
          <ArrowLeft size={18} />
          Back to Dashboard
        </Link>

        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
              <Settings size={24} />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Account Settings
              </h1>
              <p className="text-sm text-gray-600">
                Manage your ScriptEdge account information.
              </p>
            </div>
          </div>
        </div>

        {/* Account Information */}
        <section className="rounded-2xl border bg-white p-6 shadow-sm">
          <h2 className="mb-5 text-lg font-semibold text-gray-900">
            Account Information
          </h2>

          <div className="space-y-4">
            {/* Name */}
            <div className="flex items-center gap-4 rounded-xl border bg-gray-50 p-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-gray-600 shadow-sm">
                <User size={19} />
              </div>

              <div className="min-w-0">
                <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                  Name
                </p>
                <p className="truncate font-medium text-gray-900">
                  {displayName}
                </p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-center gap-4 rounded-xl border bg-gray-50 p-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-gray-600 shadow-sm">
                <Mail size={19} />
              </div>

              <div className="min-w-0">
                <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                  Email
                </p>
                <p className="truncate font-medium text-gray-900">
                  {user.email}
                </p>
              </div>
            </div>

            {/* Role */}
            <div className="flex items-center gap-4 rounded-xl border bg-gray-50 p-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-gray-600 shadow-sm">
                <Shield size={19} />
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                  Account Type
                </p>
                <p className="font-medium text-gray-900">
                  {role === "ADMIN"
                    ? "Administrator"
                    : role === "WRITER"
                      ? "Writer"
                      : "Customer"}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Links */}
        <section className="mt-6 rounded-2xl border bg-white p-6 shadow-sm">
          <h2 className="mb-5 text-lg font-semibold text-gray-900">
            Quick Links
          </h2>

          <div className="grid gap-3 sm:grid-cols-2">
            <Link
              href="/dashboard"
              className="flex items-center gap-3 rounded-xl border p-4 transition hover:border-emerald-300 hover:bg-emerald-50"
            >
              <User size={20} className="text-emerald-600" />
              <span className="font-medium text-gray-900">
                My Dashboard
              </span>
            </Link>

            <Link
              href="/dashboard/orders"
              className="flex items-center gap-3 rounded-xl border p-4 transition hover:border-emerald-300 hover:bg-emerald-50"
            >
              <ShoppingBag size={20} className="text-emerald-600" />
              <span className="font-medium text-gray-900">
                My Orders
              </span>
            </Link>
          </div>
        </section>

        {/* Security */}
        <section className="mt-6 rounded-2xl border bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900">
            Security
          </h2>

          <p className="mt-2 text-sm text-gray-600">
            Password recovery and password-change options will be available
            once the secure email reset system is configured.
          </p>

          <Link
            href="/login"
            className="mt-4 inline-flex rounded-lg border px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
          >
            Go to Sign In
          </Link>
        </section>
      </div>
    </main>
  );
}