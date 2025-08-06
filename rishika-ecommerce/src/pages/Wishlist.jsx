import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ProductCard from "../components/ProductCard";

export default function Wishlist() {
  const user = useSelector((state) => state.auth.user);
  const reduxWishlist = useSelector((state) => state.wishlist);
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    if (user?.email) {
      // Load wishlist from localStorage for current user
      const savedWishlist =
        JSON.parse(localStorage.getItem(`wishlist_${user.email}`)) || [];
      setWishlist(savedWishlist);
    }
  }, [user]);


  useEffect(() => {
    if (user?.email) {
      setWishlist(reduxWishlist);
    }
  }, [reduxWishlist, user]);

  return (
    <div className="bg-gray-100 min-h-screen py-10">
      <h2 className="text-3xl font-bold text-center mb-8">My Wishlist</h2>
      {wishlist.length === 0 ? (
        <p className="text-center text-gray-500">Your wishlist is empty.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto px-4">
          {wishlist.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
