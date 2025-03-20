import React, { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import { parseCSV } from "../utils/csvParser";
import { Link, useLocation } from "react-router-dom";
import ProductCard from "./ProductCard";

const categories = [
  { id: 1, name: "Headphones & Earbuds" },
  { id: 2, name: "Office Electronics" },
  { id: 3, name: "Computer Monitors" },
  { id: 4, name: "Wearable Technology" },
  { id: 5, name: "Computers" },
  { id: 6, name: "Computers & Tablets" },
  { id: 7, name: "Portable Audio & Video" },
  { id: 8, name: "Camera & Photo" },
  { id: 9, name: "Cell Phones & Accessories" },
];

const ProductCatalog = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [priceFilter, setPriceFilter] = useState("");
  const [starsFilter, setStarsFilter] = useState("");
  const [sortBy, setSortBy] = useState("");

  // Get the search query and category from the URL
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get("search") || "";
  const categoryQuery = searchParams.get("category") || "";

  useEffect(() => {
    fetch("/products.csv")
      .then((response) => response.text())
      .then((csvText) => {
        parseCSV(csvText, (data) => {
          setProducts(data);
          setFilteredProducts(data); // Initialize filtered products with all products
        });
      });
  }, []);

  useEffect(() => {
    let filtered = [...products];

    // Search by title
    if (searchQuery) {
      filtered = filtered.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by category (use categoryFilter if set, otherwise use categoryQuery from URL)
    const activeCategoryFilter = categoryFilter || categoryQuery;
    if (activeCategoryFilter) {
      filtered = filtered.filter(
        (product) => product.category === activeCategoryFilter
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
  }, [
    searchQuery,
    categoryFilter,
    categoryQuery,
    priceFilter,
    starsFilter,
    sortBy,
    products,
  ]);

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
    setCategoryFilter(""); // Reset category filter
    setPriceFilter(""); // Reset price filter
    setStarsFilter(""); // Reset stars filter
    setSortBy(""); // Reset sorting
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-wrap gap-4 mb-4">
        {/* Category Filter */}
        <select
          value={categoryFilter}
          onChange={(e) => handleCategoryFilter(e.target.value)}
          className="p-2 border rounded w-full md:w-auto"
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        ;{/* Price Filter */}
        <input
          type="number"
          placeholder="Max Price"
          value={priceFilter || ""}
          onChange={(e) => handlePriceFilter(e.target.value)}
          className="p-2 border rounded w-full md:w-auto"
        />
        {/* Stars Filter */}
        <input
          type="number"
          placeholder="Min Stars"
          step="0.1"
          value={starsFilter || ""}
          onChange={(e) => handleStarsFilter(e.target.value)}
          className="p-2 border rounded w-full md:w-auto"
        />
        {/* Sort By */}
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
        {/* Reset Filters */}
        <button
          onClick={resetFilters}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors duration-200 w-full md:w-auto"
        >
          Reset Filters
        </button>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {filteredProducts.map((product) => (
          <ProductCard key={product.asin} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductCatalog;
