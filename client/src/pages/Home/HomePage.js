import React from "react";
import NavBar from "../../components/Home/NavBar";
import Slider from "../../components/Home/Slider";
import Categories from "../../components/Home/Categories";
import { useRandomCategoriesQuery } from "../../store/services/categoryService";
import HomeProduct from "../../components/Home/HomeProduct";
import Footer from "../../components/Home/Footer";
import { Helmet } from "react-helmet";
export const HomePage = () => {
  const { data, isFetching } = useRandomCategoriesQuery();
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Trang chủ</title>
      </Helmet>
      <NavBar />
      <div>
        <Slider />
      </div>
      <div className="my-container mt-10">
        <Categories />
        {!isFetching &&
          data?.categories?.length > 0 &&
          data?.categories.map((category) => (
            <HomeProduct category={category} key={category._id} />
          ))}

        <div className="mb-3">
          <img src="/images/banner.png" alt="" />
        </div>
      </div>

      <Footer />
    </>
  );
};
