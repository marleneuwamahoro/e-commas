import { useQuery } from "@tanstack/react-query";
import { productsApi } from "../../api/products";

/** All products with search / category / pagination filters */
export const useProducts = (filters = {}) =>
  useQuery({
    queryKey: ["products", filters],
    queryFn: () => {
      const params = {
        title: filters.search || undefined,
        categoryId: filters.categoryId || undefined,
        offset: (filters.page - 1) * (filters.limit ?? 12),
        limit: filters.limit ?? 12,
      };
      return productsApi.getProducts(params);
    },
    placeholderData: (prev) => prev, // keep previous page visible while loading next
    staleTime: 1000 * 60 * 2, // 2 min
  });

/** Single product */
export const useProduct = (id) =>
  useQuery({
    queryKey: ["products", id],
    queryFn: () => productsApi.getProduct(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });

/** Category list */
export const useCategories = () =>
  useQuery({
    queryKey: ["categories"],
    queryFn: productsApi.getCategories,
    staleTime: 1000 * 60 * 10,
  });
