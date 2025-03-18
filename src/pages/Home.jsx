import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { parseCSV } from "../utils/csvParser";
const categories = [
  {
    id: 2,
    name: "Headphones & Earbuds",
    imgUrl: "https://m.media-amazon.com/images/I/710BGOaevDL._AC_UL320_.jpg",
  },
  {
    id: 3,
    name: "Office Electronics",
    imgUrl: "https://m.media-amazon.com/images/I/41ORK2Ly23L._AC_UL320_.jpg",
  },
  {
    id: 4,
    name: "Computer Monitors",
    imgUrl: "https://m.media-amazon.com/images/I/610m-1SiYUL._AC_UL320_.jpg",
  },
  {
    id: 5,
    name: "Wearable Technology",
    imgUrl: "https://m.media-amazon.com/images/I/714ga6RSF3L._AC_UL320_.jpg",
  },
  {
    id: 6,
    name: "Computers",
    imgUrl: "https://m.media-amazon.com/images/I/71FroRZTePL._AC_UL320_.jpg",
  },
  {
    id: 7,
    name: "Computers & Tablets",
    imgUrl: "https://m.media-amazon.com/images/I/717CFJ+IFFL._AC_UL320_.jpg",
  },
  {
    id: 7,
    name: "Portable Audio & Video",
    imgUrl: "https://m.media-amazon.com/images/I/51MFP88NpML._AC_UL320_.jpg",
  },
  {
    id: 7,
    name: "Camera & Photo",
    imgUrl: "https://m.media-amazon.com/images/I/7135WIHTxXL._AC_UL320_.jpg",
  },
  {
    id: 7,
    name: "Cell Phones & Accessories",
    imgUrl: "https://m.media-amazon.com/images/I/61sKOoYuOyL._AC_UL320_.jpg",
  },
];
const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch products from CSV
    fetch("/products.csv")
      .then((response) => response.text())
      .then((csvText) => {
        parseCSV(csvText, (data) => {
          setProducts(data);
        });
      });
  }, []);

  // Filter high-priced products with discounts
  const highPricedProducts = products
    .filter((product) => parseFloat(product.price) > 500) // Adjust the price threshold as needed
    .slice(0, 4); // Limit to 4 products

  // Category scroll functionality
  const scrollCategories = (direction) => {
    const container = document.getElementById("category-container");
    if (container) {
      const scrollAmount = direction === "left" ? -200 : 200;
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div className="container mx-auto p-4">
      {/* High-Priced Products & Discounts Section */}
      <div className="bg-gray-100 p-6 rounded-lg mb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Side: Promotional Message */}
          <div className="md:col-span-1 bg-blue-600 text-white p-6 rounded-lg flex flex-col justify-center">
            <h2 className="text-3xl font-bold mb-4">Big Savings End Friday!</h2>
            <p className="text-xl mb-8">
              Don't miss out on our exclusive deals. Shop now and save big!
            </p>
            <Link
              to="/products"
              className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-blue-50 transition-colors duration-200 text-center"
            >
              Shop Now
            </Link>
          </div>

          {/* Right Side: High-Priced Products Grid */}
          <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
            {highPricedProducts.map((product) => (
              <div
                key={product.asin}
                className="bg-white p-4 rounded-lg shadow-md"
              >
                <img
                  src={product.imgUrl}
                  alt={product.title}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <h3 className="text-xl font-semibold mt-4 line-clamp-2">
                  {product.title}
                </h3>
                <p className="text-gray-700">${product.price}</p>
                <p className="text-red-600 font-semibold">20% OFF</p>{" "}
                {/* Adjust discount as needed */}
                <button className="bg-blue-600 text-white px-4 py-2 mt-4 rounded w-full hover:bg-blue-700 transition-colors duration-200">
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Shop by Category Section */}
      <div className="my-12">
        <h2 className="text-3xl font-bold text-center mb-8">
          Shop by Category
        </h2>
        <div className="relative">
          {/* Left Arrow Button */}
          <button
            onClick={() => scrollCategories("left")}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md z-10"
          >
            &larr;
          </button>

          {/* Categories Container */}
          {/* Categories Container */}
          <div
            id="category-container"
            className="flex overflow-x-auto scroll-smooth space-x-4 p-4"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {categories.map((category) => (
              <Link
                to={`/products?category=${category.name}`}
                key={category.id}
                className="flex-shrink-0 w-48 text-center" // Center align content
              >
                {/* Image Container */}
                <div className="relative overflow-hidden rounded-full shadow-md hover:shadow-lg transition-shadow duration-200">
                  <img
                    src={category.imgUrl}
                    alt={category.name}
                    className="w-48 h-48 object-cover rounded-full" // Make the image round
                  />
                </div>
                {/* Category Name */}
                <h3 className="mt-4 text-xl font-bold text-gray-800">
                  {category.name}
                </h3>
              </Link>
            ))}
          </div>

          {/* Right Arrow Button */}
          <button
            onClick={() => scrollCategories("right")}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md z-10"
          >
            &rarr;
          </button>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="my-12 bg-gray-100 py-12 px-6">
        <h2 className="text-3xl font-bold text-center mb-8">
          What Our Customers Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((item) => (
            <div key={item} className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-gray-700 italic">
                "This is the best e-commerce store I've ever used. The products
                are high quality, and the delivery is fast!"
              </p>
              <p className="mt-4 font-semibold">- Customer {item}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Call-to-Action Section */}
      <div className="bg-blue-600 text-white py-12 px-6 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Explore?</h2>
        <p className="text-xl mb-8">
          Sign up now and get 10% off your first order!
        </p>
        <Link
          to="/signup"
          className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-blue-50 transition-colors duration-200"
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default Home;
