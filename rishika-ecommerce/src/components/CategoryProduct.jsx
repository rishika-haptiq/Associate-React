import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "./ProductCard"; // Make sure the file name matches!

export default function CategoryProduct() {
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("https://dummyjson.com/products") // Updated path if you're using product data now
      .then((res) => res.json())
      .then((data) => {
        const filtered = data.products.filter(
          (product) => product.category.toLowerCase() === categoryName.toLowerCase()
        );
        setProducts(filtered);
      })
      .catch((error) => console.error("Error fetching product data:", error));
  }, [categoryName]);

  return (
    <div className="bg-gray-100 min-h-screen py-10">
      <h2 className="text-3xl font-bold text-center mb-8 capitalize">
        Products in "{categoryName}"
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto px-4">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No products found in this category.
          </p>
        )}
      </div>
    </div>
  );
}
