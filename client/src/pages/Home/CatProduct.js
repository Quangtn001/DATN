import { useParams } from "react-router-dom";
import Header from "../../components/Home/Header";
import NavBar from "../../components/Home/NavBar";
import { useCatProductsQuery } from "../../store/services/homeProducts";
import { useAllCategoriesQuery } from "../../store/services/categoryService";
import Pagination from "../../components/Pagination";
import ProductSkeleton from "../../components/Home/ProductSkeleton";
import ProductCard from "../../components/Home/ProductCard";

import { useNavigate } from "react-router-dom";

const CatProduct = () => {
  const navigate = useNavigate();
  const { name, page = 1 } = useParams();
  const { data: catProductData, isFetching: catProductIsFetching } =
    useCatProductsQuery({
      name,
      page: parseInt(page),
    });
  const { data: allCategoriesData, isFetching: allCategoriesIsFetching } =
    useAllCategoriesQuery();
  console.log(allCategoriesIsFetching);
  const handleCategoryChange = (e) => {
    const value = e.target.value;
    navigate(`/cat-products/${value}`);
  };

  return (
    <>
      <NavBar />

      <div className="mt-[70px]">
        <Header>#{name}</Header>
      </div>

      <div className="my-container my-10">
        {catProductIsFetching ? (
          <ProductSkeleton />
        ) : catProductData.count > 0 ? (
          <>
            <p className="text-base font-medium text-gray-700">
              {catProductData.count} products found in #{name} category
            </p>
            <hr />
            <div className="w-full md:w-5/3  p-5 rounded-lg bg-white">
              <div className="flex items-center justify-between mt-4">
                <p className="font-medium">Filters</p>
                <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm font-medium rounded-md">
                  Reset Filter
                </button>
              </div>
              <div>
                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
                  <select className="px-4 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm">
                    <option value="">Giá</option>
                    <option value="for-rent">Giá : thấp đến cao</option>
                    <option value="for-sale">Giá : cao đến thấp</option>
                  </select>
                  <select className="px-4 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm">
                    <option value="">Sắp xếp</option>
                    <option value="for-rent">Mới nhất</option>
                    <option value="for-rent">Từ A - Z</option>
                    <option value="for-rent">Từ Z - A</option>
                  </select>
                  <select className="px-4 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm">
                    <option value="">Đánh giá</option>
                    <option value="for-rent">1 sao</option>
                    <option value="for-rent">2-3 sao</option>
                    <option value="for-rent">3-5 sao</option>
                    <option value="for-rent">5 sao</option>
                  </select>
                  <select
                    className="px-4 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
                    onChange={handleCategoryChange}
                  >
                    <option value="">Category</option>
                    {allCategoriesData?.categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <hr />
            <div className="flex flex-wrap -mx-5">
              {catProductData.products.map((product) => {
                return <ProductCard product={product} key={product._id} />;
              })}
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
            <p className="alert-danger">
              No products found in #{name} category
            </p>
            <div className="w-full md:w-5/3  p-5 rounded-lg bg-white">
              <div className="flex items-center justify-between mt-4">
                <p className="font-medium">Filters</p>
                <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm font-medium rounded-md">
                  Reset Filter
                </button>
              </div>
              <div>
                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
                  <select className="px-4 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm">
                    <option value="">Giá</option>
                    <option value="for-rent">Giá : thấp đến cao</option>
                    <option value="for-sale">Giá : cao đến thấp</option>
                  </select>
                  <select className="px-4 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm">
                    <option value="">Sắp xếp</option>
                    <option value="for-rent">Mới nhất</option>
                    <option value="for-rent">Từ A - Z</option>
                    <option value="for-rent">Từ Z - A</option>
                  </select>
                  <select className="px-4 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm">
                    <option value="">Đánh giá</option>
                    <option value="for-rent">1 sao</option>
                    <option value="for-rent">2-3 sao</option>
                    <option value="for-rent">3-5 sao</option>
                    <option value="for-rent">5 sao</option>
                  </select>
                  <select
                    className="px-4 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
                    onChange={handleCategoryChange}
                  >
                    <option value="">Category</option>
                    {allCategoriesData?.categories.map((category) => (
                      <option key={category.id} value={category.name}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default CatProduct;
