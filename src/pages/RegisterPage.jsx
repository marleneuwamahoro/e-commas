import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { authApi } from "../api/auth";
import toast from "react-hot-toast";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await authApi.register({
        name: form.name,
        email: form.email,
        password: form.password,
        avatar: "https://api.lorem.space/image/face?w=150&h=150",
      });
      toast.success("Account created! Please sign in.");
      navigate("/login");
    } catch (err) {
      setError(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="card w-full max-w-sm p-8 flex flex-col gap-6">
        <h1 className="font-display text-2xl font-bold text-ink">Create account</h1>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-3 py-2">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {[
            { id: "name", label: "Full name", type: "text", placeholder: "Jane Doe" },
            { id: "email", label: "Email", type: "email", placeholder: "you@example.com" },
            { id: "password", label: "Password", type: "password", placeholder: "Min. 6 characters" },
          ].map(({ id, label, type, placeholder }) => (
            <div key={id} className="flex flex-col gap-1">
              <label htmlFor={id} className="text-xs font-medium text-ink-muted">
                {label}
              </label>
              <input
                id={id}
                type={type}
                value={form[id]}
                onChange={(e) => setForm((f) => ({ ...f, [id]: e.target.value }))}
                placeholder={placeholder}
                className="input-field"
                required
              />
            </div>
          ))}
          <button type="submit" disabled={loading} className="btn-primary w-full mt-1">
            {loading ? "Creating account…" : "Create account"}
          </button>
        </form>

        <p className="text-xs text-center text-ink-muted">
          Already have an account?{" "}
          <Link to="/login" className="text-brand-600 hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
