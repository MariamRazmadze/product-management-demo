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

const initialState: CartState = {
  cart: null,
  isLoading: false,
  error: "",
  message: "",
};

export const CartStore = proxy<CartState>(initialState);

export const CartActions = {
  setCart: (cart: Cart) => {
    CartStore.cart = cart;
  },

  ...createCommonActions(CartStore),
  ...createMessageActions(CartStore),

  addProduct: (product: CartProduct) => {
    if (!CartStore.cart) {
      CartStore.cart = createInitialCart(product);
      return;
    }

    const [existingProduct] = findProductInCart(CartStore.cart, product.id);

    if (existingProduct !== null) {
      existingProduct.quantity += product.quantity;
      updateProductTotals(existingProduct);
    } else {
      CartStore.cart.products.push(product);
      CartStore.cart.totalProducts += 1;
    }

    CartStore.cart.totalQuantity += product.quantity;
    recalculateCartTotals(CartStore.cart);
  },

  updateQuantity: (productId: number, quantity: number) => {
    if (!CartStore.cart) return;

    const [product] = findProductInCart(CartStore.cart, productId);
    if (!product) return;

    const quantityDiff = quantity - product.quantity;
    product.quantity = quantity;
    updateProductTotals(product);

    CartStore.cart.totalQuantity += quantityDiff;
    recalculateCartTotals(CartStore.cart);
  },

  removeProduct: (productId: number) => {
    if (!CartStore.cart) return;

    const [product, productIndex] = findProductInCart(
      CartStore.cart,
      productId
    );
    if (product === null) return;

    CartStore.cart.totalQuantity -= product.quantity;
    CartStore.cart.totalProducts -= 1;

    CartStore.cart.products.splice(productIndex, 1);

    recalculateCartTotals(CartStore.cart);
  },

  clearCart: () => {
    CartStore.cart = null;
  },
};
