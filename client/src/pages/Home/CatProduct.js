import { useParams } from "react-router-dom";
import Header from "../../components/Home/Header";
import NavBar from "../../components/Home/NavBar";
import { useCatProductsQuery } from "../../store/services/homeProducts";
import Pagination from "../../components/Pagination";
import ProductSkeleton from "../../components/Home/ProductSkeleton";
import ProductCard from "../../components/Home/ProductCard";
const CatProduct = () => {
  const { name, page = 1 } = useParams();
  const { data, isFetching } = useCatProductsQuery({
    name,
    page: parseInt(page),
  });
  console.log(data, isFetching);
  console.log(name, page);
  return (
    <>
      <NavBar />
      <div className="mt-[70px]">
        <Header>#{name}</Header>
      </div>
      <div className="my-container my-10">
        {isFetching ? (
          <ProductSkeleton />
        ) : data.count > 0 ? (
          <>
            <p className="text-base font-medium text-gray-700">
              {data.count} products found in #{name} category
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
              path={`cat-products/${name}`}
              theme="light"
            />
          </>
        ) : (
          <p className="alert-danger">No products found in #{name} category</p>
        )}
      </div>
    </>
  );
};

export default CatProduct;
