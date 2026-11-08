export default function AnnouncementBar() {
  return (
    <div className="bg-emerald-700 text-white text-sm">
      <div className="mx-auto max-w-7xl px-4 py-2 text-center font-medium">
        <span className="font-bold text-yellow-300">
          FESTIVE OFFER:
        </span>{" "}
        Get <span className="font-extrabold">50% OFF + EXTRA 10% OFF</span>
        {" "}on your order!{" "}
        <span className="text-yellow-300 font-semibold">
          Offer valid till 17 November.
        </span>
      </div>
    </div>
  );
}