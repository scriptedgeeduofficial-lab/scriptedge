export default function Navbar() {
  return (
    <nav className="w-full border-b bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <h1 className="text-2xl font-bold text-emerald-600">
          ScriptEdge
        </h1>

        <div className="flex items-center gap-6">
          <a href="#">Home</a>
          <a href="#">Services</a>
          <a href="#">Pricing</a>
          <a href="#">About</a>

          <button className="rounded-lg bg-emerald-600 px-4 py-2 text-white">
            Get Started
          </button>
        </div>
      </div>
    </nav>
  );
}