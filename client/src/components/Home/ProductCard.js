import currency from "currency-formatter";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { AiFillStar } from "react-icons/ai";
import { truncateString } from "../../utils/truncateString";

const ProductCard = ({ product }) => {
  const percentage = product.discount / 100;
  const discountPrice = product.price - product.price * percentage;
  let result = 0;
  let one = 0,
    two = 0,
    three = 0,
    four = 0,
    five = 0,
    total = 0;
  if (product?.reviews?.length > 0) {
    product?.reviews?.forEach((item) => {
      if (item.rating === 1) {
        one += 1;
      }
      if (item.rating === 2) {
        two += 1;
      }
      if (item.rating === 3) {
        three += 1;
      }
      if (item.rating === 4) {
        four += 1;
      }
      if (item.rating === 5) {
        five += 1;
      }
    });
    total = one + two + three + four + five;
    result = (1 * one + 2 * two + 3 * three + 4 * four + 5 * five) / total;
  } else {
    total = 0;
    result = 0;
  }
  const finalResult = parseFloat(result).toFixed(1);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full sm:w-6/12 md:w-4/12 xl:w-3/12 px-5 py-10"
      key={product._id}
    >
      <div className="relative group">
        <Link to={`/product/${product._id}`} className="relative">
          <div className="w-full transform transition-transform duration-300 group-hover:scale-100 group-hover:z-10">
            <img
              src={`/images/${product.image1}`}
              alt="product_image"
              className="w-full h-[310px] object-cover rounded shadow-md"
            />
          </div>
          <p className="capitalize text-base font-medium text-black my-2.5">
            {truncateString(product.title, 30)}
          </p>
          <div className="flex items-center">
            <div className="flex items-center space-x-2 mb-1">
              <span>{finalResult}</span>
              <AiFillStar color="orange" />
              <span>({total})</span>
            </div>
          </div>
          <div className="flex justify-between">
            <span className="text-lg font-medium text-black">
              {currency.format(discountPrice, { code: "USD" })}
            </span>
            <span className="text-lg font-medium text-gray-600 line-through">
              {currency.format(product.price, { code: "USD" })}
            </span>
          </div>
          <Link
            to={`/product/${product._id}`}
            className="bg-red-500 w-60 rounded p-2 text-white absolute bottom-28 text-center font-medium uppercase text-sm transition-all duration-300 opacity-0 group-hover:opacity-100"
          >
            Xem ngay
          </Link>
        </Link>
      </div>
    </motion.div>
  );
};

export default ProductCard;
