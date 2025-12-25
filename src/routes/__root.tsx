import { Outlet, createRootRoute } from "@tanstack/react-router";
import Navbar from "../components/common/navbar/Navbar";

export const Route = createRootRoute({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </>
  );
}
