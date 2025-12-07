import { useNavigate } from "@tanstack/react-router";
import { useCart } from "../../hooks/useCart";
import { ShoppingCartIcon } from "../icons/NavbarIcons";

export default function CartIcon() {
  const navigate = useNavigate();
  const { getTotalItems } = useCart();
  const itemCount = getTotalItems();

  return (
    <button
      onClick={() => navigate({ to: "/cart" })}
      className="relative p-2 rounded-xl transition-all duration-300 text-gray-700 hover:bg-gray-100/80 dark:text-gray-300 dark:hover:bg-gray-800/50"
    >
      <ShoppingCartIcon />
      {itemCount > 0 && (
        <span
          className="absolute -top-1 -right-1 w-5 h-5 rounded-full text-xs font-bold flex items-center justify-center text-white bg-blue-600 dark:bg-purple-600"
        >
          {itemCount > 99 ? "99+" : itemCount}
        </span>
      )}
    </button>
  );
}
