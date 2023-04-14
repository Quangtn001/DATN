import React from "react";
import NavBar from "../../components/Home/NavBar";
import Slider from "../../components/Home/Slider";
import Categories from "../../components/Home/Categories";
import { useRandomCategoriesQuery } from "../../store/services/categoryService";
import HomeProduct from "../../components/Home/HomeProduct";
export const HomePage = () => {
  const { data, isFetching } = useRandomCategoriesQuery();
  return (
    <>
      <NavBar />
      <div className="mt-[70px]">
        <Slider />
      </div>
      <div className="my-container mt-10">
        <Categories />
        {!isFetching &&
          data?.categories?.length > 0 &&
          data?.categories.map((category) => (
            <HomeProduct category={category} key={category._id} />
          ))}
      </div>
    </>
  );
};
