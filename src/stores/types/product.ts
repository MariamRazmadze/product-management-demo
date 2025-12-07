export type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: readonly string[];
};

export type ProductsState = {
  products: Product[];
  isLoading: boolean;
  error: string;
  message: string;
};
