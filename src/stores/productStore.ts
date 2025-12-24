import { proxy } from "valtio";
import type { Product, ProductsState } from "./types/product";
import {
  createCommonActions,
  createMessageActions,
} from "./utils/storeHelpers";

const initialState: ProductsState = {
  products: [],
  isLoading: false,
  error: "",
  message: "",
};

export const ProductStore = proxy<ProductsState>(initialState);

export const ProductActions = {
  setProducts: (products: Product[]) => {
    ProductStore.products = products;
  },

  addProduct: (product: Product) => {
    ProductStore.products.unshift(product);
  },

  updateProduct: (id: number, updatedProduct: Product) => {
    const index = ProductStore.products.findIndex((p) => p.id === id);
    if (index !== -1) {
      ProductStore.products[index] = updatedProduct;
    }
  },

  deleteProduct: (id: number) => {
    ProductStore.products = ProductStore.products.filter((p) => p.id !== id);
  },

  ...createCommonActions(ProductStore),
  ...createMessageActions(ProductStore),
};
