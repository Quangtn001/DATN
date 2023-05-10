import React from "react";
import { AiFillStar } from "react-icons/ai";
import moment from "moment";
import Star from "./Star";
const Reviews = ({ product }) => {
  let result = 0;
  let one = 0,
    two = 0,
    three = 0,
    four = 0,
    five = 0,
    total = 0;
  if (product?.length > 0) {
    product?.forEach((item) => {
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
  const reviewsItems = product.map((product) => {
    const dateString = `${product?.createdAt}`;
    const formattedDate = moment(dateString).format("DD/MM/YYYY hh:mm A");
    return {
      id: `${product._id}`,
      postDate: `${formattedDate}`,
      author: `${product?.user.email}`,
      title: ` ${product?.user.name}`,
      review: `${product?.comment}`,
      rating: `${product?.rating}.0`,
    };
  });

  return (
    <div className="mx-auto py-8 px-4 w-full max-w-7xl bg-white">
      {/* :HEADER */}
      <div className="pb-5 w-full border-b-2 border-gray-200">
        <h3 className="text-xl text-orange-400 font-semibold">Feedbacks</h3>

        <p className="mt-1.5 flex items-center">
          <span className=" text-gray-700 font-semibold">
            Total rate : {`${finalResult}/5.0`}
          </span>
          <AiFillStar color="orange" rating={finalResult} />
        </p>
        <span className=" text-orange-400 font-semibold">
          {product.length} reviews
        </span>
      </div>

      {/* :REVIEWS CONTAINER */}
      <div className="mt-2 border-b-2 border-gray-100">
        {reviewsItems.map((review, index) => (
          <article
            key={review.id}
            className={`py-5 grid grid-cols-2 md:grid-cols-4 gap-4  ${
              index !== 0 && "border-t-2 border-gray-100"
            }`}
          >
            {/* ::Author & Date */}
            <div className="order-first col-span-full sm:col-span-1">
              <p className="mb-0.5 text-xs text-gray-500 font-medium">
                {review.postDate}
              </p>
              <p className="text-base text-black font-semibold">
                {review.author}
              </p>
            </div>

            {/* ::Rating */}
            <div className=" order-last sm:order-2 col-span-full sm:col-span-1 space-y-1.5 ml-7">
              <p className="text-sm text-gray-700 font-semibold">
                {`Rated: ${review.rating}/5.0 `}
              </p>
              <span className="ml-3">
                <Star value={review.rating} />
              </span>
            </div>

            {/* ::Review */}
            <div className="order-2 sm:order-last col-span-2 sm:pl-4">
              {/* :::title */}
              <p className="text-base text-gray-700 font-semibold">
                {review.title}
              </p>
              {/* :::text */}
              <p className="mt-2 text-sm text-gray-500">{review.review}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default Reviews;
