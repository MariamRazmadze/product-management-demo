import { useSnapshot } from "valtio";
import { CartStore, CartActions } from "../stores/cartStore";
import { useApi } from "./useApi";
import type { Cart, CartProduct } from "../stores/types/cart";
import type { Product } from "../stores/types/product";
import { handleAsync } from "../utils/asyncHandler";
import { AuthStore } from "../stores/authStore";
import { calculateDiscountedPrice } from "../stores/utils/cartHelpers";

export const useCart = () => {
  const api = useApi();
  const cartState = useSnapshot(CartStore);
  const { user } = useSnapshot(AuthStore);

  const fetchUserCart = async (userId: number) => {
    const result = await handleAsync(
      async () => {
        const response = await api.get<{ carts: Cart[] }>(
          `/carts/user/${userId}`
        );

        if (response.carts && response.carts.length > 0) {
          CartActions.setCart(response.carts[0]);
        }
        return true;
      },
      {
        setLoading: CartActions.setLoading,
        setError: CartActions.setError,
        errorMessage: "Failed to fetch cart",
      }
    );

    return result ?? false;
  };

  const addToCart = async (product: Product, quantity: number = 1) => {
    const result = await handleAsync(
      async () => {
        const total = product.price * quantity;
        const discountPercentage = product.discountPercentage || 0;

        const cartProduct: CartProduct = {
          id: product.id,
          title: product.title,
          price: product.price,
          quantity,
          total,
          discountPercentage,
          discountedTotal: calculateDiscountedPrice(total, discountPercentage),
          thumbnail: product.thumbnail,
        };

        try {
          if (!cartState.cart) {
            await api.post<Cart>("/carts/add", {
              userId: user?.id || 1,
              products: [
                {
                  id: product.id,
                  quantity,
                },
              ],
            });
          } else {
            const existingIndex = cartState.cart.products.findIndex(
              (p) => p.id === product.id
            );

            const updatedProducts =
              existingIndex !== -1
                ? cartState.cart.products.map((p, idx) =>
                    idx === existingIndex
                      ? { id: p.id, quantity: p.quantity + quantity }
                      : { id: p.id, quantity: p.quantity }
                  )
                : [
                    ...cartState.cart.products.map((p) => ({
                      id: p.id,
                      quantity: p.quantity,
                    })),
                    { id: product.id, quantity },
                  ];

            await api.put<Cart>(`/carts/${user?.id || 1}`, {
              merge: true,
              products: updatedProducts,
            });
          }
        } catch (error) {
          console.warn("API call failed, updating local state only:", error);
        }

        CartActions.addProduct(cartProduct);
        CartActions.setMessage("Product added to cart!");
        return true;
      },
      {
        setLoading: CartActions.setLoading,
        setError: CartActions.setError,
        errorMessage: "Failed to add product to cart",
      }
    );

    return result ?? false;
  };

  const updateQuantity = async (productId: number, quantity: number) => {
    if (quantity <= 0) {
      return removeFromCart(productId);
    }

    const result = await handleAsync(
      async () => {
        if (!cartState.cart) return false;

        const updatedProducts = cartState.cart.products.map((p) =>
          p.id === productId ? { id: p.id, quantity } : { id: p.id, quantity: p.quantity }
        );

        try {
          await api.put<Cart>(`/carts/${user?.id || 1}`, {
            merge: true,
            products: updatedProducts,
          });
        } catch (error) {
          console.warn("API call failed, updating local state only:", error);
        }

        CartActions.updateQuantity(productId, quantity);
        CartActions.setMessage("Cart updated!");
        return true;
      },
      {
        setLoading: CartActions.setLoading,
        setError: CartActions.setError,
        errorMessage: "Failed to update cart",
      }
    );

    return result ?? false;
  };

  const removeFromCart = async (productId: number) => {
    const result = await handleAsync(
      async () => {
        if (!cartState.cart) return false;

        const updatedProducts = cartState.cart.products
          .filter((p) => p.id !== productId)
          .map((p) => ({ id: p.id, quantity: p.quantity }));

        try {
          if (updatedProducts.length === 0) {
            await api.del(`/carts/${user?.id || 1}`);
          } else {
            await api.put<Cart>(`/carts/${user?.id || 1}`, {
              merge: true,
              products: updatedProducts,
            });
          }
        } catch (error) {
          console.warn("API call failed, updating local state only:", error);
        }

        if (updatedProducts.length === 0) {
          CartActions.clearCart();
        } else {
          CartActions.removeProduct(productId);
        }

        CartActions.setMessage("Product removed from cart!");
        return true;
      },
      {
        setLoading: CartActions.setLoading,
        setError: CartActions.setError,
        errorMessage: "Failed to remove product from cart",
      }
    );

    return result ?? false;
  };

  const clearCart = async () => {
    const result = await handleAsync(
      async () => {
        if (!cartState.cart) return false;

        try {
          await api.del(`/carts/${user?.id || 1}`);
        } catch (error) {
          console.warn("API call failed, updating local state only:", error);
        }

        CartActions.clearCart();
        CartActions.setMessage("Cart cleared!");
        return true;
      },
      {
        setLoading: CartActions.setLoading,
        setError: CartActions.setError,
        errorMessage: "Failed to clear cart",
      }
    );

    return result ?? false;
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
    message: cartState.message,
    fetchUserCart,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    getTotalItems,
    getCartTotal,
  };
};
