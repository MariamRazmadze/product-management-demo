import { createFileRoute } from "@tanstack/react-router";
import ProductsPage from "../../pages/products/ProductsPage";

export const Route = createFileRoute("/(authenticated)/products/")({
  component: ProductsPage,
});
