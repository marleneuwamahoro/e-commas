import apiClient from "./client";

export const productsApi = {
  /** GET /products?title=&categoryId=&price_min=&price_max=&offset=&limit= */
  getProducts: (params = {}) =>
    apiClient.get("/products", { params }).then((r) => r.data),

  /** GET /products/:id */
  getProduct: (id) =>
    apiClient.get(`/products/${id}`).then((r) => r.data),

  /** GET /categories */
  getCategories: () =>
    apiClient.get("/categories").then((r) => r.data),

  /** GET /categories/:id/products */
  getProductsByCategory: (categoryId, params = {}) =>
    apiClient
      .get(`/categories/${categoryId}/products`, { params })
      .then((r) => r.data),
};
