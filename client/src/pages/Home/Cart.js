import React, { useEffect } from "react";
import NavBar from "../../components/Home/NavBar";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { discount } from "../../utils/discount";
import currency from "currency-formatter";
import Quantity from "../../components/Home/Quantity";
import { BsTrash } from "react-icons/bs";
import {
  incQuantity,
  decQuantity,
  removeItem,
} from "../../store/reducers/cartReducer";

// import { Link } from "react-router-dom";
import { useSendPaymentMutation } from "../../store/services/paymentService";
const Cart = () => {
  const { cart, total } = useSelector((state) => state.cartReducer);
  const { userToken, user } = useSelector((state) => state.authReducer);
  // console.log(cart);
  const dispatch = useDispatch();
  const inc = (id) => {
    dispatch(incQuantity(id));
  };
  const dec = (id) => {
    dispatch(decQuantity(id));
  };
  const remove = (id) => {
    // verify user that you are really want to delete the project or item
    if (window.confirm("Are you sure you want to delete this item?")) {
      dispatch(removeItem(id));
    }
  };

  const navigate = useNavigate();
  const [doPayment, response] = useSendPaymentMutation();
  const paymentHandler = () => {
    if (userToken) {
      doPayment({ cart, id: user.id });
    } else {
      navigate("/login");
    }
  };

  useEffect(() => {
    if (response?.isSuccess) {
      window.location.href = response?.data?.url;
    }
  }, [response]);
  return (
    <>
      <NavBar />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="my-container mt-28"
      >
        {cart.length > 0 ? (
          <>
            <div className="table-container">
              <table className="w-full">
                <thead>
                  <tr className="thead-tr">
                    <th className="th">image</th>
                    <th className="th">name</th>

                    <th className="th">price</th>
                    <th className="th">quantities</th>
                    <th className="th">total</th>
                    <th className="th">delete</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((item) => {
                    const total = currency.format(
                      discount(item.price, item.discount) * item.quantity,
                      {
                        code: "USD",
                      }
                    );
                    return (
                      <tr className="even:bg-gray-50" key={item._id}>
                        <td className="td">
                          <img
                            src={`/images/${item.image1}`}
                            alt={item.title}
                            className="w-12 h-12 object-cover rounded-full"
                          />
                        </td>
                        <td className=" td font-medium">{item.title}</td>

                        <td className="td font-bold text-gray-900">
                          {currency.format(
                            discount(item.price, item.discount),
                            {
                              code: "USD",
                            }
                          )}
                        </td>
                        <td className="td">
                          <Quantity
                            quantity={item.quantity}
                            inc={() => inc(item._id)}
                            dec={() => dec(item._id)}
                            theme="indigo"
                          />
                        </td>
                        <td className="td font-bold ">{total}</td>
                        <td className="td">
                          <span
                            className="cursor-pointer"
                            onClick={() => remove(item._id)}
                          >
                            <BsTrash className="text-rose-600" size={20} />
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="bg-indigo-50 p-4 flex justify-between items-center mt-5 rounded-md">
              <h1 className="font-bold">Total</h1>
              <div>
                <span className="text-lg font-semibold text-indigo-800 mr-10">
                  {currency.format(total, { code: "USD" })}
                </span>
                <button
                  className="btn bg-indigo-600 text-sm font-medium py-2.5"
                  onClick={paymentHandler}
                >
                  {response.isLoading ? "Loading..." : "checkout with card"}
                </button>
                {/* <button className="btn bg-indigo-900 text-sm font-medium py-2.5 mx-4">
                  Cash on Delivery
                </button> */}
              </div>
            </div>
          </>
        ) : (
          <div className="bg-indigo-50 border border-indigo-100 p-4 rounded-md text-sm font-medium text-indigo-800">
            Cart is empty!
          </div>
        )}
      </motion.div>
    </>
  );
};

export default Cart;
