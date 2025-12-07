import { z } from "zod";

export const productSchema = z.object({
  title: z
    .string({ message: "Product title is required" })
    .min(3, { message: "Product title must be at least 3 characters" })
    .max(100, { message: "Product title must be less than 100 characters" }),
  description: z
    .string({ message: "Description is required" })
    .min(10, { message: "Description must be at least 10 characters" })
    .max(500, { message: "Description must be less than 500 characters" }),
  price: z
    .number({ message: "Price must be a number" })
    .positive({ message: "Price must be greater than 0" })
    .max(1000000, { message: "Price must be less than 1,000,000" }),
  stock: z
    .number({ message: "Stock must be a number" })
    .int({ message: "Stock must be a whole number" })
    .min(0, { message: "Stock cannot be negative" })
    .max(100000, { message: "Stock must be less than 100,000" }),
  brand: z
    .string({ message: "Brand is required" })
    .min(2, { message: "Brand must be at least 2 characters" })
    .max(50, { message: "Brand must be less than 50 characters" }),
  category: z
    .string({ message: "Category is required" })
    .min(2, { message: "Category must be at least 2 characters" })
    .max(50, { message: "Category must be less than 50 characters" }),
});

export type ProductFormData = z.infer<typeof productSchema>;
