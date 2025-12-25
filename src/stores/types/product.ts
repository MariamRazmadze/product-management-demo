export type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail?: string;
  discountPercentage?: number;
  rating?: number;
  images?: readonly string[];
};

export type ProductsState = {
  products: Product[];
  isLoading: boolean;
  error: string;
  message: string;
};
