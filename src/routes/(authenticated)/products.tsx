import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/(authenticated)/products")({
  component: RouteComponent,
});

function RouteComponent() {
  return <Outlet />;
}
