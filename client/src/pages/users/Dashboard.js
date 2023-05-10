import React, { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import Header from "../../components/Home/Header";
import AccountList from "../../components/Home/AccountList";
import NavBar from "../../components/Home/NavBar";
import { useSelector, useDispatch } from "react-redux";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useVerifyPaymentQuery } from "../../store/services/paymentService";
import { emptyCart } from "../../store/reducers/cartReducer";
import { Helmet } from "react-helmet";
export const Dashboard = () => {
  const { user } = useSelector((state) => state.authReducer);
  console.log(user);
  const [params] = useSearchParams();
  const id = params.get("session_id");
  const { data, isSuccess } = useVerifyPaymentQuery(id, {
    skip: id ? false : true,
  });
  console.log(data);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (isSuccess) {
      localStorage.removeItem("cart");
      toast.success(data.msg);
      dispatch(emptyCart());
      navigate("/user");
    }
  }, [isSuccess, dispatch, navigate, data?.msg]);
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Dashboard</title>
      </Helmet>
      <NavBar />
      <Toaster position="top-right" reverseOrder={false} />
      <div className="mt-[70px]">
        <Header>my account</Header>
        <div className="my-container mt-[40px]">
          <div className="flex flex-wrap -mx-6">
            <div className="w-full md:w-4/12 p-6">
              <AccountList />
            </div>
            <div className="w-full md:w-8/12 p-6">
              <h1 className="text-4xl font-normal leading-normal mt-0 mb-2 text-zinc-800 bg-white p-4">
                Well come to " {user?.name} " dashboard
              </h1>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
