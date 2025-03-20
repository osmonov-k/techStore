import React from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useCart } from "../context/CartContext";

const ProductCard = ({ product, discount }) => {
  const { addToCart } = useCart();

  return (
    <div className="bg-white border p-3 rounded-lg flex flex-col shadow-sm hover:shadow-md transition-shadow duration-200 aspect-square relative">
      {/* Discount Label */}
      {discount && (
        <div className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded-full text-xs font-semibold">
          {discount}% OFF
        </div>
      )}

      <Link to={`/products/${product.asin}`} className="block flex-grow">
        {/* Square image container with fitted image */}
        <div className="w-full h-40 overflow-hidden rounded-t-lg">
          <img
            src={product.image}
            alt={product.title.slice(0, 50)}
            className="w-full h-full object-cover"
          />
        </div>
        {/* Smaller text and spacing */}
        <h3 className="text-lg font-semibold mt-2 line-clamp-2">
          {product.title}
        </h3>
        <p className="text-gray-700 text-sm">
          ${product.price}{" "}
          {discount && (
            <span className="text-gray-400 line-through">
              ${(product.price / (1 - discount / 100)).toFixed(2)}
            </span>
          )}
        </p>
        <p className="text-gray-500 text-sm">{product.category}</p>
        <div className="text-yellow-500 cursor-pointer text-sm">
          {/* Smaller star icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3 w-3 inline-block"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <span className="ml-1">{product.stars}</span>
        </div>
        <p className="mt-2 text-xs text-gray-600 line-clamp-3">
          {product.description}
        </p>
      </Link>
      {/* Smaller button */}
      <button
        onClick={() => {
          addToCart(product);
          toast.success(`${product.title} has been added to the cart!`, {
            position: "bottom-right",
            autoClose: 3000,
          });
        }}
        className="bg-[#2D3748] text-white px-3 py-1.5 mt-2 rounded cursor-pointer hover:bg-[#1E2838] active:bg-[#141C28] transition-colors duration-200 w-full text-sm"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
