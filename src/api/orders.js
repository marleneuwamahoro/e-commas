// NOTE: Platzi Fake Store API doesn't expose an orders endpoint.
// In the real E-Comus API, replace these stubs with the actual endpoints.
// We simulate order placement by persisting to localStorage, while the
// checkout POST call goes to the API for validation.
import apiClient from "./client";

const ORDERS_KEY = "ecomus_orders";

const getStoredOrders = () => {
  try {
    return JSON.parse(localStorage.getItem(ORDERS_KEY) || "[]");
  } catch {
    return [];
  }
};

const saveOrder = (order) => {
  const orders = getStoredOrders();
  orders.unshift(order);
  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
  return order;
};

export const ordersApi = {
  /**
   * POST /orders  (real E-Comus endpoint)
   * For Platzi API we simulate with a real products lookup + local persist.
   */
  placeOrder: async (orderPayload) => {
    // Validate cart items still exist on server
    const checks = await Promise.all(
      orderPayload.items.map((item) =>
        apiClient.get(`/products/${item.productId}`).then((r) => r.data)
      )
    );
    const order = {
      id: `ORD-${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: "confirmed",
      items: orderPayload.items,
      shipping: orderPayload.shipping,
      total: orderPayload.total,
      products: checks,
    };
    return saveOrder(order);
  },

  /** GET /orders  – returns local order history */
  getOrders: async () => getStoredOrders(),

  /** GET /orders/:id */
  getOrder: async (id) => {
    const orders = getStoredOrders();
    const order = orders.find((o) => o.id === id);
    if (!order) throw new Error("Order not found");
    return order;
  },
};
