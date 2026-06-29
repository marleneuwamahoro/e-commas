import { Link, NavLink } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";

export default function Navbar() {
  const { count } = useCart();
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-surface-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <span className="font-display text-xl font-bold text-ink">
            E<span className="text-brand-600">comus</span>
          </span>
        </Link>

        {/* Nav links */}
        <nav className="hidden sm:flex items-center gap-1">
          {[
            { to: "/products", label: "Shop" },
            { to: "/orders", label: "Orders" },
          ].map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                isActive
                  ? "btn-ghost text-brand-600 bg-brand-50"
                  : "btn-ghost"
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-2">
          {user ? (
            <div className="flex items-center gap-2">
              <span className="hidden sm:block text-sm text-ink-muted">
                Hi, {user.name?.split(" ")[0]}
              </span>
              <button onClick={logout} className="btn-ghost text-xs">
                Sign out
              </button>
            </div>
          ) : (
            <Link to="/login" className="btn-ghost text-sm">
              Sign in
            </Link>
          )}

          <Link to="/cart" className="relative btn-ghost">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.8}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.35 2.7A1 1 0 007 17h10M7 13L5.4 5M17 17a2 2 0 11-4 0 2 2 0 014 0zM9 17a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            {count > 0 && (
              <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 flex items-center justify-center rounded-full bg-brand-600 text-white text-[10px] font-bold">
                {count}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
