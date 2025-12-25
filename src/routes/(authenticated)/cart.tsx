import { createFileRoute } from "@tanstack/react-router";
import CartPage from "../../pages/cart/CartPage";

export const Route = createFileRoute("/(authenticated)/cart")({
  component: RouteComponent,
});

function RouteComponent() {
  return <CartPage />;
}
