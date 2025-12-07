import { useState } from "react";
import { useProducts } from "../../hooks/useProducts";
import { useCart } from "../../hooks/useCart";
import Button from "../ui/Button";
import ProductDetails from "./ProductDetails";
import type { Product } from "../../stores/types/product";
import { useTranslation } from "../../hooks/useTranslation";

type ProductCardProps = {
  product: Product;
  onEdit: (product: Product) => void;
};

export default function ProductCard({ product, onEdit }: ProductCardProps) {
  const { t } = useTranslation();
  const { deleteProduct } = useProducts();
  const { addToCart } = useCart();
  const [isDeleting, setIsDeleting] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const handleDelete = async () => {
    const confirmMessage = t.products?.deleteConfirm?.replace("{0}", product.title) ||
      `Are you sure you want to delete "${product.title}"?`;
    if (confirm(confirmMessage)) {
      setIsDeleting(true);
      await deleteProduct(product.id);
      setIsDeleting(false);
    }
  };

  const handleAddToCart = () => {
    setIsAdding(true);
    addToCart(product, 1);
    setTimeout(() => setIsAdding(false), 500);
  };

  return (
    <>
      {showDetails && (
        <ProductDetails product={product} onClose={() => setShowDetails(false)} />
      )}
      <div
        className="rounded-2xl backdrop-blur-xl border transition-all duration-300 overflow-hidden hover:scale-105 bg-white/80 border-gray-200/50 shadow-xl shadow-blue-500/10 dark:bg-gray-800/50 dark:border-gray-700/50 dark:shadow-purple-500/10"
      >
      <div
        className="relative h-48 bg-gray-200 dark:bg-gray-700 cursor-pointer"
        onClick={() => setShowDetails(true)}
      >
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-full object-cover"
        />
        <div
          className="absolute top-2 right-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/90 text-white dark:bg-purple-500/90"
        >
          ${product.price}
        </div>
      </div>
      <div className="p-4">
        <h3
          className="text-lg font-semibold mb-2 line-clamp-1 transition-colors text-gray-900 dark:text-gray-100"
        >
          {product.title}
        </h3>
        <p
          className="text-sm mb-3 line-clamp-2 transition-colors text-gray-600 dark:text-gray-400"
        >
          {product.description}
        </p>
        <div className="flex items-center justify-between mb-4 text-xs">
          <span
            className="px-2 py-1 rounded bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
          >
            {product.brand}
          </span>
          <span
            className="text-gray-600 dark:text-gray-400"
          >
            {t.products?.stockLabel} {product.stock}
          </span>
        </div>
        <div className="space-y-2">
          <button
            onClick={handleAddToCart}
            disabled={isAdding}
            className={`w-full py-2 rounded-lg font-semibold transition-all text-white ${
              isAdding
                ? "bg-green-600 dark:bg-green-700"
                : "bg-blue-600 hover:bg-blue-700 dark:bg-purple-600 dark:hover:bg-purple-700"
            }`}
          >
            {isAdding ? t.cart?.added : t.cart?.addToCart}
          </button>
          <div className="flex gap-2">
            <Button
              variant="success"
              size="sm"
              onClick={() => onEdit(product)}
              className="flex-1"
            >
              {t.common?.edit}
            </Button>
            <Button
              variant="danger"
              size="sm"
              onClick={handleDelete}
              disabled={isDeleting}
              className="flex-1"
            >
              {isDeleting ? t.common?.loading : t.common?.delete}
            </Button>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
