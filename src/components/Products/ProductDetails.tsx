import { useState } from "react";
import { useCart } from "../../hooks/useCart";
import type { Product } from "../../stores/types/product";
import CommentSection from "../Comments/CommentSection";
import Modal from "../ui/Modal";
import { useTranslation } from "../../hooks/useTranslation";

type ProductDetailsProps = {
  product: Product;
  onClose: () => void;
};

export default function ProductDetails({
  product,
  onClose,
}: ProductDetailsProps) {
  const { t } = useTranslation();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = () => {
    setIsAdding(true);
    addToCart(product, quantity);
    setTimeout(() => setIsAdding(false), 500);
  };

  const discountedPrice = product.price * (1 - product.discountPercentage / 100);

  return (
    <Modal isOpen={true} onClose={onClose} title={product.title} size="large">
      <div className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <img
              src={product.thumbnail}
              alt={product.title}
              className="w-full h-96 object-cover rounded-lg"
            />
            {product.images && product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2 mt-4">
                {product.images.slice(0, 4).map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`${product.title} ${index + 1}`}
                    className="w-full h-20 object-cover rounded cursor-pointer hover:opacity-75"
                  />
                ))}
              </div>
            )}
          </div>

          <div>
            <div className="mb-4">
              <div className="flex items-baseline gap-3 mb-2">
                <span
                  className="text-3xl font-bold text-blue-600 dark:text-purple-400"
                >
                  ${discountedPrice.toFixed(2)}
                </span>
                {product.discountPercentage > 0 && (
                  <>
                    <span
                      className="text-xl line-through text-gray-400 dark:text-gray-500"
                    >
                      ${product.price.toFixed(2)}
                    </span>
                    <span className="px-2 py-1 bg-green-600 text-white text-sm font-semibold rounded">
                      -{product.discountPercentage}%
                    </span>
                  </>
                )}
              </div>
            </div>

            <p
              className="mb-4 text-gray-700 dark:text-gray-300"
            >
              {product.description}
            </p>

            <div
              className="grid grid-cols-2 gap-4 mb-6 text-gray-700 dark:text-gray-300"
            >
              <div>
                <span className="font-semibold">{t.products?.brandLabel}</span> {product.brand}
              </div>
              <div>
                <span className="font-semibold">{t.products?.categoryLabel}</span>{" "}
                {product.category}
              </div>
              <div>
                <span className="font-semibold">{t.products?.stockLabel}</span> {product.stock}{" "}
                {t.products?.available}
              </div>
              <div>
                <span className="font-semibold">{t.products?.rating}:</span> ⭐{" "}
                {product.rating.toFixed(1)}
              </div>
            </div>

            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded-lg font-bold bg-gray-200 hover:bg-gray-300 text-gray-900 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white"
                >
                  −
                </button>
                <span
                  className="w-16 text-center font-semibold text-lg text-gray-900 dark:text-white"
                >
                  {quantity}
                </span>
                <button
                  onClick={() =>
                    setQuantity(Math.min(product.stock, quantity + 1))
                  }
                  className="w-10 h-10 rounded-lg font-bold bg-gray-200 hover:bg-gray-300 text-gray-900 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={isAdding}
                className={`flex-1 py-3 rounded-lg font-bold text-white transition-all ${
                  isAdding
                    ? "bg-green-600 dark:bg-green-700"
                    : "bg-blue-600 hover:bg-blue-700 dark:bg-purple-600 dark:hover:bg-purple-700"
                }`}
              >
                {isAdding ? t.cart?.addedToCart : t.cart?.addToCart}
              </button>
            </div>
          </div>
        </div>

        <CommentSection productId={product.id} />
      </div>
    </Modal>
  );
}
