"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Writer = {
  id: string;
  name: string;
  email: string;
  role: string;
  writerCode: string | null;
  createdAt: string;
};

export default function AdminWritersPage() {
  const [writers, setWriters] = useState<Writer[]>([]);
  const [loadingWriters, setLoadingWriters] = useState(true);

  const [showForm, setShowForm] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function loadWriters() {
    setLoadingWriters(true);
    setError("");

    try {
      const response = await fetch("/api/admin/writers", {
        method: "GET",
        cache: "no-store",
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        setError(data.message || "Unable to load writers.");
        return;
      }

      setWriters(data.writers || []);
    } catch {
      setError("Unable to load writers.");
    } finally {
      setLoadingWriters(false);
    }
  }

  useEffect(() => {
    loadWriters();
  }, []);

  async function handleCreateWriter(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    setLoading(true);
    setMessage("");
    setError("");

    try {
      const response = await fetch("/api/admin/writers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        setError(data.message || "Unable to create writer.");
        return;
      }

      setMessage("Writer created successfully.");

      setName("");
      setEmail("");
      setPassword("");
      setShowForm(false);

      await loadWriters();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-12">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6">
          <Link
            href="/admin"
            className="text-sm font-semibold text-emerald-600 hover:text-emerald-700"
          >
            ← Back to Admin Dashboard
          </Link>
        </div>

        <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-200">
          <p className="text-sm font-medium text-emerald-600">
            ScriptEdge Administration
          </p>

          <h1 className="mt-2 text-3xl font-bold text-gray-900">
            Writer Management
          </h1>

          <p className="mt-2 text-gray-600">
            Manage ScriptEdge writers and their assigned orders.
          </p>

          <div className="mt-8 flex flex-col gap-4 rounded-xl border border-gray-200 p-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="font-semibold text-gray-900">
                Writers
              </h2>

              <p className="mt-1 text-sm text-gray-600">
                Create and manage writer accounts.
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                setShowForm((current) => !current);
                setMessage("");
                setError("");
              }}
              className="rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
            >
              {showForm ? "Cancel" : "Add Writer"}
            </button>
          </div>

          {showForm && (
            <form
              onSubmit={handleCreateWriter}
              className="mt-6 rounded-xl border border-emerald-100 bg-emerald-50 p-6"
            >
              <h2 className="text-lg font-bold text-gray-900">
                Create Writer Account
              </h2>

              <p className="mt-1 text-sm text-gray-600">
                Enter the writer&apos;s account details.
              </p>

              <div className="mt-5 grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="writer-name"
                    className="text-sm font-medium text-gray-700"
                  >
                    Name
                  </label>

                  <input
                    id="writer-name"
                    type="text"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    required
                    className="mt-2 w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none focus:border-emerald-500"
                    placeholder="Writer name"
                  />
                </div>

                <div>
                  <label
                    htmlFor="writer-email"
                    className="text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>

                  <input
                    id="writer-email"
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    required
                    className="mt-2 w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none focus:border-emerald-500"
                    placeholder="writer@example.com"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="writer-password"
                    className="text-sm font-medium text-gray-700"
                  >
                    Temporary Password
                  </label>

                  <input
                    id="writer-password"
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    required
                    minLength={8}
                    className="mt-2 w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none focus:border-emerald-500"
                    placeholder="Minimum 8 characters"
                  />
                </div>
              </div>

              {error && (
                <div className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {error}
                </div>
              )}

              <div className="mt-6">
                <button
                  type="submit"
                  disabled={loading}
                  className="rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? "Creating Writer..." : "Create Writer"}
                </button>
              </div>
            </form>
          )}

          {message && !showForm && (
            <div className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-700">
              {message}
            </div>
          )}

          <div className="mt-6">
            {loadingWriters ? (
              <div className="rounded-xl border border-gray-200 p-8 text-center">
                <p className="text-sm text-gray-500">
                  Loading writers...
                </p>
              </div>
            ) : writers.length === 0 ? (
              <div className="rounded-xl border border-dashed border-gray-300 p-8 text-center">
                <p className="font-medium text-gray-700">
                  No writers added yet
                </p>

                <p className="mt-2 text-sm text-gray-500">
                  Click &quot;Add Writer&quot; to create the first writer account.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {writers.map((writer) => (
                  <div
                    key={writer.id}
                    className="rounded-xl border border-gray-200 p-5"
                  >
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <h2 className="text-lg font-bold text-gray-900">
                          {writer.name}
                        </h2>

                        <p className="mt-1 text-sm text-gray-600">
                          {writer.email}
                        </p>
                      </div>

                      <span className="inline-flex w-fit rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                        {writer.role}
                      </span>
                    </div>

                    <div className="mt-4 border-t border-gray-100 pt-4">
                      <p className="text-xs text-gray-500">
  Writer ID
</p>

<p className="mt-1 font-mono text-sm font-semibold text-gray-700">
  {writer.writerCode || "Not assigned"}
</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}