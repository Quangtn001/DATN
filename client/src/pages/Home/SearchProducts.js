import { useParams } from "react-router-dom";
import Header from "../../components/Home/Header";
import NavBar from "../../components/Home/NavBar";
import { useSearchProductsQuery } from "../../store/services/homeProducts";
import Pagination from "../../components/Pagination";
import ProductSkeleton from "../../components/Home/ProductSkeleton";
import ProductCard from "../../components/Home/ProductCard";
import { Link } from "react-router-dom";
const SearchProducts = () => {
  const { keyword, page = 1 } = useParams();
  const { data, isFetching } = useSearchProductsQuery({
    keyword,
    page: parseInt(page),
  });
  return (
    <>
      <NavBar />
      <div className="mt-[70px]">
        <Header>#{keyword}</Header>
      </div>
      <div className="my-container my-10">
        {isFetching ? (
          <ProductSkeleton />
        ) : data.count > 0 ? (
          <>
            <p className="text-base font-medium text-gray-700">
              {data.count} products found for #{keyword} keyword
            </p>
            <div className="flex flex-wrap -mx-5">
              {data.products.map((product) => {
                return <ProductCard product={product} key={product._id} />;
              })}
            </div>
            <Pagination
              page={parseInt(page)}
              perPage={data.perPage}
              count={data.count}
              path={`cat-products/${keyword}`}
              theme="light"
            />
          </>
        ) : (
          <>
            <p className="alert-danger">
              No products found for #{keyword} keyword
            </p>
            <Link to="/" className="btn-dark text-white mt-6">
              Go back home
            </Link>
          </>
        )}
      </div>
    </>
  );
};

export default SearchProducts;
