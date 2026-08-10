"use client";

import { useState } from "react";
import Link from "next/link";

const navItems = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "Pricing", href: "/pricing" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="w-full border-b bg-white">
      <div className="mx-auto max-w-7xl px-6">

        {/* Desktop / Mobile Header */}
        <div className="flex h-16 items-center justify-between">

          {/* Logo */}
          <Link
            href="/"
            className="text-2xl font-bold text-emerald-600"
            onClick={() => setMenuOpen(false)}
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

            <a
              href="https://wa.me/918252517340"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg bg-emerald-600 px-4 py-2 text-white transition hover:bg-emerald-700"
            >
              Get Started
            </a>

          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="rounded-lg p-2 text-gray-700 hover:bg-gray-100 md:hidden"
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? "✕" : "☰"}
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
                  onClick={() => setMenuOpen(false)}
                  className="rounded-lg px-4 py-3 text-gray-700 transition hover:bg-emerald-50 hover:text-emerald-600"
                >
                  {item.name}
                </Link>
              ))}

              <a
                href="https://wa.me/918252517340"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMenuOpen(false)}
                className="mt-2 rounded-lg bg-emerald-600 px-4 py-3 text-center font-semibold text-white transition hover:bg-emerald-700"
              >
                Get Started
              </a>

            </div>

          </div>
        )}

      </div>
    </nav>
  );
}