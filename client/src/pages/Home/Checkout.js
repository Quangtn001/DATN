import React, { useState } from "react";
import { useSelector } from "react-redux";
import { discount } from "../../utils/discount";
import currency from "currency-formatter";
import { useCreateOrderMutation } from "../../store/services/orderService";
import { useNavigate } from "react-router-dom";
const Checkout = () => {
  const [address, setAddress] = useState({});
  const { cart, total } = useSelector((state) => state.cartReducer);

  const { user } = useSelector((state) => state.auth);

  const [createOrder, { isLoading, isSuccess }] = useCreateOrderMutation();
  const navigate = useNavigate();
  const handlePlaceOrder = async () => {
    const orderItems = cart.map((item) => {
      return {
        productId: item._id,
        quantities: item.quantity,
      };
    });

    const order = {
      orderItems,
      address,
    };

    if (user) {
      order.userId = user.id;
    }

    await createOrder(order);

    // Handle the response
    if (isSuccess) {
      // Clear the cart and redirect to the order confirmation page
      navigate.push("/order-confirmation");
    }
  };
  return (
    <>
      <div className="relative mx-auto w-full bg-white">
        <div className="grid min-h-screen grid-cols-10">
          <div className="col-span-full py-6 px-4 sm:py-12 lg:col-span-6 lg:py-24">
            <div className="mx-auto w-full max-w-lg">
              <h1 className="relative text-2xl font-medium text-gray-700 sm:text-3xl">
                Check out - Cash on Delivery
                <span className="mt-2 block h-1 w-10 bg-teal-600 sm:w-20" />
              </h1>
              <form action="" className="mt-10 flex flex-col space-y-4">
                <div className="relative">
                  <label
                    htmlFor="city"
                    className="text-xs font-semibold text-gray-500"
                  >
                    City
                  </label>
                  <input
                    required
                    type="text"
                    name="city"
                    value={address}
                    onChange={(event) => setAddress(event.target.value)}
                    placeholder="Please enter shipping address"
                    className="block w-full rounded border-gray-300 bg-gray-50 py-3 px-4 pr-10 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500"
                  />
                </div>
                <div className="relative">
                  <label
                    htmlFor="address"
                    className="text-xs font-semibold text-gray-500"
                  >
                    country
                  </label>
                  <input
                    required
                    type="text"
                    name="country"
                    placeholder="Please enter shipping address"
                    className="block w-full rounded border-gray-300 bg-gray-50 py-3 px-4 pr-10 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500"
                  />
                </div>
                <div className="relative">
                  <label
                    htmlFor="address"
                    className="text-xs font-semibold text-gray-500"
                  >
                    state
                  </label>
                  <input
                    required
                    type="text"
                    name="state"
                    placeholder="Please enter shipping address"
                    className="block w-full rounded border-gray-300 bg-gray-50 py-3 px-4 pr-10 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </form>
              <button
                onClick={handlePlaceOrder}
                disabled={isLoading}
                className="mt-4 inline-flex w-full items-center justify-center rounded bg-teal-600 py-2.5 px-4 text-base font-semibold tracking-wide text-white text-opacity-80 outline-none ring-offset-2 transition hover:text-opacity-100 focus:ring-2 focus:ring-teal-500 sm:text-lg"
              >
                Place Order
              </button>
            </div>
          </div>
          <div className="relative col-span-full flex flex-col py-6 pl-8 pr-4 sm:py-12 lg:col-span-4 lg:py-24">
            <h2 className="sr-only">Order summary</h2>
            <div>
              <img
                src="https://images.unsplash.com/photo-1581318694548-0fb6e47fe59b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
                alt=""
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 h-full w-full bg-gradient-to-t from-teal-800 to-teal-400 opacity-95"></div>
            </div>
            {cart.map((item) => {
              currency.format(
                discount(item.price, item.discount) * item.quantity,
                {
                  code: "USD",
                }
              );
              return (
                <div className="relative" key={item._id}>
                  <ul className="space-y-5">
                    <li className="flex justify-between">
                      <div className="inline-flex">
                        <img
                          src={`/images/${item.image1}`}
                          alt=""
                          className="max-h-16"
                        />
                        <div className="ml-3">
                          <p className="text-base font-semibold text-white">
                            {item.title}
                          </p>
                          <p className="text-sm font-medium text-white text-opacity-80">
                            {" "}
                            {item.quantity}
                          </p>
                        </div>
                      </div>
                      <p className="text-sm font-semibold text-white">
                        {currency.format(
                          discount(item.price, item.discount) * item.quantity,
                          {
                            code: "USD",
                          }
                        )}
                      </p>
                    </li>
                  </ul>
                  <div className="my-5 h-0.5 w-full bg-white bg-opacity-30" />
                </div>
              );
            })}
            <div className="space-y-2 relative">
              <p className="flex justify-between text-lg font-bold text-white">
                <span>Total price:</span>
                <span> {currency.format(total, { code: "USD" })}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
