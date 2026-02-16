import React from "react";
import Banner from "../components/Banner";
import Categories from "../components/Categories";
import About from "../components/About";

export default function HomePage() {
  return (
    <div className="w-full">
      <Banner />
      <Categories />
      <About />
      {/* <Products /> */}
    </div>
  );
}
