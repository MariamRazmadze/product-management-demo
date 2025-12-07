import { useSnapshot } from "valtio";
import { cartStore, CartActions } from "../stores/cartStore";
import { useApi } from "./useApi";
import { API_BASE_URL } from "../config/env";
import type { Cart, CartProduct } from "../stores/types/cart";
import type { Product } from "../stores/types/product";

export const useCart = () => {
  const api = useApi();
  const cartState = useSnapshot(cartStore);

  const fetchUserCart = async (userId: number) => {
    CartActions.setLoading(true);
    CartActions.setError("");

    try {
      const response = await api.get<{ carts: Cart[] }>(
        `${API_BASE_URL}/carts/user/${userId}`
      );

      if (response.carts && response.carts.length > 0) {
        CartActions.setCart(response.carts[0]);
      }
    } catch (error) {
      CartActions.setError(
        error instanceof Error ? error.message : "Failed to fetch cart"
      );
    } finally {
      CartActions.setLoading(false);
    }
  };

  const addToCart = (product: Product, quantity: number = 1) => {
    const cartProduct: CartProduct = {
      id: product.id,
      title: product.title,
      price: product.price,
      quantity,
      total: product.price * quantity,
      discountPercentage: product.discountPercentage,
      discountedTotal:
        product.price * quantity * (1 - product.discountPercentage / 100),
      thumbnail: product.thumbnail,
    };

    CartActions.addProduct(cartProduct);
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      CartActions.removeProduct(productId);
    } else {
      CartActions.updateQuantity(productId, quantity);
    }
  };

  const removeFromCart = (productId: number) => {
    CartActions.removeProduct(productId);
  };

  const clearCart = () => {
    CartActions.clearCart();
  };

  const getTotalItems = () => {
    return cartState.cart?.totalQuantity || 0;
  };

  const getCartTotal = () => {
    return cartState.cart?.discountedTotal || 0;
  };

  return {
    cart: cartState.cart,
    isLoading: cartState.isLoading,
    error: cartState.error,
    fetchUserCart,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    getTotalItems,
    getCartTotal,
  };
};
