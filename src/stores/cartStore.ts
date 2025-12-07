import { proxy } from "valtio";
import type { CartState, Cart, CartProduct } from "./types/cart";

export const cartStore = proxy<CartState>({
  cart: null,
  isLoading: false,
  error: "",
});

export const CartActions = {
  setCart: (cart: Cart) => {
    cartStore.cart = cart;
  },

  setLoading: (isLoading: boolean) => {
    cartStore.isLoading = isLoading;
  },

  setError: (error: string) => {
    cartStore.error = error;
  },

  addProduct: (product: CartProduct) => {
    if (!cartStore.cart) {
      cartStore.cart = {
        id: 1,
        products: [product],
        total: product.total,
        discountedTotal: product.discountedTotal,
        userId: 1,
        totalProducts: 1,
        totalQuantity: product.quantity,
      };
      return;
    }

    const existingProductIndex = cartStore.cart.products.findIndex(
      (p) => p.id === product.id
    );

    if (existingProductIndex !== -1) {
      const existingProduct = cartStore.cart.products[existingProductIndex];
      existingProduct.quantity += product.quantity;
      existingProduct.total = existingProduct.price * existingProduct.quantity;
      existingProduct.discountedTotal =
        existingProduct.total * (1 - existingProduct.discountPercentage / 100);
    } else {
      cartStore.cart.products.push(product);
      cartStore.cart.totalProducts += 1;
    }

    cartStore.cart.totalQuantity += product.quantity;
    cartStore.cart.total = cartStore.cart.products.reduce(
      (sum, p) => sum + p.total,
      0
    );
    cartStore.cart.discountedTotal = cartStore.cart.products.reduce(
      (sum, p) => sum + p.discountedTotal,
      0
    );
  },

  updateQuantity: (productId: number, quantity: number) => {
    if (!cartStore.cart) return;

    const product = cartStore.cart.products.find((p) => p.id === productId);
    if (!product) return;

    const quantityDiff = quantity - product.quantity;
    product.quantity = quantity;
    product.total = product.price * quantity;
    product.discountedTotal =
      product.total * (1 - product.discountPercentage / 100);

    cartStore.cart.totalQuantity += quantityDiff;
    cartStore.cart.total = cartStore.cart.products.reduce(
      (sum, p) => sum + p.total,
      0
    );
    cartStore.cart.discountedTotal = cartStore.cart.products.reduce(
      (sum, p) => sum + p.discountedTotal,
      0
    );
  },

  removeProduct: (productId: number) => {
    if (!cartStore.cart) return;

    const productIndex = cartStore.cart.products.findIndex(
      (p) => p.id === productId
    );
    if (productIndex === -1) return;

    const product = cartStore.cart.products[productIndex];
    cartStore.cart.totalQuantity -= product.quantity;
    cartStore.cart.totalProducts -= 1;

    cartStore.cart.products.splice(productIndex, 1);

    cartStore.cart.total = cartStore.cart.products.reduce(
      (sum, p) => sum + p.total,
      0
    );
    cartStore.cart.discountedTotal = cartStore.cart.products.reduce(
      (sum, p) => sum + p.discountedTotal,
      0
    );
  },

  clearCart: () => {
    cartStore.cart = null;
  },
};
