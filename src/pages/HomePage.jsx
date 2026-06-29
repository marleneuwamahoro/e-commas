import { Link } from "react-router-dom";
import { useCategories } from "../features/products/hooks";

export default function HomePage() {
  const { data: categories = [] } = useCategories();

  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden bg-ink text-white">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(ellipse at 70% 50%, #e0601a 0%, transparent 65%)",
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-24 sm:py-36 flex flex-col items-start gap-6">
          <p className="text-brand-400 text-sm font-medium tracking-widest uppercase">
            New arrivals every week
          </p>
          <h1 className="font-display text-4xl sm:text-6xl font-bold leading-tight max-w-xl">
            Shop what <br />
            <span className="text-brand-400">moves you.</span>
          </h1>
          <p className="text-white/60 max-w-md text-lg">
            Thousands of products across every category — with honest pricing
            and a checkout that takes seconds.
          </p>
          <Link to="/products" className="btn-primary text-base px-7 py-3">
            Browse the store →
          </Link>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <h2 className="font-display text-2xl font-bold text-ink mb-8">
          Shop by category
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories.slice(0, 8).map((cat) => (
            <Link
              key={cat.id}
              to={`/products?categoryId=${cat.id}`}
              className="card group p-0 overflow-hidden"
            >
              <div className="relative aspect-video overflow-hidden bg-surface">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    e.target.src =
                      "https://placehold.co/400x220/faf9f7/9c9690?text=" +
                      encodeURIComponent(cat.name);
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent" />
                <span className="absolute bottom-2 left-3 text-white font-medium text-sm capitalize">
                  {cat.name}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Trust bar */}
      <section className="border-y border-surface-border bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          {[
            { icon: "🚚", title: "Free shipping", desc: "On orders over $50" },
            { icon: "↩️", title: "Easy returns", desc: "30-day return window" },
            { icon: "🔒", title: "Secure checkout", desc: "End-to-end encrypted" },
          ].map(({ icon, title, desc }) => (
            <div key={title} className="flex flex-col items-center gap-1">
              <span className="text-3xl">{icon}</span>
              <p className="font-semibold text-ink">{title}</p>
              <p className="text-sm text-ink-muted">{desc}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
