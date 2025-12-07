import { useCart } from "../../hooks/useCart";
import CartItem from "./CartItem";
import EmptyState from "../ui/EmptyState";
import LoadingSpinner from "../ui/LoadingSpinner";
import { useTranslation } from "../../hooks/useTranslation";
import { ShoppingCartIcon } from "../icons/NavbarIcons";

export default function CartPage() {
  const { t } = useTranslation();
  const { cart, isLoading, clearCart } = useCart();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!cart || cart.products.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <EmptyState
          icon={<ShoppingCartIcon />}
          message={t.cart?.empty || "Your cart is empty"}
        />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1
          className="text-3xl font-bold text-gray-900 dark:text-white"
        >
          {t.cart?.title || "Shopping Cart"}
        </h1>
        <button
          onClick={() => {
            if (confirm(t.cart?.clearConfirm || "Clear all items from cart?")) {
              clearCart();
            }
          }}
          className="px-4 py-2 rounded-lg text-sm font-semibold text-white bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700"
        >
          {t.cart?.clearCart || "Clear Cart"}
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {cart.products.map((product) => (
            <CartItem key={product.id} product={product} />
          ))}
        </div>

        <div>
          <div
            className="p-6 rounded-lg border sticky top-4 bg-white border-gray-200 dark:bg-gray-800 dark:border-gray-700"
          >
            <h2
              className="text-xl font-bold mb-4 text-gray-900 dark:text-white"
            >
              {t.cart?.summary || "Order Summary"}
            </h2>

            <div
              className="space-y-2 mb-4 text-gray-700 dark:text-gray-300"
            >
              <div className="flex justify-between">
                <span>{t.cart?.items || "Items"}:</span>
                <span>{cart.totalProducts}</span>
              </div>
              <div className="flex justify-between">
                <span>{t.cart?.quantity || "Quantity"}:</span>
                <span>{cart.totalQuantity}</span>
              </div>
              <div className="flex justify-between">
                <span>{t.cart?.subtotal || "Subtotal"}:</span>
                <span>${cart.total.toFixed(2)}</span>
              </div>
              {cart.total !== cart.discountedTotal && (
                <div className="flex justify-between text-green-600">
                  <span>{t.cart?.savings || "Savings"}:</span>
                  <span>
                    -${(cart.total - cart.discountedTotal).toFixed(2)}
                  </span>
                </div>
              )}
            </div>

            <div
              className="border-t pt-4 mb-4 border-gray-200 dark:border-gray-700"
            >
              <div className="flex justify-between text-xl font-bold">
                <span
                  className="text-gray-900 dark:text-white"
                >
                  {t.cart?.total || "Total"}:
                </span>
                <span
                  className="text-blue-600 dark:text-purple-400"
                >
                  ${cart.discountedTotal.toFixed(2)}
                </span>
              </div>
            </div>

            <button
              className="w-full py-3 rounded-lg font-bold text-white transition-colors bg-blue-600 hover:bg-blue-700 dark:bg-purple-600 dark:hover:bg-purple-700"
            >
              {t.cart?.checkout || "Proceed to Checkout"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
