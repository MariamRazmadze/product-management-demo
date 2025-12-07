import { useCart } from "../../hooks/useCart";
import type { CartProduct } from "../../stores/types/cart";
import { useTranslation } from "../../hooks/useTranslation";

type CartItemProps = {
  product: CartProduct;
};

export default function CartItem({ product }: CartItemProps) {
  const { t } = useTranslation();
  const { updateQuantity, removeFromCart } = useCart();

  return (
    <div
      className="flex gap-4 p-4 rounded-lg border bg-white border-gray-200 dark:bg-gray-800 dark:border-gray-700"
    >
      <img
        src={product.thumbnail}
        alt={product.title}
        className="w-24 h-24 object-cover rounded-lg"
      />

      <div className="flex-1">
        <h3
          className="font-semibold mb-1 text-gray-900 dark:text-white"
        >
          {product.title}
        </h3>

        <div
          className="text-sm mb-2 text-gray-600 dark:text-gray-400"
        >
          <div>
            {t.cart?.price || "Price"}: ${product.price.toFixed(2)}
          </div>
          {product.discountPercentage > 0 && (
            <div className="text-green-600">
              {t.cart?.discount || "Discount"}: {product.discountPercentage}%
            </div>
          )}
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => updateQuantity(product.id, product.quantity - 1)}
              className="w-8 h-8 rounded-lg font-bold bg-gray-200 hover:bg-gray-300 text-gray-900 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white"
            >
              −
            </button>
            <span
              className="w-12 text-center font-semibold text-gray-900 dark:text-white"
            >
              {product.quantity}
            </span>
            <button
              onClick={() => updateQuantity(product.id, product.quantity + 1)}
              className="w-8 h-8 rounded-lg font-bold bg-gray-200 hover:bg-gray-300 text-gray-900 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white"
            >
              +
            </button>
          </div>

          <button
            onClick={() => removeFromCart(product.id)}
            className="px-3 py-1 rounded-lg text-sm font-semibold text-white bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700"
          >
            {t.cart?.remove || "Remove"}
          </button>
        </div>
      </div>

      <div
        className="text-right text-gray-900 dark:text-white"
      >
        <div className="font-semibold text-lg">
          ${product.discountedTotal.toFixed(2)}
        </div>
        {product.discountPercentage > 0 && (
          <div
            className="text-sm line-through text-gray-400 dark:text-gray-500"
          >
            ${product.total.toFixed(2)}
          </div>
        )}
      </div>
    </div>
  );
}
