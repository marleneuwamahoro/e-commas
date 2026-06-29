import { Link } from "react-router-dom";
import { useOrders } from "../features/orders/hooks";
import Spinner from "../components/ui/Spinner";
import ErrorMessage from "../components/ui/ErrorMessage";

export default function OrdersPage() {
  const { data: orders = [], isLoading, isError, error, refetch } = useOrders();

  if (isLoading) return <div className="flex justify-center py-32"><Spinner size="lg" /></div>;
  if (isError) return <ErrorMessage message={error.message} retry={refetch} />;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
      <h1 className="font-display text-2xl font-bold text-ink mb-8">Order history</h1>

      {orders.length === 0 ? (
        <div className="flex flex-col items-center py-24 gap-4">
          <span className="text-5xl">📦</span>
          <p className="text-ink-muted">You haven't placed any orders yet.</p>
          <Link to="/products" className="btn-primary">Start shopping</Link>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {orders.map((order) => (
            <Link
              key={order.id}
              to={`/orders/${order.id}`}
              className="card p-5 hover:shadow-md transition-shadow flex flex-col sm:flex-row sm:items-center gap-4"
            >
              <div className="flex-1 min-w-0">
                <p className="font-mono text-sm font-semibold text-ink">{order.id}</p>
                <p className="text-xs text-ink-muted mt-0.5">
                  {new Date(order.createdAt).toLocaleDateString("en-US", {
                    year: "numeric", month: "short", day: "numeric",
                  })}{" "}
                  · {order.items.length} item{order.items.length !== 1 ? "s" : ""}
                </p>
              </div>
              <div className="flex items-center justify-between sm:justify-end gap-6">
                <span className="badge bg-green-100 text-green-700 capitalize">
                  {order.status}
                </span>
                <span className="font-semibold text-ink">
                  ${Number(order.total).toFixed(2)}
                </span>
                <span className="text-xs text-brand-600 font-medium">View →</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
