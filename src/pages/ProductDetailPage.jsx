import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useProduct } from "../features/products/hooks";
import { useCart } from "../context/CartContext";
import Spinner from "../components/ui/Spinner";
import ErrorMessage from "../components/ui/ErrorMessage";
import toast from "react-hot-toast";

export default function ProductDetailPage() {
  const { id } = useParams();
  const { data: product, isLoading, isError, error, refetch } = useProduct(id);
  const { addItem } = useCart();
  // UI state – not from server
  const [qty, setQty] = useState(1);
  const [activeImg, setActiveImg] = useState(0);

  if (isLoading) {
    return (
      <div className="flex justify-center py-32">
        <Spinner size="lg" />
      </div>
    );
  }
  if (isError) {
    return <ErrorMessage message={error.message} retry={refetch} />;
  }

  const images = Array.isArray(product.images) ? product.images : [product.images];

  const handleAddToCart = () => {
    addItem(product, qty);
    toast.success(`${qty}× "${product.title}" added to cart`);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
      {/* Breadcrumb */}
      <nav className="text-sm text-ink-muted mb-8 flex gap-2">
        <Link to="/products" className="hover:text-brand-600">Shop</Link>
        <span>/</span>
        <span className="capitalize">{product.category?.name}</span>
        <span>/</span>
        <span className="text-ink truncate max-w-[180px]">{product.title}</span>
      </nav>

      <div className="grid md:grid-cols-2 gap-10">
        {/* Images */}
        <div className="flex flex-col gap-3">
          <div className="card aspect-square overflow-hidden bg-surface">
            <img
              src={images[activeImg]}
              alt={product.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = "https://placehold.co/600x600/faf9f7/9c9690?text=No+Image";
              }}
            />
          </div>
          {images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-1">
              {images.map((src, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                    i === activeImg
                      ? "border-brand-600"
                      : "border-surface-border hover:border-brand-300"
                  }`}
                >
                  <img
                    src={src}
                    alt=""
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = "https://placehold.co/64x64/faf9f7/9c9690";
                    }}
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex flex-col gap-5">
          <span className="badge bg-brand-100 text-brand-700 w-fit capitalize">
            {product.category?.name}
          </span>
          <h1 className="font-display text-3xl font-bold text-ink leading-tight">
            {product.title}
          </h1>
          <p className="text-2xl font-semibold text-brand-600">
            ${Number(product.price).toFixed(2)}
          </p>
          <p className="text-ink-muted text-sm leading-relaxed">{product.description}</p>

          <div className="flex items-center gap-3 pt-2">
            {/* Qty selector */}
            <div className="flex items-center border border-surface-border rounded-lg overflow-hidden">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="px-3 py-2 text-ink-muted hover:bg-surface active:bg-surface-border transition-colors"
                aria-label="Decrease quantity"
              >
                −
              </button>
              <span className="w-10 text-center text-sm font-medium">{qty}</span>
              <button
                onClick={() => setQty((q) => q + 1)}
                className="px-3 py-2 text-ink-muted hover:bg-surface active:bg-surface-border transition-colors"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
            <button onClick={handleAddToCart} className="btn-primary flex-1">
              Add to cart
            </button>
          </div>

          <div className="border-t border-surface-border pt-4 text-xs text-ink-muted space-y-1">
            <p>✓ In stock — ships in 2–4 business days</p>
            <p>✓ 30-day hassle-free returns</p>
          </div>
        </div>
      </div>
    </div>
  );
}
