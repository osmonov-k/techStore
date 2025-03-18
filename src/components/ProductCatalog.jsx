import React, { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import SearchBar from "./SearchBar";
import { parseCSV } from "../utils/csvParser";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const ProductCatalog = () => {
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [priceFilter, setPriceFilter] = useState("");
  const [starsFilter, setStarsFilter] = useState("");
  const [sortBy, setSortBy] = useState("");

  useEffect(() => {
    fetch("/products.csv") // Ensure CSV file is in `public/`
      .then((response) => response.text())
      .then((csvText) => {
        parseCSV(csvText, (data) => {
          setProducts(data);
          setFilteredProducts(data); // Initialize filtered products with all products
        });
      });
  }, []);

  useEffect(() => {
    let filtered = [...products]; // Create a copy of the products array

    // Search by title
    if (searchQuery) {
      filtered = filtered.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by category
    if (categoryFilter) {
      filtered = filtered.filter(
        (product) => product.category === categoryFilter
      );
    }

    // Filter by price
    if (priceFilter) {
      filtered = filtered.filter(
        (product) => parseFloat(product.price) <= parseFloat(priceFilter)
      );
    }

    // Filter by stars
    if (starsFilter) {
      filtered = filtered.filter(
        (product) => parseFloat(product.stars) >= parseFloat(starsFilter)
      );
    }

    // Sort products
    if (sortBy === "priceLowToHigh") {
      filtered.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
    } else if (sortBy === "priceHighToLow") {
      filtered.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
    } else if (sortBy === "name") {
      filtered.sort((a, b) => a.title.localeCompare(b.title));
    }

    setFilteredProducts(filtered); // Update filtered products
  }, [searchQuery, categoryFilter, priceFilter, starsFilter, sortBy, products]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleCategoryFilter = (category) => {
    setCategoryFilter(category);
  };

  const handlePriceFilter = (price) => {
    setPriceFilter(price);
  };

  const handleStarsFilter = (stars) => {
    setStarsFilter(stars);
  };

  const handleSort = (sortType) => {
    setSortBy(sortType); // Update the sortBy state
  };

  // Reset all filters
  const resetFilters = () => {
    setSearchQuery(""); // Reset search query
    setCategoryFilter(""); // Reset category filter
    setPriceFilter(""); // Reset price filter
    setStarsFilter(""); // Reset stars filter
    setSortBy(""); // Reset sorting
  };

  return (
    <div className="container mx-auto p-4">
      <SearchBar onSearch={handleSearch} />
      <div className="flex flex-wrap gap-4 mb-4">
        {" "}
        {/* Add flex-wrap and gap-4 */}
        <select
          value={categoryFilter}
          onChange={(e) => handleCategoryFilter(e.target.value)}
          className="p-2 border rounded w-full md:w-auto"
        >
          <option value="">All Categories</option>
          <option value="Headphones & Earbuds">Headphones & Earbuds</option>
          <option value="Office Electronics">Office Electronics</option>
          <option value="Computer Monitors">Computer Monitors</option>
          <option value="Wearable Technology">Wearable Technology</option>
          <option value="Computers">Computers</option>
          <option value="Computers & Tablets">Computers & Tablets</option>
          <option value="Portable Audio & Video">Portable Audio & Video</option>
          <option value="Camera & Photo">Camera & Photo</option>
          <option value="Cell Phones & Accessories">
            Cell Phones & Accessories
          </option>
        </select>
        <input
          type="number"
          placeholder="Max Price"
          value={priceFilter || ""}
          onChange={(e) => handlePriceFilter(e.target.value)}
          className="p-2 border rounded w-full md:w-auto"
        />
        <input
          type="number"
          placeholder="Min Stars"
          step="0.1"
          value={starsFilter || ""}
          onChange={(e) => handleStarsFilter(e.target.value)}
          className="p-2 border rounded w-full md:w-auto"
        />
        <select
          value={sortBy}
          onChange={(e) => handleSort(e.target.value)}
          className="p-2 border rounded w-full md:w-auto"
        >
          <option value="">Sort By</option>
          <option value="priceLowToHigh">Price: Low to High</option>
          <option value="priceHighToLow">Price: High to Low</option>
          <option value="name">Name</option>
        </select>
        <button
          onClick={resetFilters}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors duration-200 w-full md:w-auto"
        >
          Reset Filters
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filteredProducts.map((product) => (
          <div
            key={product.asin}
            className="border p-4 rounded-lg flex flex-col"
          >
            <Link to={`/products/${product.asin}`} className="block flex-grow">
              <img
                src={product.imgUrl}
                alt={product.title}
                className="w-full h-48 object-cover"
              />
              <h3 className="text-xl font-semibold mt-2 line-clamp-2">
                {" "}
                {/* Add line-clamp-2 */}
                {product.title}
              </h3>
              <p className="text-gray-700">${product.price}</p>
              <p className="text-gray-500">{product.category}</p>
              <div
                className="text-yellow-500 cursor-pointer"
                onClick={(e) => {
                  e.preventDefault(); // Prevent navigation
                  alert(`You clicked ${product.stars} stars!`); // Add your logic here
                }}
              >
                {product.stars} ★
              </div>
              <p className="mt-4 text-sm text-gray-600 line-clamp-3">
                {" "}
                {/* Truncate description */}
                {product.description}
              </p>
            </Link>
            <button
              onClick={() => {
                addToCart(product);
                console.log("Adding product to cart:", product.title);
                toast.success(`${product.title} has been added to the cart!`, {
                  position: "bottom-right",
                  autoClose: 3000,
                });
              }}
              className="bg-blue-600 text-white px-4 py-2 mt-4 rounded cursor-pointer hover:bg-blue-700 active:bg-blue-800 transition-colors duration-200 w-full"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCatalog;
