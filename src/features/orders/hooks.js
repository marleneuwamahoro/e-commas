import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ordersApi } from "../../api/orders";

export const useOrders = () =>
  useQuery({
    queryKey: ["orders"],
    queryFn: ordersApi.getOrders,
    staleTime: 0,
  });

export const useOrder = (id) =>
  useQuery({
    queryKey: ["orders", id],
    queryFn: () => ordersApi.getOrder(id),
    enabled: !!id,
  });

export const usePlaceOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ordersApi.placeOrder,
    onSuccess: () => {
      // Invalidate order list so it refetches
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });
};
