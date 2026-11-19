
export default function AnnouncementBar() {
  return (
    <div className="bg-emerald-700 text-white text-sm">
      <div className="mx-auto max-w-7xl px-4 py-2 text-center font-medium">
        <span className="font-bold text-yellow-300">
          FIRST ORDER OFFER:
        </span>{" "}
        Get <span className="font-extrabold">20% OFF + EXTRA 10% OFF</span>
        {" "}on your first order!{" "}
        <span className="text-yellow-300 font-semibold">
          Valid till 26 December 2026.
        </span>
      </div>
    </div>
  );
}
