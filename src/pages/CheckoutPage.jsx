import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { usePlaceOrder } from "../features/orders/hooks";
import toast from "react-hot-toast";

const EMPTY_FORM = {
  name: "", email: "", address: "", city: "", zip: "", country: "",
  cardName: "", cardNumber: "", expiry: "", cvv: "",
};

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { items, total, clearCart } = useCart();
  // UI state – form lives in component state, not query cache
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});

  // Server mutation
  const { mutate: placeOrder, isPending } = usePlaceOrder();

  const validate = () => {
    const required = ["name", "email", "address", "city", "zip", "country"];
    const next = {};
    required.forEach((f) => {
      if (!form[f].trim()) next[f] = "Required";
    });
    if (form.email && !/\S+@\S+\.\S+/.test(form.email))
      next.email = "Invalid email";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (errors[name]) setErrors((e) => ({ ...e, [name]: undefined }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    if (items.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    const payload = {
      items: items.map((i) => ({ productId: i.id, qty: i.qty, price: i.price })),
      shipping: {
        name: form.name,
        email: form.email,
        address: `${form.address}, ${form.city} ${form.zip}, ${form.country}`,
      },
      total,
    };

    placeOrder(payload, {
      onSuccess: (order) => {
        clearCart();
        toast.success("Order placed! 🎉");
        navigate(`/orders/${order.id}`);
      },
      onError: (err) => {
        toast.error(err.message || "Checkout failed, please try again");
      },
    });
  };

  if (items.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-4 py-24 flex flex-col items-center gap-4">
        <span className="text-6xl">🛒</span>
        <p className="text-ink-muted">Nothing to check out.</p>
        <Link to="/products" className="btn-primary">Shop now</Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      <h1 className="font-display text-2xl font-bold text-ink mb-8">Checkout</h1>

      <form onSubmit={handleSubmit} noValidate>
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left – form fields */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {/* Shipping */}
            <div className="card p-6">
              <h2 className="font-semibold text-ink mb-4">Shipping details</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Full name" name="name" form={form} errors={errors} onChange={handleChange} />
                <Field label="Email" name="email" type="email" form={form} errors={errors} onChange={handleChange} />
                <div className="sm:col-span-2">
                  <Field label="Address" name="address" form={form} errors={errors} onChange={handleChange} />
                </div>
                <Field label="City" name="city" form={form} errors={errors} onChange={handleChange} />
                <Field label="ZIP / Postal code" name="zip" form={form} errors={errors} onChange={handleChange} />
                <div className="sm:col-span-2">
                  <Field label="Country" name="country" form={form} errors={errors} onChange={handleChange} />
                </div>
              </div>
            </div>

            {/* Payment */}
            <div className="card p-6">
              <h2 className="font-semibold text-ink mb-4">Payment</h2>
              <p className="text-xs text-ink-muted mb-4 bg-surface-border/30 rounded-lg px-3 py-2">
                🔒 Demo mode — no real payment is charged.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <Field label="Name on card" name="cardName" form={form} errors={errors} onChange={handleChange} />
                </div>
                <div className="sm:col-span-2">
                  <Field label="Card number" name="cardNumber" placeholder="•••• •••• •••• ••••" form={form} errors={errors} onChange={handleChange} />
                </div>
                <Field label="Expiry (MM/YY)" name="expiry" placeholder="MM/YY" form={form} errors={errors} onChange={handleChange} />
                <Field label="CVV" name="cvv" placeholder="•••" form={form} errors={errors} onChange={handleChange} />
              </div>
            </div>
          </div>

          {/* Right – summary */}
          <div className="card p-6 h-fit flex flex-col gap-4 sticky top-24">
            <h2 className="font-semibold text-ink">Your order</h2>
            <div className="flex flex-col gap-2 text-sm max-h-52 overflow-y-auto">
              {items.map((i) => (
                <div key={i.id} className="flex justify-between text-ink-muted">
                  <span className="truncate max-w-[140px]">{i.title} ×{i.qty}</span>
                  <span>${(i.price * i.qty).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-surface-border pt-3 flex justify-between font-semibold text-ink">
              <span>Total</span>
              <span className="text-brand-600">${total.toFixed(2)}</span>
            </div>
            <button
              type="submit"
              disabled={isPending}
              className="btn-primary w-full"
            >
              {isPending ? "Placing order…" : "Place order"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

function Field({ label, name, type = "text", placeholder, form, errors, onChange }) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name} className="text-xs font-medium text-ink-muted">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={form[name]}
        onChange={onChange}
        className={`input-field ${errors[name] ? "border-red-400 focus:ring-red-400" : ""}`}
        aria-describedby={errors[name] ? `${name}-err` : undefined}
        aria-invalid={!!errors[name]}
      />
      {errors[name] && (
        <p id={`${name}-err`} className="text-xs text-red-500">
          {errors[name]}
        </p>
      )}
    </div>
  );
}
