import Link from "next/link";
import { serviceCategories } from "../data/services";

export default function ServicesPage() {
  return (
    <main className="bg-gray-50">

      {/* Hero */}

      <section className="bg-gradient-to-r from-emerald-600 to-green-500 py-24 text-white">
        <div className="mx-auto max-w-7xl px-6 text-center">

          <h1 className="text-5xl font-bold">
            Our Academic Services
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-xl text-emerald-100">
            ScriptEdge provides professional academic assistance for
            school, college and university students with quality,
            affordability and on-time delivery.
          </p>

        </div>
      </section>

      {/* Categories */}

      <section className="py-20">

        <div className="mx-auto max-w-7xl px-6">

          <div className="grid gap-8 lg:grid-cols-3">

            {serviceCategories.map((category) => (

              <div
                key={category.title}
                className="rounded-2xl bg-white p-8 shadow-lg transition hover:-translate-y-2 hover:shadow-2xl"
              >

                <h2 className="text-3xl font-bold text-gray-900">
                  {category.title}
                </h2>

                <p className="mt-4 text-gray-600">
                  {category.description}
                </p>

                <ul className="mt-8 space-y-3">

                  {category.services.map((service) => {

                    const categorySlug = category.title
                      .toLowerCase()
                      .replace(/\s+/g, "-");

                    const serviceSlug = service
                      .toLowerCase()
                      .replace(/&/g, "and")
                      .replace(/\s+/g, "-");

                    return (
                      <li key={service}>
                        <Link
                          href={`/services/${categorySlug}/${serviceSlug}`}
                          className="block rounded-lg bg-gray-100 p-3 transition hover:bg-emerald-50 hover:text-emerald-700"
                        >
                          {service}
                        </Link>
                      </li>
                    );

                  })}

                </ul>

              </div>

            ))}

          </div>

        </div>

      </section>

    </main>
  );
}