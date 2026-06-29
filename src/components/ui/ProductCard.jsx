import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import toast from "react-hot-toast";

export default function ProductCard({ product }) {
  const { addItem } = useCart();

  const handleAdd = (e) => {
    e.preventDefault();
    addItem(product, 1);
    toast.success(`"${product.title}" added to cart`);
  };

  return (
    <Link
      to={`/products/${product.id}`}
      className="card group flex flex-col hover:shadow-md transition-shadow"
    >
      <div className="relative overflow-hidden bg-surface aspect-square">
        <img
          src={
            Array.isArray(product.images)
              ? product.images[0]
              : product.images || "/placeholder.jpg"
          }
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            e.target.src =
              "https://placehold.co/400x400/faf9f7/9c9690?text=No+Image";
          }}
        />
        <span className="badge absolute top-2 left-2 bg-brand-100 text-brand-700">
          {product.category?.name}
        </span>
      </div>

      <div className="flex flex-col flex-1 p-4 gap-2">
        <h3 className="text-sm font-medium text-ink line-clamp-2 leading-snug">
          {product.title}
        </h3>
        <p className="text-xs text-ink-muted line-clamp-2">{product.description}</p>
        <div className="mt-auto flex items-center justify-between pt-3 border-t border-surface-border">
          <span className="text-base font-semibold text-ink">
            ${Number(product.price).toFixed(2)}
          </span>
          <button
            onClick={handleAdd}
            className="btn-primary text-xs px-3 py-1.5"
            aria-label={`Add ${product.title} to cart`}
          >
            Add to cart
          </button>
        </div>
      </div>
    </Link>
  );
}
