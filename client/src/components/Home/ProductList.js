import React from "react";
import { useGetProductByCategoryQuery } from "../../store/services/homeProducts";
import { Link } from "react-router-dom";

const ProductList = ({ slug }) => {
  const { data = [], isFetching } = useGetProductByCategoryQuery(slug);

  if (isFetching) {
    return <li>Loading...</li>;
  }
  return (
    <>
      {data?.products?.map((product) => (
        <li
          key={product._id}
          className="hover:bg-red-700 p-2 rounded transition-all hover:text-white font-normal"
        >
          <Link to={`/product/${product._id}`}>{product.title}</Link>
        </li>
      ))}
    </>
  );
};

export default ProductList;
