import React from "react";
import Wrapper from "./Wrapper";
import ScreenHeader from "../../components/ScreenHeader";
import { Link } from "react-router-dom";
import { useAllCategoriesQuery } from "../../store/services/categoryService";
import { useAllProductsQuery } from "../../store/services/productService";
import { useAllOrdersQuery } from "../../store/services/orderService";
import Spinner from "../../components/Spinner";
import { Bar } from "react-chartjs-2";
import { Char as ChartJS } from "chart.js/auto";
const moment = require("moment");
const DashboardAdmin = () => {
  const { data: categories = [], isFetching: categoryFecth } =
    useAllCategoriesQuery();

  const { data: products = [], isFetching: productFecth } =
    useAllProductsQuery();
  const { data: orders = [], isFetching: orderFecth } = useAllOrdersQuery();

  const label = orders?.orders?.map((item) => item.createdAt) || [];

  const uniqueDatesSet = new Set(
    label?.map((date) => moment(date).format("YYYY-MM-DD"))
  );
  const formattedDates = [...uniqueDatesSet];
  const ordersPerDay = label?.reduce((count, date) => {
    const formattedDate = moment(date).format("YYYY-MM-DD");
    count[formattedDate] = (count[formattedDate] || 0) + 1;
    return count;
  }, {});
  const orderCounts = formattedDates.map((date) => ordersPerDay[date]) || [];

  const data = {
    labels: formattedDates,
    datasets: [
      {
        label: "Đơn hàng",
        data: orderCounts,
        backgroundColor: "#19A7CE",
        borderColor: "#19A7CE",
        borderWidth: 1,
        borderRadius: 4,
        barPercentage: 0.5,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        type: "category", // Set the x-axis scale type to 'category'
        labels: formattedDates,
      },
      y: {
        beginAtZero: true,
      },
    },
  };
  return (
    <Wrapper>
      <ScreenHeader>
        <h1 className="font-bold uppercase text-lg">Dashboard Admin</h1>
      </ScreenHeader>

      {!categoryFecth && !productFecth && !orderFecth ? (
        <>
          {" "}
          <section className="text-gray-600 body-font flex justify-center items-center">
            <div className="container px-5 py-24 mx-auto">
              <div className="flex flex-wrap -m-4 text-center">
                <div className="p-4 sm:w-1/2 lg:w-1/3 w-full hover:scale-105 duration-500">
                  <div className=" flex items-center  justify-between p-4  rounded-lg bg-white shadow-indigo-50 shadow-md">
                    <div className="flex flex-col">
                      <h2 className="text-gray-900 text-lg font-bold">
                        Total Category
                      </h2>
                      <h3 className="mt-2 text-xl font-bold text-yellow-500 text-center">
                        {categories?.categories?.length}
                      </h3>
                      <p className="text-sm font-semibold text-gray-400">
                        Updated
                      </p>
                      <Link
                        to="/dashboard/categories"
                        className="text-sm mt-6 px-4 py-2 bg-yellow-400 text-white rounded-lg  tracking-wider hover:bg-yellow-300 outline-none"
                      >
                        View details
                      </Link>
                    </div>
                    <div className="bg-gradient-to-tr from-yellow-500 to-yellow-400 w-32 h-32  rounded-full shadow-2xl shadow-yellow-400 border-white  border-dashed border-2  flex justify-center items-center ">
                      <div>
                        <h1 className="text-white text-2xl">Category</h1>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-4 sm:w-1/2 lg:w-1/3 w-full hover:scale-105 duration-500">
                  <div className=" flex items-center  justify-between p-4  rounded-lg bg-white shadow-indigo-50 shadow-md">
                    <div className="flex flex-col">
                      <h2 className="text-gray-900 text-lg font-bold">
                        Total Products
                      </h2>
                      <h3 className="mt-2 text-xl font-bold text-orange-500 text-center">
                        {products?.products?.length}
                      </h3>
                      <p className="text-sm font-semibold text-gray-400">
                        Updated
                      </p>
                      <Link
                        to="/dashboard/products"
                        className="text-sm mt-6 px-4 py-2 bg-orange-400  text-white rounded-lg  tracking-wider hover:bg-orange-500 outline-none"
                      >
                        View detail
                      </Link>
                    </div>
                    <div className="bg-gradient-to-tr from-orange-500 to-orange-400 w-32 h-32  rounded-full shadow-2xl shadow-orange-400 border-white  border-dashed border-2  flex justify-center items-center ">
                      <div>
                        <h1 className="text-white text-2xl">Products</h1>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-4 sm:w-1/2 lg:w-1/3 w-full hover:scale-105 duration-500">
                  <div className=" flex items-center  justify-between p-4  rounded-lg bg-white shadow-indigo-50 shadow-md">
                    <div className="flex flex-col">
                      <h2 className="text-gray-900 text-lg font-bold">
                        Total Orders
                      </h2>
                      <h3 className="mt-2 text-xl font-bold text-red-500 text-center">
                        {orders?.orders?.length}
                      </h3>
                      <p className="text-sm font-semibold text-gray-400">
                        Updated
                      </p>
                      <Link
                        to="/dashboard/orders"
                        className="text-sm mt-6 px-4 py-2 bg-red-400  text-white rounded-lg  tracking-wider hover:bg-red-500 outline-none"
                      >
                        View Detail
                      </Link>
                    </div>
                    <div className="bg-gradient-to-tr from-red-500 to-red-400 w-32 h-32  rounded-full shadow-2xl shadow-red-400 border-white  border-dashed border-2  flex justify-center items-center ">
                      <div>
                        <h1 className="text-white text-2xl">Basic</h1>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <div className="mx-auto w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3 overflow-hidden bg-white ">
            <div>
              <Bar data={data} options={options} />
            </div>
          </div>
        </>
      ) : (
        <Spinner />
      )}
    </Wrapper>
  );
};

export default DashboardAdmin;
