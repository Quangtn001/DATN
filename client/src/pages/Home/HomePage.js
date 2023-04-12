import React from "react";
import NavBar from "../../components/Home/NavBar";
import Slider from "../../components/Home/Slider";
import Categories from "../../components/Home/Categories";

export const HomePage = () => {
  return (
    <>
      <NavBar />
      <div className="mt-[70px]">
        <Slider />
      </div>
      <div className="my-container mt-10">
        <Categories />
      </div>
    </>
  );
};
