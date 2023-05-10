import { Link } from "react-router-dom";
import { useCatProductsQuery } from "../../store/services/homeProducts";
import ProductSkeleton from "./ProductSkeleton";
import ProductCard from "./ProductCard";
const HomeProduct = ({ category }) => {
  const { data, isFetching } = useCatProductsQuery({
    name: category.name,
  });
  return isFetching ? (
    <ProductSkeleton />
  ) : (
    data?.products?.length > 0 && (
      <>
        <div className="flex justify-between">
          <span className="text-lg font-medium capitalize">
            {category.name}
          </span>
          <span className="capitalize">
            <Link
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
              to={`/cat-products/${category.name}`}
            >
              see all
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
