import { Link } from "react-router-dom";
import { useGetProductByCategoryQuery } from "../../store/services/homeProducts";
import ProductSkeleton from "./ProductSkeleton";
import ProductCard from "./ProductCard";
const HomeProduct = ({ category }) => {
  const { data, isFetching } = useGetProductByCategoryQuery(category.slug);
  return isFetching ? (
    <ProductSkeleton />
  ) : (
    data?.products?.length > 0 && (
      <>
        <div className="flex justify-between items-center">
          <span className="text-gray-800  text-lg font-bold uppercase border-2 p-3">
            {category.name}
          </span>
          <b className="block flex-1 h-[2px] opacity-10 bg-black"></b>
          <span className="capitalize">
            <Link
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
              to={`/collections/${category.slug}`}
            >
              Xem tất cả
            </Link>
          </span>
        </div>
        <div className="flex flex-wrap -mx-5">
          {data?.products.map((item) => (
            <ProductCard product={item} key={item._id} />
          ))}
        </div>
      </>
    )
  );
};

export default HomeProduct;
