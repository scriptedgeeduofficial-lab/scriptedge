
"use client";

import { usePathname } from "next/navigation";

export default function FloatingWhatsApp() {
  const pathname = usePathname();

  const phone = "918544522138";

  const orderMatch = pathname.match(
    /^\/(dashboard|writer)\/orders\/([^/]+)$/
  );

  const orderId = orderMatch?.[2];

  const message = orderId
    ? `Hello ScriptEdge! I need some help regarding your academic services.\n\nOrder ID: ${orderId}`
    : "Hello ScriptEdge! I need some help regarding your academic services.";

  const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

  return (
    <div className="group fixed bottom-20 right-4 z-40 sm:bottom-7 sm:right-7">
      {/* Tooltip */}
      <div className="pointer-events-none absolute right-[76px] top-1/2 -translate-y-1/2 translate-x-2 whitespace-nowrap rounded-xl border border-gray-200 bg-white px-4 py-3 opacity-0 shadow-xl transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 group-focus-within:translate-x-0 group-focus-within:opacity-100">
        <p className="text-sm font-bold text-gray-900">
          Need Help?
        </p>
        <p className="mt-0.5 text-xs text-gray-500">
          Chat with us on WhatsApp
        </p>
        <span className="absolute -right-1 top-1/2 h-2 w-2 -translate-y-1/2 rotate-45 border-r border-t border-gray-200 bg-white" />
      </div>

      {/* Floating button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Need Help? Chat with us on WhatsApp"
        title="Need Help? Chat with us"
        className="relative flex h-[62px] w-[62px] items-center justify-center rounded-full border-[3px] border-white bg-[#25D366] text-white shadow-[0_5px_20px_rgba(37,211,102,0.35)] transition-all duration-300 hover:scale-110 hover:shadow-[0_8px_28px_rgba(37,211,102,0.5)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#25D366]/30"
      >
        <span className="absolute inset-[-5px] -z-10 rounded-full border border-[#25D366]/40 animate-ping [animation-duration:3s]" />

        <svg
          viewBox="0 0 32 32"
          className="h-8 w-8"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M16 2.7A13.2 13.2 0 0 0 4.7 22.7L3 29l6.5-1.7A13.2 13.2 0 1 0 16 2.7Zm0 23.9c-2 0-4-.5-5.7-1.5l-.4-.2-3.8 1 1-3.7-.3-.4A10.7 10.7 0 1 1 16 26.6Zm5.9-8c-.3-.2-1.9-.9-2.2-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-1 1.2-.2.2-.4.2-.7.1-.3-.2-1.3-.5-2.5-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.7l.5-.6c.2-.2.2-.4.3-.6.1-.2 0-.5 0-.6-.1-.2-.7-1.8-1-2.4-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.1 1.1-1.1 2.7s1.2 3.1 1.4 3.3c.2.2 2.3 3.5 5.5 4.8.8.3 1.4.5 1.9.6.8.3 1.5.2 2 .1.6-.1 1.9-.8 2.2-1.6.3-.8.3-1.5.2-1.6-.1-.2-.3-.3-.6-.5Z" />
        </svg>

        <span className="absolute right-0 top-0 h-3.5 w-3.5 rounded-full border-2 border-white bg-[#16A34A]" />
      </a>
    </div>
  );
}
