import React, { useState } from "react";
import { motion } from "framer-motion";
import currency from "currency-formatter";
import { discount } from "../../utils/discount";
import h2p from "html2plaintext";
import htmlFormat from "html-to-formatted-text";
import htmlParser from "html-react-parser";
import Quantity from "./Quantity";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { addCart } from "../../store/reducers/cartReducer";
import { AiFillStar } from "react-icons/ai";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import Reviews from "./Reviews";
import { Link } from "react-router-dom";

const DetailsCard = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const inc = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    } else {
      toast.error("Hết hàng trong kho!");
    }
  };

  const dec = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const discountPrice = discount(product.price, product.discount);
  let descript = h2p(product.description);
  descript = htmlParser(descript);
  descript = htmlFormat(descript);

  const dispatch = useDispatch();
  const addToCart = () => {
    const { createdAt, updatedAt, ...newProduct } = product;
    newProduct["quantity"] = quantity;
    const cart = localStorage.getItem("cart");
    const cartItems = cart ? JSON.parse(cart) : [];
    const checkItem = cartItems.find((item) => item._id === newProduct._id);
    if (!checkItem) {
      dispatch(addCart(newProduct));
      cartItems.push(newProduct);
      localStorage.setItem("cart", JSON.stringify(cartItems));
      toast.success(`Thêm vào giỏ hàng thành công!`);
    } else {
      toast.error(`${newProduct.title} is already in cart`);
      return;
    }
  };
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

  const [activeTab, setActiveTab] = React.useState("html");
  const review = <Reviews product={product.reviews} />;
  const data = [
    {
      label: "Mô tả",
      value: "html",
      desc: `${descript}`,
    },
    {
      label: "Đánh giá",
      value: "react",
      desc: review,
    },
  ];

  const reviewImages = [
    `/images/${product.image1}`,
    `/images/${product.image2}`,
    `/images/${product.image3}`,
  ];
  const [currentImage, setCurrentImage] = useState(reviewImages[0]);

  const changeImage = (image) => {
    setCurrentImage(image);
  };

  const [weight, setWeight] = useState("");

  const handleWeight = (value) => {
    setWeight(value);
  };

  return (
    <>
      <section className="overflow-hidden bg-white py-11 font-poppins">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="max-w-6xl px-4 py-4 mx-auto lg:py-8 md:px-6"
        >
          <Toaster />
          <div className="flex flex-wrap -mx-4">
            <div className="w-full px-4 md:w-1/2 ">
              <div className="sticky top-0  overflow-hidden ">
                <div className="relative mb-6 lg:mb-10 lg:h-2/4 ">
                  <img
                    src={currentImage}
                    alt="Review Thumbnail"
                    className="object-cover w-full h-[500px] "
                  />
                </div>
                <div className="flex-wrap flex ">
                  {reviewImages.map((image, index) => (
                    <div
                      className="w-1/4 p-2 sm:w-1/4"
                      key={index}
                      onClick={() => changeImage(image)}
                    >
                      <Link className="block border border-blue-300 dark:border-transparent  hover:border-blue-300">
                        <img
                          src={image}
                          alt="Review Thumbnail"
                          className="object-cover w-full lg:h-20"
                        />
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="w-full px-4 md:w-1/2 ">
              <div className="lg:pl-20">
                <div className="mb-8 ">
                  <h2 className="max-w-xl mt-2 mb-6 text-2xl font-bold md:text-4xl">
                    {product.title}
                  </h2>
                  <hr />
                  <div className="flex items-center mb-6">
                    <span>{finalResult}</span>
                    <AiFillStar color="orange" />
                    <p className="text-sm">({total} customer reviews)</p>
                  </div>

                  <p className="flex gap-2 items-center mb-8 text-4xl font-bold text-gray-700 ">
                    <span>
                      {currency.format(discountPrice, { code: "USD" })}
                    </span>
                    <span className="text-base font-normal text-gray-500 line-through ">
                      {currency.format(product.price, { code: "USD" })}
                    </span>
                  </p>
                  <hr />
                  <p className="text-green-600 dark:text-green-300 ">
                    {product.stock} in stock
                  </p>
                </div>
                <hr />
                <div className="flex flex-col gap-5 mb-8">
                  <h2 className="w-16 text-xl font-bold whitespace-nowrap">
                    Khối lượng: {weight ? `${weight}g` : ""}
                  </h2>
                  <div className="flex flex-wrap gap-3">
                    <span
                      className="p-3 border w-13 hover:border-blue-400  hover:text-blue-600 font-medium cursor-pointer"
                      onClick={() => handleWeight(150)}
                    >
                      150g
                    </span>
                    <span
                      className="p-3 border w-13 hover:border-blue-400 hover:text-blue-600 font-medium cursor-pointer "
                      onClick={() => handleWeight(350)}
                    >
                      350g
                    </span>
                    <span
                      className="p-3 border w-13 hover:border-blue-400 hover:text-blue-600 font-medium cursor-pointer "
                      onClick={() => handleWeight(500)}
                    >
                      500g
                    </span>
                  </div>
                </div>
                <div className="w-32 mb-8 ">
                  <Quantity
                    setQuantity={setQuantity}
                    quantity={quantity}
                    inc={inc}
                    dec={dec}
                    max={product.stock}
                  />
                </div>
                <div className="flex flex-wrap items-center -mx-4 ">
                  <div className="w-full px-4 mb-4 lg:w-1/2 lg:mb-0">
                    <button
                      className="flex items-center justify-center w-full p-4 text-blue-500 border border-blue-500 rounded-md   hover:bg-blue-600 hover:border-blue-600 hover:text-gray-100 font-bold"
                      onClick={addToCart}
                    >
                      Mua Ngay
                    </button>
                  </div>
                  <div className="w-full px-4 mb-4 lg:w-1/2 lg:mb-0">
                    <button
                      className="flex items-center justify-center w-full p-4 text-blue-500 border border-blue-500 rounded-md   hover:bg-blue-600 hover:border-blue-600 hover:text-gray-100 font-bold"
                      onClick={addToCart}
                    >
                      Mua Ngay
                    </button>
                  </div>
                </div>
              </div>
              <Tabs value={activeTab}>
                <TabsHeader
                  className="rounded-none border-b border-blue-gray-50 bg-transparent p-0 mt-7"
                  indicatorProps={{
                    className:
                      "bg-transparent border-b-2 border-blue-500 shadow-none rounded-none",
                  }}
                >
                  {data.map(({ label, value }) => (
                    <Tab
                      key={value}
                      value={value}
                      onClick={() => setActiveTab(value)}
                      className={
                        activeTab === value ? "text-blue-500 font-bold" : ""
                      }
                    >
                      {label}
                    </Tab>
                  ))}
                </TabsHeader>
                <TabsBody>
                  {data.map(({ value, desc }) => (
                    <TabPanel key={value} value={value}>
                      {desc}
                    </TabPanel>
                  ))}
                </TabsBody>
              </Tabs>
            </div>
          </div>
        </motion.div>
      </section>
    </>
  );
};

export default DetailsCard;
