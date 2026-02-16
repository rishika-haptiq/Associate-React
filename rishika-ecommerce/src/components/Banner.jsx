import React from "react";
import { Link } from "react-router-dom";

export default function Banner() {
  return (
    <div className="bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 w-full py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col-reverse md:flex-row items-center justify-between gap-8">
        {/* Left Content */}
        <div className="w-full md:w-1/2 text-center md:text-left">
          <h4 className="text-yellow-300 text-lg font-semibold mb-2">
            Buy Here 
          </h4>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
            All that you need , buy here !
          </h1>
          <p className="text-white text-base sm:text-lg mb-6 leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            <br className="hidden sm:block" />
            Rem mollitia quae neque repellendus eius delectus, facilis odio.
          </p>
          <Link
            to="/products"
            className="inline-block bg-pink-500 hover:bg-purple-500 text-white text-sm font-medium px-6 py-3 rounded-full transition duration-300"
          >
            Kharido bhai !
          </Link>
        </div>


      </div>
    </div>
  );
}
