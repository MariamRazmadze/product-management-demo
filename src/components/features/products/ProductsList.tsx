import { useSnapshot } from "valtio";
import { useState, useEffect } from "react";
import { ProductStore, ProductActions } from "../../../stores/productStore";
import { useProducts } from "../../../hooks/useProducts";
import ProductCard from "./ProductCard";
import ProductModal from "./ProductModal";
import Button from "../../ui/Button";
import AlertMessage from "../../ui/AlertMessage";
import LoadingSpinner from "../../ui/LoadingSpinner";
import EmptyState from "../../ui/EmptyState";
import type { Product } from "../../../stores/types/product";
import { useTranslation } from "../../../hooks/useTranslation";

export default function ProductList() {
  const { t } = useTranslation();
  const { fetchProducts } = useProducts();
  const productState = useSnapshot(ProductStore);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    fetchProducts();

    return () => {
      ProductActions.clearMessages();
    };
  }, []);

  const handleAddProduct = () => {
    setSelectedProduct(null);
    setIsModalOpen(true);
  };

  const handleEditProduct = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
    ProductActions.clearMessages();
  };

  return (
    <div
      className="min-h-screen transition-colors duration-300 bg-linear-to-br from-gray-50 via-blue-50 to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"
    >
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1
              className="text-3xl pb-2 font-bold transition-colors text-gray-900 dark:bg-linear-to-r dark:from-purple-400 dark:to-pink-400 dark:bg-clip-text dark:text-transparent"
            >
              {t.products.products}
            </h1>
            <p
              className="mt-1 text-sm transition-colors text-gray-600 dark:text-gray-400"
            >
              {t.products.manageProducts}
            </p>
          </div>
          <Button variant="success" size="default" onClick={handleAddProduct}>
            + {t.products.addProduct}
          </Button>
        </div>
        <AlertMessage message={productState.message} />
        <AlertMessage error={productState.error} />
        {productState.isLoading && productState.products.length === 0 ? (
          <LoadingSpinner centered />
        ) : (
          <>
            {productState.products.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {productState.products.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onEdit={handleEditProduct}
                  />
                ))}
              </div>
            ) : (
              <EmptyState message="No products found. Add your first product!" />
            )}
          </>
        )}
      </div>
      {isModalOpen && (
        <ProductModal product={selectedProduct} onClose={handleCloseModal} />
      )}
    </div>
  );
}
