import { useParams, Link } from "react-router-dom";
import { useOrder } from "../features/orders/hooks";
import Spinner from "../components/ui/Spinner";
import ErrorMessage from "../components/ui/ErrorMessage";

export default function OrderConfirmationPage() {
  const { id } = useParams();
  const { data: order, isLoading, isError, error, refetch } = useOrder(id);

  if (isLoading) return <div className="flex justify-center py-32"><Spinner size="lg" /></div>;
  if (isError) return <ErrorMessage message={error.message} retry={refetch} />;

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-16 flex flex-col gap-8">
      {/* Confirmation header */}
      <div className="text-center flex flex-col items-center gap-3">
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center text-3xl">
          ✓
        </div>
        <h1 className="font-display text-2xl font-bold text-ink">Order confirmed!</h1>
        <p className="text-ink-muted text-sm">
          Order <span className="font-mono font-semibold text-ink">{order.id}</span> placed on{" "}
          {new Date(order.createdAt).toLocaleDateString("en-US", {
            year: "numeric", month: "long", day: "numeric",
          })}
        </p>
      </div>

      {/* Shipping */}
      <div className="card p-6">
        <h2 className="font-semibold text-ink mb-3">Shipping to</h2>
        <p className="text-sm text-ink-muted">{order.shipping.name}</p>
        <p className="text-sm text-ink-muted">{order.shipping.email}</p>
        <p className="text-sm text-ink-muted">{order.shipping.address}</p>
      </div>

      {/* Items */}
      <div className="card p-6">
        <h2 className="font-semibold text-ink mb-4">Items ordered</h2>
        <div className="flex flex-col gap-4">
          {order.items.map((item, i) => {
            const product = order.products?.[i];
            return (
              <div key={item.productId} className="flex gap-3 items-start">
                <img
                  src={
                    product
                      ? Array.isArray(product.images)
                        ? product.images[0]
                        : product.images
                      : "https://placehold.co/56x56/faf9f7/9c9690?text=?"
                  }
                  alt={product?.title}
                  className="w-14 h-14 rounded-lg object-cover bg-surface flex-shrink-0"
                  onError={(e) => { e.target.src = "https://placehold.co/56x56/faf9f7/9c9690?text=?"; }}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-ink truncate">{product?.title || `Product #${item.productId}`}</p>
                  <p className="text-xs text-ink-muted mt-0.5">Qty: {item.qty}</p>
                </div>
                <p className="text-sm font-semibold text-ink flex-shrink-0">
                  ${(item.price * item.qty).toFixed(2)}
                </p>
              </div>
            );
          })}
        </div>
        <div className="border-t border-surface-border mt-4 pt-4 flex justify-between font-semibold text-ink">
          <span>Total</span>
          <span className="text-brand-600">${Number(order.total).toFixed(2)}</span>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link to="/orders" className="btn-secondary">View all orders</Link>
        <Link to="/products" className="btn-primary">Continue shopping</Link>
      </div>
    </div>
  );
}
