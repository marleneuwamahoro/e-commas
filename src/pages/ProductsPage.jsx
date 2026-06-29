import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useProducts, useCategories } from "../features/products/hooks";
import ProductCard from "../components/ui/ProductCard";
import ProductCardSkeleton from "../components/ui/ProductCardSkeleton";
import ErrorMessage from "../components/ui/ErrorMessage";

const LIMIT = 12;

export default function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  // UI state – lives in component, NOT in query cache
  const [searchInput, setSearchInput] = useState(searchParams.get("search") || "");
  const [debouncedSearch, setDebouncedSearch] = useState(searchInput);

  const categoryId = searchParams.get("categoryId") || "";
  const page = Number(searchParams.get("page") || "1");

  // Debounce search
  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(searchInput), 400);
    return () => clearTimeout(t);
  }, [searchInput]);

  // When debounced search changes, reset to page 1
  useEffect(() => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      if (debouncedSearch) next.set("search", debouncedSearch);
      else next.delete("search");
      next.set("page", "1");
      return next;
    });
  }, [debouncedSearch]); // eslint-disable-line

  // Server state – lives entirely in TanStack Query cache
  const { data: products, isLoading, isError, error, isFetching, refetch } =
    useProducts({ search: debouncedSearch, categoryId, page, limit: LIMIT });

  const { data: categories = [] } = useCategories();

  const setCategory = (id) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      if (id) next.set("categoryId", id);
      else next.delete("categoryId");
      next.set("page", "1");
      return next;
    });
  };

  const setPage = (p) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set("page", String(p));
      return next;
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Filters row */}
      <div className="flex flex-col sm:flex-row gap-3 mb-8">
        {/* Search */}
        <div className="relative flex-1 max-w-sm">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-subtle"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z"
            />
          </svg>
          <input
            type="search"
            placeholder="Search products…"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="input-field pl-9"
          />
        </div>

        {/* Category select */}
        <select
          value={categoryId}
          onChange={(e) => setCategory(e.target.value)}
          className="input-field w-full sm:w-48"
          aria-label="Filter by category"
        >
          <option value="">All categories</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      {/* Results header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-xl font-bold text-ink">
          {categoryId
            ? categories.find((c) => String(c.id) === categoryId)?.name
            : "All products"}
        </h1>
        {isFetching && !isLoading && (
          <span className="text-xs text-ink-muted animate-pulse">Updating…</span>
        )}
      </div>

      {/* States */}
      {isError && (
        <ErrorMessage message={error.message} retry={refetch} />
      )}

      {!isError && (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {isLoading
              ? Array.from({ length: LIMIT }).map((_, i) => (
                  <ProductCardSkeleton key={i} />
                ))
              : products?.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
          </div>

          {/* Empty state */}
          {!isLoading && products?.length === 0 && (
            <div className="flex flex-col items-center py-24 gap-3">
              <span className="text-5xl">🔍</span>
              <p className="text-ink-muted">No products found. Try a different search.</p>
              <button
                onClick={() => {
                  setSearchInput("");
                  setCategory("");
                }}
                className="btn-secondary"
              >
                Clear filters
              </button>
            </div>
          )}

          {/* Pagination */}
          {!isLoading && products?.length === LIMIT && (
            <div className="flex justify-center gap-2 mt-10">
              <button
                disabled={page <= 1}
                onClick={() => setPage(page - 1)}
                className="btn-secondary"
              >
                ← Prev
              </button>
              <span className="flex items-center px-4 text-sm text-ink-muted">
                Page {page}
              </span>
              <button
                onClick={() => setPage(page + 1)}
                className="btn-secondary"
              >
                Next →
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
