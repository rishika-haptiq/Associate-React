import React from "react";
import { useNavigate } from "react-router-dom";
import { GiLipstick, GiPerfumeBottle, GiSofa, GiShoppingCart } from "react-icons/gi";
import { MdSportsBasketball } from "react-icons/md";

export default function Categories() {
  const navigate = useNavigate();

  const categories = [
  { name: "beauty", icon: <GiLipstick className="text-pink-700 text-3xl" /> },
  { name: "fragrances", icon: <GiPerfumeBottle className="text-rose-700 text-3xl" /> },
  { name: "furniture", icon: <GiSofa className="text-amber-700 text-3xl" /> },
  { name: "groceries", icon: <GiShoppingCart className="text-green-700 text-3xl" /> },
];

  return (
    <div className="bg-white w-full py-12">
      <div className="container mx-auto max-w-7xl px-4 text-center">
        <h3 className="text-3xl font-bold mb-2">Categories</h3>
        <p className="text-sm mb-12 text-gray-700">
          Browse products by category
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {categories.map(({ name, icon }) => (
            <div
              key={name}
              onClick={() => navigate(`/category/${name}`)}
              className="cursor-pointer flex flex-col items-center text-center hover:scale-105 transition"
            >
              <div className="bg-gray-200 rounded-full p-6 mb-4 flex items-center justify-center w-20 h-20">
                {icon}
              </div>
              <h4 className="font-semibold text-lg mb-2 capitalize">{name}</h4>
              <p className="text-sm text-gray-600 max-w-xs">
                Discover products in {name}.
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
