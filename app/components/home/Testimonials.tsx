import { Star } from "lucide-react";

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

export default function Testimonials() {
  return (
    <section className="overflow-x-hidden bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-6">

        {/* Section Heading */}
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            What Students Say
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-gray-600 sm:text-lg">
            Feedback from students who have used ScriptEdge.
          </p>
        </div>

        {/* Reviews */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3 lg:gap-8">
          {reviews.map((review) => (
            <div
              key={`${review.name}-${review.course}`}
              className="group relative min-w-0 rounded-2xl border border-gray-200 bg-gray-50 p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:bg-white hover:shadow-lg sm:p-8"
            >

             

              {/* Stars */}
              <div className="flex gap-1 text-yellow-500">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={17}
                    fill="currentColor"
                    strokeWidth={1.5}
                  />
                ))}
              </div>

              {/* Review */}
              <p className="mt-5 text-sm leading-7 text-gray-600 sm:text-base">
                "{review.review}"
              </p>

              {/* Student */}
              <div className="mt-7 border-t border-gray-200 pt-5">
                <h4 className="font-semibold text-gray-900">
                  {review.name}
                </h4>

                <p className="mt-1 text-sm text-gray-500">
                  {review.course}
                </p>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}