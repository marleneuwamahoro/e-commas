import { Outlet } from "react-router-dom";
import Navbar from "./ui/Navbar";

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <footer className="border-t border-surface-border bg-white mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-ink-muted">
          <span className="font-display font-semibold text-sm text-ink">
            E<span className="text-brand-600">comus</span>
          </span>
          <span>© {new Date().getFullYear()} Ecomus Store. Demo project.</span>
        </div>
      </footer>
    </div>
  );
}
