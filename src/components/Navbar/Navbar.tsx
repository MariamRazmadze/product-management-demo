import Logo from "./Logo";
import NavLinks from "./NavLinks";
import MobileMenu from "./MobileMenu";
import LanguageToggle from "./LanguageToggle";
import ThemeToggle from "./ThemeToggle";
import UserMenu from "./UserMenu";
import CartIcon from "./CartIcon";

export default function Navbar() {
  return (
    <nav
      className="w-full z-50 backdrop-blur-xl border-b transition-all duration-300 bg-linear-to-br from-gray-50 via-blue-50 to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Logo />
          <NavLinks />
          <div className="flex items-center gap-2">
            <CartIcon />
            <LanguageToggle />
            <ThemeToggle />
            <UserMenu />
            <MobileMenu />
          </div>
        </div>
      </div>
    </nav>
  );
}
