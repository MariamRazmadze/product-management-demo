import { createFileRoute } from "@tanstack/react-router";
import Profile from "../../components/Profile/Profile";

export const Route = createFileRoute("/(authenticated)/profile")({
  component: RouteComponent,
});

function RouteComponent() {
  return <Profile />;
}
