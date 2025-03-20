import React from "react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, totalPrice } = useCart();

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">Shopping Cart</h2>
      {cart.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <div>
          <ul>
            {cart.map((item) => (
              <li
                key={item.asin}
                className="border border-gray-200 p-4 mb-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <span className="font-semibold text-gray-800">
                      {item.title}
                    </span>{" "}
                    - ${item.price} x {item.quantity}
                  </div>
                  <div className="flex items-center space-x-4">
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) =>
                        updateQuantity(item.asin, parseInt(e.target.value))
                      }
                      className="w-16 p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                      min="1"
                    />
                    <button
                      onClick={() => removeFromCart(item.asin)}
                      className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 active:bg-red-800 transition-colors duration-200"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-6">
            <h3 className="text-xl font-bold text-gray-800">
              Total: ${totalPrice.toFixed(2)}
            </h3>
            <Link
              to="/checkout"
              className="bg-[#2D3748] text-white px-6 py-3 mt-4 rounded-lg block text-center hover:bg-[#1E2838] active:bg-[#141C28] transition-colors duration-200"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
