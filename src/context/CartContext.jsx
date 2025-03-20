import React, { createContext, useContext, useState } from "react";

// Create a context for the cart
const CartContext = createContext();

// CartProvider component to manage and provide cart state and functions
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Add a product to the cart, or increase its quantity if already exists
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find(
        (item) => item.asin === product.asin
      );
      if (existingProduct) {
        return prevCart.map((item) =>
          item.asin === product.asin
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  // Remove a product from the cart
  const removeFromCart = (asin) => {
    setCart((prevCart) => prevCart.filter((item) => item.asin !== asin));
  };

  // Update the quantity of a specific product in the cart
  const updateQuantity = (asin, quantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.asin === asin ? { ...item, quantity: Math.max(1, quantity) } : item
      )
    );
  };

  // Calculate total price of all items in the cart
  const totalPrice = cart.reduce(
    (total, item) => total + parseFloat(item.price) * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity, totalPrice }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to access the cart context
export const useCart = () => useContext(CartContext);
