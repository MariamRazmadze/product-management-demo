import type { Cart, CartProduct } from "../types/cart";

export const calculateDiscountedPrice = (
  price: number,
  discountPercentage: number
): number => {
  return price * (1 - discountPercentage / 100);
};

export const recalculateCartTotals = (cart: Cart): void => {
  cart.total = cart.products.reduce((sum, p) => sum + p.total, 0);
  cart.discountedTotal = cart.products.reduce(
    (sum, p) => sum + p.discountedTotal,
    0
  );
};

export const updateProductTotals = (product: CartProduct): void => {
  product.total = product.price * product.quantity;
  product.discountedTotal = calculateDiscountedPrice(
    product.total,
    product.discountPercentage
  );
};

export const createInitialCart = (
  product: CartProduct,
  userId: number = 1
): Cart => {
  return {
    id: 1,
    products: [product],
    total: product.total,
    discountedTotal: product.discountedTotal,
    userId,
    totalProducts: 1,
    totalQuantity: product.quantity,
  };
};

export const findProductInCart = (
  cart: Cart,
  productId: number
): [CartProduct | null, number] => {
  const index = cart.products.findIndex((p) => p.id === productId);
  if (index === -1) {
    return [null, -1];
  }
  return [cart.products[index], index];
};
