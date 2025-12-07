import { useSnapshot } from "valtio";
import { ProductActions, ProductStore } from "../stores/productStore";
import { useApi } from "./useApi";
import type { Product } from "../stores/types/product";
import { handleAsync } from "../utils/asyncHandler";

export const useProducts = () => {
  const productState = useSnapshot(ProductStore);
  const api = useApi();

  const fetchProducts = async (limit = 30) => {
    const result = await handleAsync(
      async () => {
        const data = await api.get<{ products: Product[] }>(
          `/products?limit=${limit}`
        );

        ProductActions.setProducts(data.products);
        return true;
      },
      {
        setLoading: ProductActions.setLoading,
        setError: ProductActions.setError,
        errorMessage: "Failed to fetch products",
      }
    );

    return result ?? false;
  };

  const addProduct = async (productData: {
    title: string;
    description: string;
    price: number;
    brand: string;
    category: string;
    stock: number;
  }) => {
    const result = await handleAsync(
      async () => {
        const newProduct = await api.post<Product>("/products/add", productData);

        ProductActions.addProduct(newProduct);
        ProductActions.setMessage("Product added successfully!");
        return true;
      },
      {
        setLoading: ProductActions.setLoading,
        setError: ProductActions.setError,
        errorMessage: "Failed to add product",
      }
    );

    return result ?? false;
  };

  const updateProduct = async (
    id: number,
    productData: {
      title: string;
      description: string;
      price: number;
      brand: string;
      category: string;
      stock: number;
    }
  ) => {
    const result = await handleAsync(
      async () => {
        const updatedProduct = await api.put<Product>(
          `/products/${id}`,
          productData
        );

        ProductActions.updateProduct(id, updatedProduct);
        ProductActions.setMessage("Product updated successfully!");
        return true;
      },
      {
        setLoading: ProductActions.setLoading,
        setError: ProductActions.setError,
        errorMessage: "Failed to update product",
      }
    );

    return result ?? false;
  };

  const deleteProduct = async (id: number) => {
    const result = await handleAsync(
      async () => {
        await api.del(`/products/${id}`);

        ProductActions.deleteProduct(id);
        ProductActions.setMessage("Product deleted successfully!");
        return true;
      },
      {
        setLoading: ProductActions.setLoading,
        setError: ProductActions.setError,
        errorMessage: "Failed to delete product",
      }
    );

    return result ?? false;
  };

  return {
    fetchProducts,
    addProduct,
    updateProduct,
    deleteProduct,
    products: productState.products,
    isLoading: productState.isLoading,
    error: productState.error,
    message: productState.message,
  };
};
