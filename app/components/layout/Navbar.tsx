"use client";

import { useState } from "react";
import Link from "next/link";
import {
  User,
  ChevronDown,
  LogIn,
  UserPlus,
  ShoppingBag,
  Settings,
  LogOut,
  Menu,
  X,
  ShieldCheck,
  PenTool,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";

const navItems = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "Pricing", href: "/pricing" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);

  const { data: session, isPending } = authClient.useSession();

  const user = session?.user;
  const role = (user as { role?: string } | undefined)?.role || "CUSTOMER";

  const displayName = user?.name?.trim() || "Account";
  const initial = displayName.charAt(0).toUpperCase();

  async function handleSignOut() {
    try {
      await authClient.signOut();
      setAccountOpen(false);
      setMenuOpen(false);
      window.location.href = "/";
    } catch {
      // Keep the navbar stable if sign out encounters an error.
    }
  }

  function closeMenus() {
    setAccountOpen(false);
    setMenuOpen(false);
  }

  return (
    <nav className="w-full border-b bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="text-2xl font-bold text-emerald-600"
            onClick={closeMenus}
          >
            ScriptEdge
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-6 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-700 transition hover:text-emerald-600"
              >
                {item.name}
              </Link>
            ))}

            {/* Account */}
            {isPending ? (
              <div className="h-10 w-10 animate-pulse rounded-full bg-gray-100" />
            ) : user ? (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setAccountOpen(!accountOpen)}
                  className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-2 py-1.5 transition hover:border-emerald-300 hover:bg-emerald-50"
                  aria-expanded={accountOpen}
                  aria-haspopup="menu"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-600 text-sm font-bold text-white">
                    {initial}
                  </span>

                  <span className="hidden max-w-28 truncate text-sm font-medium text-gray-800 lg:block">
                    {displayName}
                  </span>

                  <ChevronDown
                    className={`h-4 w-4 text-gray-500 transition ${
                      accountOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {accountOpen && (
                  <div className="absolute right-0 z-50 mt-2 w-64 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg">
                    <div className="border-b bg-gray-50 px-4 py-3">
                      <p className="truncate text-sm font-semibold text-gray-900">
                        {displayName}
                      </p>

                      <p className="truncate text-xs text-gray-500">
                        {user.email}
                      </p>

                      <span className="mt-2 inline-flex rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                        {role}
                      </span>
                    </div>

                    <div className="p-2">
                      <Link
                        href="/dashboard"
                        onClick={closeMenus}
                        className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <User className="h-4 w-4" />
                        My Profile
                      </Link>

                      {role === "CUSTOMER" && (
                        <Link
                          href="/dashboard/orders"
                          onClick={closeMenus}
                          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          <ShoppingBag className="h-4 w-4" />
                          My Orders
                        </Link>
                      )}

                      {role === "WRITER" && (
                        <>
                          <Link
                            href="/writer"
                            onClick={closeMenus}
                            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            <PenTool className="h-4 w-4" />
                            Writer Dashboard
                          </Link>

                          <Link
                            href="/writer/orders"
                            onClick={closeMenus}
                            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            <ShoppingBag className="h-4 w-4" />
                            Assigned Orders
                          </Link>
                        </>
                      )}

                      {role === "ADMIN" && (
                        <>
                          <Link
                            href="/admin"
                            onClick={closeMenus}
                            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            <ShieldCheck className="h-4 w-4" />
                            Admin Panel
                          </Link>

                          <Link
                            href="/admin/orders"
                            onClick={closeMenus}
                            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            <ShoppingBag className="h-4 w-4" />
                            Manage Orders
                          </Link>

                          <Link
                            href="/admin/writers"
                            onClick={closeMenus}
                            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            <PenTool className="h-4 w-4" />
                            Manage Writers
                          </Link>
                        </>
                      )}

                      <Link
                        href="/settings"
                        onClick={closeMenus}
                        className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <Settings className="h-4 w-4" />
                        Account Settings
                      </Link>

                      <div className="my-2 border-t" />

                      <button
                        type="button"
                        onClick={handleSignOut}
                        className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm text-red-600 hover:bg-red-50"
                      >
                        <LogOut className="h-4 w-4" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setAccountOpen(!accountOpen)}
                  className="flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700"
                  aria-expanded={accountOpen}
                  aria-haspopup="menu"
                >
                  <User className="h-4 w-4" />
                  Get Started
                  <ChevronDown
                    className={`h-4 w-4 transition ${
                      accountOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {accountOpen && (
                  <div className="absolute right-0 z-50 mt-2 w-52 overflow-hidden rounded-xl border border-gray-200 bg-white p-2 shadow-lg">
                    <Link
                      href="/login"
                      onClick={closeMenus}
                      className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-gray-700 hover:bg-emerald-50 hover:text-emerald-700"
                    >
                      <LogIn className="h-4 w-4" />
                      Sign In
                    </Link>

                    <Link
                      href="/register"
                      onClick={closeMenus}
                      className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-gray-700 hover:bg-emerald-50 hover:text-emerald-700"
                    >
                      <UserPlus className="h-4 w-4" />
                      Create Account
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => {
              setMenuOpen(!menuOpen);
              setAccountOpen(false);
            }}
            className="rounded-lg p-2 text-gray-700 hover:bg-gray-100 md:hidden"
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {menuOpen && (
          <div className="border-t py-4 md:hidden">
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={closeMenus}
                  className="rounded-lg px-4 py-3 text-gray-700 transition hover:bg-emerald-50 hover:text-emerald-600"
                >
                  {item.name}
                </Link>
              ))}

              {isPending ? (
                <div className="mt-2 h-12 animate-pulse rounded-lg bg-gray-100" />
              ) : user ? (
                <>
                  <div className="mt-2 rounded-xl bg-gray-50 p-4">
                    <div className="flex items-center gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-600 font-bold text-white">
                        {initial}
                      </span>

                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-gray-900">
                          {displayName}
                        </p>

                        <p className="truncate text-xs text-gray-500">
                          {user.email}
                        </p>
                      </div>
                    </div>

                    <span className="mt-3 inline-flex rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                      {role}
                    </span>
                  </div>

                  <Link
                    href="/dashboard"
                    onClick={closeMenus}
                    className="flex items-center gap-3 rounded-lg px-4 py-3 text-gray-700 hover:bg-emerald-50"
                  >
                    <User className="h-4 w-4" />
                    My Profile
                  </Link>

                  {role === "CUSTOMER" && (
                    <Link
                      href="/dashboard/orders"
                      onClick={closeMenus}
                      className="flex items-center gap-3 rounded-lg px-4 py-3 text-gray-700 hover:bg-emerald-50"
                    >
                      <ShoppingBag className="h-4 w-4" />
                      My Orders
                    </Link>
                  )}

                  {role === "WRITER" && (
                    <>
                      <Link
                        href="/writer"
                        onClick={closeMenus}
                        className="flex items-center gap-3 rounded-lg px-4 py-3 text-gray-700 hover:bg-emerald-50"
                      >
                        <PenTool className="h-4 w-4" />
                        Writer Dashboard
                      </Link>

                      <Link
                        href="/writer/orders"
                        onClick={closeMenus}
                        className="flex items-center gap-3 rounded-lg px-4 py-3 text-gray-700 hover:bg-emerald-50"
                      >
                        <ShoppingBag className="h-4 w-4" />
                        Assigned Orders
                      </Link>
                    </>
                  )}

                  {role === "ADMIN" && (
                    <>
                      <Link
                        href="/admin"
                        onClick={closeMenus}
                        className="flex items-center gap-3 rounded-lg px-4 py-3 text-gray-700 hover:bg-emerald-50"
                      >
                        <ShieldCheck className="h-4 w-4" />
                        Admin Panel
                      </Link>

                      <Link
                        href="/admin/orders"
                        onClick={closeMenus}
                        className="flex items-center gap-3 rounded-lg px-4 py-3 text-gray-700 hover:bg-emerald-50"
                      >
                        <ShoppingBag className="h-4 w-4" />
                        Manage Orders
                      </Link>

                      <Link
                        href="/admin/writers"
                        onClick={closeMenus}
                        className="flex items-center gap-3 rounded-lg px-4 py-3 text-gray-700 hover:bg-emerald-50"
                      >
                        <PenTool className="h-4 w-4" />
                        Manage Writers
                      </Link>
                    </>
                  )}

                  <Link
                    href="/settings"
                    onClick={closeMenus}
                    className="flex items-center gap-3 rounded-lg px-4 py-3 text-gray-700 hover:bg-emerald-50"
                  >
                    <Settings className="h-4 w-4" />
                    Account Settings
                  </Link>

                  <button
                    type="button"
                    onClick={handleSignOut}
                    className="flex items-center gap-3 rounded-lg px-4 py-3 text-left text-red-600 hover:bg-red-50"
                  >
                    <LogOut className="h-4 w-4" />
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    onClick={closeMenus}
                    className="mt-2 flex items-center gap-3 rounded-lg px-4 py-3 font-medium text-gray-700 hover:bg-emerald-50"
                  >
                    <LogIn className="h-4 w-4" />
                    Sign In
                  </Link>

                  <Link
                    href="/register"
                    onClick={closeMenus}
                    className="flex items-center gap-3 rounded-lg bg-emerald-600 px-4 py-3 font-semibold text-white hover:bg-emerald-700"
                  >
                    <UserPlus className="h-4 w-4" />
                    Create Account
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}