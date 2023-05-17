import { Link, useParams } from "react-router-dom";
import Header from "../../components/Home/Header";
import NavBar from "../../components/Home/NavBar";
import { useCatProductsQuery } from "../../store/services/homeProducts";
import { useAllCategoriesQuery } from "../../store/services/categoryService";
import Pagination from "../../components/Pagination";
import ProductSkeleton from "../../components/Home/ProductSkeleton";
import ProductCard from "../../components/Home/ProductCard";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Home/Footer";
import { useState } from "react";
import { Helmet } from "react-helmet";

const CatProduct = () => {
  const navigate = useNavigate();
  const { name, page = 1, sort, order } = useParams();

  const categoryName = useParams().name;
  const { data: catProductData, isFetching: catProductIsFetching } =
    useCatProductsQuery({
      name,
      page: parseInt(page),
      sort,
      order,
    });

  const { data: allCategoriesData, isFetching: allCategoriesIsFetching } =
    useAllCategoriesQuery();

  const [category, setCategory] = useState(categoryName);

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setCategory(category);
    navigate(`/cat-products/${category}`);
  };

  const handleSort = (e) => {
    const value = e.target.value;
    const [sortValue, orderValue] = value.split("-");
    navigate(`/cat-products/${category}/${page}/${sortValue}/${orderValue}`);
  };

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Sản phẩm</title>
      </Helmet>
      <NavBar />

      <div className="mt-[70px]">
        <Header>#{name}</Header>
      </div>

      <div className="my-container my-10">
        {catProductIsFetching ? (
          <ProductSkeleton />
        ) : catProductData?.count > 0 ? (
          <>
            <p className="text-base font-medium text-gray-700">
              {catProductData?.count} products found in #{name} category
            </p>

            <div className="w-full md:w-5/3  p-5 rounded-lg bg-white">
              <div className="flex items-center justify-between mt-4">
                <p className="font-medium">Filters</p>
              </div>
              <div>
                <div className="flex flex-col md:flex-row xl:flex justify-between gap-8 mt-4 ">
                  <select
                    className="px-4 py-3 w-[280px] rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
                    onChange={handleCategoryChange}
                  >
                    <option>Category</option>
                    {allCategoriesData?.categories.map((category) => (
                      <option
                        key={category.id}
                        value={category.id}
                        selected={category.name === categoryName}
                      >
                        {category.name}
                      </option>
                    ))}
                  </select>
                  <select
                    className=" px-4 py-3 w-[280px] rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
                    onChange={handleSort}
                  >
                    <option value="">Sort by</option>
                    <option value="price-asc">Giá từ thấp đến cao</option>
                    <option value="price-desc">Giá từ cao đến thấp</option>
                    <option value="title-asc">Tên từ A-Z</option>
                    <option value="title-desc">Tên từ Z-A</option>
                  </select>
                </div>
              </div>
            </div>
            <hr />
            <div>
              <div className="flex flex-wrap -mx-5">
                {catProductData.products.map((product) => {
                  return <ProductCard product={product} key={product._id} />;
                })}
              </div>
            </div>
            <Pagination
              page={parseInt(page)}
              perPage={catProductData.perPage}
              count={catProductData.count}
              path={`cat-products/${name}`}
              theme="light"
            />
          </>
        ) : (
          <>
            <p className="alert-danger mb-10">
              No products found in #{name} category
            </p>
            <Link to="/" className="btn-dark text-white mt-6">
              Go back home
            </Link>
          </>
        )}
      </div>
      <Footer />
    </>
  );
};

export default CatProduct;
