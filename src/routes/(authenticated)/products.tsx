import { createFileRoute } from "@tanstack/react-router";
import ProductList from "../../components/Products/ProductsList";

export const Route = createFileRoute("/(authenticated)/products")({
  component: RouteComponent,
});

function RouteComponent() {
  return <ProductList />;
}
