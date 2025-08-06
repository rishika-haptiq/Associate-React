import React from "react";
import { FaHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toggleWishlist } from "../redux/WishlistSlice";
import { addToCart } from "../redux/CartSlice";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist);
  const isInWishlist = wishlist.some((item) => item.id === product.id);

  const handleToggleWishlist = (e) => {
    e.preventDefault(); // prevent Link navigation on icon click
    dispatch(toggleWishlist(product));
    if (isInWishlist) {
      toast.info(`${product.title} removed from wishlist`);
    } else {
      toast.success(`${product.title} added to wishlist`);
    }
  };

  const handleAddToCart = (e) => {
    e.preventDefault(); // prevent Link navigation on button click
    dispatch(addToCart(product));
    toast.success(`${product.title} added to cart`);
  };

  return (
    
      <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:-translate-y-1">
        <div className="relative h-64 flex items-center justify-center bg-white">
          <img
            src={product.thumbnail || product.image_url}
            alt={product.title}
            className="max-h-full object-contain p-4"
          />
          <div
            className={`absolute top-3 right-3 text-lg cursor-pointer ${
              isInWishlist ? "text-red-500" : "text-gray-300 hover:text-red-500"
            }`}
            onClick={handleToggleWishlist}
          >
            <FaHeart />
          </div>
        </div>

        <div className="p-4 flex flex-col">
          <h3 className="text-lg font-semibold">{product.title}</h3>
          <p className="text-sm text-gray-500 mb-1">{product.brand}</p>
          <p className="text-base font-medium text-gray-800 mb-2">
            ${product.price.toFixed(2)}
          </p>
          <p className="text-sm text-gray-600 line-clamp-2 mb-4">
            {product.description}
          </p>

          <button
            onClick={handleAddToCart}
            className="mt-auto py-2 px-4 border border-pink-500 text-pink-500 font-semibold rounded-full hover:bg-pink-500 hover:text-white transition-colors duration-300"
          >
            Add To Cart
          </button>
        </div>
      </div>
  );
}
