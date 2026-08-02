export default function Testimonials() {
  const reviews = [
    {
      name: "School Student",
      course: "Class 12",
      review:
        "My practical file was completed neatly and delivered before the school deadline.",
    },
    {
      name: "College Student",
      course: "B.Sc.",
      review:
        "The assignment formatting was excellent and saved me a lot of time.",
    },
    {
      name: "University Student",
      course: "B.Tech",
      review:
        "The project report was well organized and helped me submit on time.",
    },
  ];

  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="text-center text-4xl font-bold text-gray-900">
          What Students Say
        </h2>

        <p className="mt-4 text-center text-gray-600">
          Feedback from students who have used ScriptEdge.
        </p>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="rounded-2xl border p-8 shadow-sm transition hover:-translate-y-2 hover:shadow-lg"
            >
              <div className="text-yellow-500 text-xl">★★★★★</div>

              <p className="mt-4 text-gray-600">
                "{review.review}"
              </p>

              <div className="mt-6">
                <h4 className="font-semibold">{review.name}</h4>
                <p className="text-sm text-gray-500">{review.course}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}