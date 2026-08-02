import { Phone, Mail, MapPin, Clock, Camera } from "lucide-react";
export default function Contact() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">

        <div className="text-center">
          <h2 className="text-4xl font-bold text-gray-900">
            Contact ScriptEdge
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
            Have questions or want to place an order? Reach out to us anytime.
            We usually respond within a few minutes.
          </p>
        </div>

        <div className="mt-16 grid gap-10 lg:grid-cols-2">

          {/* Contact Info */}

          <div className="space-y-6">

            <div className="flex items-start gap-4 rounded-2xl border p-6 shadow-sm">
              <Phone className="text-emerald-600" size={28} />
              <div>
                <h3 className="font-semibold text-lg">WhatsApp / Phone</h3>
                <p className="text-gray-600">
                  +91 8252517340
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 rounded-2xl border p-6 shadow-sm">
              <Mail className="text-emerald-600" size={28} />
              <div>
                <h3 className="font-semibold text-lg">Email</h3>
                <p className="text-gray-600">
                  scriptedge.eduofficial@gmail.com
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 rounded-2xl border p-6 shadow-sm">
             <Camera className="text-emerald-600" size={28} />
              <div>
                <h3 className="font-semibold text-lg">Instagram</h3>
                <p className="text-gray-600">
                  @scriptedge_official.in
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 rounded-2xl border p-6 shadow-sm">
              <MapPin className="text-emerald-600" size={28} />
              <div>
                <h3 className="font-semibold text-lg">Location</h3>
                <p className="text-gray-600">
                  Sasaram, Bihar, India
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 rounded-2xl border p-6 shadow-sm">
              <Clock className="text-emerald-600" size={28} />
              <div>
                <h3 className="font-semibold text-lg">Working Hours</h3>
                <p className="text-gray-600">
                  Monday – Sunday
                  <br />
                  8:00 AM – 10:00 PM
                </p>
              </div>
            </div>

          </div>

          {/* Contact Form */}

          <div className="rounded-3xl border p-8 shadow-lg">

            <h3 className="text-2xl font-bold">
              Send Us a Message
            </h3>

            <div className="mt-8 space-y-5">

              <input
                type="text"
                placeholder="Your Name"
                className="w-full rounded-xl border p-4 outline-none focus:border-emerald-500"
              />

              <input
                type="email"
                placeholder="Your Email"
                className="w-full rounded-xl border p-4 outline-none focus:border-emerald-500"
              />

              <textarea
                rows={5}
                placeholder="Tell us about your project..."
                className="w-full rounded-xl border p-4 outline-none focus:border-emerald-500"
              />

              <button className="w-full rounded-xl bg-emerald-600 py-4 text-lg font-semibold text-white hover:bg-emerald-700">
                Send Message
              </button>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
