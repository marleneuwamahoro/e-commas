import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function CartPage() {
  const { items, removeItem, updateQty, total, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-4 py-24 flex flex-col items-center gap-4">
        <span className="text-6xl">🛒</span>
        <h2 className="font-display text-2xl font-bold text-ink">Your cart is empty</h2>
        <p className="text-ink-muted">Add some products to get started.</p>
        <Link to="/products" className="btn-primary">
          Browse products
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display text-2xl font-bold text-ink">Your cart</h1>
        <button onClick={clearCart} className="btn-ghost text-xs text-ink-muted">
          Clear all
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Items */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="card p-4 flex gap-4 items-start"
            >
              <Link to={`/products/${item.id}`} className="flex-shrink-0">
                <img
                  src={
                    Array.isArray(item.images) ? item.images[0] : item.images
                  }
                  alt={item.title}
                  className="w-20 h-20 object-cover rounded-lg bg-surface"
                  onError={(e) => {
                    e.target.src =
                      "https://placehold.co/80x80/faf9f7/9c9690?text=?";
                  }}
                />
              </Link>

              <div className="flex-1 min-w-0">
                <Link
                  to={`/products/${item.id}`}
                  className="font-medium text-sm hover:text-brand-600 line-clamp-2 leading-snug"
                >
                  {item.title}
                </Link>
                <p className="text-xs text-ink-muted capitalize mt-0.5">
                  {item.category?.name}
                </p>
                <p className="text-sm font-semibold text-brand-600 mt-1">
                  ${Number(item.price).toFixed(2)}
                </p>
              </div>

              <div className="flex flex-col items-end gap-2">
                {/* Qty */}
                <div className="flex items-center border border-surface-border rounded-lg overflow-hidden">
                  <button
                    onClick={() => updateQty(item.id, item.qty - 1)}
                    disabled={item.qty <= 1}
                    className="px-2 py-1 text-ink-muted hover:bg-surface disabled:opacity-30 transition-colors text-sm"
                  >
                    −
                  </button>
                  <span className="w-8 text-center text-xs font-medium">
                    {item.qty}
                  </span>
                  <button
                    onClick={() => updateQty(item.id, item.qty + 1)}
                    className="px-2 py-1 text-ink-muted hover:bg-surface transition-colors text-sm"
                  >
                    +
                  </button>
                </div>
                <p className="text-sm font-semibold text-ink">
                  ${(item.price * item.qty).toFixed(2)}
                </p>
                <button
                  onClick={() => removeItem(item.id)}
                  className="text-xs text-ink-subtle hover:text-red-500 transition-colors"
                  aria-label={`Remove ${item.title}`}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="card p-6 h-fit flex flex-col gap-4 sticky top-24">
          <h2 className="font-semibold text-ink">Order summary</h2>
          <div className="flex flex-col gap-2 text-sm">
            {items.map((item) => (
              <div key={item.id} className="flex justify-between text-ink-muted">
                <span className="truncate max-w-[160px]">
                  {item.title} ×{item.qty}
                </span>
                <span>${(item.price * item.qty).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="border-t border-surface-border pt-3 flex justify-between font-semibold text-ink">
            <span>Total</span>
            <span className="text-brand-600">${total.toFixed(2)}</span>
          </div>
          <Link to="/checkout" className="btn-primary w-full text-center">
            Proceed to checkout
          </Link>
          <Link
            to="/products"
            className="text-xs text-center text-ink-muted hover:text-brand-600"
          >
            ← Continue shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
