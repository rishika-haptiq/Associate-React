import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ProductCard from "./ProductCard";

function SearchResults() {
  const location = useLocation();
  const query =
    new URLSearchParams(location.search).get("q")?.toLowerCase() || "";

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => {
        console.log("Loaded products:", data);
        setProducts(data.products); // Corrected key
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load products:", err);
        setLoading(false);
      });
  }, []);

  const filteredProducts = products.filter((product) => {
    return (
      (product.title?.toLowerCase() || "").includes(query) ||
      (product.description?.toLowerCase() || "").includes(query) ||
      (product.brand?.toLowerCase() || "").includes(query) ||
      (product.category?.toLowerCase() || "").includes(query)
    );
  });

  if (loading) return <p className="p-10">Loading products...</p>;

  return (
    <div className="p-10">
      <h2 className="text-xl font-semibold mb-6">
        Search Results for: <span className="text-teal-600">{query}</span>
      </h2>

      {filteredProducts.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchResults;
