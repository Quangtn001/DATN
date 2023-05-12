import React, { useState } from "react";
import { motion } from "framer-motion";
import DetailsImage from "./DetailsImage";
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

const DetailsCard = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const inc = () => {
    if (quantity < 20) {
      setQuantity(quantity + 1);
    } else {
      alert("Cannot add more 20 items");
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
      label: "Description",
      value: "html",
      desc: `${descript}`,
    },
    {
      label: "Review",
      value: "react",
      desc: review,
    },
  ];
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-wrap -mx-5"
    >
      <Toaster />
      <div className="w-full order-2 md:order-1 md:w-6/12 p-5">
        <div className="flex flex-wrap -mx-1">
          {" "}
          <DetailsImage image={product.image1} />
          <DetailsImage image={product.image2} />
          <DetailsImage image={product.image3} />
        </div>
      </div>
      <div className="w-full order-1 md:order-2 md:w-6/12 p-5">
        <h1 className="text-2xl font-bold text-gray-900 capitalize mb-3">
          {product.title}
        </h1>
        <hr />
        <div className="flex justify-between my-5">
          <span className="text-2xl font-bold text-gray-900">
            {currency.format(discountPrice, { code: "USD" })}
          </span>
          <span className="text-xl line-through text-gray-500">
            {currency.format(product.price, { code: "USD" })}
          </span>
        </div>
        <div className="flex items-center">
          <div className="flex items-center space-x-2 mb-1">
            <span>{finalResult}</span>
            <AiFillStar color="orange" />
            <span>({total})</span>
          </div>
        </div>
        <div className="flex -mx-3 flex-col">
          <div className="w-full sm:w-6/12 p-3">
            <Quantity quantity={quantity} inc={inc} dec={dec} />
          </div>
          <div className="w-full sm:w-6/12 p-3">
            <button className="btn btn-indigo" onClick={addToCart}>
              add to cart
            </button>
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
                className={activeTab === value ? "text-blue-500 font-bold" : ""}
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
    </motion.div>
  );
};

export default DetailsCard;
