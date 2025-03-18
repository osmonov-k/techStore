import React from "react";
import { useCart } from "../context/CartContext";

const Checkout = () => {
  const { totalPrice } = useCart();

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Checkout</h2>
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Full Name</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            placeholder="John Doe"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            className="w-full p-2 border rounded"
            placeholder="john@example.com"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Address</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            placeholder="123 Main St"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Payment Method</label>
          <select className="w-full p-2 border rounded">
            <option value="credit">Credit Card</option>
            <option value="paypal">PayPal</option>
            <option value="cod">Cash on Delivery</option>
          </select>
        </div>
        <div className="mt-4">
          <h3 className="text-xl font-bold">Total: ${totalPrice.toFixed(2)}</h3>
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Place Order
        </button>
      </form>
    </div>
  );
};

export default Checkout;
