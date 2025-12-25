import { createFileRoute } from "@tanstack/react-router";
import ProductDetailPage from "../../pages/products/ProductDetailPage";

export const Route = createFileRoute("/(authenticated)/products/$id")({
  component: ProductDetailPage,
});
