import { useState, useEffect } from "react";
import { useNavigate, useParams } from "@tanstack/react-router";
import { useProducts } from "../../hooks/useProducts";
import { useCart } from "../../hooks/useCart";
import { useTranslation } from "../../hooks/useTranslation";
import type { Product } from "../../stores/types/product";
import CommentSection from "../../components/features/comments/CommentSection";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import AlertMessage from "../../components/ui/AlertMessage";

export default function ProductDetailPage() {
  const params = useParams({ from: "/(authenticated)/products/$id" });
  const id = params.id;
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { fetchProduct } = useProducts();
  const { addToCart } = useCart();

  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    const loadProduct = async () => {
      if (!id) {
        setError("Product ID is missing");
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError("");

      const productData = await fetchProduct(Number(id));

      if (productData) {
        setProduct(productData);
      } else {
        setError("Product not found");
      }

      setIsLoading(false);
    };

    loadProduct();
  }, [id]);

  const handleAddToCart = async () => {
    if (!product) return;

    setIsAdding(true);
    await addToCart(product, quantity);
    setTimeout(() => setIsAdding(false), 500);
  };

  const handleGoBack = () => {
    navigate({ to: "/products" });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center transition-colors duration-300 bg-linear-to-br from-gray-50 via-blue-50 to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <LoadingSpinner />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen transition-colors duration-300 bg-linear-to-br from-gray-50 via-blue-50 to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <button
            onClick={handleGoBack}
            className="mb-4 px-4 py-2 rounded-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 dark:bg-purple-600 dark:hover:bg-purple-700"
          >
            ← {t.common?.back || "Back to Products"}
          </button>
          <AlertMessage error={error || "Product not found"} />
        </div>
      </div>
    );
  }

  const discountPercentage = product.discountPercentage ?? 0;
  const rating = product.rating ?? 0;
  const images = product.images ?? [];
  const discountedPrice = product.price * (1 - discountPercentage / 100);

  return (
    <div className="min-h-screen transition-colors duration-300 bg-linear-to-br from-gray-50 via-blue-50 to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <button
          onClick={handleGoBack}
          className="mb-6 px-4 py-2 rounded-lg font-semibold transition-colors text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
        >
          ← {t.common?.back || "Back to Products"}
        </button>

        <div className="rounded-2xl backdrop-blur-xl border transition-all duration-300 overflow-hidden bg-white/80 border-gray-200/50 shadow-xl shadow-blue-500/10 dark:bg-gray-800/50 dark:border-gray-700/50 dark:shadow-purple-500/10">
          <div className="p-8">
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              {/* Product Images */}
              <div>
                {product.thumbnail ? (
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="w-full h-96 object-cover rounded-lg mb-4"
                  />
                ) : (
                  <div className="w-full h-96 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center text-gray-400 mb-4">
                    No Image Available
                  </div>
                )}
                {images.length > 1 && (
                  <div className="grid grid-cols-4 gap-2">
                    {images.slice(0, 4).map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`${product.title} ${index + 1}`}
                        className="w-full h-20 object-cover rounded cursor-pointer hover:opacity-75 transition-opacity"
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div>
                <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
                  {product.title}
                </h1>

                <div className="mb-6">
                  <div className="flex items-baseline gap-3 mb-2">
                    <span className="text-4xl font-bold text-blue-600 dark:text-purple-400">
                      ${discountedPrice.toFixed(2)}
                    </span>
                    {discountPercentage > 0 && (
                      <>
                        <span className="text-2xl line-through text-gray-400 dark:text-gray-500">
                          ${product.price.toFixed(2)}
                        </span>
                        <span className="px-3 py-1 bg-green-600 text-white text-sm font-semibold rounded">
                          -{discountPercentage}%
                        </span>
                      </>
                    )}
                  </div>
                </div>

                <p className="text-lg mb-6 text-gray-700 dark:text-gray-300">
                  {product.description}
                </p>

                <div className="grid grid-cols-2 gap-4 mb-8 text-gray-700 dark:text-gray-300">
                  <div>
                    <span className="font-semibold">
                      {t.products?.brandLabel || "Brand"}:
                    </span>{" "}
                    {product.brand}
                  </div>
                  <div>
                    <span className="font-semibold">
                      {t.products?.categoryLabel || "Category"}:
                    </span>{" "}
                    {product.category}
                  </div>
                  <div>
                    <span className="font-semibold">
                      {t.products?.stockLabel || "Stock"}:
                    </span>{" "}
                    {product.stock} {t.products?.available || "available"}
                  </div>
                  <div>
                    <span className="font-semibold">
                      {t.products?.rating || "Rating"}:
                    </span>{" "}
                    ⭐ {rating.toFixed(1)}
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="w-12 h-12 rounded-lg font-bold bg-gray-200 hover:bg-gray-300 text-gray-900 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white transition-colors"
                      >
                        −
                      </button>
                      <span className="w-20 text-center font-semibold text-xl text-gray-900 dark:text-white">
                        {quantity}
                      </span>
                      <button
                        onClick={() =>
                          setQuantity(Math.min(product.stock, quantity + 1))
                        }
                        className="w-12 h-12 rounded-lg font-bold bg-gray-200 hover:bg-gray-300 text-gray-900 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white transition-colors"
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={handleAddToCart}
                      disabled={isAdding}
                      className={`flex-1 py-4 rounded-lg font-bold text-white transition-all ${
                        isAdding
                          ? "bg-green-600 dark:bg-green-700"
                          : "bg-blue-600 hover:bg-blue-700 dark:bg-purple-600 dark:hover:bg-purple-700"
                      }`}
                    >
                      {isAdding
                        ? t.cart?.addedToCart || "Added to Cart!"
                        : t.cart?.addToCart || "Add to Cart"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="border-t pt-8 border-gray-200 dark:border-gray-700">
              <CommentSection productId={product.id} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
