import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { truncateString } from "../../utils/truncateString";
import { useRandomProductsByCategoryQuery } from "../../store/services/productService";

const Sameproduct = ({ product }) => {
  const { data: catProductData, isFetching: catProductIsFetching } =
    useRandomProductsByCategoryQuery(product?.category);

  return (
    <>
      <hr />
      <div className="flex flex-col sm:flex-row items-center justify-between">
        <h3 className="uppercase mt-5 font-medium text-center sm:text-left">
          Sản phẩm tương tự
        </h3>
        <Link
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mt-3 sm:mt-0"
          to={`/cat-products/${product.category}`}
        >
          Xem tất cả
        </Link>
      </div>
      {!catProductIsFetching ? (
        <div className="flex flex-wrap justify-between">
          {catProductData.products.map((item) => (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="w-full sm:w-6/12 md:w-4/12 xl:w-3/12 px-5 py-10"
              key={item._id}
            >
              <Link to={`/product/${item._id}`}>
                <div className="w-full">
                  <img
                    src={`/images/${item.image1}`}
                    alt="product_image"
                    className="w-full h-[310px] object-cover"
                  />
                </div>
                <p className="capitalize text-base font-medium text-black my-2.5">
                  {truncateString(item.title, 30)}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>
      ) : (
        "Loading..."
      )}
    </>
  );
};

export default Sameproduct;
