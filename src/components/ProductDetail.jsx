import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import Papa from "papaparse";
import "react-toastify/dist/ReactToastify.css";

const ProductDetail = () => {
  const { asin } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch("/products.csv")
      .then((response) => response.text())
      .then((csvText) => {
        const products = Papa.parse(csvText, { header: true }).data;
        const foundProduct = products.find((p) => p.asin === asin);
        setProduct(foundProduct);
      });
  }, [asin]);

  if (!product) {
    return <div>Product not found.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <img
          src={product.imgUrl}
          alt={product.title}
          className="w-full h-96 object-cover"
        />
        <div>
          <h2 className="text-2xl font-bold">{product.title}</h2>
          <p className="text-gray-700">${product.price}</p>
          <p className="text-gray-500">{product.category}</p>
          <p className="text-yellow-500">{product.stars} ★</p>
          <p className="mt-4">{product.description}</p>
          <button
            onClick={() => {
              addToCart(product);
              toast.success(`${product.title} has been added to the cart!`, {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
              });
            }}
            className="bg-blue-600 text-white px-4 py-2 mt-2 rounded cursor-pointer hover:bg-blue-700 active:bg-blue-800 transition-colors duration-200"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
