import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import SearchBar from "./SearchBar";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { cart } = useCart();
  const navigate = useNavigate();

  const handleSearch = (query) => {
    // Navigate to the ProductCatalog page with the search query as a URL parameter
    navigate(`/products?search=${encodeURIComponent(query)}`);
  };

  return (
    <header className="bg-[#2D3748] text-white shadow-lg">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Left Side: Logo and Hamburger Menu */}
        <div className="flex items-center space-x-4">
          {/* Logo */}
          <Link to="/" className="text-xl font-bold">
            Kanat's Tech
          </Link>

          {/* Hamburger Menu for Mobile */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden focus:outline-none"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>

          {/* Dropdown Menu (Support and Deals) */}
          <div className="relative hidden md:block">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center space-x-2 focus:outline-none"
            >
              <span className="text-lg">Menu</span>
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {/* Dropdown Content */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg">
                <ul className="py-2">
                  <li>
                    <Link
                      to="/support"
                      className="block px-4 py-2 hover:bg-[#4A5568] hover:text-white"
                    >
                      Support
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/deals"
                      className="block px-4 py-2 hover:bg-[#4A5568] hover:text-white"
                    >
                      Deals
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Middle: Search Bar */}
        <div className="flex-grow mx-4">
          <SearchBar onSearch={handleSearch} />
        </div>

        {/* Right Side: Account, Cart, Language Switch */}
        <div className="flex items-center space-x-4">
          {/* Account Icon */}
          <Link to="/account">
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </Link>

          {/* Cart Icon */}
          <Link to="/cart" className="flex items-center space-x-2">
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <span className="text-sm">({cart.length})</span>
          </Link>

          {/* Language Switch */}
          <select className="p-1 bg-transparent border border-white rounded">
            <option value="en">EN</option>
            <option value="fr">FR</option>
            <option value="es">ES</option>
          </select>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white text-black p-4">
          <ul className="space-y-2">
            <li>
              <Link to="/products" className="block py-2 hover:bg-[#4A5568]">
                Products
              </Link>
            </li>
            <li>
              <Link to="/account" className="block py-2 hover:bg-[#4A5568]">
                Account
              </Link>
            </li>
            <li>
              <Link to="/support" className="block py-2 hover:bg-[#4A5568]">
                Support
              </Link>
            </li>
            <li>
              <Link to="/deals" className="block py-2 hover:bg-[#4A5568]">
                Deals
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;
