import { proxy } from "valtio";
import type { CartState, Cart, CartProduct } from "./types/cart";
import {
  createCommonActions,
  createMessageActions,
} from "./utils/storeHelpers";
import {
  recalculateCartTotals,
  updateProductTotals,
  createInitialCart,
  findProductInCart,
} from "./utils/cartHelpers";

export const cartStore = proxy<CartState>({
  cart: null,
  isLoading: false,
  error: "",
  message: "",
});

export const CartActions = {
  setCart: (cart: Cart) => {
    cartStore.cart = cart;
  },

  ...createCommonActions(cartStore),
  ...createMessageActions(cartStore),

  addProduct: (product: CartProduct) => {
    if (!cartStore.cart) {
      cartStore.cart = createInitialCart(product);
      return;
    }

    const [existingProduct] = findProductInCart(cartStore.cart, product.id);

    if (existingProduct !== null) {
      existingProduct.quantity += product.quantity;
      updateProductTotals(existingProduct);
    } else {
      cartStore.cart.products.push(product);
      cartStore.cart.totalProducts += 1;
    }

    cartStore.cart.totalQuantity += product.quantity;
    recalculateCartTotals(cartStore.cart);
  },

  updateQuantity: (productId: number, quantity: number) => {
    if (!cartStore.cart) return;

    const [product] = findProductInCart(cartStore.cart, productId);
    if (!product) return;

    const quantityDiff = quantity - product.quantity;
    product.quantity = quantity;
    updateProductTotals(product);

    cartStore.cart.totalQuantity += quantityDiff;
    recalculateCartTotals(cartStore.cart);
  },

  removeProduct: (productId: number) => {
    if (!cartStore.cart) return;

    const [product, productIndex] = findProductInCart(
      cartStore.cart,
      productId
    );
    if (product === null) return;

    cartStore.cart.totalQuantity -= product.quantity;
    cartStore.cart.totalProducts -= 1;

    cartStore.cart.products.splice(productIndex, 1);

    recalculateCartTotals(cartStore.cart);
  },

  clearCart: () => {
    cartStore.cart = null;
  },
};
