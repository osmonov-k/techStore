import React from "react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, totalPrice } = useCart();

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          <ul>
            {cart.map((item) => (
              <li
                key={item.asin}
                className="border p-4 mb-2 flex justify-between items-center"
              >
                <div>
                  <span className="font-semibold">{item.title}</span> - $
                  {item.price} x {item.quantity}
                </div>
                <div>
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) =>
                      updateQuantity(item.asin, parseInt(e.target.value))
                    }
                    className="w-16 p-1 border rounded"
                    min="1"
                  />
                  <button
                    onClick={() => removeFromCart(item.asin)}
                    className="bg-red-600 text-white px-4 py-2 ml-2 rounded"
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-4">
            <h3 className="text-xl font-bold">
              Total: ${totalPrice.toFixed(2)}
            </h3>
            <Link
              to="/checkout"
              className="bg-blue-600 text-white px-4 py-2 mt-2 rounded block text-center"
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
