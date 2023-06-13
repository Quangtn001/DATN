import { Link } from "react-router-dom";
import { useAllCategoriesQuery } from "../../store/services/categoryService";
import Spinner from "../Spinner";

const Categories = () => {
  const { data, isFetching } = useAllCategoriesQuery();

  return (
    <>
      <h1 className="uppercase font-bold text-2xl mb-5 text-center">
        Danh mục sản phẩm
      </h1>
      {!isFetching ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-10 ">
          {data?.categories?.map((category) => (
            <Link
              key={category.name}
              to={`/cat-products/${category.name}`}
              className=" p-4 bg-white shadow-md rounded-lg hover:bg-gray-400 font-semibold"
            >
              {category.name}
            </Link>
          ))}
        </div>
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default Categories;
