import React from "react";
import { ChevronDown } from "lucide-react";
import useHeaderScroll from "../hooks/useHeaderScroll";
import useParallax from "../hooks/useParallax";
import logoSuitmedia from "../assets/logoSuitmedia.png";

const Header = ({ activeMenu = "Ideas", onMenuClick }) => {
  const isVisible = useHeaderScroll();
  const scrollY = useParallax();

  const menuItems = [
    "Work",
    "About",
    "Services",
    "Ideas",
    "Careers",
    "Contact",
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
      style={{
        backgroundColor:
          scrollY > 50 ? "rgba(255, 102, 0, 0.95)" : "rgba(255, 102, 0, 1)",
        backdropFilter: scrollY > 50 ? "blur(10px)" : "none",
      }}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <img
              src={logoSuitmedia}
              alt="Suitmedia Logo"
              className="h-10 filter invert brightness-0"
            />
          </div>
          <nav className="hidden md:flex space-x-8">
            {menuItems.map((item) => (
              <button
                key={item}
                onClick={() => onMenuClick(item)}
                className={`text-white hover:text-orange-200 transition-colors relative pb-1 ${
                  activeMenu === item
                    ? "after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-white"
                    : ""
                }`}
              >
                {item}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
