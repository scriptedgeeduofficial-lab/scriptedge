
"use client";

export default function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="rounded-xl bg-[#20345B] px-5 py-3 text-sm font-semibold text-white hover:bg-[#172746]"
    >
      Print / Save as PDF
    </button>
  );
}
